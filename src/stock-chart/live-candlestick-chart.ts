import { loadCultureFiles } from '../common/culture-loader';
import { StockChart, DateTime, Export, CandleSeries, LastValueLabel, IStockChartEventArgs } from '@syncfusion/ej2-charts';
import { loadStockChartTheme } from './theme-color';

StockChart.Inject(DateTime, Export, CandleSeries, LastValueLabel);

/**
 * Simulated one-minute candle in milliseconds.
 */
const ONE_MINUTE_MS: number = 60 * 1000;

/**
 * Tick frequency for updating the chart.
 * In a real app this would be ~60000 (one minute).
 * For demo purposes it is 100 ms so changes are visible quickly.
 */
const UPDATE_INTERVAL_MS: number = 100;

/**
 * After this many ticks, a brand-new one-minute candle is appended.
 */
const UPDATES_PER_CANDLE: number = 10;

/**
 * Animation is disabled for setData() because it is called frequently.
 */
const UPDATE_ANIMATION_DURATION: number = 0;

/**
 * Short animation when a new candle is added via addPoint().
 */
const ADD_ANIMATION_DURATION: number = 100;

/**
 * Multiplier used to amplify the random price walk so the chart
 * shows visible movement within the demo interval.
 */
const PRICE_MOVEMENT_MULTIPLIER: number = 2;

/**
 * Number of historical one-minute candles generated locally.
 */
const INITIAL_CANDLE_COUNT: number = 120;

/**
 * Starting price used when generating the historical data.
 */
const INITIAL_PRICE: number = 375;

/**
 * Local in-memory candle data, replacing an external API.
 */
let stockData: object[] = [];

/**
 * Reference to the rendered StockChart instance.
 */
let stockChart: StockChart = null;

/**
 * Interval id for the dynamic update timer.
 */
let updateTimer: number = null;

/**
 * Counts ticks since the last candle was added.
 */
let updateIndex: number = 0;

/*
 * =====================================================
 * HTML ELEMENTS
 * =====================================================
 *
 * Element lookups are performed INSIDE each helper, not cached
 * at module load time. The sample browser injects the
 * .control-section markup after (or replaces it after) the TS
 * module is evaluated, so a reference captured at module
 * load would point to a detached node and the update would
 * silently no-op. Re-resolving by ID every call guarantees
 * we talk to the currently mounted DOM.
 */

const ELEMENT_IDS = {
    stockChart: 'stockChart',
    connectionStatus: 'connection-status',
    candleStatus: 'candle-status',
    openValue: 'open-value',
    highValue: 'high-value',
    lowValue: 'low-value',
    closeValue: 'close-value',
    volumeValue: 'volume-value'
} as const;

/*
 * =====================================================
 * DISPLAY HELPERS
 * =====================================================
 */

