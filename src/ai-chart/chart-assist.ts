import { loadCultureFiles } from '../common/culture-loader';
import { Workbook } from '@syncfusion/ej2-excel-export';
import {
    AccumulationAnnotation,
    AccumulationChart,
    AccumulationDataLabel,
    AccumulationHighlight,
    AccumulationLegend,
    AccumulationSelection,
    AccumulationTooltip,
    AccumulationDistributionIndicator,
    AreaSeries,
    AtrIndicator,
    BarSeries,
    BoxAndWhiskerSeries,
    BollingerBands,
    BubbleSeries,
    CandleSeries,
    Category,
    Chart,
    ChartAnnotation,
    ColumnSeries,
    Crosshair,
    DataLabel,
    DateTime,
    DateTimeCategory,
    EmaIndicator,
    ErrorBar,
    Export,
    FunnelSeries,
    Highlight,
    HiloOpenCloseSeries,
    HiloSeries,
    HistogramSeries,
    Legend,
    LineSeries,
    Logarithmic,
    MacdIndicator,
    MomentumIndicator,
    MultiColoredAreaSeries,
    MultiColoredLineSeries,
    ParetoSeries,
    PieSeries,
    PolarSeries,
    PyramidSeries,
    RadarSeries,
    RangeAreaSeries,
    RangeColumnSeries,
    ScatterSeries,
    RsiIndicator,
    ScrollBar,
    Selection,
    SmaIndicator,
    SplineAreaSeries,
    SplineRangeAreaSeries,
    SplineSeries,
    StackingAreaSeries,
    StackingBarSeries,
    StackingColumnSeries,
    StackingLineSeries,
    StackingStepAreaSeries,
    StepAreaSeries,
    StepLineSeries,
    StochasticIndicator,
    StripLine,
    TmaIndicator,
    Tooltip,
    Trendlines,
    WaterfallSeries,
    Zoom
} from '@syncfusion/ej2-charts';
import {
    AIAssistView,
    PromptRequestEventArgs,
    ToolbarItemClickedEventArgs
} from '@syncfusion/ej2-interactive-chat';
import { getAIResponse } from '../common/ai-service';
import { chartSuggestions, chartSystemPrompt } from './promptResponseData';

Chart.Inject(
    LineSeries,
    ColumnSeries,
    BarSeries,
    AreaSeries,
    SplineSeries,
    StepLineSeries,
    StepAreaSeries,
    SplineAreaSeries,
    MultiColoredLineSeries,
    MultiColoredAreaSeries,
    RangeColumnSeries,
    RangeAreaSeries,
    SplineRangeAreaSeries,
    HiloSeries,
    HiloOpenCloseSeries,
    CandleSeries,
    BoxAndWhiskerSeries,
    BubbleSeries,
    ScatterSeries,
    StackingColumnSeries,
    StackingBarSeries,
    StackingAreaSeries,
    StackingLineSeries,
    StackingStepAreaSeries,
    ParetoSeries,
    PolarSeries,
    RadarSeries,
    WaterfallSeries,
    HistogramSeries,
    Category,
    DateTime,
    DateTimeCategory,
    Logarithmic,
    Legend,
    Tooltip,
    DataLabel,
    ChartAnnotation,
    StripLine,
    Zoom,
    ScrollBar,
    Crosshair,
    Selection,
    Highlight,
    Export,
    ErrorBar,
    Trendlines,
    EmaIndicator,
    RsiIndicator,
    BollingerBands,
    TmaIndicator,
    MomentumIndicator,
    SmaIndicator,
    AtrIndicator,
    AccumulationDistributionIndicator,
    MacdIndicator,
    StochasticIndicator
);

AccumulationChart.Inject(
    PieSeries,
    FunnelSeries,
    PyramidSeries,
    AccumulationLegend,
    AccumulationTooltip,
    AccumulationDataLabel,
    AccumulationAnnotation,
    AccumulationSelection,
    AccumulationHighlight,
    Export
);

type UnknownConfig = Record<string, any>;
type ChartExportType = 'PDF' | 'PNG' | 'JPEG' | 'SVG' | 'XLSX' | 'CSV';
type ChartRequestType = 'create' | 'modify' | 'code';

interface ChartDataPoint extends UnknownConfig {
    xvalue: string | number | Date;
    yvalue: number;
}

interface SessionMessage {
    id: string;
    prompt: string;
    payload: ChartResponse;
    createdAt: Date;
}

interface HistorySession {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: SessionMessage[];
}

interface AxisConfig extends UnknownConfig {
    title?: string;
    type?: string;
    valueType?: string;
    labelRotation?: number;
    min?: number;
    max?: number;
    minimum?: number;
    maximum?: number;
    majorGridLines?: UnknownConfig;
    minorGridLines?: UnknownConfig;
    majorTickLines?: UnknownConfig;
    minorTickLines?: UnknownConfig;
    lineStyle?: UnknownConfig;
    crosshairTooltip?: UnknownConfig;
    stripLines?: UnknownConfig[];
}

interface SeriesConfig extends UnknownConfig {
    name?: string;
    type?: string;
    fill?: string;
    width?: number;
    dataSource?: ChartDataPoint[];
    marker?: UnknownConfig;
    dataLabel?: UnknownConfig;
    errorBar?: UnknownConfig;
    trendlines?: UnknownConfig[];
    animation?: UnknownConfig;
}

interface ChartConfig extends UnknownConfig {
    title?: string;
    chartType?: string;
    showLegend?: boolean;
    xAxis?: AxisConfig[];
    yAxis?: AxisConfig[];
    series?: SeriesConfig[];
    tooltip?: UnknownConfig;
    crosshair?: UnknownConfig;
    zoomSettings?: UnknownConfig;
    selectionMode?: string;
    highlightMode?: string;
    annotations?: UnknownConfig[];
    legendSettings?: UnknownConfig;
    chartArea?: UnknownConfig;
    indicators?: UnknownConfig[];
}

interface ChartResponse {
    CHART?: boolean;
    Text?: string;
    Code?: string;
    ChangedCode?: string;
    CodeTitle?: string;
    CodeDescription?: string;
    ShowCode?: boolean;
    ChangeSummary?: string[];
    ChartConfig?: ChartConfig;
}

interface CodeToolView {
    id: 'changes' | 'complete';
    title: string;
    description: string;
    language: string;
    code: string;
}

interface CodeToolConfig {
    code?: string;
    language?: string;
    title?: string;
    description?: string;
    activeView?: 'changes' | 'complete';
    views?: CodeToolView[];
}

interface ChartExportRequest {
    isExport: boolean;
    type: ChartExportType;
}

interface ChartChange {
    property: string;
    previousValue: string;
    updatedValue: string;
}

interface SeriesTypeRule {
    keywords: string[];
    type: string;
}

interface StripLineRequest {
    axis: 'xAxis' | 'yAxis';
    start: string | number;
    size: number;
    color: string;
    opacity: number;
    text?: string;
    end?: string | number;
    isCategoryRange?: boolean;
}

const palette: string[] = [
    '#1089E9', '#08CDAA', '#F58400', '#9656FF', '#F9C200', '#F954A3', '#05BB3D', '#06B1E2', '#FF4E4E'
];

// Chart public APIs mapping for AI assistance
const chartPublicAPIs = {
    properties: [
        'width', 'height', 'title', 'dataSource', 'theme', 'selectionMode', 'highlightMode',
        'enableExport', 'enableAnimation', 'enableCanvas', 'isTransposed', 'background',
        'primaryXAxis', 'primaryYAxis', 'series', 'annotations', 'legendSettings', 'tooltip',
        'crosshair', 'zoomSettings', 'palettes', 'indicators', 'chartArea', 'margin', 'border'
    ],
    methods: [
        'export', 'print', 'addSeries', 'removeSeries', 'clearSeries', 'addAxes', 'removeAxis',
        'showTooltip', 'hideTooltip', 'refreshLiveData', 'setAnnotationValue', 'animate'
    ],
    events: [
        'loaded', 'resized', 'chartMouseClick', 'pointClick', 'chartMouseMove', 'pointMove',
        'chartMouseDown', 'chartMouseUp', 'chartMouseLeave', 'chartDoubleClick', 'pointDoubleClick',
        'tooltipRender', 'legendRender', 'axisLabelRender', 'seriesRender', 'pointRender'
    ]
};

