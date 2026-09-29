import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart,
    StackingColumnSeries,
    Category,
    DataLabel,
    Tooltip,
    Legend,
    Highlight,
    ILoadedEventArgs,
    ITextRenderEventArgs,
    DataLabelIntersectAction,
    RelocatePointerShape
} from '@syncfusion/ej2-charts';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';


Chart.Inject(StackingColumnSeries, Category, DataLabel, Tooltip, Legend, Highlight);

/**
 * Sample for Stacked Column with Smart Labels
 */
(window as any).default = (): void => {
    loadCultureFiles();





    let chartData: Object[] = [
        { x: 'Q1 2025', samsung: 72.3, apple: 56.2, xiaomi: 42.7, oppo: 7.4, vivo: 5.2, others: 70.7 },
        { x: 'Q2 2025', samsung: 75.9, apple: 57.1, xiaomi: 43.9, oppo: 6.2, vivo: 3.9, others: 4.9 },
        { x: 'Q3 2025', samsung: 80.1, apple: 60.3, xiaomi: 46.0, oppo: 4.8, vivo: 3.9, others: 78.9 },
        { x: 'Q4 2025', samsung: 85.5, apple: 62.7, xiaomi: 48.9, oppo: 6.4, vivo: 5.8, others: 81.5 }
    ];

    const SERIES_COLORS: string[] = [
        '#6355C7', '#00AEE0', '#FFB400', '#4CAF50', '#E56590', '#9B59B6'
    ];

    const SMALL_VALUE_THRESHOLD: number = 3;


    const createSmartLabelSettings = (seriesColor: string): any => {
        return {
            visible: true,
            position: 'Top',
            format: '{value}M',
            labelIntersectAction: <DataLabelIntersectAction>'RelocateHorizontally',
            font: { color: '#FFFFFF', fontWeight: '700', size: '12px', fontFamily: 'Segoe UI' },
            margin: { left: 24, right: 24, top: 12, bottom: 12 },
            smartLabelSettings: {
                background: seriesColor,
                border: { color: seriesColor, width: 1.5 },
                connectorLineStyle: { color: seriesColor, width: 2 },
                pointerShape: <RelocatePointerShape>'Arrow'
            },
            rx: 7,
            ry: 7
        };
    };

    let hideTinyLabels: EmitType<ITextRenderEventArgs> = (args: ITextRenderEventArgs): void => {
        if (!args.point || typeof args.point.y !== 'number') {
            return;
        }
        if (args.point.y < SMALL_VALUE_THRESHOLD) {
            args.cancel = true;
        }
    };


    let chart: Chart = new Chart({
        primaryXAxis: {
            valueType: 'Category',
            visible: true,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        primaryYAxis: {
            visible: true,
            title: 'Shipments (Millions of Units)',
            labelFormat: '{value}M',
            minimum: 0,
            maximum: 400,
            interval: 50,
            majorGridLines: { color: '#E2E8F0', width: 1 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        chartArea: {
            background: 'transparent',
            border: { width: 0 }
        },
        series: <Object[]>[
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'samsung',
                type: 'StackingColumn',
                name: 'Samsung',
                fill: SERIES_COLORS[0],
                columnWidth: 0.5,
                marker: { dataLabel: createSmartLabelSettings(SERIES_COLORS[0]) }
            },
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'apple',
                type: 'StackingColumn',
                name: 'Apple',
                fill: SERIES_COLORS[1],
                columnWidth: 0.5,
                marker: { dataLabel: createSmartLabelSettings(SERIES_COLORS[1]) }
            },
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'xiaomi',
                type: 'StackingColumn',
                name: 'Xiaomi',
                fill: SERIES_COLORS[2],
                columnWidth: 0.5,
                marker: { dataLabel: createSmartLabelSettings(SERIES_COLORS[2]) }
            },
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'oppo',
                type: 'StackingColumn',
                name: 'OPPO',
                fill: SERIES_COLORS[3],
                columnWidth: 0.5,
                marker: { dataLabel: createSmartLabelSettings(SERIES_COLORS[3]) }
            },
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'vivo',
                type: 'StackingColumn',
                name: 'vivo',
                fill: SERIES_COLORS[4],
                columnWidth: 0.5,
                marker: { dataLabel: createSmartLabelSettings(SERIES_COLORS[4]) }
            },
            {
                dataSource: chartData,
                xName: 'x',
                yName: 'others',
                type: 'StackingColumn',
                name: 'Others',
                fill: SERIES_COLORS[5],
                columnWidth: 0.5,
                marker: { dataLabel: createSmartLabelSettings(SERIES_COLORS[5]) }
            }
        ],
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Global Smartphone Shipments by Vendor (2025)',
        subTitle: 'Smart labels automatically reposition small stacked-segment labels to avoid overlap.',
        legendSettings: { visible: true, position: 'Bottom', enableHighlight: true },
        tooltip: {
            enable: true,
            shared: true,
            format: '${series.name}: <b>${point.y}</b>',
            header: '${point.x}'
        },
        textRender: hideTinyLabels
    });
    chart.appendTo('#container');
};