function setElementValue(elementId: string, value: string): void {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function updateConnectionStatus(message: string, statusClass: string): void {
    const element: HTMLElement | null = document.getElementById(ELEMENT_IDS.connectionStatus);
    if (!element) {
        return;
    }
    element.textContent = message;
    element.className = 'connection-status ' + statusClass;
}

function formatPrice(value: number): string {
    if (!isFinite(value)) {
        return '—';
    }
    return Number(value).toFixed(2);
}

function formatVolume(value: number): string {
    if (!isFinite(value)) {
        return '—';
    }
    return Number(value).toFixed(4);
}

function updateMarketValues(candle: any, status: string): void {
    if (!candle) {
        return;
    }
    setElementValue(ELEMENT_IDS.openValue, formatPrice(candle.open));
    setElementValue(ELEMENT_IDS.highValue, formatPrice(candle.high));
    setElementValue(ELEMENT_IDS.lowValue, formatPrice(candle.low));
    setElementValue(ELEMENT_IDS.closeValue, formatPrice(candle.close));
    setElementValue(ELEMENT_IDS.volumeValue, formatVolume(candle.volume));
    setElementValue(ELEMENT_IDS.candleStatus, status);
}

/**
 * Round a number to 4 decimal places.
 */
function correctFloat(value: number): number {
    return Number(value.toFixed(4));
}

/**
 * Random number between min and max.
 */
function randomBetween(minimum: number, maximum: number): number {
    return minimum + Math.random() * (maximum - minimum);
}

/**
 * The timestamp (ms) representing the start of the current minute.
 */
function getCurrentMinute(): number {
    return Math.floor(Date.now() / ONE_MINUTE_MS) * ONE_MINUTE_MS;
}

/**
 * Build a single historical OHLCV candle.
 */
function createHistoricalCandle(timestamp: number, openingPrice: number): object {
    const movement: number = randomBetween(-1.5, 1.5);
    const close: number = correctFloat(Math.max(1, openingPrice + movement));
    const high: number = correctFloat(
        Math.max(openingPrice, close) + randomBetween(0.05, 0.7)
    );
    const low: number = correctFloat(
        Math.max(1, Math.min(openingPrice, close) - randomBetween(0.05, 0.7))
    );
    return {
        x: new Date(timestamp),
        open: correctFloat(openingPrice),
        high: high,
        low: low,
        close: close,
        volume: correctFloat(randomBetween(1, 30))
    };
}

/**
 * Populate `stockData` with `INITIAL_CANDLE_COUNT` historical candles.
 * This replaces the typical "fetch every minute from an API" flow
 * with a deterministic local array.
 */
function createInitialLocalData(): void {
    const currentMinute: number = getCurrentMinute();
    const startingTime: number = currentMinute - (INITIAL_CANDLE_COUNT - 1) * ONE_MINUTE_MS;
    let price: number = INITIAL_PRICE;
    stockData = [];
    for (let index: number = 0; index < INITIAL_CANDLE_COUNT; index++) {
        const timestamp: number = startingTime + index * ONE_MINUTE_MS;
        const candle: object = createHistoricalCandle(timestamp, price);
        stockData.push(candle);
        price = candle['close'];
    }
}

/**
 * Resolve the underlying Candle series that supports setData / addPoint.
 * Tries the StockChart series first, then falls back to the inner Chart.
 *
 * Returns null if the StockChart has been destroyed (i.e. the sample
 * browser navigated away and fired our 'destroy' cleanup). The
 * interval is stopped in that handler, so this is just a safety
 * check before the call sites dereference the series.
 */
function getCandleSeries(): any {
    if (!stockChart || (stockChart as any).isDestroyed) {
        return null;
    }
    const stockChartAny: any = stockChart as any;
    if (
        stockChartAny.series && stockChartAny.series.length &&
        typeof stockChartAny.series[0].setData === 'function' &&
        typeof stockChartAny.series[0].addPoint === 'function'
    ) {
        return stockChartAny.series[0];
    }
    if (
        stockChartAny.chart && stockChartAny.chart.series &&
        stockChartAny.chart.series.length &&
        typeof stockChartAny.chart.series[0].setData === 'function' &&
        typeof stockChartAny.chart.series[0].addPoint === 'function'
    ) {
        return stockChartAny.chart.series[0];
    }
    return null;
}

/**
 * Build an updated version of the current (in-progress) candle.
 * Open price is preserved; close/high/low/volume are re-randomized.
 */
function createUpdatedCandle(currentCandle: any): object {
    const movement: number = correctFloat((Math.random() - 0.5) * PRICE_MOVEMENT_MULTIPLIER);
    const newClose: number = correctFloat(Math.max(1, currentCandle.close + movement));
    return {
        x: currentCandle.x,
        open: currentCandle.open,
        high: correctFloat(Math.max(currentCandle.high, newClose)),
        low: correctFloat(Math.min(currentCandle.low, newClose)),
        close: newClose,
        volume: correctFloat(currentCandle.volume + randomBetween(0.01, 0.3))
    };
}

/**
 * Build the next one-minute candle, opening at the previous close.
 */
function createNewCandle(previousCandle: any): object {
    const openingPrice: number = previousCandle.close;
    return {
        x: new Date(previousCandle.x.getTime() + ONE_MINUTE_MS),
        open: openingPrice,
        high: openingPrice,
        low: openingPrice,
        close: openingPrice,
        volume: correctFloat(randomBetween(0.1, 1))
    };
}

/**
 * Same timestamp as the last candle -> update the current candle.
 * ============================================================
 * >>> series.setData() is called here to replace the last point <<<
 * ============================================================
 */
function updateCurrentPoint(candle: object): void {
    const series: any = getCandleSeries();
    if (!series) {
        return;
    }
    series.setData(candle, UPDATE_ANIMATION_DURATION);
}

/**
 * New timestamp (one minute later) -> append a new candle.
 * ===========================================================
 * >>> series.addPoint() is called here to append a new point <<<
 * ===========================================================
 */
function addNewPoint(candle: object): void {
    const series: any = getCandleSeries();
    if (!series) {
        return;
    }
    series.addPoint(candle, ADD_ANIMATION_DURATION);
}

/**
 * Decide whether the current tick should update the existing candle
 * or append a new one, then call the appropriate series method.
 */
function processDynamicUpdate(): void {
    if (!stockData.length) {
        return;
    }
    const lastIndex: number = stockData.length - 1;
    const currentCandle: any = stockData[lastIndex];
    const shouldAddNewCandle: boolean =
        updateIndex > 0 && updateIndex % UPDATES_PER_CANDLE === 0;

    if (shouldAddNewCandle) {
        const newCandle: object = createNewCandle(currentCandle);
        stockData.push(newCandle);
        addNewPoint(newCandle);
        updateMarketValues(newCandle as any, 'New simulated one-minute candle');
    } else {
        const updatedCandle: object = createUpdatedCandle(currentCandle);
        stockData[lastIndex] = updatedCandle;
        updateCurrentPoint(updatedCandle);
        updateMarketValues(updatedCandle as any, 'Current candle updated');
    }
    updateIndex++;
}

/**
 * Stop the simulated "every minute" tick. Safe to call multiple times.
 */
function stopDynamicUpdates(): void {
    if (updateTimer !== null) {
        window.clearInterval(updateTimer);
        updateTimer = null;
    }
}

/**
 * Start the simulated "every minute" tick. For the demo this fires
 * every UPDATE_INTERVAL_MS milliseconds.
 *
 * Always clears any existing interval first: the sample browser
 * re-evaluates the sample's entry function when the user navigates
 * back to this sample, so without this guard we would stack multiple
 * setInterval calls and accelerate the chart's clock.
 */
function startDynamicUpdates(): void {
    stopDynamicUpdates();
    updateIndex = 0;
    updateTimer = window.setInterval(processDynamicUpdate, UPDATE_INTERVAL_MS);
}

/**
 * Sample for dynamic data in StockChart using a local array.
 */
(window as any).default = (): void => {
    loadCultureFiles();
    createInitialLocalData();

    updateConnectionStatus('Local data ready', 'connected');
    updateMarketValues(
        (stockData.length ? stockData[stockData.length - 1] : null) as any,
        stockData.length ? 'Local data loaded' : 'No local data available'
    );

    stockChart = new StockChart({
        width: '100%',
        height: '100%',
        title: 'Real-Time Stock Market Data',
        chartArea: { border: { width: 0 } },
        primaryXAxis: {
            valueType: 'DateTime',
            intervalType: 'Auto',
            labelFormat: 'HH:mm',
            lineStyle: { color: 'transparent' },
            crosshairTooltip: { enable: false }
        },
        primaryYAxis: {
            labelPosition: 'Outside',
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', height: 0 },
            crosshairTooltip: { enable: false }
        },
        crosshair: { enable: false },
        tooltip: { enable: false },
        series: [
            {
                dataSource: stockData,
                type: 'Candle',
                xName: 'x',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                volume: 'volume',
                name: 'Local dynamic data',
                bullFillColor: '#90EE90',
                bearFillColor: '#FF7F7F',
                enableSolidCandles: true,
                border: { width: 1 },
                animation: { enable: false },
                lastValueLabel: {
                    enable: true,
                    background: '#FF7F7F',
                    dashArray: '3,2',
                    lineWidth: 0.5,
                    font: { color: '#ffffff', size: '11px' }
                }
            }
        ],
        seriesType: [],
        indicatorType: [],
        trendlineType: [],
        periods: [
            { text: '15m', interval: 15, intervalType: 'Minutes' },
            { text: '1h', interval: 1, intervalType: 'Hours', selected: true },
            { text: 'All' }
        ],
        enableCustomRange: false,
        load: (args: IStockChartEventArgs) => {
            loadStockChartTheme(args);
        },
        loaded: () => {
            startDynamicUpdates();
        }
    });
    stopDynamicUpdates();

    stockChart.appendTo('#stockChart');

    window.addEventListener('beforeunload', () => {
        stopDynamicUpdates();
    });

    // The sample browser does NOT fire 'beforeunload' when the user
    // navigates from this sample to another one. Hook the StockChart's
    // own 'destroy' event instead - the framework fires it as soon as
    // the host element is detached (or destroy() is called explicitly),
    // which is exactly the lifecycle signal React's useEffect cleanup
    // gives us. Stopping the timer here means no stale setData() call
    // can ever reach a destroyed series.
    stockChart.addEventListener('destroy', () => {
        stopDynamicUpdates();
        stockChart = null;
    });
};
