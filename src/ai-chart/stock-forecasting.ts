import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DateTime, LineSeries, CandleSeries, HiloOpenCloseSeries, Legend, 
    Tooltip, StripLine, ChartSeriesType, StripLineSettingsModel, ILoadedEventArgs} from '@syncfusion/ej2-charts';

import { Button } from '@syncfusion/ej2-buttons';

import { DropDownList } from '@syncfusion/ej2-dropdowns';

import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { loadChartTheme } from '../chart/theme-color';

import { getAIResponse } from '../common/ai-service';
import { stockForecastSystemPrompt } from './promptResponseData';

Chart.Inject(DateTime, LineSeries, CandleSeries, HiloOpenCloseSeries, Legend, Tooltip, StripLine);

interface StockData {
    date: Date;
    high: number;
    low: number;
    open: number;
    close: number;
}

interface SymbolItem {
    text: string;
    iconCss: string;
    id: string;
}

(window as any).default = (): void => {
    loadCultureFiles();

    let chart: any;
    let chartData: StockData[] = [];

    let selectedSymbol: string = 'MSFT';
    let selectedRange: number = 3;
    let selectedSeriesType: ChartSeriesType = 'Candle';
    let baseDataLength: number = 0;
    let isInitialRender: boolean = true;

    const symbols: SymbolItem[] = [
        { text: 'MSFT', iconCss: 'e-logo-msft', id: 'MSFT' },
        { text: 'GOOG', iconCss: 'e-logo-goog', id: 'GOOG' },
        { text: 'AMZN', iconCss: 'e-logo-amzn', id: 'AMZN' },
        { text: 'TSLA', iconCss: 'e-logo-tsla', id: 'TSLA' }
    ];

    const seriesOptions: string[] = [
        'Candle',
        'Line',
        'HiloOpenClose'
    ];

    // ---------------------------------------------
    // Helper methods
    // ---------------------------------------------

    function showSpinnerById(id: string): void {
        const el = document.getElementById(id);

        if (el) {
            el.classList.add('visible');
        }
    }

    function hideSpinnerById(id: string): void {
        const el = document.getElementById(id);

        if (el) {
            el.classList.remove('visible');
        }
    }

    function getChartStateSnapshot() {
        return {
            primaryXAxis: {
                valueType: 'DateTime',
                edgeLabelPlacement: 'Shift',
                labelFormat: 'MMM d',
                majorGridLines: { width: 0 },
                stripLines: [] as StripLineSettingsModel
            },
            primaryYAxis: {
                title: 'Price (USD)',
                labelFormat: 'n0',
                rangePadding: 'None'
            },
            legendSettings: {
                visible: false
            },
            chartArea: {
                border: { width: 0 }
            },
            title: 'Stock Forecasting',
            subTitle: 'AI-powered candlestick/OHLC forecasting (35 days)',
            selectedSymbol,
            selectedRange,
            series: [{
                type: selectedSeriesType,
                xName: 'date',
                yName: 'close',
                high: 'high',
                low: 'low',
                open: 'open',
                close: 'close'
            }]
        };
    }

    function generatePrompt(lastN: StockData[]): string {

        const lastDate =
            lastN[lastN.length - 1]
                ? lastN[lastN.length - 1].date
                : new Date();

        const startDate = new Date(lastDate);

        startDate.setDate(
            startDate.getDate() + 1
        );

        let prompt =
            "Generate 35 realistic financial data points suitable for candlestick, OHLC, and line charts in ':' format.\n" +
            "Use the following format: yyyy-MM-dd: High: Low: Open: Close\n" +
            "Start from " +
            startDate.toISOString().slice(0, 10) +
            " and increment by 1 day for each row.\n";

        lastN.forEach((item: StockData) => {

            const iso =
                new Date(item.date)
                    .toISOString()
                    .slice(0, 10);

            prompt +=
                iso +
                ': ' +
                item.high +
                ', ' +
                item.low +
                ', ' +
                item.open +
                ', ' +
                item.close +
                '\n';
        });

        prompt +=
            '\n### STRICT OUTPUT REQUIREMENTS ###\n' +
            '- Generate EXACTLY 35 rows.\n' +
            '- Format: yyyy-MM-dd:High:Low:Open:Close\n' +
            '- Mix upward/downward trends; no missing/duplicate dates; no extra text.\n' +
            '- Values must be realistic and follow stock behavior.\n';

        return prompt;
    }

    function filterByMonths(
        all: StockData[],
        months: number
    ): StockData[] {

        if (!all.length) {
            return [];
        }

        const latest = all.reduce((a, b) =>
            new Date(a.date) > new Date(b.date) ? a : b
        );

        const cutoff = new Date(latest.date);

        cutoff.setMonth(
            cutoff.getMonth() - months + 1
        );

        return all
            .filter((p: StockData) =>
                new Date(p.date) >= cutoff
            )
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() -
                    new Date(b.date).getTime()
            );
    }

    function showForecastStripLine(
        current: StockData[]
    ): void {

        if (
            !current ||
            !current.length ||
            current.length <= baseDataLength
        ) {
            if (chart?.primaryXAxis) {
                chart.primaryXAxis.stripLines = [];
                chart.refresh();
            }
            return;
        }

        const start = current[baseDataLength].date;
        const end = current[current.length - 1].date;

        if (chart?.primaryXAxis) {
            chart.primaryXAxis.stripLines = [
                {
                    start,
                    end,
                    visible: true,
                    color: '#E0E0E0',
                    opacity: 0.5,
                    zIndex: 'Behind'
                }
            ];

            chart.refresh();
        }
    }

    function getSelectedIconClass(): string {

        switch (selectedSymbol) {
            case 'MSFT':
                return 'e-logo-msft';

            case 'GOOG':
                return 'e-logo-goog';

            case 'AMZN':
                return 'e-logo-amzn';

            case 'TSLA':
                return 'e-logo-tsla';

            default:
                return 'default-icon';
        }
    }

    // ---------------------------------------------
    // Create chart
    // ---------------------------------------------

    chart = new Chart({
        title: 'Stock Forecasting',
        subTitle: 'AI-powered candlestick/OHLC forecasting (35 days)',

        chartArea: {
            border: {
                width: 0
            }
        },

        primaryXAxis: {
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            labelFormat: 'MMM d',
            majorGridLines: {
                width: 0
            },
            stripLines: []
        },

        primaryYAxis: {
            title: 'Price (USD)',
            labelFormat: 'n0',
            rangePadding: 'None'
        },

        legendSettings: {
            visible: false
        },

        tooltip: {
            enable: true,
            shared: true,
            header: ''
        },

        height: '520',

        series: [{
            dataSource: chartData,
            type: selectedSeriesType,
            xName: 'date',
            yName: 'close',
            high: 'high',
            low: 'low',
            open: 'open',
            close: 'close',
            name: 'Price'
        }],
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });

    chart.appendTo('#stock-chart');

    // ---------------------------------------------
    // Refresh control: animate only on initial render
    // ---------------------------------------------

    const originalRefresh: any = chart.refresh.bind(chart);

    chart.refresh = function (...args: any[]): void {
        // After the initial rendering is done, every refresh
        // (symbol / range / series-type change, AI forecast,
        // strip line update) must render without animation.
        if (!isInitialRender && chart?.series && chart.series[0]) {
            chart.series[0].animation = { enable: false };
        }
        originalRefresh(...args);
    };

    // ---------------------------------------------
    // Symbol selector
    // ---------------------------------------------

    const stockSelector = new DropDownButton({
        content: selectedSymbol,
        items: symbols,

        iconCss: getSelectedIconClass(),

        select: (args: any) => {

            const id =
                (args.item &&
                    (args.item.id || args.item.text)) ||
                'MSFT';

            selectedSymbol = id;

            stockSelector.content = id;
            stockSelector.iconCss =
                getSelectedIconClass();

            loadChartData(
                id,
                selectedRange
            );
        },

        cssClass: 'e-primary'
    });

    stockSelector.appendTo('#stock-selector');

    // ---------------------------------------------
    // Range buttons
    // ---------------------------------------------

    function filterDataByMonths(
        months: number
    ): void {

        selectedRange = months;

        loadChartData(
            selectedSymbol,
            months
        );
    }

    const btn3m = new Button({});
    btn3m.appendTo('#btn3m');
    btn3m.element.addEventListener('click', () =>
        filterDataByMonths(3)
    );

    const btn6m = new Button({});
    btn6m.appendTo('#btn6m');
    btn6m.element.addEventListener('click', () =>
        filterDataByMonths(6)
    );

    const btn12m = new Button({});
    btn12m.appendTo('#btn12m');
    btn12m.element.addEventListener('click', () =>
        filterDataByMonths(12)
    );

    // ---------------------------------------------
    // Series type dropdown
    // ---------------------------------------------

    const seriesDropdown =
        new DropDownList({

            dataSource: seriesOptions,

            placeholder: 'Select Chart Type',

            value: selectedSeriesType,

            change: (e: any) => {

                const newType =
                    (e && e.value) ||
                    selectedSeriesType;

                selectedSeriesType = newType;

                if (
                    chart?.series &&
                    chart.series[0]
                ) {
                    chart.series[0].type =
                        newType;

                    chart.refresh();
                }
            },

            width: '150px',

            cssClass: 'ddl-range'
        });

    seriesDropdown.appendTo('#series-type');

    // ---------------------------------------------
    // Data loader
    // ---------------------------------------------

    async function loadChartData(
        symbol: string,
        months: number
    ): Promise<void> {

        try {

            const response = await fetch(
                `https://cdn.syncfusion.com/blazor/data/chart/${symbol.toLowerCase()}-data.json`
            );

            const raw = await response.json();

            const all: StockData[] = (raw || []).map(
                (item: any) => ({
                    date: new Date(item.Date || item.date),
                    high: Number(item.High || item.high),
                    low: Number(item.Low || item.low),
                    open: Number(item.Open || item.open),
                    close: Number(item.Close || item.close)
                })
            );

            chartData =
                filterByMonths(
                    all,
                    months
                );

            baseDataLength =
                chartData.length;

            chart.series[0].dataSource =
                chartData;

            chart.series[0].type =
                selectedSeriesType;

            if (chart.primaryXAxis) {
                chart.primaryXAxis.stripLines = [];
            }

            chart.refresh();

            // The very first render is now complete, so all
            // subsequent refreshes skip the series animation.
            isInitialRender = false;

        } catch (e) {

            console.error(
                'Failed to load chart data',
                e
            );

            chartData = [];
            baseDataLength = 0;

            if (
                chart?.series &&
                chart.series[0]
            ) {
                chart.series[0].dataSource = [];
                chart.refresh();
            }
        }
    }

    const forecastBtn = new Button({
        cssClass: 'chart-action-button',
        isPrimary: true,
        iconCss:'e-icons e-ai-chat'
    });

    forecastBtn.appendTo('#forecastBtn');

    forecastBtn.element.addEventListener('click', processForecast);

    loadChartData(selectedSymbol, selectedRange);

    // ---------------------------------------------
    // AI Forecast
    // ---------------------------------------------

    function parseForecastPoints(text: string, original: StockData[]): StockData[] {

        const lines: string[] =
            text.split('\n')
                .filter((line: string) => line.trim().length);

        const out: StockData[] = [];

        for (const line of lines) {

            const [stamp, highStr, lowStr, openStr, closeStr] =
                line.split(':').map((p: string) => p.trim());

            if (!stamp || !highStr || !lowStr || !openStr || !closeStr) {
                continue;
            }

            const [y, M, d] =
                stamp.split('-').map((n: string) => parseInt(n, 10));

            const date: Date = new Date(y, M - 1, d);

            const high: number = parseFloat(highStr);
            const low: number = parseFloat(lowStr);
            const open: number = parseFloat(openStr);
            const close: number = parseFloat(closeStr);

            if ([high, low, open, close].some((v: number) => Number.isNaN(v))) {
                continue;
            }

            out.push({ date, high, low, open, close });
        }

        return [...original, ...out];
    }

    async function processForecast(): Promise<void> {

        showSpinnerById('chartSpinner');

        try {

            const beforeLen =
                chartData.length;

            const last10 =
                chartData.slice(
                    Math.max(
                        chartData.length - 10,
                        0
                    )
                );

            const prompt =
                generatePrompt(last10);

            const reply: any = await getAIResponse({
                prompt: prompt,
                systemPrompt:
                    stockForecastSystemPrompt +
                    ' Current chart state: ' + JSON.stringify(getChartStateSnapshot())
            }, new AbortController());

            const raw: string | undefined =
                (reply && (reply.response || reply)) as any;

            if (raw) {

                const cleanedText: string =
                    raw.indexOf('```') >= 0
                        ? raw.split('```')[1].trim()
                        : raw.trim();

                const newData: StockData[] =
                    parseForecastPoints(cleanedText, chartData);

                if (
                    newData.length &&
                    newData.length > beforeLen
                ) {

                    chartData = newData;

                    chart.series[0].dataSource =
                        chartData;

                    baseDataLength =
                        beforeLen;

                    chart.refresh();

                    showForecastStripLine(
                        newData
                    );
                }
            }

        } catch (e) {

            console.error(
                'processForecast:',
                e
            );

        } finally {

            hideSpinnerById(
                'chartSpinner'
            );
        }
    }
}