(window as any).default = (): void => {
    loadCultureFiles();
    const historyStorageKey: string = 'ai-chart-history-sessions';



    function saveHistorySessions(sessions: HistorySession[]): void {
        try {
            sessionStorage.setItem(historyStorageKey, JSON.stringify(sessions));
        } catch (error) {
            console.error('Unable to save chart history sessions:', error);
        }
    }

    function loadHistorySessions(): HistorySession[] {
        const storedHistory: string | null = sessionStorage.getItem(historyStorageKey);

        if (!storedHistory) {
            return [];
        }

        try {
            const parsedSessions: HistorySession[] = JSON.parse(storedHistory) as HistorySession[];

            if (!Array.isArray(parsedSessions)) {
                return [];
            }

            return parsedSessions.map((session: HistorySession) => ({
                ...session,
                createdAt: new Date(session.createdAt),
                updatedAt: new Date(session.updatedAt),
                messages: Array.isArray(session.messages)
                    ? session.messages.map((message: SessionMessage) => ({
                        ...message,
                        createdAt: new Date(message.createdAt)
                    }))
                    : []
            }));
        } catch (error) {
            console.error('Unable to load chart history sessions:', error);
            sessionStorage.removeItem(historyStorageKey);
            return [];
        }
    }

    function createId(prefix: string): string {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }

    function createHistorySession(): HistorySession {
        const now: Date = new Date();

        return {
            id: createId('session'),
            title: 'New Chart Session',
            createdAt: now,
            updatedAt: now,
            messages: []
        };
    }

    let historySessions: HistorySession[] = loadHistorySessions();
    let currentSession: HistorySession = createHistorySession();
    let selectedSessionId: string | null = null;
    let showHistory: boolean = false;
    let promptSuggestions: string[] = chartSuggestions.slice();
    let aiAssist: AIAssistView | null = null;
    let requestController: AbortController | null = null;
    let activeChart: Chart | AccumulationChart | null = null;
    let currentChartConfig: ChartConfig | null = null;

    const renderedCharts: Map<HTMLElement, Chart | AccumulationChart> = new Map();
    let chartPreviewId: number = 0;
    let latestChartRenderSequence: number = 0;

    function cloneChartConfig(config: ChartConfig): ChartConfig {
        return JSON.parse(JSON.stringify(config)) as ChartConfig;
    }

    function mapAxisType(type?: string): string {
        switch ((type || 'category').toLowerCase()) {
            case 'numerical':
            case 'number':
            case 'double':
                return 'Double';
            case 'datetime':
            case 'date':
                return 'DateTime';
            case 'datetimecategory':
            case 'datetime-category':
                return 'DateTimeCategory';
            case 'logarithmic':
            case 'log':
                return 'Logarithmic';
            default:
                return 'Category';
        }
    }

    function mapSeriesType(type?: string): string {
        const normalizedType: string = (type || 'column').toLowerCase().replace(/[\s-]/g, '');
        const types: Record<string, string> = {
            line: 'Line', column: 'Column', bar: 'Bar', area: 'Area', spline: 'Spline', stepline: 'StepLine', steparea: 'StepArea',
            splinearea: 'SplineArea', multicoloredline: 'MultiColoredLine', multicoloredarea: 'MultiColoredArea',
            rangecolumn: 'RangeColumn', rangearea: 'RangeArea', splinerangearea: 'SplineRangeArea', hilo: 'Hilo',
            hiloopenclose: 'HiloOpenClose', candle: 'Candle', candlestick: 'Candle', boxandwhisker: 'BoxAndWhisker', bubble: 'Bubble',
            scatter: 'Scatter', stackingcolumn: 'StackingColumn', stackedcolumn: 'StackingColumn', stackingcolumn100: 'StackingColumn100',
            stackedcolumn100: 'StackingColumn100', stackingbar: 'StackingBar', stackedbar: 'StackingBar', stackingbar100: 'StackingBar100',
            stackedbar100: 'StackingBar100', stackingarea: 'StackingArea', stackedarea: 'StackingArea', stackingarea100: 'StackingArea100',
            stackedarea100: 'StackingArea100', stackingline: 'StackingLine', stackedline: 'StackingLine', stackingline100: 'StackingLine100',
            stackedline100: 'StackingLine100', stackingsteparea: 'StackingStepArea', pareto: 'Pareto', polar: 'Polar', radar: 'Radar',
            waterfall: 'Waterfall', histogram: 'Histogram'
        };

        return types[normalizedType] || 'Column';
    }

    function mapAccumulationSeriesType(type?: string): string {
        switch ((type || 'pie').toLowerCase()) {
            case 'funnel':
                return 'Funnel';
            case 'pyramid':
                return 'Pyramid';
            default:
                return 'Pie';
        }
    }

    function isCircularSeriesType(type?: string): boolean {
        return ['pie', 'doughnut', 'donut', 'funnel', 'pyramid'].includes((type || '').toLowerCase());
    }

    function destroyChartInContainer(container: HTMLElement): void {
        const existingChart: Chart | AccumulationChart | undefined = renderedCharts.get(container);

        if (existingChart && !existingChart.isDestroyed) {
            existingChart.destroy();
        }

        renderedCharts.delete(container);

        if (activeChart === existingChart) {
            activeChart = null;
        }

        container.innerHTML = '';
    }

    function destroyAllCharts(): void {
        latestChartRenderSequence += 1;

        renderedCharts.forEach((chart: Chart | AccumulationChart): void => {
            if (!chart.isDestroyed) {
                chart.destroy();
            }
        });

        renderedCharts.clear();
        activeChart = null;
    }


    function normalizeAxis(axis: AxisConfig, fallbackTitle: string, fallbackType: string): UnknownConfig {
        const { type, min, max, ...properties } = axis;

        return {
            ...properties,
            title: axis.title || fallbackTitle,
            valueType: mapAxisType(axis.valueType || type || fallbackType),
            minimum: typeof axis.minimum === 'number' ? axis.minimum : typeof min === 'number' ? min : null,
            maximum: typeof axis.maximum === 'number' ? axis.maximum : typeof max === 'number' ? max : null
        };
    }

    function getAdditionalChartProperties(config: ChartConfig): UnknownConfig {
        const { title, chartType, showLegend, xAxis, yAxis, series, legendSettings, ...additionalProperties } = config;
        return additionalProperties;
    }

    function getCartesianSeries(config: ChartConfig): UnknownConfig[] {
        return (config.series || []).map((item: SeriesConfig, index: number) => ({
            ...item,
            type: mapSeriesType(item.type),
            name: item.name,
            dataSource: item.dataSource || [],
            xName: item.xName || 'xvalue',
            yName: item.yName || 'yvalue',
            fill: item.fill || palette[index % palette.length],
            marker: item.marker || { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }
        }));
    }

    function getCurrentChartTheme(): string {
        const classes: string = `${document.documentElement.className} ${document.body.className}`.toLowerCase();
        const hashTheme: string = location.hash.toLowerCase();
        const themeSource: string = `${classes} ${hashTheme}`;
        if (themeSource.includes('highcontrast') || themeSource.includes('high-contrast')) return 'HighContrast';
        if (themeSource.includes('fluent2-dark')) return 'Fluent2Dark';
        if (themeSource.includes('fluent-dark')) return 'FluentDark';
        if (themeSource.includes('material3-dark')) return 'Material3Dark';
        if (themeSource.includes('bootstrap5.3-dark') || themeSource.includes('bootstrap5-dark')) return 'Bootstrap5Dark';
        if (themeSource.includes('tailwind3-dark')) return 'Tailwind3Dark';
        if (themeSource.includes('tailwind-dark')) return 'TailwindDark';
        if (themeSource.includes('dark')) return 'Material3Dark';
        if (themeSource.includes('fluent2')) return 'Fluent2';
        if (themeSource.includes('fluent')) return 'Fluent';
        if (themeSource.includes('bootstrap5')) return 'Bootstrap5';
        if (themeSource.includes('tailwind3')) return 'Tailwind3';
        if (themeSource.includes('tailwind')) return 'Tailwind';
        return 'Material3';
    }

    function buildCartesianChart(container: HTMLElement, config: ChartConfig): void {
        const xAxis: AxisConfig = config.xAxis?.[0] || {};
        const yAxis: AxisConfig = config.yAxis?.[0] || {};
        const primaryXAxis: UnknownConfig = normalizeAxis(xAxis, 'Categories', 'category');
        const primaryYAxis: UnknownConfig = normalizeAxis(yAxis, 'Values', 'numerical');

        primaryXAxis.stripLines = (xAxis.stripLines || []).map((stripLine: UnknownConfig) => ({
            ...stripLine
        }));

        primaryYAxis.stripLines = (yAxis.stripLines || []).map((stripLine: UnknownConfig) => ({
            ...stripLine
        }));

        const annotations: UnknownConfig[] = (config.annotations || []).map((annotation: UnknownConfig) => ({
            ...annotation,
            content: typeof annotation.content === 'string'
                ? decodeHtmlEntities(annotation.content)
                : annotation.content
        }));

        const indicators: UnknownConfig[] = (config.indicators || []).map((indicator: UnknownConfig) => {
            const sourceSeries: SeriesConfig | undefined = config.series?.find(
                (series: SeriesConfig) => series.name === indicator.seriesName
            ) || config.series?.[0];

            return {
                ...indicator,
                seriesName: sourceSeries?.name,
                dataSource: indicator.dataSource || sourceSeries?.dataSource || [],
                xName: indicator.xName || sourceSeries?.xName || 'xvalue',
                close: indicator.close || sourceSeries?.yName || 'yvalue',
                period: indicator.period || 14
            };
        });

        const chart: Chart = new Chart({
            ...getAdditionalChartProperties(config),
            theme: getCurrentChartTheme() as any,
            title: config.title || 'Chart',
            chartArea: config.chartArea || {
                border: {
                    width: 0.5
                }
            },
            primaryXAxis,
            primaryYAxis,
            tooltip: config.tooltip || {
                enable: true
            },
            crosshair: config.crosshair,
            zoomSettings: config.zoomSettings,
            selectionMode: config.selectionMode as any,
            highlightMode: config.highlightMode as any,
            annotations: annotations as any,
            indicators: indicators as any,
            legendSettings: {
                ...(config.legendSettings || {}),
                visible: config.showLegend !== false
            },
            series: getCartesianSeries(config) as any
        } as any);

        chart.appendTo(container);
        renderedCharts.set(container, chart);
        schedulePreviewChartRefresh(chart, container);
    }

    function buildAccumulationChart(container: HTMLElement, config: ChartConfig): void {
        const annotations: UnknownConfig[] = (config.annotations || []).map((annotation: UnknownConfig) => ({
            ...annotation,
            content: typeof annotation.content === 'string'
                ? decodeHtmlEntities(annotation.content)
                : annotation.content
        }));

        const chart: AccumulationChart = new AccumulationChart({
            ...getAdditionalChartProperties(config),
            theme: getCurrentChartTheme() as any,
            title: config.title || 'Chart',
            tooltip: config.tooltip || {
                enable: true
            },
            legendSettings: {
                ...(config.legendSettings || {}),
                visible: config.showLegend !== false
            },
            annotations: annotations as any,
            series: (config.series || []).map((item: SeriesConfig) => ({
                ...item,
                type: mapAccumulationSeriesType(item.type),
                name: item.name,
                dataSource: item.dataSource || [],
                xName: item.xName || 'xvalue',
                yName: item.yName || 'yvalue',
                innerRadius: item.innerRadius ||
                    (['doughnut', 'donut'].includes((item.type || '').toLowerCase()) ? '70%' : '0%')
            })) as any
        } as any);

        chart.appendTo(container);
        renderedCharts.set(container, chart);
        schedulePreviewChartRefresh(chart, container);
    }

    function schedulePreviewChartRefresh(
        chart: Chart | AccumulationChart,
        container: HTMLElement
    ): void {
        window.requestAnimationFrame((): void => {
            window.requestAnimationFrame((): void => {
                const renderedChart: Chart | AccumulationChart | undefined = renderedCharts.get(container);

                if (
                    renderedChart === chart &&
                    container.isConnected &&
                    !chart.isDestroyed
                ) {
                    chart.refresh();
                }
            });
        });
    }

    function assignUniqueChartContainerId(container: HTMLElement): void {
        chartPreviewId += 1;
        container.id = `ai-chart-preview-${Date.now()}-${chartPreviewId}`;
    }

    function renderChartWhenReady(container: HTMLElement, config: ChartConfig): void {
        let attempt: number = 0;
        const maximumAttempts: number = 30;
        const renderSequence: number = ++latestChartRenderSequence;

        const render: () => void = (): void => {
            attempt += 1;

            if (container.isConnected && container.clientWidth > 0 && container.clientHeight > 0) {
                buildChart(container, config);

                const renderedChart: Chart | AccumulationChart | undefined = renderedCharts.get(container);

                if (renderSequence === latestChartRenderSequence && renderedChart && !renderedChart.isDestroyed) {
                    activeChart = renderedChart;
                    currentChartConfig = cloneChartConfig(config);
                }

                return;
            }

            if (attempt < maximumAttempts) {
                window.requestAnimationFrame(render);
            }
        };

        window.requestAnimationFrame(render);
    }

    function refreshRestoredCharts(): void {
        renderedCharts.forEach((chart: Chart | AccumulationChart, container: HTMLElement): void => {
            if (container.isConnected && container.clientWidth > 0 && container.clientHeight > 0 && !chart.isDestroyed) {
                chart.refresh();
            }
        });
    }

    function setLatestRestoredChartAsActive(): void {
        const charts: Array<[HTMLElement, Chart | AccumulationChart]> = Array.from(renderedCharts.entries());
        const latestEntry: [HTMLElement, Chart | AccumulationChart] | undefined = charts[charts.length - 1];

        if (latestEntry && !latestEntry[1].isDestroyed) {
            activeChart = latestEntry[1];
        }
    }

    function buildChart(container: HTMLElement, config: ChartConfig): void {
        destroyChartInContainer(container);
        assignUniqueChartContainerId(container);

        if (config.chartType === 'circular') {
            buildAccumulationChart(container, config);
        } else {
            buildCartesianChart(container, config);
        }
    }

    function getChartConfigFromResponse(data: any): any {
        if (!data) {
            return null;
        }

        if (data.ChartConfig || data.chartConfig) {
            return data.ChartConfig || data.chartConfig;
        }

        if (data.props && data.properties) {
            return { ...data.props, ...data.properties, series: data.properties.series || data.props.series };
        }

        if (data.props?.properties) {
            return { ...data.props, ...data.props.properties, series: data.props.properties.series };
        }

        if (Array.isArray(data.blocks)) {
            const block: any = data.blocks.find((item: any) => item?.blockType === 'tool' && item?.toolName === 'chart-tool');
            return block?.props?.ChartConfig || block?.props?.chartConfig || block?.props || null;
        }

        if (data.properties?.series) {
            return { ...data, ...data.properties, series: data.properties.series };
        }

        return Array.isArray(data.series) ? data : null;
    }

    function normalizeDataSource(dataSource: any): ChartDataPoint[] {
        if (!Array.isArray(dataSource)) {
            return [];
        }

        return dataSource.reduce((points: ChartDataPoint[], point: any) => {
            const xvalue: unknown = point?.xvalue ?? point?.xValue ?? point?.x ?? point?.category ?? point?.label;
            const rawYValue: unknown = point?.yvalue ?? point?.yValue ?? point?.y ?? point?.value;
            const yvalue: number = typeof rawYValue === 'number' ? rawYValue : Number(rawYValue);

            if (xvalue !== undefined && xvalue !== null && Number.isFinite(yvalue)) {
                points.push({ ...point, xvalue: xvalue as string | number | Date, yvalue });
            }

            return points;
        }, []);
    }

    function normalizeSeries(series: any[]): SeriesConfig[] {
        if (!Array.isArray(series)) {
            return [];
        }

        return series.reduce((result: SeriesConfig[], item: any, index: number) => {
            const dataSource: ChartDataPoint[] = normalizeDataSource(item?.dataSource ?? item?.data ?? item?.points);

            if (dataSource.length) {
                result.push({ ...item, name: item?.name || `Series ${index + 1}`, type: item?.type || 'column', dataSource });
            }

            return result;
        }, []);
    }

    function normalizeConfig(data: any): ChartConfig | null {
        const responseConfig: any = getChartConfigFromResponse(data);

        if (!responseConfig) {
            return null;
        }

        const series: SeriesConfig[] = normalizeSeries(responseConfig.series || []);

        if (!series.length) {
            return null;
        }

        const requestedChartType: string = String(responseConfig.chartType || '').toLowerCase();
        const chartType: string = requestedChartType === 'circular' || requestedChartType === 'cartesian'
            ? requestedChartType
            : series.some((item: SeriesConfig) => isCircularSeriesType(item.type)) ? 'circular' : 'cartesian';
        const config: ChartConfig = {
            ...responseConfig,
            title: responseConfig.title || data?.Text || data?.text || 'Generated Chart',
            chartType,
            showLegend: responseConfig.showLegend !== false,
            tooltip: responseConfig.tooltip || { enable: true },
            series
        };

        if (chartType === 'cartesian') {
            config.xAxis = Array.isArray(responseConfig.xAxis) && responseConfig.xAxis.length
                ? responseConfig.xAxis
                : [{ type: 'category', title: 'Categories' }];
            config.yAxis = Array.isArray(responseConfig.yAxis) && responseConfig.yAxis.length
                ? responseConfig.yAxis
                : [{ type: 'numerical', title: 'Values' }];
        }

        return config;
    }

    function normalizeChartPrompt(prompt: string): string {
        return prompt.toLowerCase().replace(/\bstipline\b/g, 'stripline').replace(/\bstrip\s+line\b/g, 'stripline')
            .replace(/\bpriod\b|\bperod\b/g, 'period').replace(/\bx[\s_-]*axis\b/g, 'x-axis').replace(/\by[\s_-]*axis\b/g, 'y-axis')
            .replace(/\s+/g, ' ').trim();
    }

    function isStripLineRequest(prompt: string): boolean {
        return /\bstripline\b/.test(normalizeChartPrompt(prompt));
    }

    function getRequestedSeriesType(prompt: string): string | undefined {
        const text: string = normalizeChartPrompt(prompt);
        if (isStripLineRequest(text)) return undefined;
        const rules: SeriesTypeRule[] = [
            { keywords: ['100% stacked column', 'stacking column 100'], type: 'StackingColumn100' },
            { keywords: ['stacked column', 'stacking column'], type: 'StackingColumn' },
            { keywords: ['100% stacked bar', 'stacking bar 100'], type: 'StackingBar100' },
            { keywords: ['stacked bar', 'stacking bar'], type: 'StackingBar' },
            { keywords: ['100% stacked area', 'stacking area 100'], type: 'StackingArea100' },
            { keywords: ['stacked area', 'stacking area'], type: 'StackingArea' },
            { keywords: ['100% stacked line', 'stacking line 100'], type: 'StackingLine100' },
            { keywords: ['stacked line', 'stacking line'], type: 'StackingLine' },
            { keywords: ['doughnut', 'donut'], type: 'Doughnut' }, { keywords: ['funnel'], type: 'Funnel' },
            { keywords: ['pyramid'], type: 'Pyramid' }, { keywords: ['pie'], type: 'Pie' },
            { keywords: ['spline'], type: 'Spline' }, { keywords: ['column'], type: 'Column' },
            { keywords: ['bar'], type: 'Bar' }, { keywords: ['area'], type: 'Area' }, { keywords: ['line'], type: 'Line' }
        ];
        return rules.find((rule: SeriesTypeRule) => rule.keywords.some((keyword: string) => text.includes(keyword)))?.type;
    }

    function getRequestedIndicatorType(prompt: string): string | undefined {
        const text: string = prompt.toLowerCase();
        const rules: Array<{ keywords: string[]; type: string }> = [
            { keywords: ['bollinger band', 'bollinger'], type: 'BollingerBands' },
            { keywords: ['accumulation distribution', 'ad indicator'], type: 'AccumulationDistribution' },
            { keywords: ['stochastic'], type: 'Stochastic' },
            { keywords: ['momentum'], type: 'Momentum' },
            { keywords: ['macd'], type: 'Macd' },
            { keywords: ['atr', 'average true range'], type: 'Atr' },
            { keywords: ['rsi', 'relative strength index'], type: 'Rsi' },
            { keywords: ['ema', 'exponential moving average'], type: 'Ema' },
            { keywords: ['tma', 'triangular moving average'], type: 'Tma' },
            { keywords: ['sma', 'simple moving average'], type: 'Sma' }
        ];

        return rules.find((rule: { keywords: string[]; type: string }) =>
            rule.keywords.some((keyword: string) => text.includes(keyword))
        )?.type;
    }

    function isGenericIndicatorRequest(prompt: string): boolean {
        return /\bindicator\b/i.test(prompt) && !getRequestedIndicatorType(prompt);
    }

    function getIndicatorClarificationMessage(): string {
        return [
            'Please specify the indicator type to add.',
            'Supported indicators include SMA, EMA, TMA, RSI, ATR, MACD, Momentum, Stochastic, Bollinger Bands, and Accumulation Distribution.',
            'For example: "Add an SMA indicator with period 3."'
        ].join(' ');
    }

    function addIndicator(config: ChartConfig, prompt: string): ChartConfig | null {
        const text: string = normalizeChartPrompt(prompt);
        const indicatorType: string | undefined = getRequestedIndicatorType(text);
        const sourceSeries: SeriesConfig | undefined = config.series?.[0];
        if (!indicatorType || !sourceSeries || config.chartType === 'circular') return null;

        const updated: ChartConfig = cloneChartConfig(config);
        const periodMatch: RegExpMatchArray | null = text.match(/\bperiod\s*(?:=|:|of|to|as)?\s*(\d+)\b/i);
        const indicator: UnknownConfig = {
            type: indicatorType,
            seriesName: sourceSeries.name,
            dataSource: sourceSeries.dataSource || [],
            xName: sourceSeries.xName || 'xvalue',
            close: sourceSeries.close || sourceSeries.yName || 'yvalue',
            period: periodMatch ? Math.max(Number(periodMatch[1]), 1) : 14,
            fill: '#6063ff',
            width: 2
        };
        const duplicateIndex: number = (updated.indicators || []).findIndex(
            (existing: UnknownConfig) => existing.type === indicator.type && existing.seriesName === indicator.seriesName
        );
        if (duplicateIndex === -1) updated.indicators = [...(updated.indicators || []), indicator];
        else updated.indicators![duplicateIndex] = { ...updated.indicators![duplicateIndex], ...indicator };
        return updated;
    }

    function updateIndicatorPeriod(config: ChartConfig, prompt: string): ChartConfig | null {
        if (!config.indicators?.length) return null;
        const match: RegExpMatchArray | null = normalizeChartPrompt(prompt).match(/\bperiod\s*(?:as|to|=|:)?\s*(\d+)\b/i);
        if (!match) return null;
        const updated: ChartConfig = cloneChartConfig(config);
        const index: number = updated.indicators!.length - 1;
        updated.indicators![index] = { ...updated.indicators![index], period: Math.max(Number(match[1]), 1) };
        return updated;
    }

    function isSeriesTypeConversionRequest(prompt: string): boolean {
        return Boolean(getRequestedSeriesType(prompt)) && /\b(change|convert|make|set|update)\b/i.test(prompt) &&
            /\b(chart|series|type|to|as|into|it|this)\b/i.test(prompt);
    }

    function convertSeriesType(config: ChartConfig, requestedType: string): ChartConfig {
        const updated: ChartConfig = cloneChartConfig(config);
        const circular: boolean = isCircularSeriesType(requestedType);
        updated.chartType = circular ? 'circular' : 'cartesian';
        updated.series = updated.series?.map((series: SeriesConfig) => ({ ...series, type: requestedType }));

        if (circular) {
            delete updated.xAxis;
            delete updated.yAxis;
            delete updated.indicators;
        }

        return updated;
    }

    function decodeHtmlEntities(value: string): string {
        return value
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');
    }

    function normalizeAnnotationCategory(value: unknown): string {
        return String(value ?? '').trim().toLowerCase().replace(/[._-]+/g, ' ').replace(/([a-z])\s+(\d)/g, '$1$2')
            .replace(/(\d)\s+([a-z])/g, '$1$2').replace(/\s+/g, ' ');
    }

    function resolveAnnotationCategory(config: ChartConfig, requestedValue: string): string | number | Date {
        const point: ChartDataPoint | undefined = config.series?.flatMap((series: SeriesConfig) => series.dataSource || []).find(
            (item: ChartDataPoint) => normalizeAnnotationCategory(item.xvalue) === normalizeAnnotationCategory(requestedValue)
        );
        return point?.xvalue || requestedValue;
    }

    function parseAnnotationRequest(prompt: string, config: ChartConfig): { content?: string; x?: string | number | Date; y?: number } {
        const text: string = normalizeChartPrompt(prompt);
        const result: { content?: string; x?: string | number | Date; y?: number } = {};
        const naturalMatch: RegExpMatchArray | null = text.match(
            /\bannotation\s+(?:as|text\s+(?:as|to)|content\s+(?:as|to))\s+["']?(.+?)["']?\s+(?:in|at|on)\s+["']?(.+?)["']?\s+(?:and|,|at|y|value)\s*(-?\d+(?:\.\d+)?)\s*$/i
        );
        if (naturalMatch) {
            result.content = `<div class="chart-annotation">${escapeHtml(naturalMatch[1].trim())}</div>`;
            result.x = resolveAnnotationCategory(config, naturalMatch[2].trim());
            result.y = Number(naturalMatch[3]);
            return result;
        }
        const xMatch: RegExpMatchArray | null = text.match(
            /\b(?:annotation\s+)?x\s*(?:as|to|=|:)\s*["']?(.+?)["']?(?=\s+(?:and\s+)?(?:y|text|content)\b|$)/i
        );
        const yMatch: RegExpMatchArray | null = text.match(/\b(?:annotation\s+)?(?:y|value)\s*(?:as|to|=|:)\s*(-?\d+(?:\.\d+)?)/i);
        const contentMatch: RegExpMatchArray | null = prompt.match(
            /\b(?:annotation\s+)?(?:text|content|label)\s*(?:as|to|=|:)\s*["']?(.+?)["']?(?=\s+(?:and\s+)?(?:x|y|at|value)\b|$)/i
        );
        if (xMatch?.[1]) result.x = resolveAnnotationCategory(config, xMatch[1].trim());
        if (yMatch?.[1]) result.y = Number(yMatch[1]);
        if (contentMatch?.[1]) result.content = `<div class="chart-annotation">${escapeHtml(decodeHtmlEntities(contentMatch[1].trim()))}</div>`;
        return result;
    }

    function addAnnotation(config: ChartConfig, prompt: string): ChartConfig {
        const updated: ChartConfig = cloneChartConfig(config);
        const firstPoint: ChartDataPoint | undefined = updated.series?.[0]?.dataSource?.[0];
        const request: { content?: string; x?: string | number | Date; y?: number } = parseAnnotationRequest(prompt, updated);
        updated.annotations = [...(updated.annotations || []), {
            content: request.content || '<div class="chart-annotation">Annotation</div>',
            coordinateUnits: 'Point', region: 'Chart', x: request.x ?? firstPoint?.xvalue ?? 0, y: request.y ?? firstPoint?.yvalue ?? 0
        }];
        return updated;
    }

    function updateExistingAnnotation(config: ChartConfig, prompt: string): ChartConfig | null {
        if (!config.annotations?.length) return null;
        const updated: ChartConfig = cloneChartConfig(config);
        const request: { content?: string; x?: string | number | Date; y?: number } = parseAnnotationRequest(prompt, updated);
        if (request.content === undefined && request.x === undefined && request.y === undefined) return null;
        const index: number = updated.annotations!.length - 1;
        const annotation: UnknownConfig = { ...updated.annotations![index] };
        if (request.content !== undefined) annotation.content = request.content;
        else if (typeof annotation.content === 'string') annotation.content = decodeHtmlEntities(annotation.content);
        if (request.x !== undefined) annotation.x = request.x;
        if (request.y !== undefined) annotation.y = request.y;
        updated.annotations![index] = annotation;
        return updated;
    }

    function addDataPoint(config: ChartConfig, prompt: string): ChartConfig | null {
        const patterns: RegExp[] = [
            /\b(?:add|insert|append|include)\s+["']?(.+?)["']?\s+(?:with\s+)?(?:a\s+)?value\s+(?:of\s+)?(-?\d+(?:\.\d+)?)\b/i,
            /\b(?:add|insert|append|include)\s+["']?(.+?)["']?\s*(?:=|:)\s*(-?\d+(?:\.\d+)?)\b/i,
            /\b(?:add|insert|append|include)\s+["']?([a-z][a-z0-9 ._-]*?)["']?\s+(-?\d+(?:\.\d+)?)\b/i
        ];
        let match: RegExpMatchArray | null = null;
        for (const pattern of patterns) {
            match = prompt.match(pattern);
            if (match) {
                break;
            }
        }
        if (!match || !config.series?.length) {
            return null;
        }
        const category: string = match[1].trim();
        const value: number = Number(match[2]);
        if (!category || !Number.isFinite(value)) {
            return null;
        }
        const updated: ChartConfig = cloneChartConfig(config);
        const series: SeriesConfig = updated.series![0];
        const existingPoint: ChartDataPoint | undefined = (series.dataSource || []).find((point: ChartDataPoint) =>
            normalizeCategoryValue(point.xvalue) === normalizeCategoryValue(category)
        );
        if (existingPoint) {
            existingPoint.yvalue = value;
        } else {
            series.dataSource = [...(series.dataSource || []), { xvalue: category, yvalue: value }];
        }
        return updated;
    }
    function getDataAdditionClarification(prompt: string): string | null {
        const text: string = normalizeChartPrompt(prompt);
        const countMatch: RegExpMatchArray | null = text.match(
            /\badd\s+(\d+)\s+(?:data|datas|points?|datapoints?|data points?)\b/
        );
        if (countMatch) {
            return `Please provide the categories and values for the ${countMatch[1]} new data points. ` +
                'For example: "Add July 10500, August 11200, and September 11800."';
        }
        if (/\b(add|append|insert|include)\b/.test(text) &&
            /\b(data|datas|point|points|datapoint|datapoints|data point|data points)\b/.test(text) &&
            !/-?\d+(?:\.\d+)?/.test(text)) {
            return 'Please specify the category and value for the new data point. For example: "Add July with a value of 10500."';
        }
        return null;
    }
    function isIncompleteCreateRequest(prompt: string): boolean {
        return /^(create|generate|build|draw|make)$/i.test(prompt.trim());
    }
    function applyLocalChartModification(prompt: string, config: ChartConfig): ChartConfig | null {
        const text: string = normalizeChartPrompt(prompt);
        const updated: ChartConfig = cloneChartConfig(config);
        const enabling: boolean = /\b(add|show|enable|apply|create|insert)\b/.test(text);
        const disabling: boolean = /\b(remove|hide|disable|delete|clear)\b/.test(text);
        const editing: boolean = /\b(change|update|modify|set|replace|edit)\b/.test(text);

        // Handle chart dimension properties
        const sizeMatch = text.match(/\b(width|height)\s+(?:to\s+)?(\d+(?:px|%|em|rem)?)\b/i);
        if (sizeMatch) {
            const dimension = sizeMatch[1].toLowerCase() as 'width' | 'height';
            updated[dimension] = sizeMatch[2];
            return updated;
        }

        // Handle chart theme
        const themeMatch = text.match(/\b(theme|set.*theme)\s+(material|fabric|bootstrap|highcontrast|tailwind|fluent)\b/i);
        if (themeMatch) {
            updated.theme = themeMatch[2].charAt(0).toUpperCase() + themeMatch[2].slice(1).toLowerCase() as any;
            return updated;
        }

        // Handle background color
        const bgMatch = text.match(/\b(background|bgcolor|background color)\s+(.*)$/i);
        if (bgMatch) {
            updated.background = bgMatch[2].trim();
            return updated;
        }

        // Handle title
        const titleMatch = text.match(/\b(title)\s+(.*)$/i);
        if (titleMatch && !text.includes('axis')) {
            updated.title = titleMatch[2].trim();
            return updated;
        }

        // Handle subtitle
        const subTitleMatch = text.match(/\bsubtitle\s+(.*)$/i);
        if (subTitleMatch) {
            updated.subTitle = subTitleMatch[1].trim();
            return updated;
        }

        // Handle border
        const borderMatch = text.match(/\b(border)\s+(.*)$/i);
        if (borderMatch) {
            const borderParts = borderMatch[2].trim().split(/\s+/);
            const borderWidth = parseFloat(borderParts.find(part => /^\d+px$/.test(part)) || '1px');
            const borderColor = borderParts.find(part => /^#[0-9a-fA-F]{6}$|^rgb\(|^rgba\(|^[a-zA-Z]+$/.test(part)) || '#000000';
            
            updated.border = {
                ...(updated.border || {}),
                width: borderWidth,
                color: borderColor
            };
            return updated;
        }

        // Handle margin
        const marginMatch = text.match(/\bmargin\s+(-?\d+(?:\.\d+)?)\b/i);
        if (marginMatch) {
            const marginValue = parseFloat(marginMatch[1]);
            updated.margin = {
                ...(updated.margin || {}),
                left: marginValue,
                right: marginValue,
                top: marginValue,
                bottom: marginValue
            };
            return updated;
        }

        // Handle palette
        const paletteMatch = text.match(/\bpalette\s+(.*)$/i);
        if (paletteMatch && updated.series) {
            const colors = paletteMatch[1].split(/[,;]/).map(color => color.trim());
            if (colors.length > 0) {
                updated.palette = colors;
                // Apply colors to series
                updated.series = updated.series.map((series, index) => ({
                    ...series,
                    fill: colors[index % colors.length]
                }));
            }
            return updated;
        }

        // Handle axis properties
        if (text.includes('axis') && (config.xAxis || config.yAxis)) {
            // Handle axis title
            const axisTitleMatch = text.match(/\b(xaxis|yaxis).*title\s+(.*)$/i);
            if (axisTitleMatch) {
                const axisType = axisTitleMatch[1].toLowerCase() as 'xaxis' | 'yaxis';
                const title = axisTitleMatch[2].trim();
                
                if (axisType === 'xaxis' && updated.xAxis?.[0]) {
                    updated.xAxis[0].title = title;
                } else if (axisType === 'yaxis' && updated.yAxis?.[0]) {
                    updated.yAxis[0].title = title;
                }
                return updated;
            }
            
            // Handle axis label rotation
            const rotationMatch = text.match(/\b(xaxis|yaxis).*rotation\s+(-?\d+)/i);
            if (rotationMatch) {
                const axisType = rotationMatch[1].toLowerCase() as 'xaxis' | 'yaxis';
                const rotation = parseInt(rotationMatch[2]);
                
                if (axisType === 'xaxis' && updated.xAxis?.[0]) {
                    updated.xAxis[0].labelRotation = rotation;
                } else if (axisType === 'yaxis' && updated.yAxis?.[0]) {
                    updated.yAxis[0].labelRotation = rotation;
                }
                return updated;
            }
            
            // Handle axis range (min/max)
            const rangeMatch = text.match(/\b(xaxis|yaxis).*range\s+from\s+(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?)/i);
            if (rangeMatch) {
                const axisType = rangeMatch[1].toLowerCase() as 'xaxis' | 'yaxis';
                const min = parseFloat(rangeMatch[2]);
                const max = parseFloat(rangeMatch[3]);
                
                if (axisType === 'xaxis' && updated.xAxis?.[0]) {
                    updated.xAxis[0].minimum = min;
                    updated.xAxis[0].maximum = max;
                } else if (axisType === 'yaxis' && updated.yAxis?.[0]) {
                    updated.yAxis[0].minimum = min;
                    updated.yAxis[0].maximum = max;
                }
                return updated;
            }
            
            // Handle axis visibility
            if (text.includes('hide axis') || text.includes('show axis')) {
                const showAxis = text.includes('show axis');
                const axisTypeMatch = text.match(/\b(xaxis|yaxis)\b/i);
                
                if (axisTypeMatch) {
                    const axisType = axisTypeMatch[1].toLowerCase() as 'xaxis' | 'yaxis';
                    if (axisType === 'xaxis' && updated.xAxis?.[0]) {
                        updated.xAxis[0].visible = showAxis;
                    } else if (axisType === 'yaxis' && updated.yAxis?.[0]) {
                        updated.yAxis[0].visible = showAxis;
                    }
                } else {
                    // Apply to both axes if no specific axis mentioned
                    if (updated.xAxis?.[0]) {
                        updated.xAxis[0].visible = showAxis;
                    }
                    if (updated.yAxis?.[0]) {
                        updated.yAxis[0].visible = showAxis;
                    }
                }
                return updated;
            }
        }

        // Handle series properties
        if (text.includes('series') && updated.series) {
            // Handle series name
            const seriesNameMatch = text.match(/\bseries\s+(\d+)\s+name\s+(.*)$/i);
            if (seriesNameMatch && updated.series) {
                const seriesIndex = parseInt(seriesNameMatch[1]) - 1;
                const name = seriesNameMatch[2].trim();
                
                if (seriesIndex >= 0 && seriesIndex < updated.series.length) {
                    updated.series[seriesIndex].name = name;
                }
                return updated;
            }
            
            // Handle series color/fill
            const seriesFillMatch = text.match(/\bseries\s+(\d+)\s+(?:color|fill)\s+(.*)$/i);
            if (seriesFillMatch && updated.series) {
                const seriesIndex = parseInt(seriesFillMatch[1]) - 1;
                const fill = seriesFillMatch[2].trim();
                
                if (seriesIndex >= 0 && seriesIndex < updated.series.length) {
                    updated.series[seriesIndex].fill = fill;
                }
                return updated;
            }
            
            // Handle series width
            const seriesWidthMatch = text.match(/\bseries\s+(\d+)\s+width\s+(\d+(?:\.\d+)?)/i);
            if (seriesWidthMatch && updated.series) {
                const seriesIndex = parseInt(seriesWidthMatch[1]) - 1;
                const width = parseFloat(seriesWidthMatch[2]);
                
                if (seriesIndex >= 0 && seriesIndex < updated.series.length) {
                    updated.series[seriesIndex].width = width;
                }
                return updated;
            }
        }

        // Handle marker properties
        if (text.includes('marker')) {
            const markerSizeMatch = text.match(/\bmarker\s+size\s+(\d+(?:\.\d+)?)/i);
            if (markerSizeMatch && updated.series) {
                const size = parseFloat(markerSizeMatch[1]);
                updated.series = updated.series.map(series => ({
                    ...series,
                    marker: {
                        ...(series.marker || {}),
                        height: size,
                        width: size
                    }
                }));
                return updated;
            }
            
            const markerShapeMatch = text.match(/\bmarker\s+shape\s+(\w+)/i);
            if (markerShapeMatch && updated.series) {
                const shape = markerShapeMatch[1];
                updated.series = updated.series.map(series => ({
                    ...series,
                    marker: {
                        ...(series.marker || {}),
                        shape: shape
                    }
                }));
                return updated;
            }
        }

        // Handle scrollbar settings
        if (text.includes('scrollbar')) {
            if (!updated.zoomSettings) {
                updated.zoomSettings = {};
            }
            
            if (enabling) {
                updated.zoomSettings.enableScrollbarOnZooming = true;
            } else if (disabling) {
                updated.zoomSettings.enableScrollbarOnZooming = false;
            }
            return updated;
        }

        // Handle stack label settings
        if (text.includes('stack label') || text.includes('stacklabel')) {
            if (!updated.primaryYAxis) {
                updated.primaryYAxis = {};
            }
            
            if (!updated.primaryYAxis.stackLabelSettings) {
                updated.primaryYAxis.stackLabelSettings = {};
            }
            
            if (enabling) {
                updated.primaryYAxis.stackLabelSettings.visible = true;
            } else if (disabling) {
                updated.primaryYAxis.stackLabelSettings.visible = false;
            }
            return updated;
        }

        if (text.includes('legend') && (enabling || disabling)) {
            updated.showLegend = enabling;
            return updated;
        }

        if (text.includes('crosshair') && (enabling || disabling)) {
            updated.crosshair = {
                ...(updated.crosshair || {}),
                enable: enabling,
                lineType: updated.crosshair?.lineType || 'Both'
            };

            return updated;
        }

        if (text.includes('tooltip') && (enabling || disabling)) {
            updated.tooltip = {
                ...(updated.tooltip || {}),
                enable: enabling
            };

            return updated;
        }

        if ((text.includes('data label') || text.includes('datalabel')) && (enabling || disabling)) {
            updated.series = updated.series?.map((series: SeriesConfig) => updated.chartType === 'circular'
                ? {
                    ...series,
                    dataLabel: {
                        ...(series.dataLabel || {}),
                        visible: enabling
                    }
                }
                : {
                    ...series,
                    marker: {
                        ...(series.marker || {}),
                        dataLabel: {
                            ...(series.marker?.dataLabel || series.dataLabel || {}),
                            visible: enabling
                        }
                    }
                });

            return updated;
        }

        // Handle data label font properties
        if ((text.includes('data label') || text.includes('datalabel')) && text.includes('font')) {
            const fontSizeMatch = text.match(/\bfont\s*size\s*(\d+(?:\.\d+)?)(px|pt|em)?\b/i);
            const fontFamilyMatch = text.match(/\bfont\s*family\s*(['"]?)([^'"]+?)\1\b/i);
            const fontWeightMatch = text.match(/\bfont\s*weight\s*(\w+)\b/i);
            const fontStyleMatch = text.match(/\bfont\s*style\s*(\w+)\b/i);
            const fontColorMatch = text.match(/\bfont\s*color\s*(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/i);

            updated.series = updated.series?.map((series: SeriesConfig) => {
                const newDataLabel: UnknownConfig = {
                    ...(series.dataLabel || {}),
                    visible: series.dataLabel?.visible !== false // Keep visible if already set, otherwise default to true
                };

                // Handle font size
                if (fontSizeMatch) {
                    if (!newDataLabel.font) newDataLabel.font = {};
                    newDataLabel.font.size = `${fontSizeMatch[1]}${fontSizeMatch[2] || 'px'}`;
                }

                // Handle font family
                if (fontFamilyMatch) {
                    if (!newDataLabel.font) newDataLabel.font = {};
                    newDataLabel.font.family = fontFamilyMatch[2];
                }

                // Handle font weight
                if (fontWeightMatch) {
                    if (!newDataLabel.font) newDataLabel.font = {};
                    newDataLabel.font.weight = fontWeightMatch[1];
                }

                // Handle font style
                if (fontStyleMatch) {
                    if (!newDataLabel.font) newDataLabel.font = {};
                    newDataLabel.font.style = fontStyleMatch[1];
                }

                // Handle font color
                if (fontColorMatch) {
                    newDataLabel.fill = fontColorMatch[1];
                }

                if (updated.chartType === 'circular') {
                    return {
                        ...series,
                        dataLabel: newDataLabel
                    };
                } else {
                    return {
                        ...series,
                        marker: {
                            ...(series.marker || {}),
                            dataLabel: newDataLabel
                        }
                    };
                }
            });

            return updated;
        }

        if (text.includes('zoom') && (enabling || disabling)) {
            updated.zoomSettings = {
                ...(updated.zoomSettings || {}),
                enableSelectionZooming: enabling,
                enableMouseWheelZooming: enabling,
                enablePinchZooming: enabling,
                enablePan: enabling
            };

            return updated;
        }

        if (text.includes('selection') && (enabling || disabling)) {
            updated.selectionMode = enabling ? 'Point' : 'None';
            return updated;
        }

        if (text.includes('highlight') && (enabling || disabling)) {
            updated.highlightMode = enabling ? 'Point' : 'None';
            return updated;
        }

        if (text.includes('annotation') && disabling) {
            updated.annotations = [];
            return updated;
        }
        if (text.includes('annotation') && editing) {
            const changedAnnotation: ChartConfig | null = updateExistingAnnotation(updated, prompt);
            if (changedAnnotation) return changedAnnotation;
        }
        if (text.includes('annotation') && enabling) return addAnnotation(updated, prompt);

        if ((text.includes('stripline') || text.includes('strip line')) && disabling) {
            return removeStripLines(updated);
        }

        if ((text.includes('stripline') || text.includes('strip line')) && enabling) {
            return addStripLine(updated, prompt);
        }

        if (/\bperiod\b/.test(text) && editing) {
            const changedIndicator: ChartConfig | null = updateIndicatorPeriod(updated, text);
            if (changedIndicator) return changedIndicator;
        }
        if (getRequestedIndicatorType(prompt) && /\b(add|show|enable|apply)\b/i.test(prompt)) {
            return addIndicator(updated, prompt);
        }

        if (text.includes('indicator') && disabling) {
            updated.indicators = [];
            return updated;
        }

        const requestedSeriesType: string | undefined = getRequestedSeriesType(prompt);

        if (requestedSeriesType && isSeriesTypeConversionRequest(prompt)) {
            return convertSeriesType(updated, requestedSeriesType);
        }

        const addedDataPoint: ChartConfig | null = addDataPoint(updated, prompt);
        if (addedDataPoint) return addedDataPoint;
        const dataMatch: RegExpMatchArray | null = prompt.match(
            /(?:change|update|set|replace)\s+(.+?)\s+(?:to|as)\s+(-?\d+(?:\.\d+)?)/i
        );

        if (dataMatch) {
            const category: string = dataMatch[1].trim().toLowerCase();
            const value: number = Number(dataMatch[2]);
            let changed: boolean = false;

            updated.series?.forEach((series: SeriesConfig): void => {
                series.dataSource?.forEach((point: ChartDataPoint): void => {
                    if (String(point.xvalue).toLowerCase() === category) {
                        point.yvalue = value;
                        changed = true;
                    }
                });
            });

            return changed ? updated : null;
        }

        return null;
    }

    function applyRequestedSeriesType(config: ChartConfig, prompt: string): ChartConfig {
        const requestedType: string | undefined = getRequestedSeriesType(prompt);

        if (!requestedType || !config.series?.length) {
            return config;
        }

        const circular: boolean = isCircularSeriesType(requestedType);
        return {
            ...config,
            chartType: circular ? 'circular' : 'cartesian',
            xAxis: circular ? undefined : config.xAxis,
            yAxis: circular ? undefined : config.yAxis,
            series: config.series.map((series: SeriesConfig) => ({ ...series, type: requestedType }))
        };
    }

    function escapeHtml(value: unknown): string {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getAIResponseText(value: any): string {
        if (typeof value === 'string') {
            return value.trim();
        }
        if (!value || typeof value !== 'object') {
            return '';
        }
        if (value.response !== undefined) {
            return getAIResponseText(value.response);
        }
        if (value.data !== undefined) {
            return getAIResponseText(value.data);
        }
        if (value.result !== undefined) {
            return getAIResponseText(value.result);
        }
        if (typeof value.content === 'string') {
            return value.content.trim();
        }
        if (typeof value.text === 'string') {
            return value.text.trim();
        }
        if (Array.isArray(value.content)) {
            const content: string = value.content.map((item: any) =>
                typeof item === 'string' ? item : typeof item?.text === 'string' ? item.text : ''
            ).filter(Boolean).join('\n');
            if (content) {
                return content;
            }
        }
        if (Array.isArray(value.choices) && typeof value.choices[0]?.message?.content === 'string') {
            return value.choices[0].message.content.trim();
        }
        if (value.props || value.properties || value.ChartConfig || value.chartConfig || Array.isArray(value.blocks)) {
            return JSON.stringify(value);
        }
        return '';
    }
    function extractJson(value: string): string | undefined {
        const fenced: string | undefined = value.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]?.trim();

        if (fenced) {
            return fenced;
        }

        const firstBrace: number = value.indexOf('{');
        const lastBrace: number = value.lastIndexOf('}');
        return firstBrace !== -1 && lastBrace > firstBrace ? value.slice(firstBrace, lastBrace + 1).trim() : undefined;
    }

    function isCodeRequest(prompt: string): boolean {
        return ['show code', 'full code', 'typescript code', 'runnable code', 'show configuration', 'show config']
            .some((keyword: string) => prompt.toLowerCase().includes(keyword));
    }

    function isChartModificationRequest(prompt: string): boolean {
        if (!currentChartConfig) {
            return false;
        }
        return /\b(add|append|insert|include|show|enable|apply|remove|hide|disable|delete|clear|change|update|modify|replace|rename|set|convert|make|increase|decrease|rotate)\b/i.test(
            normalizeChartPrompt(prompt)
        );
    }
    function getNumericAxisRange(config: ChartConfig): { minimum: number; maximum: number } {
        const yAxis: AxisConfig = config.yAxis?.[0] || {};
        const values: number[] = [];

        config.series?.forEach((series: SeriesConfig): void => {
            series.dataSource?.forEach((point: ChartDataPoint): void => {
                if (Number.isFinite(point.yvalue)) {
                    values.push(point.yvalue);
                }
            });
        });

        const dataMinimum: number = values.length ? Math.min(...values) : 0;
        const dataMaximum: number = values.length ? Math.max(...values) : 100;

        const minimum: number = typeof yAxis.minimum === 'number'
            ? yAxis.minimum
            : typeof yAxis.min === 'number'
                ? yAxis.min
                : dataMinimum;

        const maximum: number = typeof yAxis.maximum === 'number'
            ? yAxis.maximum
            : typeof yAxis.max === 'number'
                ? yAxis.max
                : dataMaximum;

        if (minimum === maximum) {
            return {
                minimum: minimum - 1,
                maximum: maximum + 1
            };
        }

        return {
            minimum,
            maximum
        };
    }

    function getStripLineAxis(prompt: string): 'xAxis' | 'yAxis' {
        const normalizedPrompt: string = prompt
            .toLowerCase()
            .replace(/[_-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (/\b(xaxis|x axis|horizontal axis|category axis)\b/.test(normalizedPrompt)) {
            return 'xAxis';
        }

        if (/\b(yaxis|y axis|vertical axis|value axis|numeric axis|numerical axis)\b/.test(normalizedPrompt)) {
            return 'yAxis';
        }

        return 'yAxis';
    }

    function getStripLineText(prompt: string): string | undefined {
        const explicitLabelMatch: RegExpMatchArray | null = prompt.match(
            /(?:label|text|name)\s*(?:as|is|=|:)?\s*["']?(.+?)["']?(?=\s+(?:color|fill|opacity|on|x-axis|y-axis)\b|$)/i
        );

        if (explicitLabelMatch) {
            return explicitLabelMatch[1].trim();
        }

        const labelPatterns: Array<{ pattern: RegExp; text: string }> = [
            {
                pattern: /\bnormal\s+range\b/i,
                text: 'Normal Range'
            },
            {
                pattern: /\bcomfort\s+(?:zone|zoon)\b/i,
                text: 'Comfort Zone'
            },
            {
                pattern: /\bwarning\s+(?:range|zone)\b/i,
                text: 'Warning Range'
            },
            {
                pattern: /\bcritical\s+(?:range|zone)\b/i,
                text: 'Critical Range'
            },
            {
                pattern: /\bsafe\s+(?:range|zone)\b/i,
                text: 'Safe Range'
            },
            {
                pattern: /\bdanger\s+(?:range|zone)\b/i,
                text: 'Danger Range'
            },
            {
                pattern: /\btarget\s+(?:range|zone)\b/i,
                text: 'Target Range'
            }
        ];

        const matchingLabel: { pattern: RegExp; text: string } | undefined = labelPatterns.find(
            (label: { pattern: RegExp; text: string }) => label.pattern.test(prompt)
        );

        return matchingLabel?.text;
    }

    function getStripLineColor(prompt: string): string {
        const colorNames: string[] = [
            'red',
            'blue',
            'green',
            'yellow',
            'orange',
            'purple',
            'pink',
            'gray',
            'grey',
            'black',
            'white',
            'brown',
            'cyan',
            'magenta',
            'transparent'
        ];

        const colorPattern: string = colorNames.join('|');

        const hexMatch: RegExpMatchArray | null = prompt.match(/#[a-f0-9]{3,8}\b/i);

        if (hexMatch) {
            return hexMatch[0];
        }

        const namedColorMatch: RegExpMatchArray | null = prompt.match(
            new RegExp(`\\b(${colorPattern})\\b`, 'i')
        );

        return namedColorMatch?.[1]?.toLowerCase() || '#808080';
    }

    function getStripLineOpacity(prompt: string): number {
        const opacityMatch: RegExpMatchArray | null = prompt.match(
            /opacity\s*(?:as|is|=|:)?\s*(0(?:\.\d+)?|1(?:\.0+)?)/i
        );

        if (!opacityMatch) {
            return 0.25;
        }

        const opacity: number = Number(opacityMatch[1]);

        return Math.min(Math.max(opacity, 0), 1);
    }

    const monthAliases: Record<string, string> = {
        jan: 'jan',
        january: 'jan',
        feb: 'feb',
        february: 'feb',
        mar: 'mar',
        march: 'mar',
        apr: 'apr',
        april: 'apr',
        may: 'may',
        jun: 'jun',
        june: 'jun',
        jul: 'jul',
        july: 'jul',
        aug: 'aug',
        august: 'aug',
        sep: 'sep',
        sept: 'sep',
        september: 'sep',
        oct: 'oct',
        october: 'oct',
        nov: 'nov',
        november: 'nov',
        dec: 'dec',
        december: 'dec'
    };

    function normalizeCategoryValue(value: unknown): string {
        const normalizedValue: string = String(value ?? '')
            .trim()
            .toLowerCase()
            .replace(/[._-]+/g, ' ')
            .replace(/\s+/g, ' ');

        return monthAliases[normalizedValue] || normalizedValue;
    }

    function findCategoryIndex(categories: Array<string | number | Date>, requestedCategory: string): number {
        const normalizedRequestedCategory: string = normalizeCategoryValue(requestedCategory);

        return categories.findIndex(
            (category: string | number | Date) => normalizeCategoryValue(category) === normalizedRequestedCategory
        );
    }

    function getStripLineRange(
        prompt: string,
        config: ChartConfig,
        axis: 'xAxis' | 'yAxis'
    ): { start: string | number; size: number } {
        const numericalRangeMatch: RegExpMatchArray | null = prompt.match(
            /(?:from|between|in|range)?\s*(-?\d+(?:\.\d+)?)\s*(?:to|-|and)\s*(-?\d+(?:\.\d+)?)/i
        );

        if (numericalRangeMatch) {
            const firstValue: number = Number(numericalRangeMatch[1]);
            const secondValue: number = Number(numericalRangeMatch[2]);
            const start: number = Math.min(firstValue, secondValue);
            const end: number = Math.max(firstValue, secondValue);

            return {
                start,
                size: Math.max(end - start, 1)
            };
        }

        const numericalStartMatch: RegExpMatchArray | null = prompt.match(
            /(?:start(?:ing)?|from|at|in)\s*(?:value\s*)?(?:=|:)?\s*(-?\d+(?:\.\d+)?)/i
        );

        const explicitSizeMatch: RegExpMatchArray | null = prompt.match(
            /(?:size|width)\s*(?:=|:)?\s*(-?\d+(?:\.\d+)?)/i
        );

        if (numericalStartMatch) {
            const start: number = Number(numericalStartMatch[1]);

            if (explicitSizeMatch) {
                return {
                    start,
                    size: Math.max(Math.abs(Number(explicitSizeMatch[1])), 1)
                };
            }

            const numericRange: { minimum: number; maximum: number } = getNumericAxisRange(config);
            const axisSpan: number = Math.max(numericRange.maximum - numericRange.minimum, 1);

            return {
                start,
                size: Math.max(axisSpan * 0.1, 1)
            };
        }

        if (axis === 'xAxis') {
            const categories: Array<string | number | Date> = (config.series?.[0]?.dataSource || []).map(
                (point: ChartDataPoint) => point.xvalue
            );

            const categoryRangeMatch: RegExpMatchArray | null = prompt.match(
                /\b(?:from|between)\s+["']?(.+?)["']?\s+(?:to|and)\s+["']?(.+?)["']?(?=\s+(?:as|with|in|using|color|fill|opacity)\b|$)/i
            );

            if (categoryRangeMatch) {
                const requestedStart: string = categoryRangeMatch[1].trim();
                const requestedEnd: string = categoryRangeMatch[2].trim();
                const startIndex: number = findCategoryIndex(categories, requestedStart);
                const endIndex: number = findCategoryIndex(categories, requestedEnd);

                if (startIndex !== -1 && endIndex !== -1) {
                    const firstIndex: number = Math.min(startIndex, endIndex);
                    const lastIndex: number = Math.max(startIndex, endIndex);

                    return {
                        start: firstIndex - 0.5,
                        size: (lastIndex - firstIndex) + 1
                    };
                }
            }

            const singleCategoryMatch: RegExpMatchArray | null = prompt.match(
                /(?:at|from|on)\s+["']?(.+?)["']?(?=\s+(?:as|with|color|fill|opacity|size|width)\b|$)/i
            );

            if (singleCategoryMatch) {
                const categoryIndex: number = findCategoryIndex(categories, singleCategoryMatch[1]);

                if (categoryIndex !== -1) {
                    return {
                        start: categoryIndex - 0.5,
                        size: 1
                    };
                }
            }

            return {
                start: -0.5,
                size: explicitSizeMatch ? Math.max(Math.abs(Number(explicitSizeMatch[1])), 1) : 1
            };
        }

        const numericRange: { minimum: number; maximum: number } = getNumericAxisRange(config);
        const axisSpan: number = Math.max(numericRange.maximum - numericRange.minimum, 1);
        const defaultSize: number = Math.max(axisSpan * 0.2, 1);
        const defaultStart: number = numericRange.minimum + ((axisSpan - defaultSize) / 2);

        return {
            start: Number(defaultStart.toFixed(2)),
            size: Number(defaultSize.toFixed(2))
        };
    }

    function getStripLineRequest(prompt: string, config: ChartConfig): StripLineRequest {
        const axis: 'xAxis' | 'yAxis' = getStripLineAxis(prompt);
        const range: { start: string | number; size: number } = getStripLineRange(
            prompt,
            config,
            axis
        );

        return {
            axis,
            start: range.start,
            size: range.size,
            color: getStripLineColor(prompt),
            opacity: getStripLineOpacity(prompt),
            text: getStripLineText(prompt)
        };
    }

    function createStripLine(request: StripLineRequest): UnknownConfig {
        const stripLine: UnknownConfig = {
            start: request.start,
            size: request.size,
            color: request.color,
            opacity: request.opacity,
            visible: true,
            zIndex: 'Behind'
        };

        if (request.text) {
            stripLine.text = request.text;
            stripLine.horizontalAlignment = 'Middle';
            stripLine.verticalAlignment = 'Middle';
            stripLine.textStyle = {
                color: request.color,
                size: '12px',
                fontWeight: '600'
            };
        }

        return stripLine;
    }

    function isSameStripLine(first: UnknownConfig, second: UnknownConfig): boolean {
        const firstColor: string = String(first.color || '').trim().toLowerCase();
        const secondColor: string = String(second.color || '').trim().toLowerCase();
        const firstText: string = String(first.text || '').trim().toLowerCase();
        const secondText: string = String(second.text || '').trim().toLowerCase();

        return first.start === second.start &&
            first.size === second.size &&
            firstColor === secondColor &&
            first.opacity === second.opacity &&
            first.visible === second.visible &&
            first.zIndex === second.zIndex &&
            firstText === secondText;
    }

    function addStripLine(config: ChartConfig, prompt: string): ChartConfig {
        const updatedConfig: ChartConfig = cloneChartConfig(config);
        const request: StripLineRequest = getStripLineRequest(prompt, updatedConfig);
        const configuredAxes: AxisConfig[] | undefined = updatedConfig[request.axis];

        const axisCollection: AxisConfig[] = configuredAxes?.length
            ? JSON.parse(JSON.stringify(configuredAxes)) as AxisConfig[]
            : [{
                type: request.axis === 'xAxis' ? 'category' : 'numerical',
                title: request.axis === 'xAxis' ? 'Categories' : 'Values'
            }];

        const existingStripLines: UnknownConfig[] = axisCollection[0].stripLines || [];
        const stripLine: UnknownConfig = createStripLine(request);

        const duplicateExists: boolean = existingStripLines.some((existing: UnknownConfig) =>
            isSameStripLine(existing, stripLine)
        );

        axisCollection[0] = {
            ...axisCollection[0],
            stripLines: duplicateExists
                ? existingStripLines
                : [...existingStripLines, stripLine]
        };

        updatedConfig[request.axis] = axisCollection;

        return updatedConfig;
    }

    function removeStripLines(config: ChartConfig): ChartConfig {
        const updatedConfig: ChartConfig = cloneChartConfig(config);

        updatedConfig.xAxis = updatedConfig.xAxis?.map((axis: AxisConfig) => ({
            ...axis,
            stripLines: []
        }));

        updatedConfig.yAxis = updatedConfig.yAxis?.map((axis: AxisConfig) => ({
            ...axis,
            stripLines: []
        }));

        return updatedConfig;
    }

    function applyRequestedChartFeatures(prompt: string, config: ChartConfig): ChartConfig {
        const text: string = prompt.trim().toLowerCase();
        let updatedConfig: ChartConfig = cloneChartConfig(config);

        if (text.includes('stripline') || text.includes('strip line')) {
            updatedConfig = addStripLine(updatedConfig, prompt);
        }

        if (text.includes('crosshair')) {
            updatedConfig.crosshair = {
                ...(updatedConfig.crosshair || {}),
                enable: true,
                lineType: updatedConfig.crosshair?.lineType || 'Both'
            };
        }

        if (text.includes('tooltip')) {
            updatedConfig.tooltip = {
                ...(updatedConfig.tooltip || {}),
                enable: true
            };
        }

        if (text.includes('zoom')) {
            updatedConfig.zoomSettings = {
                ...(updatedConfig.zoomSettings || {}),
                enableSelectionZooming: true,
                enableMouseWheelZooming: true,
                enablePinchZooming: true,
                enablePan: true
            };
        }

        if (text.includes('selection')) {
            updatedConfig.selectionMode = 'Point';
        }

        if (text.includes('highlight')) {
            updatedConfig.highlightMode = 'Point';
        }

        if (text.includes('data label') || text.includes('datalabel')) {
            updatedConfig.series = updatedConfig.series?.map((series: SeriesConfig) => updatedConfig.chartType === 'circular'
                ? {
                    ...series,
                    dataLabel: {
                        ...(series.dataLabel || {}),
                        visible: true
                    }
                }
                : {
                    ...series,
                    marker: {
                        ...(series.marker || {}),
                        dataLabel: {
                            ...(series.marker?.dataLabel || series.dataLabel || {}),
                            visible: true
                        }
                    }
                });
        }

        if (text.includes('annotation') && !updatedConfig.annotations?.length) {
            const firstPoint: ChartDataPoint | undefined = updatedConfig.series?.[0]?.dataSource?.[0];

            updatedConfig.annotations = [{
                content: '<div class="chart-annotation">Annotation</div>',
                coordinateUnits: 'Point',
                region: 'Chart',
                x: firstPoint?.xvalue || 0,
                y: firstPoint?.yvalue || 0
            }];
        }

        return updatedConfig;
    }

    function buildModificationPrompt(prompt: string, config: ChartConfig): string {
        return [
            'Modify the existing Syncfusion chart configuration.',
            'CURRENT CONFIGURATION:',
            JSON.stringify(config, null, 4),
            'USER REQUEST:',
            prompt,
            'Preserve every property, series, axis, data value, feature, and style not explicitly changed.',
            'Return one complete JSON object only. Do not return markdown.'
        ].join('\n');
    }

    function preserveUnrequestedProperties(previous: ChartConfig, generated: ChartConfig, prompt: string): ChartConfig {
        const text: string = prompt.toLowerCase();
        const result: ChartConfig = cloneChartConfig(generated);
        const featureNames: string[] = [
            'tooltip', 'crosshair', 'zoomSettings', 'selectionMode', 'highlightMode', 'annotations', 'indicators', 'legendSettings', 'chartArea'
        ];

        if (!text.includes('title')) {
            result.title = previous.title;
        }

        if (!text.includes('legend')) {
            result.showLegend = previous.showLegend;
        }

        if (!/(chart type|series type|convert|change to|make it)/.test(text)) {
            result.chartType = previous.chartType;
            result.series = result.series?.map((series: SeriesConfig, index: number) => ({
                ...series,
                type: previous.series?.[index]?.type || series.type
            }));
        }

        if (!/(data|value|point|series)/.test(text)) {
            result.series = result.series?.map((series: SeriesConfig, index: number) => ({
                ...previous.series?.[index],
                ...series,
                name: previous.series?.[index]?.name || series.name,
                dataSource: previous.series?.[index]?.dataSource || series.dataSource
            }));
        }

        if (!/(x axis|x-axis|horizontal axis|rotate label)/.test(text)) {
            result.xAxis = previous.xAxis;
        }

        if (!/(y axis|y-axis|vertical axis|minimum|maximum)/.test(text)) {
            result.yAxis = previous.yAxis;
        }

        featureNames.forEach((feature: string): void => {
            const promptName: string = feature.replace(/Settings|Mode/g, '').toLowerCase();
            if (!text.includes(promptName) && previous[feature] !== undefined) {
                result[feature] = cloneChartConfig({ value: previous[feature] }).value;
            }
        });

        return result;
    }

    function formatValue(value: unknown): string {
        return value === undefined ? 'not configured' : value === null ? 'none' : typeof value === 'string' ? value : JSON.stringify(value);
    }

    function compareChartConfigs(previous: ChartConfig, updated: ChartConfig): ChartChange[] {
        const changes: ChartChange[] = [];
        const scalarProperties: Array<{ key: string; label: string }> = [
            { key: 'title', label: 'Title' },
            { key: 'chartType', label: 'Chart type' },
            { key: 'showLegend', label: 'Legend' },
            { key: 'crosshair', label: 'Crosshair' },
            { key: 'tooltip', label: 'Tooltip' },
            { key: 'zoomSettings', label: 'Zoom' },
            { key: 'selectionMode', label: 'Selection' },
            { key: 'highlightMode', label: 'Highlight' },
            { key: 'annotations', label: 'Annotations' },
            { key: 'indicators', label: 'Indicators' },
            { key: 'xAxis', label: 'X-axis settings' },
            { key: 'yAxis', label: 'Y-axis settings' }
        ];

        scalarProperties.forEach(({ key, label }: { key: string; label: string }): void => {
            if (JSON.stringify(previous[key]) !== JSON.stringify(updated[key])) {
                changes.push({
                    property: label,
                    previousValue: formatValue(previous[key]),
                    updatedValue: formatValue(updated[key])
                });
            }
        });

        if ((previous.series || []).length !== (updated.series || []).length) {
            changes.push({
                property: 'Series count',
                previousValue: String(previous.series?.length || 0),
                updatedValue: String(updated.series?.length || 0)
            });
        }

        (updated.series || []).forEach((series: SeriesConfig, seriesIndex: number): void => {
            const previousSeries: SeriesConfig | undefined = previous.series?.[seriesIndex];

            if (!previousSeries) {
                changes.push({
                    property: `Series ${seriesIndex + 1}`,
                    previousValue: 'not configured',
                    updatedValue: series.name || `Series ${seriesIndex + 1}`
                });
                return;
            }

            if (previousSeries.name !== series.name) {
                changes.push({
                    property: `Series ${seriesIndex + 1} name`,
                    previousValue: formatValue(previousSeries.name),
                    updatedValue: formatValue(series.name)
                });
            }
            const previousType: string = String(previousSeries.type || 'Column').toLowerCase();
            const updatedType: string = String(series.type || 'Column').toLowerCase();

            if (previousType !== updatedType) {
                changes.push({
                    property: `${series.name || `Series ${seriesIndex + 1}`} type`,
                    previousValue: previousSeries.type || 'Column',
                    updatedValue: series.type || 'Column'
                });
            }

            (series.dataSource || []).forEach((point: ChartDataPoint): void => {
                const oldPoint: ChartDataPoint | undefined = previousSeries.dataSource?.find(
                    (item: ChartDataPoint) => String(item.xvalue).toLowerCase() === String(point.xvalue).toLowerCase()
                );

                if (!oldPoint) {
                    changes.push({
                        property: `${series.name || `Series ${seriesIndex + 1}`}, ${point.xvalue}`,
                        previousValue: 'not configured',
                        updatedValue: String(point.yvalue)
                    });
                } else if (oldPoint.yvalue !== point.yvalue) {
                    changes.push({
                        property: `${series.name || `Series ${seriesIndex + 1}`}, ${point.xvalue}`,
                        previousValue: String(oldPoint.yvalue),
                        updatedValue: String(point.yvalue)
                    });
                }
            });
        });
        (previous.series || []).forEach((previousSeries: SeriesConfig, seriesIndex: number): void => {
            const updatedSeries: SeriesConfig | undefined = updated.series?.[seriesIndex];

            if (!updatedSeries) {
                changes.push({
                    property: previousSeries.name || `Series ${seriesIndex + 1}`,
                    previousValue: 'configured',
                    updatedValue: 'removed'
                });
                return;
            }

            (previousSeries.dataSource || []).forEach((previousPoint: ChartDataPoint): void => {
                const updatedPoint: ChartDataPoint | undefined = updatedSeries.dataSource?.find(
                    (item: ChartDataPoint) => String(item.xvalue).toLowerCase() === String(previousPoint.xvalue).toLowerCase()
                );

                if (!updatedPoint) {
                    changes.push({
                        property: `${previousSeries.name || `Series ${seriesIndex + 1}`}, ${previousPoint.xvalue}`,
                        previousValue: String(previousPoint.yvalue),
                        updatedValue: 'removed'
                    });
                }
            });
        });
        return changes;
    }

    function getSeriesModule(type?: string): string {
        const modules: Record<string, string> = {
            Line: 'LineSeries', Column: 'ColumnSeries', Bar: 'BarSeries', Area: 'AreaSeries', Spline: 'SplineSeries',
            StepLine: 'StepLineSeries', StepArea: 'StepAreaSeries', SplineArea: 'SplineAreaSeries', MultiColoredLine: 'MultiColoredLineSeries',
            MultiColoredArea: 'MultiColoredAreaSeries', RangeColumn: 'RangeColumnSeries', RangeArea: 'RangeAreaSeries',
            SplineRangeArea: 'SplineRangeAreaSeries', Hilo: 'HiloSeries', HiloOpenClose: 'HiloOpenCloseSeries', Candle: 'CandleSeries',
            BoxAndWhisker: 'BoxAndWhiskerSeries', Bubble: 'BubbleSeries', Scatter: 'ScatterSeries', StackingColumn: 'StackingColumnSeries',
            StackingColumn100: 'StackingColumnSeries', StackingBar: 'StackingBarSeries', StackingBar100: 'StackingBarSeries',
            StackingArea: 'StackingAreaSeries', StackingArea100: 'StackingAreaSeries', StackingLine: 'StackingLineSeries',
            StackingLine100: 'StackingLineSeries', StackingStepArea: 'StackingStepAreaSeries', Pareto: 'ParetoSeries', Polar: 'PolarSeries',
            Radar: 'RadarSeries', Waterfall: 'WaterfallSeries', Histogram: 'HistogramSeries'
        };
        return modules[mapSeriesType(type)] || 'ColumnSeries';
    }

    function getRequiredModules(config: ChartConfig): string[] {
        const modules: string[] = [];

        if (config.chartType === 'circular') {
            modules.push(...(config.series || []).map((series: SeriesConfig) => {
                const type: string = mapAccumulationSeriesType(series.type);
                return type === 'Funnel' ? 'FunnelSeries' : type === 'Pyramid' ? 'PyramidSeries' : 'PieSeries';
            }));
            if (config.showLegend !== false) modules.push('AccumulationLegend');
            if (config.tooltip?.enable !== false) modules.push('AccumulationTooltip');
            if (config.annotations?.length) modules.push('AccumulationAnnotation');
            if (config.series?.some((series: SeriesConfig) => series.dataLabel?.visible)) modules.push('AccumulationDataLabel');
            modules.push('Export');
            return Array.from(new Set(modules));
        }

        modules.push(...(config.series || []).map((series: SeriesConfig) => getSeriesModule(series.type)));
        [config.xAxis?.[0], config.yAxis?.[0]].forEach((axis: AxisConfig | undefined): void => {
            const type: string = mapAxisType(axis?.valueType || axis?.type);
            if (type !== 'Double') modules.push(type);
            if (axis?.stripLines?.length) modules.push('StripLine');
        });
        if (config.showLegend !== false) modules.push('Legend');
        if (config.tooltip?.enable !== false) modules.push('Tooltip');
        if (config.crosshair?.enable) modules.push('Crosshair');
        if (config.zoomSettings && Object.values(config.zoomSettings).some(Boolean)) modules.push('Zoom');
        if (config.selectionMode && config.selectionMode !== 'None') modules.push('Selection');
        if (config.highlightMode && config.highlightMode !== 'None') modules.push('Highlight');
        if (config.annotations?.length) modules.push('ChartAnnotation');
        if (config.series?.some((series: SeriesConfig) => series.marker?.dataLabel || series.dataLabel)) modules.push('DataLabel');
        if (config.series?.some((series: SeriesConfig) => series.errorBar)) modules.push('ErrorBar');
        if (config.series?.some((series: SeriesConfig) => series.trendlines?.length)) modules.push('Trendlines');
        const indicatorModules: Record<string, string> = {
            Ema: 'EmaIndicator', Rsi: 'RsiIndicator', BollingerBands: 'BollingerBands', Tma: 'TmaIndicator',
            Momentum: 'MomentumIndicator', Sma: 'SmaIndicator', Atr: 'AtrIndicator',
            AccumulationDistribution: 'AccumulationDistributionIndicator', Macd: 'MacdIndicator', Stochastic: 'StochasticIndicator'
        };
        (config.indicators || []).forEach((indicator: UnknownConfig): void => {
            const moduleName: string | undefined = indicatorModules[indicator.type];
            if (moduleName) modules.push(moduleName);
        });
        modules.push('Export');
        return Array.from(new Set(modules));
    }

    function toTypeScriptLiteral(value: unknown, indentation: number = 0): string {
        const json: string = JSON.stringify(value, null, 4);
        const padding: string = ' '.repeat(indentation);
        return json.split('\n').map((line: string, index: number) => index === 0 ? line : `${padding}${line}`).join('\n');
    }

    function generateCompleteChartCode(config: ChartConfig): string {
        const modules: string[] = getRequiredModules(config);
        const chartClass: string = config.chartType === 'circular' ? 'AccumulationChart' : 'Chart';
        const imports: string[] = [chartClass, ...modules].sort();
        const dataBlocks: string = (config.series || []).map((series: SeriesConfig, index: number) =>
            `const chartData${index + 1}: Object[] = ${toTypeScriptLiteral(series.dataSource || [])};`
        ).join('\n\n');
        const renderConfig: UnknownConfig = cloneChartConfig(config);
        delete renderConfig.chartType;
        delete renderConfig.showLegend;
        renderConfig.legendSettings = { ...(renderConfig.legendSettings || {}), visible: config.showLegend !== false };
        renderConfig.series = (config.series || []).map((series: SeriesConfig, index: number) => {
            const normalizedType: string = (series.type || '').toLowerCase();
            const generatedSeries: UnknownConfig = {
                ...series,
                type: config.chartType === 'circular' ? mapAccumulationSeriesType(series.type) : mapSeriesType(series.type),
                dataSource: `__CHART_DATA_${index + 1}__`,
                xName: series.xName || 'xvalue',
                yName: series.yName || 'yvalue'
            };

            if (config.chartType === 'circular' && (normalizedType === 'doughnut' || normalizedType === 'donut')) {
                generatedSeries.innerRadius = series.innerRadius || '70%';
            }

            return generatedSeries;
        });
        if (config.chartType !== 'circular') {
            renderConfig.primaryXAxis = normalizeAxis(config.xAxis?.[0] || {}, 'Categories', 'category');
            renderConfig.primaryYAxis = normalizeAxis(config.yAxis?.[0] || {}, 'Values', 'numerical');
            delete renderConfig.xAxis;
            delete renderConfig.yAxis;
        }
        let configCode: string = toTypeScriptLiteral(renderConfig, 4);
        (config.series || []).forEach((_series: SeriesConfig, index: number): void => {
            configCode = configCode.replace(`"__CHART_DATA_${index + 1}__"`, `chartData${index + 1}`);
        });

        return [
            'import {',
            imports.map((item: string) => `    ${item}`).join(',\n'),
            `} from '@syncfusion/ej2-charts';`,
            '',
            `${chartClass}.Inject(${modules.join(', ')});`,
            '',
            dataBlocks,
            '',
            `const chart: ${chartClass} = new ${chartClass}(${configCode});`,
            '',
            `chart.appendTo('#chart-container');`
        ].join('\n');
    }

    function generatePartialUpdateCode(prompt: string, previousConfig: ChartConfig, updatedConfig: ChartConfig): string {
        const text: string = normalizeChartPrompt(prompt);
        const changes: UnknownConfig = {};
        const xAxisChanged: boolean = JSON.stringify(previousConfig.xAxis) !== JSON.stringify(updatedConfig.xAxis);
        const yAxisChanged: boolean = JSON.stringify(previousConfig.yAxis) !== JSON.stringify(updatedConfig.yAxis);
        const seriesChanged: boolean = JSON.stringify(previousConfig.series) !== JSON.stringify(updatedConfig.series);
        const indicatorsChanged: boolean =
            JSON.stringify(previousConfig.indicators || []) !== JSON.stringify(updatedConfig.indicators || []);
        if ((text.includes('stripline') || text.includes('strip line')) && xAxisChanged) {
            changes.stripLines = updatedConfig.xAxis?.[0]?.stripLines || [];
        } else if ((text.includes('stripline') || text.includes('strip line')) && yAxisChanged) {
            changes.stripLines = updatedConfig.yAxis?.[0]?.stripLines || [];
        } else {
            if (xAxisChanged && updatedConfig.chartType !== 'circular') {
                changes.primaryXAxis = normalizeAxis(updatedConfig.xAxis?.[0] || {}, 'Categories', 'category');
            }

            if (yAxisChanged && updatedConfig.chartType !== 'circular') {
                changes.primaryYAxis = normalizeAxis(updatedConfig.yAxis?.[0] || {}, 'Values', 'numerical');
            }
        }
        if (indicatorsChanged) {
            changes.indicators = updatedConfig.indicators || [];
        }
        if (text.includes('crosshair')) {
            changes.crosshair = updatedConfig.crosshair;
        }

        if (text.includes('tooltip')) {
            changes.tooltip = updatedConfig.tooltip;
        }

        if (text.includes('zoom')) {
            changes.zoomSettings = updatedConfig.zoomSettings;
        }

        if (text.includes('selection')) {
            changes.selectionMode = updatedConfig.selectionMode;
        }

        if (text.includes('highlight')) {
            changes.highlightMode = updatedConfig.highlightMode;
        }

        if (text.includes('annotation')) {
            changes.annotations = updatedConfig.annotations || [];
        }

        if (text.includes('legend')) {
            changes.legendSettings = {
                ...(updatedConfig.legendSettings || {}),
                visible: updatedConfig.showLegend !== false
            };
        }

        if (seriesChanged) {
            const dataLabelRequest: boolean = text.includes('data label') || text.includes('datalabel');

            if (dataLabelRequest) {
                changes.series = (updatedConfig.series || []).map((series: SeriesConfig) => updatedConfig.chartType === 'circular'
                    ? { dataLabel: series.dataLabel || { visible: false } }
                    : { marker: { dataLabel: series.marker?.dataLabel || { visible: false } } });
            } else {
                changes.series = updatedConfig.series || [];
            }
        }

        if (previousConfig.title !== updatedConfig.title) {
            changes.title = updatedConfig.title;
        }

        if (previousConfig.chartType !== updatedConfig.chartType) {
            changes.chartType = updatedConfig.chartType;
            changes.series = updatedConfig.series || [];
        }

        return toTypeScriptLiteral(changes);
    }

    function buildResponseBlocks(payload: ChartResponse): any[] {
        if (!payload.CHART || !payload.ChartConfig) {
            return [{
                blockType: 'text',
                content: payload.Text || 'No valid chart configuration was returned.'
            }];
        }

        const blocks: any[] = [{
            blockType: 'text',
            content: payload.Text || 'The chart is ready.'
        }];

        if (payload.ChangeSummary?.length) {
            blocks.push({
                blockType: 'tool',
                toolName: 'change-summary-tool',
                props: {
                    changes: payload.ChangeSummary
                }
            });
        }

        const codeViews: CodeToolView[] = [];

        if (payload.ChangedCode) {
            codeViews.push({
                id: 'changes',
                title: 'Code changes',
                description: 'Only the configuration properties added, removed, or changed by this request are shown.',
                language: 'json',
                code: payload.ChangedCode
            });
        }

        if (payload.ShowCode && payload.Code) {
            codeViews.push({
                id: 'complete',
                title: payload.CodeTitle || 'Complete TypeScript code',
                description: payload.CodeDescription || 'Includes required imports, module injection, data, features, and initialization.',
                language: 'typescript',
                code: payload.Code
            });
        }

        if (codeViews.length) {
            blocks.push({
                blockType: 'tool',
                toolName: 'code-tool',
                props: {
                    activeView: payload.ChangedCode ? 'changes' : 'complete',
                    views: codeViews
                }
            });
        }

        blocks.push({
            blockType: 'tool',
            toolName: 'chart-tool',
            props: {
                ChartConfig: payload.ChartConfig
            }
        });

        return blocks;
    }

    function cloneChartResponse(payload: ChartResponse): ChartResponse {
        return JSON.parse(JSON.stringify(payload)) as ChartResponse;
    }

    function getSessionTitle(session: HistorySession): string {
        const firstMessage: SessionMessage | undefined = session.messages[0];

        return firstMessage?.payload.ChartConfig?.title ||
            firstMessage?.prompt ||
            'Chart Session';
    }

    function updateCurrentSessionTitle(): void {
        currentSession.title = getSessionTitle(currentSession);
        currentSession.updatedAt = new Date();
    }

    function cloneHistorySession(session: HistorySession): HistorySession {
        return {
            ...session,
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
            messages: session.messages.map((message: SessionMessage) => ({
                ...message,
                payload: cloneChartResponse(message.payload),
                createdAt: new Date(message.createdAt)
            }))
        };
    }

    function saveCurrentSession(): void {
        if (!currentSession.messages.length) {
            return;
        }

        updateCurrentSessionTitle();

        const storedSession: HistorySession = cloneHistorySession(currentSession);
        const existingIndex: number = historySessions.findIndex(
            (session: HistorySession) => session.id === currentSession.id
        );

        if (existingIndex !== -1) {
            historySessions.splice(existingIndex, 1);
        }

        historySessions.unshift(storedSession);
        selectedSessionId = currentSession.id;
        saveHistorySessions(historySessions);
        renderHistory();
    }

    function appendSessionMessage(prompt: string, payload: ChartResponse): void {
        const message: SessionMessage = {
            id: createId('message'),
            prompt,
            payload: cloneChartResponse(payload),
            createdAt: new Date()
        };

        currentSession.messages.push(message);
        currentSession.updatedAt = new Date();

        if (currentSession.messages.length === 1) {
            currentSession.title = payload.ChartConfig?.title || prompt || 'Chart Session';
        }

        saveCurrentSession();
    }

    function renderHistory(): void {
        const scroll: HTMLElement | null = document.getElementById('history-scroll');

        if (!scroll) {
            return;
        }

        if (!historySessions.length) {
            scroll.innerHTML = '<div class="empty" id="history-empty">No history yet.</div>';
            return;
        }

        scroll.innerHTML = historySessions.map((session: HistorySession) => {
            const isSelected: boolean = selectedSessionId === session.id;

            return [
                `<div class="history-item${isSelected ? ' active' : ''}" data-history-session-id="${escapeHtml(session.id)}">`,
                '  <div class="history-text">',
                `    <div class="history-title">${escapeHtml(session.title)}</div>`,
                `    <div class="history-date">${formatSessionDate(session.updatedAt)}</div>`,
                '  </div>',
                `  <button class="icon-btn danger" data-history-delete-session-id="${escapeHtml(session.id)}"`,
                '      title="Delete session" aria-label="Delete session">',
                '    <span class="e-icons e-trash"></span>',
                '  </button>',
                '</div>'
            ].join('');
        }).join('');
    }

    function formatSessionDate(date: Date): string {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    }
    function renderVisibility(): void {
        const pane: HTMLElement | null = document.getElementById('history-pane');
        if (pane) pane.style.display = showHistory ? 'flex' : 'none';
        
        // Add/remove class to adjust layout when history is visible
        const layout: HTMLElement | null = document.querySelector('.smart-chart-layout');
        if (layout) {
            if (showHistory) {
                layout.classList.add('history-visible');
            } else {
                layout.classList.remove('history-visible');
            }
        }
    }

    async function copyCode(code: string, button: HTMLButtonElement): Promise<void> {
        const original: string = button.textContent || 'Copy code';

        try {
            await navigator.clipboard.writeText(code);
            button.textContent = 'Copied';
        } catch {
            button.textContent = 'Copy failed';
        }

        window.setTimeout((): void => { button.textContent = original; }, 1500);
    }

    function getCodeToolViews(config: CodeToolConfig): CodeToolView[] {
        if (Array.isArray(config.views) && config.views.length) {
            return config.views.filter((view: CodeToolView) => Boolean(view?.code));
        }

        if (!config.code) {
            return [];
        }

        return [{
            id: 'complete',
            title: config.title || 'Complete TypeScript code',
            description: config.description || '',
            language: config.language || 'typescript',
            code: config.code
        }];
    }

    function onCodeToolHandler(container: Element, args: any): void {
        const titleElement: HTMLElement | null = container.querySelector('.generated-code-title');
        const descriptionElement: HTMLElement | null = container.querySelector('.generated-code-description');
        const codeElement: HTMLElement | null = container.querySelector('.generated-code');
        const codePanel: HTMLElement | null = container.querySelector('.generated-code-wrapper');
        const copyButton: HTMLButtonElement | null = container.querySelector('.copy-code-button');
        const switchContainer: HTMLElement | null = container.querySelector('.generated-code-switch');
        const switchButtons: NodeListOf<HTMLButtonElement> = container.querySelectorAll('[data-code-view]');
        const config: CodeToolConfig = args?.config || args?.props || args || {};
        const views: CodeToolView[] = getCodeToolViews(config);
        const codePanelId: string = `generated-code-panel-${createId('view')}`;
        const titleId: string = `${codePanelId}-title`;
        let activeView: CodeToolView | undefined = views.find((view: CodeToolView) => view.id === config.activeView) || views[0];

        if (titleElement) {
            titleElement.id = titleId;
        }

        if (codePanel) {
            codePanel.id = codePanelId;
            codePanel.setAttribute('role', 'tabpanel');
        }

        function renderCodeView(view: CodeToolView): void {
            activeView = view;

            if (titleElement) {
                titleElement.textContent = view.title;
            }

            if (descriptionElement) {
                descriptionElement.textContent = view.description;
            }

            if (codeElement) {
                codeElement.textContent = view.code;
                codeElement.setAttribute('data-language', view.language);
            }

            switchButtons.forEach((button: HTMLButtonElement): void => {
                const selected: boolean = button.dataset.codeView === view.id;

                button.classList.toggle('active', selected);
                button.setAttribute('aria-selected', String(selected));
                button.tabIndex = selected ? 0 : -1;
            });

            if (codePanel) {
                const selectedButton: HTMLButtonElement | undefined = Array.from(switchButtons).find(
                    (button: HTMLButtonElement) => button.dataset.codeView === view.id
                );

                codePanel.setAttribute('aria-labelledby', views.length > 1 && selectedButton?.id ? selectedButton.id : titleId);
            }
        }

        switchButtons.forEach((button: HTMLButtonElement): void => {
            const viewId: string = button.dataset.codeView || '';
            const view: CodeToolView | undefined = views.find((item: CodeToolView) => item.id === viewId);

            button.id = `${codePanelId}-${viewId || 'view'}-tab`;
            button.setAttribute('aria-controls', codePanelId);
            button.hidden = !view;

            button.onclick = (): void => {
                if (view) {
                    renderCodeView(view);
                }
            };
            button.onkeydown = (event: KeyboardEvent): void => {
                if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                    return;
                }

                event.preventDefault();

                const currentIndex: number = views.findIndex((item: CodeToolView) => item.id === activeView?.id);
                const direction: number = event.key === 'ArrowRight' ? 1 : -1;
                const nextIndex: number = (currentIndex + direction + views.length) % views.length;
                const nextView: CodeToolView | undefined = views[nextIndex];
                const nextButton: HTMLButtonElement | undefined = Array.from(switchButtons).find(
                    (item: HTMLButtonElement) => item.dataset.codeView === nextView?.id
                );

                if (nextView && nextButton) {
                    renderCodeView(nextView);
                    nextButton.focus();
                }
            };
        });

        if (switchContainer) {
            switchContainer.style.display = views.length > 1 ? 'flex' : 'none';
        }

        if (copyButton) {
            copyButton.onclick = (): void => {
                if (activeView) {
                    void copyCode(activeView.code, copyButton);
                }
            };
        }

        if (activeView) {
            renderCodeView(activeView);
        }
    }

    function onChangeSummaryToolHandler(container: Element, args: any): void {
        const list: HTMLElement | null = container.querySelector('.change-summary-list');
        const source: any = args?.config || args?.props || args;
        const changes: string[] = Array.isArray(source?.changes) ? source.changes : [];

        if (list) {
            list.innerHTML = changes.map((change: string) => `<li>${escapeHtml(change)}</li>`).join('');
            list.style.display = changes.length ? '' : 'none';
        }
    }

    function getChartExportRequest(prompt: string): ChartExportRequest {
        const text: string = prompt.trim().toLowerCase();
        const types: Array<{ pattern: RegExp; type: ChartExportType }> = [
            { pattern: /\bpdf\b/, type: 'PDF' }, { pattern: /\bpng\b/, type: 'PNG' },
            { pattern: /\bjpe?g\b/, type: 'JPEG' }, { pattern: /\bsvg\b/, type: 'SVG' },
            { pattern: /\b(?:xlsx|excel)\b/, type: 'XLSX' }, { pattern: /\bcsv\b/, type: 'CSV' }
        ];
        const match: { pattern: RegExp; type: ChartExportType } | undefined = types.find(
            (item: { pattern: RegExp; type: ChartExportType }) => item.pattern.test(text)
        );
        return { isExport: /\b(export|download|save)\b/.test(text) || /^(pdf|png|jpe?g|svg|xlsx|excel|csv)$/.test(text), type: match?.type || 'PNG' };
    }

    function isPrintRequest(prompt: string): boolean {
        const text: string = prompt.trim().toLowerCase().replace(/\s+/g, ' ');
        return [
            'print', 'print chart', 'print the chart', 'print this chart', 'print current chart',
            'print the current chart', 'print latest chart', 'print the latest chart'
        ].includes(text);
    }
    function getExportFileName(title?: string): string {
        return (title || activeChart?.title || 'Generated Chart').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') ||
            'Generated-Chart';
    }

    function exportChartData(type: 'XLSX' | 'CSV', config: ChartConfig): void {
        const rows: UnknownConfig[] = [];
        (config.series || []).forEach((series: SeriesConfig): void => {
            (series.dataSource || []).forEach((point: ChartDataPoint): void => {
                rows.push({ Series: series.name || 'Series', Category: point.xvalue, Value: point.yvalue });
            });
        });
        const fileName: string = getExportFileName(config.title);

        if (type === 'CSV') {
            const escape: (value: unknown) => string = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
            const content: string = [['Series', 'Category', 'Value'].map(escape).join(','),
            ...rows.map((row: UnknownConfig) => [row.Series, row.Category, row.Value].map(escape).join(','))].join('\n');
            const url: string = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
            const anchor: HTMLAnchorElement = document.createElement('a');
            anchor.href = url;
            anchor.download = `${fileName}.csv`;
            anchor.click();
            URL.revokeObjectURL(url);
            return;
        }

        new Workbook({
            worksheets: [{
                name: 'Chart Data', rows: [
                    { cells: [{ value: 'Series' }, { value: 'Category' }, { value: 'Value' }] },
                    ...rows.map((row: UnknownConfig) => ({ cells: [{ value: row.Series }, { value: row.Category }, { value: row.Value }] }))
                ]
            }]
        }, 'xlsx').save(`${fileName}.xlsx`);
    }

    function exportChartInstance(chart: Chart | AccumulationChart, config: ChartConfig, type: ChartExportType): boolean {
        if (chart.isDestroyed) return false;
        if (type === 'XLSX' || type === 'CSV') {
            exportChartData(type, config);
        } else {
            chart.exportModule.export(type, getExportFileName(config.title));
        }
        return true;
    }

    function exportActiveChart(type: ChartExportType): boolean {
        return Boolean(activeChart && currentChartConfig && exportChartInstance(activeChart, currentChartConfig, type));
    }

    function printActiveChart(): boolean {
        if (!activeChart || activeChart.isDestroyed) return false;
        activeChart.print();
        return true;
    }

    function getLatestStripLine(config: ChartConfig): UnknownConfig | null {
        const yStripLines: UnknownConfig[] = config.yAxis?.[0]?.stripLines || [];

        if (yStripLines.length) {
            return yStripLines[yStripLines.length - 1];
        }

        const xStripLines: UnknownConfig[] = config.xAxis?.[0]?.stripLines || [];

        return xStripLines.length
            ? xStripLines[xStripLines.length - 1]
            : null;
    }

    function getStripLineAxisName(config: ChartConfig, stripLine: UnknownConfig): string {
        const existsOnYAxis: boolean = Boolean(
            config.yAxis?.[0]?.stripLines?.some((item: UnknownConfig) =>
                isSameStripLine(item, stripLine)
            )
        );

        return existsOnYAxis ? 'Y-axis' : 'X-axis';
    }

    function getLocalModificationMessage(
        prompt: string,
        previousConfig: ChartConfig,
        updatedConfig: ChartConfig,
        changes: ChartChange[]
    ): string {
        const normalizedPrompt: string = prompt.trim().toLowerCase();

        if (normalizedPrompt.includes('stripline') || normalizedPrompt.includes('strip line')) {
            if (/\b(remove|hide|disable)\b/.test(normalizedPrompt)) {
                return `Removed all strip lines from "${updatedConfig.title || 'the chart'}".`;
            }

            const stripLine: UnknownConfig | null = getLatestStripLine(updatedConfig);

            if (stripLine) {
                const start: string | number = stripLine.start;

                const displayStart: string | number = typeof start === 'number'
                    ? Number(start.toFixed(2))
                    : start;

                const end: string | number = typeof start === 'number'
                    ? Number((start + Number(stripLine.size || 0)).toFixed(2))
                    : start;

                const axisName: string = getStripLineAxisName(updatedConfig, stripLine);
                const labelDescription: string = stripLine.text
                    ? ` labeled "${stripLine.text}"`
                    : '';

                return `Added a ${stripLine.color} strip line from ${displayStart} to ${end}${labelDescription} on the ${axisName} of "${updatedConfig.title || 'the chart'
                    }".`;
            }
        }

        if (normalizedPrompt.includes('crosshair')) {
            return /\b(remove|hide|disable)\b/.test(normalizedPrompt)
                ? `Disabled the crosshair in "${updatedConfig.title || 'the chart'}".`
                : `Enabled the crosshair in "${updatedConfig.title || 'the chart'}".`;
        }

        if (normalizedPrompt.includes('legend')) {
            return updatedConfig.showLegend === false
                ? `Hidden the legend in "${updatedConfig.title || 'the chart'}".`
                : `Displayed the legend in "${updatedConfig.title || 'the chart'}".`;
        }

        if (normalizedPrompt.includes('tooltip')) {
            return updatedConfig.tooltip?.enable === false
                ? `Disabled the tooltip in "${updatedConfig.title || 'the chart'}".`
                : `Enabled the tooltip in "${updatedConfig.title || 'the chart'}".`;
        }

        if (normalizedPrompt.includes('zoom')) {
            return `Updated the zoom settings in "${updatedConfig.title || 'the chart'}".`;
        }

        if (normalizedPrompt.includes('annotation')) {
            if (/\b(remove|hide|disable|delete|clear)\b/.test(normalizedPrompt)) {
                return `Removed all annotations from "${updatedConfig.title || 'the chart'}".`;
            }
            const annotation: UnknownConfig | undefined = updatedConfig.annotations?.[updatedConfig.annotations.length - 1];
            if (annotation) {
                const label: string = typeof annotation.content === 'string' ? decodeHtmlEntities(annotation.content).replace(/<[^>]+>/g, '') : 'Annotation';
                return `Added the annotation "${label}" to "${updatedConfig.title || 'the chart'}" at X "${annotation.x}" and Y ${annotation.y}.`;
            }
        }
        if (getRequestedIndicatorType(prompt)) {
            const latestIndicator: UnknownConfig | undefined =
                updatedConfig.indicators?.[updatedConfig.indicators.length - 1];

            if (latestIndicator) {
                return `Added a ${latestIndicator.type} indicator to "${updatedConfig.title || 'the chart'
                    }" using the "${latestIndicator.seriesName || 'primary'}" series with period ${latestIndicator.period
                    }.`;
            }
        }

        if (normalizedPrompt.includes('indicator') && /\b(remove|hide|disable)\b/.test(normalizedPrompt)) {
            return `Removed all indicators from "${updatedConfig.title || 'the chart'}".`;
        }
        if (changes.length === 1) {
            return `Updated "${updatedConfig.title || 'the chart'}": ${changes[0].property} changed from ${changes[0].previousValue
                } to ${changes[0].updatedValue}.`;
        }

        return `Updated "${updatedConfig.title || 'the chart'}" with ${changes.length} changes.`;
    }

    function getModificationSummary(config: ChartConfig, changes: ChartChange[]): string {
        const title: string = config.title || 'the chart';

        if (!changes.length) {
            return `No configuration changes were detected for "${title}".`;
        }

        if (changes.length === 1) {
            return `Updated "${title}": ${changes[0].property} changed from ${changes[0].previousValue} to ${changes[0].updatedValue
                }.`;
        }

        return `Updated "${title}" with ${changes.length} changes.`;
    }

    function getDisplaySeriesType(config: ChartConfig, series: SeriesConfig): string {
        if (config.chartType !== 'circular') {
            return mapSeriesType(series.type);
        }

        const normalizedType: string = (series.type || 'pie').toLowerCase();

        if (normalizedType === 'doughnut' || normalizedType === 'donut') {
            return 'Doughnut';
        }

        return mapAccumulationSeriesType(series.type);
    }

    function getCreationMessage(config: ChartConfig, pointCount: number): string {
        const title: string = config.title || 'Generated Chart';
        const seriesTypes: string = (config.series || []).map((series: SeriesConfig) => getDisplaySeriesType(config, series)).join(', ');

        return `Created "${title}" as a ${seriesTypes || 'chart'} with ${config.series?.length || 0} series and ${pointCount} data points. ` +
            'The chart is ready for review and further changes.';
    }

    function isIncompleteAxisPrompt(prompt: string): boolean {
        return /^(x\s*-?\s*axis|xaxis|y\s*-?\s*axis|yaxis)$/i.test(prompt.trim());
    }

    function generateDefaultChartConfig(prompt: string): ChartConfig {
        const requestedType: string = getRequestedSeriesType(prompt) || 'Column';
        const circular: boolean = isCircularSeriesType(requestedType);

        if (circular) {
            return {
                chartType: 'circular',
                title: `Sample ${requestedType} Chart`,
                showLegend: true,
                tooltip: { enable: true },
                series: [{
                    type: requestedType,
                    name: 'Sample Data',
                    dataSource: [
                        { xvalue: 'Category A', yvalue: 40 },
                        { xvalue: 'Category B', yvalue: 30 },
                        { xvalue: 'Category C', yvalue: 20 },
                        { xvalue: 'Category D', yvalue: 10 }
                    ]
                }]
            };
        }

        return {
            chartType: 'cartesian',
            title: `Sample ${requestedType} Chart`,
            showLegend: true,
            tooltip: { enable: true },
            xAxis: [{ type: 'category', title: 'Categories' }],
            yAxis: [{ type: 'numerical', title: 'Values', min: 0 }],
            series: [{
                type: requestedType,
                name: 'Sample Data',
                dataSource: [
                    { xvalue: 'January', yvalue: 35 },
                    { xvalue: 'February', yvalue: 28 },
                    { xvalue: 'March', yvalue: 34 },
                    { xvalue: 'April', yvalue: 42 }
                ]
            }]
        };
    }

    async function fetchChartConfig(prompt: string): Promise<ChartResponse> {
        const requestType: ChartRequestType = isCodeRequest(prompt) ? 'code' : isChartModificationRequest(prompt) ? 'modify' : 'create';
        if (isGenericIndicatorRequest(prompt)) {
            return {
                CHART: false,
                Text: getIndicatorClarificationMessage()
            };
        }
        if (isIncompleteAxisPrompt(prompt)) {
            return {
                CHART: false,
                Text: currentChartConfig
                    ? 'Please include the X-axis or Y-axis change you want to apply. For example: "Add a red strip line on the X-axis from March to April."'
                    : 'Create a chart first, then provide the axis change you want to apply.'
            };
        }
        if (isIncompleteCreateRequest(prompt)) {
            return {
                CHART: false,
                Text: 'Please specify the chart you want to create. For example: "Create a pie chart showing product category distribution."'
            };
        }
        const dataAdditionClarification: string | null = getDataAdditionClarification(prompt);
        if (dataAdditionClarification) {
            return {
                CHART: false,
                Text: dataAdditionClarification
            };
        }
        if (requestType === 'code' && currentChartConfig) {
            return {
                CHART: true,
                Text: `Here is the complete TypeScript code for "${currentChartConfig.title || 'the current chart'}".`,
                Code: generateCompleteChartCode(currentChartConfig),
                ShowCode: true,
                ChartConfig: cloneChartConfig(currentChartConfig)
            };
        }

        const previous: ChartConfig | null = currentChartConfig ? cloneChartConfig(currentChartConfig) : null;

        if (requestType === 'modify' && previous) {
            // First try to apply local chart modifications
            const local: ChartConfig | null = applyLocalChartModification(prompt, previous);

            if (local) {
                const changes: ChartChange[] = compareChartConfigs(previous, local);

                currentChartConfig = cloneChartConfig(local);

                return {
                    CHART: true,
                    Text: getLocalModificationMessage(prompt, previous, local, changes),
                    ChangedCode: generatePartialUpdateCode(prompt, previous, local),
                    Code: generateCompleteChartCode(local),
                    CodeTitle: 'Complete TypeScript code',
                    CodeDescription: 'Includes required imports, module injection, data, features, and initialization.',
                    ShowCode: true,
                    ChangeSummary: changes.length > 1
                        ? changes.map(
                            (change: ChartChange) =>
                                `${change.property}: ${change.previousValue} to ${change.updatedValue}`
                        )
                        : undefined,
                    ChartConfig: local
                };
            }
            
            // If local modifications didn't apply, try public methods
            const publicMethodResult: ChartConfig | null = applyPublicMethod(prompt, previous);
            
            if (publicMethodResult) {
                const changes: ChartChange[] = compareChartConfigs(previous, publicMethodResult);

                currentChartConfig = cloneChartConfig(publicMethodResult);

                return {
                    CHART: true,
                    Text: getLocalModificationMessage(prompt, previous, publicMethodResult, changes),
                    ChangedCode: generatePartialUpdateCode(prompt, previous, publicMethodResult),
                    Code: generateCompleteChartCode(publicMethodResult),
                    CodeTitle: 'Complete TypeScript code',
                    CodeDescription: 'Includes required imports, module injection, data, features, and initialization.',
                    ShowCode: true,
                    ChangeSummary: changes.length > 1
                        ? changes.map(
                            (change: ChartChange) =>
                                `${change.property}: ${change.previousValue} to ${change.updatedValue}`
                        )
                        : undefined,
                    ChartConfig: publicMethodResult
                };
            }
        }

        requestController?.abort();
        const controller: AbortController = new AbortController();
        requestController = controller;
        const aiPrompt: string = requestType === 'modify' && previous ? buildModificationPrompt(prompt, previous) : prompt;
        let raw: string;

        try {
            const reply: any = await getAIResponse({
                prompt: aiPrompt,
                systemPrompt: chartSystemPrompt,
                existingConfig: requestType === 'modify' ? previous || undefined : undefined
            }, controller);
            raw = getAIResponseText(reply);
        } finally {
            if (requestController === controller) {
                requestController = null;
            }
        }

        const jsonText: string | undefined = extractJson(raw);

        if (!jsonText) {
            return { CHART: false, Text: raw || 'The AI response did not contain a valid chart configuration.' };
        }

        let data: any;

        try {
            data = JSON.parse(jsonText);
        } catch {
            return { CHART: false, Text: 'The generated chart configuration was not valid JSON.' };
        }

        const normalized: ChartConfig | null = normalizeConfig(data);
        if (!normalized) {
            if (requestType === 'modify' && previous) {
                return {
                    CHART: true,
                    Text: 'The requested modification could not be applied because the AI response was invalid. The existing chart was preserved.',
                    ChartConfig: previous
                };
            }

            const fallbackConfig: ChartConfig = generateDefaultChartConfig(prompt);
            currentChartConfig = cloneChartConfig(fallbackConfig);

            return {
                CHART: true,
                Text: 'The AI response did not contain usable chart data, so representative sample data was used.',
                Code: generateCompleteChartCode(fallbackConfig),
                CodeTitle: 'Complete TypeScript code',
                CodeDescription: 'Includes required imports, module injection, sample data, and initialization.',
                ShowCode: true,
                ChartConfig: fallbackConfig
            };
        }

        let config: ChartConfig = applyRequestedSeriesType(normalized, prompt);

        if (requestType === 'create') {
            config = applyRequestedChartFeatures(prompt, config);
        }

        if (requestType === 'modify' && previous) {
            config = preserveUnrequestedProperties(previous, config, prompt);
        }

        const changes: ChartChange[] = previous ? compareChartConfigs(previous, config) : [];
        currentChartConfig = cloneChartConfig(config);
        const pointCount: number = (config.series || []).reduce(
            (count: number, series: SeriesConfig) => count + (series.dataSource?.length || 0), 0
        );

        return {
            CHART: true,
            Text: requestType === 'modify'
                ? getModificationSummary(config, changes)
                : getCreationMessage(config, pointCount),
            ChangedCode: requestType === 'modify' && previous
                ? generatePartialUpdateCode(prompt, previous, config)
                : undefined,
            Code: generateCompleteChartCode(config),
            CodeTitle: 'Complete TypeScript code',
            CodeDescription: 'Includes required imports, module injection, data, features, and initialization.',
            ShowCode: true,
            ChangeSummary: requestType === 'modify' && changes.length
                ? changes.map(
                    (change: ChartChange) =>
                        `${change.property}: ${change.previousValue} to ${change.updatedValue}`
                )
                : undefined,
            ChartConfig: config
        };
    }

    async function onPromptRequest(args: PromptRequestEventArgs): Promise<void> {
        const prompt: string = (args.prompt || '').trim();

        if (!prompt) {
            return;
        }

        const exportRequest: ChartExportRequest = getChartExportRequest(prompt);

        if (exportRequest.isExport) {
            const exported: boolean = exportActiveChart(exportRequest.type);
            const payload: ChartResponse = {
                CHART: false,
                Text: exported
                    ? `Exported "${currentChartConfig?.title || 'the latest chart'}" as ${exportRequest.type}.`
                    : 'Create or select a chart before exporting.'
            };

            aiAssist?.addPromptResponse({
                blocks: buildResponseBlocks(payload)
            } as any);
            appendSessionMessage(prompt, payload);
            return;
        }

        if (isPrintRequest(prompt)) {
            const printed: boolean = printActiveChart();
            const payload: ChartResponse = {
                CHART: false,
                Text: printed
                    ? 'Opened the print dialog for the latest chart.'
                    : 'Create or select a chart before printing.'
            };

            aiAssist?.addPromptResponse({
                blocks: buildResponseBlocks(payload)
            } as any);
            appendSessionMessage(prompt, payload);
            return;
        }

        try {
            const payload: ChartResponse = await fetchChartConfig(prompt);

            aiAssist?.addPromptResponse({
                blocks: buildResponseBlocks(payload)
            } as any);

            appendSessionMessage(prompt, payload);
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return;
            }

            const message: string = error instanceof Error
                ? error.message
                : 'Unknown error';
            const payload: ChartResponse = {
                CHART: false,
                Text: `AI service error: ${message}`
            };

            aiAssist?.addPromptResponse({
                blocks: buildResponseBlocks(payload)
            } as any);
            appendSessionMessage(prompt, payload);
        }
    }
    function onChartToolHandler(container: Element, args: any): void {
        const element: HTMLElement | null = container.querySelector('.chart-tool-container');
        const status: HTMLElement | null = container.querySelector('.chart-preview-status');
        const source: any = args?.config || args?.props || args || {};
        const config: ChartConfig = source?.ChartConfig || source?.chartConfig || source?.props?.ChartConfig ||
            source?.props?.chartConfig || source?.props || source;

        if (!element || !config?.series?.length) {
            return;
        }

        renderChartWhenReady(element, config);

        container.addEventListener('pointerdown', (): void => {
            const chart: Chart | AccumulationChart | undefined = renderedCharts.get(element);

            if (chart && !chart.isDestroyed) {
                activeChart = chart;
                currentChartConfig = cloneChartConfig(config);
            }
        });

        const select: HTMLSelectElement | null = container.querySelector('[data-chart-export-select]');

        if (select) {
            select.onchange = (): void => {
                const chart: Chart | AccumulationChart | undefined = renderedCharts.get(element);

                if (!chart || chart.isDestroyed || !select.value) {
                    select.value = '';
                    return;
                }

                const type: ChartExportType = select.value as ChartExportType;
                const exported: boolean = exportChartInstance(chart, config, type);

                if (status) {
                    status.textContent = exported ? `${type} export started.` : 'Export could not be started.';
                }

                activeChart = chart;
                currentChartConfig = cloneChartConfig(config);
                select.value = '';
            };
        }

        const printButton: HTMLButtonElement | null = container.querySelector('[data-chart-print]');

        if (printButton) {
            printButton.onclick = (): void => {
                const chart: Chart | AccumulationChart | undefined = renderedCharts.get(element);

                if (!chart || chart.isDestroyed) {
                    return;
                }

                activeChart = chart;
                currentChartConfig = cloneChartConfig(config);
                chart.print();
            };
        }
    }

    function createAIAssist(messages: SessionMessage[] = []): void {
        const host: HTMLElement | null = document.getElementById('ai-assist-container');

        if (host) {
            host.innerHTML = '';
        }

        aiAssist = new AIAssistView({
            showHeader: true,
            width: '100%',
            height: '100%',
            prompts: messages.map((message: SessionMessage) => ({
                prompt: message.prompt,
                blocks: buildResponseBlocks(message.payload)
            })),
            promptSuggestions,
            bannerTemplate: [
                '<div class="banner-content">',
                '  <div class="e-icons e-assistview-icon"></div>',
                ' <h2>AI-Powered Chart Creation and Editing</h2>',
                ' <p>Generate, customize, and refine charts instantly through natural-language conversations.</p>',
                '</div>'
            ].join(''),
            toolbarSettings: {
                items: [
                    {
                        iconCss: 'e-icons e-menu',
                        align: 'Right',
                        tooltip: 'History'
                    },
                    {
                        iconCss: 'e-icons e-edit-notes',
                        align: 'Right',
                        tooltip: 'New session'
                    }
                ],
                itemClicked: onToolbarItemClicked
            },
            responseToolbarSettings: {
                items: [
                    {
                        iconCss: 'e-icons e-assist-like',
                        align: 'Right'
                    },
                    {
                        iconCss: 'e-icons e-assist-dislike',
                        align: 'Right'
                    }
                ]
            },
            promptRequest: onPromptRequest
        } as any);

        (aiAssist as any).registerToolUI({
            toolName: 'change-summary-tool',
            template: [
                '<div class="change-summary-container">',
                '  <strong>Changes applied</strong>',
                '  <ul class="change-summary-list"></ul>',
                '</div>'
            ].join(''),
            handler: onChangeSummaryToolHandler
        });

        (aiAssist as any).registerToolUI({
            toolName: 'code-tool',
            template: [
                '<div class="generated-code-container">',
                '  <div class="generated-code-header">',
                '    <div class="generated-code-heading">',
                '      <strong class="generated-code-title"></strong>',
                '      <div class="generated-code-description"></div>',
                '    </div>',
                '    <button type="button" class="copy-code-button">Copy code</button>',
                '  </div>',
                '  <div class="generated-code-switch" role="tablist" aria-label="Generated code view">',
                '    <button type="button" class="generated-code-switch-button" data-code-view="changes" role="tab">',
                '      Code changes',
                '    </button>',
                '    <button type="button" class="generated-code-switch-button" data-code-view="complete" role="tab">',
                '      Complete TypeScript code',
                '    </button>',
                '  </div>',
                '  <pre class="generated-code-wrapper" role="tabpanel"><code class="generated-code"></code></pre>',
                '</div>'
            ].join(''),
            handler: onCodeToolHandler
        });

        (aiAssist as any).registerToolUI({
            toolName: 'chart-tool',
            template: [
                '<div class="generated-chart-container">',
                '  <div class="generated-chart-header">',
                '    <strong>Chart preview</strong>',
                '    <div class="chart-preview-actions">',
                '      <select class="chart-export-select" data-chart-export-select aria-label="Export chart">',
                '        <option value="" selected disabled hidden>Export</option>',
                '        <option value="PNG">PNG</option>',
                '        <option value="JPEG">JPEG</option>',
                '        <option value="SVG">SVG</option>',
                '        <option value="PDF">PDF</option>',
                '        <option value="XLSX">XLSX</option>',
                '        <option value="CSV">CSV</option>',
                '      </select>',
                '      <button type="button" class="chart-print-button" data-chart-print>Print</button>',
                '    </div>',
                '  </div>',
                '  <div class="chart-preview-status" role="status" aria-live="polite"></div>',
                '  <div class="chart-tool-container"></div>',
                '</div>'
            ].join(''),
            handler: onChartToolHandler
        });

        aiAssist.appendTo('#ai-assist-container');
    }
    function restoreSession(session: HistorySession): void {
        if (session.id === currentSession.id) {
            return;
        }

        saveCurrentSession();
        requestController?.abort();
        requestController = null;
        destroyAllCharts();

        if (aiAssist && !aiAssist.isDestroyed) {
            aiAssist.destroy();
        }

        aiAssist = null;
        const host: HTMLElement | null = document.getElementById('ai-assist-container');

        if (host) {
            host.innerHTML = '';
        }

        currentSession = cloneHistorySession(session);
        selectedSessionId = session.id;
        currentChartConfig = null;
        activeChart = null;

        const latestChartMessage: SessionMessage | undefined = currentSession.messages.slice().reverse().find(
            (message: SessionMessage) => Boolean(message.payload.ChartConfig)
        );

        if (latestChartMessage?.payload.ChartConfig) {
            currentChartConfig = cloneChartConfig(latestChartMessage.payload.ChartConfig);
        }

        createAIAssist(currentSession.messages);
        renderHistory();

        window.requestAnimationFrame((): void => {
            window.requestAnimationFrame((): void => {
                refreshRestoredCharts();
                setLatestRestoredChartAsActive();
            });
        });
    }

    function resetAIAssist(): void {
        saveCurrentSession();

        requestController?.abort();
        requestController = null;

        destroyAllCharts();

        if (aiAssist && !aiAssist.isDestroyed) {
            aiAssist.destroy();
        }

        aiAssist = null;
        currentSession = createHistorySession();
        selectedSessionId = null;
        currentChartConfig = null;
        activeChart = null;
        showHistory = false;
        promptSuggestions = chartSuggestions.slice();

        const host: HTMLElement | null = document.getElementById('ai-assist-container');

        if (host) {
            host.innerHTML = '';
        }

        createAIAssist();
        renderHistory();
        renderVisibility();
    }

    function onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
        const icon: string = args.item?.iconCss || '';

        if (icon.includes('e-menu')) {
            showHistory = !showHistory;
            renderVisibility();
        } else if (icon.includes('e-edit-notes')) {
            resetAIAssist();
        }
    }

    function onDocumentClick(event: MouseEvent): void {
        const target: Element | null = event.target instanceof Element
            ? event.target
            : null;

        if (!target) {
            return;
        }

        if (target.closest('#history-close-btn')) {
            showHistory = false;
            renderVisibility();
            return;
        }

        const deleteButton: Element | null = target.closest(
            '[data-history-delete-session-id]'
        );

        if (deleteButton) {
            event.preventDefault();
            event.stopPropagation();

            const sessionId: string =
                deleteButton.getAttribute('data-history-delete-session-id') || '';

            const sessionIndex: number = historySessions.findIndex(
                (session: HistorySession) => session.id === sessionId
            );

            if (sessionIndex !== -1) {
                historySessions.splice(sessionIndex, 1);
                saveHistorySessions(historySessions);

                if (selectedSessionId === sessionId) {
                    requestController?.abort();
                    requestController = null;

                    destroyAllCharts();

                    if (aiAssist && !aiAssist.isDestroyed) {
                        aiAssist.destroy();
                    }

                    aiAssist = null;
                    currentSession = createHistorySession();
                    selectedSessionId = null;
                    currentChartConfig = null;
                    activeChart = null;

                    const host: HTMLElement | null = document.getElementById('ai-assist-container');

                    if (host) {
                        host.innerHTML = '';
                    }

                    createAIAssist();
                }

                renderHistory();
            }

            return;
        }

        const historyItem: Element | null = target.closest(
            '.history-item[data-history-session-id]'
        );

        if (historyItem) {
            const sessionId: string =
                historyItem.getAttribute('data-history-session-id') || '';

            const session: HistorySession | undefined = historySessions.find(
                (item: HistorySession) => item.id === sessionId
            );

            if (session) {
                restoreSession(session);
            }

            return;
        }
    }

    function clearSampleState(): void {
        requestController?.abort();
        requestController = null;
        historySessions = [];
        currentSession = createHistorySession();
        selectedSessionId = null;
        currentChartConfig = null;
        showHistory = false;
        sessionStorage.removeItem(historyStorageKey);
        destroyAllCharts();
    
        if (aiAssist && !aiAssist.isDestroyed) {
            aiAssist.destroy();
        }
    
        aiAssist = null;
    }

    function onBeforeUnload(): void {
        clearSampleState();
    }

    /**
     * Handles public methods that can be called on the chart
     * @param prompt The user's request
     * @param config The current chart configuration
     * @returns Updated chart configuration or null if no method was applied
     */
    function applyPublicMethod(prompt: string, config: ChartConfig): ChartConfig | null {
        const text: string = normalizeChartPrompt(prompt);
        const updated: ChartConfig = cloneChartConfig(config);
        
        // Handle export method
        if (text.includes('export') && /\b(png|jpeg|svg|pdf|xlsx|csv)\b/i.test(text)) {
            // This would be handled by calling the export method on the chart instance
            // For now, we'll just return the config as-is since export doesn't change the config
            return updated;
        }
        
        // Handle print method
        if (text.includes('print') || text.includes('print chart')) {
            // This would be handled by calling the print method on the chart instance
            // For now, we'll just return the config as-is since print doesn't change the config
            return updated;
        }
        
        // Handle addSeries method
        if (text.includes('add series') || text.includes('add new series')) {
            // Extract series details from the prompt
            const seriesTypeMatch = text.match(/\b(line|column|bar|area|spline|stepline|steparea|splinearea|rangecolumn|rangearea|bubble|scatter|stackingcolumn|stackingcolumn100|stackingbar|stackingbar100|stackingarea|stackingarea100|stackingline|stackingline100|pie|doughnut|funnel|pyramid)\b/i);
            if (seriesTypeMatch && updated.series) {
                const seriesType = seriesTypeMatch[1];
                const circular = ['pie', 'doughnut', 'funnel', 'pyramid'].includes(seriesType);
                
                // Add a new series with default values
                const newSeries: any = {
                    type: seriesType,
                    name: `Series ${updated.series.length + 1}`,
                    dataSource: []
                };
                
                // Add default data points if it's a circular chart
                if (circular && updated.series[0]?.dataSource) {
                    // Copy data structure from existing series
                    newSeries.dataSource = updated.series[0].dataSource.map((point: any, index: number) => ({
                        ...point,
                        yvalue: point.yvalue * (0.5 + Math.random() * 0.5) // Randomize values
                    }));
                } else if (!circular && updated.series[0]?.dataSource) {
                    // For cartesian charts, copy the x-values and randomize y-values
                    newSeries.dataSource = updated.series[0].dataSource.map((point: any) => ({
                        xvalue: point.xvalue,
                        yvalue: point.yvalue * (0.5 + Math.random() * 0.5) // Randomize values
                    }));
                } else {
                    // Add some default data if no existing series
                    if (circular) {
                        newSeries.dataSource = [
                            { xvalue: 'A', yvalue: 50 },
                            { xvalue: 'B', yvalue: 30 },
                            { xvalue: 'C', yvalue: 20 }
                        ];
                    } else {
                        newSeries.dataSource = [
                            { xvalue: 'Jan', yvalue: 50 },
                            { xvalue: 'Feb', yvalue: 30 },
                            { xvalue: 'Mar', yvalue: 20 }
                        ];
                    }
                }
                
                updated.series = [...updated.series, newSeries];
                return updated;
            }
        }
        
        // Handle removeSeries method
        if (text.includes('remove series')) {
            const seriesIndexMatch = text.match(/\bseries\s+(\d+)/i);
            if (seriesIndexMatch && updated.series) {
                const index = parseInt(seriesIndexMatch[1]) - 1;
                if (index >= 0 && index < updated.series.length) {
                    updated.series = updated.series.filter((_: any, i: number) => i !== index);
                    return updated;
                }
            }
        }
        
        // Handle clearSeries method
        if (text.includes('clear series') || text.includes('remove all series')) {
            updated.series = [];
            return updated;
        }
        
        // Handle addAxes method
        if (text.includes('add axis') || text.includes('add axes')) {
            // For cartesian charts, we might add additional axes
            if (updated.chartType === 'cartesian') {
                // This is a simplified implementation
                // In reality, this would depend on the specific requirements
                return updated;
            }
        }
        
        // Handle removeAxis method
        if (text.includes('remove axis')) {
            const axisTypeMatch = text.match(/\b(xaxis|yaxis)\b/i);
            if (axisTypeMatch) {
                const axisType = axisTypeMatch[1].toLowerCase();
                if (axisType === 'xaxis') {
                    updated.xAxis = [];
                } else if (axisType === 'yaxis') {
                    updated.yAxis = [];
                }
                return updated;
            }
        }
        
        // Handle showTooltip method
        if (text.includes('show tooltip')) {
            // Enable tooltip if not already enabled
            if (!updated.tooltip) {
                updated.tooltip = { enable: true };
            } else {
                updated.tooltip.enable = true;
            }
            return updated;
        }
        
        // Handle hideTooltip method
        if (text.includes('hide tooltip')) {
            // Disable tooltip if it exists
            if (updated.tooltip) {
                updated.tooltip.enable = false;
            }
            return updated;
        }
        
        // Handle refreshLiveData method
        if (text.includes('refresh data') || text.includes('update data') || text.includes('live data')) {
            // This would typically involve updating the data source
            // For now, we'll just return the config as-is
            return updated;
        }
        
        // Handle setAnnotationValue method
        if (text.includes('set annotation') || text.includes('update annotation')) {
            // This would update annotation content
            // We'll implement a basic version
            if (updated.annotations && updated.annotations.length > 0) {
                // Just return the config as-is for now
                return updated;
            }
        }
        
        // Handle animate method
        if (text.includes('animate') || text.includes('animation')) {
            // Enable animation if not already enabled
            updated.enableAnimation = true;
            return updated;
        }
        
        return null;
    }

    window.removeEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('beforeunload', onBeforeUnload);
    document.removeEventListener('click', onDocumentClick);
    document.addEventListener('click', onDocumentClick);
    // Theme detection and application
    function applyThemeBasedStyles() {
        // Get the current theme from the URL hash or default to 'material'
        const themeName: string = location.hash.split('/')[1].toLowerCase();
        
        // Define dark themes
        const darkThemes = ['dark', 'highcontrast', 'fluent-dark', 'bootstrap-dark', 'tailwind-dark', 'material-dark', 'fabric-dark'];
        const isDarkTheme = darkThemes.some(darkTheme => themeName.includes(darkTheme));
        
        // Get the main layout container
        const layout = document.querySelector('.smart-chart-layout');
        
        if (layout) {
            // Remove any existing theme classes
            layout.classList.remove('dark-theme', 'highcontrast-theme', 'fluent-dark-theme', 'light-theme', 
                                  'bootstrap-dark-theme', 'tailwind-dark-theme', 'material-dark-theme', 'fabric-dark-theme');
            
            // Apply appropriate theme class
            if (isDarkTheme) {
                // Normalize theme name for CSS class
                let normalizedTheme = themeName.replace('-dark', '-dark-theme');
                if (!themeName.endsWith('-dark')) {
                    normalizedTheme = themeName + '-theme';
                }
                layout.classList.add(normalizedTheme);
            } else {
                // For light themes, we'll use the default light theme
                layout.classList.add('light-theme');
            }
        }
    }
    
    // Apply theme styles initially
    applyThemeBasedStyles();
    
    // Listen for hash changes to detect theme changes.
    window.removeEventListener('hashchange', applyThemeBasedStyles);
    window.addEventListener('hashchange', applyThemeBasedStyles);

    const sampleRoot: HTMLElement | null = document.querySelector('.smart-chart-layout');
    const sampleObserver: MutationObserver = new MutationObserver((): void => {
        if (sampleRoot && !document.body.contains(sampleRoot)) {
            sampleObserver.disconnect();
            window.removeEventListener('hashchange', applyThemeBasedStyles);
            window.removeEventListener('beforeunload', onBeforeUnload);
            document.removeEventListener('click', onDocumentClick);
            clearSampleState();
        }
    });
    sampleObserver.observe(document.body, { childList: true, subtree: true });

    createAIAssist();
    renderHistory();
    renderVisibility();
};
