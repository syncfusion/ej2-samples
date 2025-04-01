import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, LineSeries, SplineSeries, ColumnSeries, SplineAreaSeries, BarSeries, BubbleSeries,
    ScatterSeries, StepLineSeries, RangeColumnSeries, Category, DataLabel, Highlight,
    ILoadedEventArgs, IPointRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';

import { EmitType, Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, bubblePointRender } from './theme-color';
import { Tab, SelectingEventArgs } from '@syncfusion/ej2-navigations';

Chart.Inject(
    LineSeries, SplineSeries, ColumnSeries, SplineAreaSeries, BarSeries, BubbleSeries,
    ScatterSeries, StepLineSeries, RangeColumnSeries, Category, DataLabel, Highlight
);

let splinedata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 30 },
    { x: '2', y: 10 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 5 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
]);
let linedata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 10 },
    { x: '2', y: 30 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
]);
let columndata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 90 },
    { x: '2', y: 10 },
    { x: '3', y: 50 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 70 },
    { x: '7', y: 9 }
]);
let areadata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 10 },
    { x: '2', y: 20 },
    { x: '3', y: 80 },
    { x: '4', y: 15 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 }
]);
let bardata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 90 },
    { x: '2', y: 10 },
    { x: '3', y: 50 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 70 },
    { x: '7', y: 9 }
]);
let rangecolumndata: object[] = [
    { x: '1', low: 30, high: 60 },
    { x: '2', low: 42, high: 73 },
    { x: '3', low: 35, high: 80 },
    { x: '4', low: 20, high: 50 },
    { x: '5', low: 30, high: 80 },
    { x: '6', low: 10, high: 40 },
    { x: '7', low: 15, high: 69 }
];
let steplinedata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 10 },
    { x: '2', y: 30 },
    { x: '3', y: 80 },
    { x: '4', y: 20 },
    { x: '5', y: 30, },
    { x: '6', y: 40 },
    { x: '7', y: 69 },
    { x: '8', y: 15 },
    { x: '9', y: 60 },
    { x: '10', y: 70 }
]);
let bubbledata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1.5', y: 80, size: 5 },
    { x: '2', y: 60, size: 10 },
    { x: '3', y: 70, size: 8 },
    { x: '4', y: 13, size: 6 },
    { x: '5', y: 30, size: 9 },
    { x: '6', y: 20, size: 7 },
    { x: '6.5', y: 40, size: 11 }
]);

function shuffleArray<T>(array: T[]): T[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

interface DataPoint {
    x: string;
    y: number;
    y1?: number;
    size?: number;
}

let scatterdata: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 15, y1: 10 },
    { x: '1.25', y: 35, y1: 20 },
    { x: '1.5', y: 60, y1: 50 },
    { x: '1.75', y: 25, y1: 15 },
    { x: '2', y: 25, y1: 35 },
    { x: '2.25', y: 30, y1: 30 },
    { x: '2.5', y: 45, y1: 30 },
    { x: '2.75', y: 40, y1: 20 },
    { x: '3', y: 30, y1: 45 },
    { x: '3.25', y: 55, y1: 35 },
    { x: '3.5', y: 65, y1: 20 },
    { x: '3.75', y: 40, y1: 50 },
    { x: '4', y: 40, y1: 60 },
    { x: '4.25', y: 60, y1: 25 },
    { x: '4.5', y: 15, y1: 25 },
    { x: '4.75', y: 75, y1: 55 },
    { x: '5', y: 50, y1: 40 },
    { x: '5.25', y: 45, y1: 30 },
    { x: '5.5', y: 20, y1: 15 },
    { x: '5.75', y: 65, y1: 35 },
    { x: '6', y: 65, y1: 65 },
    { x: '6.25', y: 35, y1: 50 },
    { x: '6.5', y: 70, y1: 35 },
    { x: '6.75', y: 50, y1: 40 },
    { x: '7', y: 25, y1: 60 },
    { x: '7.25', y: 60, y1: 45 },
    { x: '7.5', y: 45, y1: 20 },
    { x: '7.75', y: 30, y1: 15 },
    { x: '8', y: 60, y1: 50 },
    { x: '8.25', y: 25, y1: 35 },
    { x: '8.5', y: 30, y1: 10 },
    { x: '8.75', y: 45, y1: 25 },
    { x: '9', y: 75, y1: 45 },
    { x: '9.25', y: 40, y1: 50 },
    { x: '9.5', y: 20, y1: 15 },
    { x: '9.75', y: 30, y1: 40 },
    { x: '10', y: 60, y1: 25 }
]);
let scatterdata1: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 60, y1: 45 },
    { x: '1.25', y: 40, y1: 30 },
    { x: '1.5', y: 25, y1: 10 },
    { x: '1.75', y: 15, y1: 50 },
    { x: '2', y: 15, y1: 65 },
    { x: '2.25', y: 35, y1: 50 },
    { x: '2.5', y: 40, y1: 30 },
    { x: '2.75', y: 60, y1: 25 },
    { x: '3', y: 65, y1: 25 },
    { x: '3.25', y: 30, y1: 15 },
    { x: '3.5', y: 20, y1: 60 },
    { x: '3.75', y: 50, y1: 40 },
    { x: '4', y: 50, y1: 35 },
    { x: '4.25', y: 55, y1: 50 },
    { x: '4.5', y: 75, y1: 15 },
    { x: '4.75', y: 45, y1: 60 },
    { x: '5', y: 45, y1: 50 },
    { x: '5.25', y: 35, y1: 30 },
    { x: '5.5', y: 30, y1: 20 },
    { x: '5.75', y: 55, y1: 40 },
    { x: '6', y: 70, y1: 55 },
    { x: '6.25', y: 60, y1: 25 },
    { x: '6.5', y: 15, y1: 40 },
    { x: '6.75', y: 40, y1: 15 },
    { x: '7', y: 30, y1: 25 },
    { x: '7.25', y: 60, y1: 35 },
    { x: '7.5', y: 60, y1: 35 },
    { x: '7.75', y: 25, y1: 15 },
    { x: '8', y: 25, y1: 10 },
    { x: '8.25', y: 50, y1: 30 },
    { x: '8.5', y: 45, y1: 65 },
    { x: '8.75', y: 55, y1: 20 },
    { x: '9', y: 50, y1: 60 },
    { x: '9.25', y: 30, y1: 45 },
    { x: '9.5', y: 10, y1: 20 },
    { x: '9.75', y: 40, y1: 35 },
    { x: '10', y: 55, y1: 15 }
]);

let scatterdata2: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 70, y1: 25 },
    { x: '1.25', y: 55, y1: 40 },
    { x: '1.5', y: 45, y1: 40 },
    { x: '1.75', y: 30, y1: 45 },
    { x: '2', y: 20, y1: 55 },
    { x: '2.25', y: 30, y1: 45 },
    { x: '2.5', y: 10, y1: 35 },
    { x: '2.75', y: 25, y1: 15 },
    { x: '3', y: 50, y1: 20 },
    { x: '3.25', y: 60, y1: 30 },
    { x: '3.5', y: 25, y1: 60 },
    { x: '3.75', y: 50, y1: 45 },
    { x: '4', y: 30, y1: 15 },
    { x: '4.25', y: 55, y1: 20 },
    { x: '4.5', y: 65, y1: 75 },
    { x: '4.75', y: 45, y1: 35 },
    { x: '5', y: 60, y1: 45 },
    { x: '5.25', y: 35, y1: 10 },
    { x: '5.5', y: 15, y1: 30 },
    { x: '5.75', y: 30, y1: 60 },
    { x: '6', y: 55, y1: 50 },
    { x: '6.25', y: 25, y1: 45 },
    { x: '6.5', y: 35, y1: 10 },
    { x: '6.75', y: 20, y1: 30 },
    { x: '7', y: 40, y1: 65 },
    { x: '7.25', y: 30, y1: 45 },
    { x: '7.5', y: 30, y1: 60 },
    { x: '7.75', y: 45, y1: 30 },
    { x: '8', y: 60, y1: 45 },
    { x: '8.25', y: 50, y1: 40 },
    { x: '8.5', y: 20, y1: 25 },
    { x: '8.75', y: 70, y1: 15 },
    { x: '9', y: 75, y1: 15 },
    { x: '9.25', y: 30, y1: 50 },
    { x: '9.5', y: 50, y1: 35 },
    { x: '9.75', y: 55, y1: 20 },
    { x: '10', y: 15, y1: 70 }
]);

let scatterdata3: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 20, y1: 30 },
    { x: '1.25', y: 30, y1: 20 },
    { x: '1.5', y: 35, y1: 60 },
    { x: '1.75', y: 40, y1: 30 },
    { x: '2', y: 55, y1: 20 },
    { x: '2.25', y: 45, y1: 35 },
    { x: '2.5', y: 60, y1: 45 },
    { x: '2.75', y: 25, y1: 30 },
    { x: '3', y: 45, y1: 15 },
    { x: '3.25', y: 50, y1: 45 },
    { x: '3.5', y: 50, y1: 35 },
    { x: '3.75', y: 15, y1: 40 },
    { x: '4', y: 15, y1: 70 },
    { x: '4.25', y: 45, y1: 55 },
    { x: '4.5', y: 75, y1: 10 },
    { x: '4.75', y: 60, y1: 25 },
    { x: '5', y: 30, y1: 55 },
    { x: '5.25', y: 45, y1: 35 },
    { x: '5.5', y: 60, y1: 25 },
    { x: '5.75', y: 40, y1: 45 },
    { x: '6', y: 10, y1: 50 },
    { x: '6.25', y: 20, y1: 65 },
    { x: '6.5', y: 65, y1: 40 },
    { x: '6.75', y: 30, y1: 30 },
    { x: '7', y: 25, y1: 65 },
    { x: '7.25', y: 35, y1: 40 },
    { x: '7.5', y: 20, y1: 45 },
    { x: '7.75', y: 60, y1: 50 },
    { x: '8', y: 35, y1: 60 },
    { x: '8.25', y: 25, y1: 45 },
    { x: '8.5', y: 30, y1: 15 },
    { x: '8.75', y: 50, y1: 70 },
    { x: '9', y: 45, y1: 75 },
    { x: '9.25', y: 20, y1: 35 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 45, y1: 30 },
    { x: '10', y: 50, y1: 25 }
]);

let scatterdata4: DataPoint[] = shuffleArray<DataPoint>([
    { x: '1', y: 50, y1: 60 },
    { x: '1.25', y: 45, y1: 55 },
    { x: '1.5', y: 15, y1: 30 },
    { x: '1.75', y: 55, y1: 20 },
    { x: '2', y: 60, y1: 45 },
    { x: '2.25', y: 55, y1: 35 },
    { x: '2.5', y: 55, y1: 20 },
    { x: '2.75', y: 30, y1: 50 },
    { x: '3', y: 70, y1: 50 },
    { x: '3.25', y: 25, y1: 35 },
    { x: '3.5', y: 30, y1: 35 },
    { x: '3.75', y: 45, y1: 60 },
    { x: '4', y: 65, y1: 15 },
    { x: '4.25', y: 20, y1: 70 },
    { x: '4.5', y: 25, y1: 75 },
    { x: '4.75', y: 35, y1: 25 },
    { x: '5', y: 40, y1: 60 },
    { x: '5.25', y: 50, y1: 30 },
    { x: '5.5', y: 20, y1: 10 },
    { x: '5.75', y: 35, y1: 40 },
    { x: '6', y: 35, y1: 45 },
    { x: '6.25', y: 30, y1: 25 },
    { x: '6.5', y: 30, y1: 70 },
    { x: '6.75', y: 60, y1: 20 },
    { x: '7', y: 45, y1: 25 },
    { x: '7.25', y: 40, y1: 35 },
    { x: '7.5', y: 20, y1: 55 },
    { x: '7.75', y: 50, y1: 40 },
    { x: '8', y: 50, y1: 40 },
    { x: '8.25', y: 35, y1: 55 },
    { x: '8.5', y: 60, y1: 35 },
    { x: '8.75', y: 30, y1: 60 },
    { x: '9', y: 10, y1: 65 },
    { x: '9.25', y: 25, y1: 50 },
    { x: '9.5', y: 40, y1: 50 },
    { x: '9.75', y: 30, y1: 25 },
    { x: '10', y: 65, y1: 30 },
]);

let splineIntervalId: number;
let lineIntervalId: number;
let columnIntervalId: number;
let areaIntervalId: number;
let barIntervalId: number;
let rangeIntervalId: number;
let stepLineIntervalId: number;
let scatterIntervalId: number;
let bubbleIntervalId: number;

(window as any).default = (): void => {
const tabObj = new Tab({ heightAdjustMode: 'None', overflowMode: 'Scrollable', height: '500px',headerPlacement: 'Top',
    selected: tabSelected,
    items: [
        { header: { 'text': 'Line' }, content: '#lineCharts' },
        { header: { 'text': 'Column' }, content: '#columnCharts' },
        { header: { 'text': 'Spline' }, content: '#splineCharts' },
        { header: { 'text': 'Area' }, content: '#areaCharts' },
        { header: { 'text': 'Bar' }, content: '#barCharts' },
        { header: { 'text': 'Bubble' }, content: '#bubbleCharts' },
        { header: { 'text': 'Scatter' }, content: '#scatterCharts' },
        { header: { 'text': 'Step line' }, content: '#stepLineCharts' },
        { header: { 'text': 'Range column' }, content: '#rangeCharts' },
    ]
});
tabObj.appendTo('#element');

function tabSelected(e: SelectingEventArgs): void {
    const chartIds = [
        'lineCharts',
        'columnCharts',
        'splineCharts',
        'areaCharts',
        'barCharts',
        'bubbleCharts',
        'scatterCharts',
        'stepLineCharts',
        'rangeCharts'
    ];
    chartIds.forEach((id, index) => {
        if (index === e.selectedIndex) {
            let chartElement = document.getElementById(id);
            if (chartElement) {
                let chart = (chartElement as any).ej2_instances[0];
                chart.refresh();
            }
        }
    });
}

const splineChart = new Chart({
    primaryXAxis: { 
        valueType: 'Category', 
        majorGridLines: { width: 0 }, 
        majorTickLines: { width: 0 }, 
        minorTickLines: { width: 0 } 
    },
    primaryYAxis: { 
        labelFormat: '{value}', 
        maximum: 100, 
        minimum: 0, 
        edgeLabelPlacement: 'Shift', 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 } 
    },
    chartArea: { border: { width: 0 } },
    width: '100%',
    loaded: splineLoaded,
    load: splineLoad,
    series: [{
        dataSource: splinedata,
        xName: 'x',
        yName: 'y',
        type: 'Spline',
        width: 2.5,
        marker: { visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } },
        animation: { enable: true }
    }]
});
splineChart.appendTo('#splineCharts');

const lineChart = new Chart({
    primaryXAxis: { 
        valueType: 'Category', 
        majorGridLines: { width: 0 }, 
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 } 
    },
    primaryYAxis: { 
        labelFormat: '{value}', 
        maximum: 100, 
        minimum: 0, 
        edgeLabelPlacement: 'Shift', 
        lineStyle: { width: 0 }, 
        majorTickLines: { width: 0 } 
    },
    chartArea: { border: { width: 0 } },
    width: '100%',
    loaded: lineLoaded,
    load: lineLoad,
    series: [{
        dataSource: linedata,
        xName: 'x',
        yName: 'y',
        type: 'Line',
        width: 2.5,
        marker: { visible: true, height: 8, width: 8, dataLabel: { visible: true, position: 'Outer' } },
        animation: { enable: true }
    }]
});
lineChart.appendTo('#lineCharts');

const columnCharts = new Chart({
    primaryXAxis: {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    },
    primaryYAxis: {
        labelFormat: '{value}',
        maximum: 100,
        minimum: 0,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    width: '100%',
    loaded: columnLoaded,
    load: columnLoad,
    series: [{
        dataSource: columndata,
        xName: 'x',
        yName: 'y',
        type: 'Column',
        marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
        animation: { enable: true },
        cornerRadius: { topLeft: 4, topRight: 4 }
    }]
});
columnCharts.appendTo('#columnCharts');

const areaChart = new Chart({
    primaryXAxis: {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    },
    primaryYAxis: {
        labelFormat: '{value}',
        maximum: 100,
        minimum: 0,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    width: '100%',
    loaded: areaLoaded,
    load: areaLoad,
    series: [{
        dataSource: areadata,
        xName: 'x',
        yName: 'y',
        type: 'SplineArea',
        marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
        animation: { enable: true }
    }]
});
areaChart.appendTo('#areaCharts');

const barChart = new Chart({
    primaryXAxis: {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    },
    primaryYAxis: {
        labelFormat: '{value}',
        maximum: 100,
        minimum: 0,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    width: '100%',
    loaded: barLoaded,
    load: barLoad,
    series: [{
        dataSource: bardata,
        xName: 'x',
        yName: 'y',
        type: 'Bar',
        marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
        animation: { enable: true },
        cornerRadius: { bottomRight: 4, topRight: 4 }
    }]
});
barChart.appendTo('#barCharts');

const bubbleChart = new Chart({
    primaryXAxis: {
        minimum: 1,
        maximum: 7,
        interval: 1,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }
    },
    primaryYAxis: {
        minimum: 0,
        maximum: 100,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    pointRender: bubblePointRender,
    loaded: bubbleLoaded,
    load: bubbleLoad,
    legendSettings: { visible: false },
    series: [{
        dataSource: bubbledata,
        type: 'Bubble',
        border: { width: 2 },
        xName: 'x',
        yName: 'y',
        size: 'size',
        animation: { enable: true }
    }]
});
bubbleChart.appendTo('#bubbleCharts');

const scatterChart = new Chart({
    primaryXAxis: {
        minimum: 1,
        interval: 1,
        maximum: 10,
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        edgeLabelPlacement: 'Shift'
    },
    primaryYAxis: {
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 80,
        interval: 10,
        rangePadding: 'None'
    },
    chartArea: { border: { width: 0 } },
    loaded: scatterLoaded,
    load: scatterLoad,
    series: [
        {
            dataSource: scatterdata,
            xName: 'x',
            yName: 'y',
            type: 'Scatter',
            marker: { visible: false, width: 8, height: 8, shape: 'Circle' },
            animation: { enable: true }
        },
        {
            dataSource: scatterdata,
            xName: 'x',
            yName: 'y1',
            type: 'Scatter',
            marker: { visible: false, width: 8, height: 8, shape: 'Circle' },
            animation: { enable: true }
        }
    ]
});
scatterChart.appendTo('#scatterCharts');

const rangeChart = new Chart({
    primaryXAxis: {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    },
    primaryYAxis: {
        labelFormat: '{value}',
        maximum: 100,
        minimum: 0,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    width:'100%',
    loaded: rangeLoaded,
    load: rangeLoad,
    series: [{
        dataSource: rangecolumndata,
        xName: 'x',
        high: 'high',
        low: 'low',
        type: 'RangeColumn',
        columnSpacing: 0.1,
        marker: { visible: false, dataLabel: { visible: true, position: 'Outer' } },
        animation: { enable: true },
        cornerRadius: { bottomRight: 4, bottomLeft: 4, topRight: 4, topLeft: 4 }
    }]
});
rangeChart.appendTo('#rangeCharts');

const stepLineChart = new Chart({
    primaryXAxis: {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    },
    primaryYAxis: {
        labelFormat: '{value}',
        maximum: 100,
        minimum: 0,
        edgeLabelPlacement: 'Shift',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 }
    },
    chartArea: { border: { width: 0 } },
    width: '100%',
    loaded: stepLoaded,
    load: stepLoad,
    series: [{
        dataSource: steplinedata,
        xName: 'x',
        yName: 'y',
        width: 2.5,
        type: 'StepLine',
        marker: { visible: false },
        animation: { enable: true }
    }]
});
stepLineChart.appendTo('#stepLineCharts');

function splineLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('splineCharts');
    chart.setAttribute('title', '');
};

function splineClearInterval() {
    if (splineIntervalId) {
        clearInterval(splineIntervalId);
        splineIntervalId = null;
    }
}
function splineLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    splineClearInterval();
    splineIntervalId = setInterval(function () {
        let container = document.getElementById('splineCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
            const newData: Object[] = splinedata.map((item: { x: string, y: number }) => {
                const min: number = 10;
                const max: number = 90;
                const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
                return { x: item.x, y: value };
            });
            if (args.chart.series.length > 0) {
                args.chart.series[0].setData(newData, 1400);
            }
        }
        else {
            splineClearInterval();
        }
    }, 2000);
};

function generateRandomValues(item: { x: string, y: number }): { x: string, y: number } {
    const min: number = 10;
    const max: number = 95;
    const value: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return { x: item.x, y: value };
};

function generateRandomBubbleData(item: { x: string, y: number, size: number }): { x: string, y: number, size: number } {
    const minYValue: number = 5;
    const maxYValue: number = 95;
    const randomYValue: number = Math.random() * (maxYValue - minYValue) + minYValue;
    const minSize: number = 3.5;
    const maxSize: number = 9.5;
    const randomSize: number = Math.random() * (maxSize - minSize) + minSize;
    return { ...item, y: randomYValue, size: randomSize };
};

function lineLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('lineCharts');
    chart.setAttribute('title', '');
};

    function lineClearInterval() {
        if (lineIntervalId) {
            clearInterval(lineIntervalId);
            lineIntervalId = null;
        }
    }
    function lineLoad(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        lineClearInterval();
        lineIntervalId = setInterval(function () {
            let container = document.getElementById('lineCharts');
            if (container && container.children.length > 0 && container.id === args.chart.element.id) {
                const newData: Object[] = linedata.map(generateRandomValues);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 1400);
                }
            }
            else {
                lineClearInterval();
            }
        }, 2000);
    };

function columnLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('columnCharts');
    chart.setAttribute('title', '');
};

function columnClearInterval() {
    if (columnIntervalId) {
        clearInterval(columnIntervalId);
        columnIntervalId = null;
    }
}
function columnLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    columnClearInterval();
    columnIntervalId = setInterval(function () {
        let container = document.getElementById('columnCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
            const newData: Object[] = columndata.map(generateRandomValues);
            if (args.chart.series.length > 0) {
                args.chart.series[0].setData(newData, 1400);
            }
        }
        else {
            columnClearInterval();
        }
    }, 2000);
};

function areaLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('areaCharts');
    chart.setAttribute('title', '');
};

function areaClearInterval() {
    if (areaIntervalId) {
        clearInterval(areaIntervalId);
        areaIntervalId = null;
    }
}
function areaLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    
    areaClearInterval();
    areaIntervalId = setInterval(function () {
        let container = document.getElementById('areaCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
            const newData: Object[] = areadata.map(generateRandomValues);
            if (args.chart.series.length > 0) {
                args.chart.series[0].setData(newData, 1400);
            }
        }
        else {
            areaClearInterval();
        }
    }, 2000);
};

function barLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('barCharts');
    chart.setAttribute('title', '');
};

function barClearInterval() {
    if (barIntervalId) {
        clearInterval(barIntervalId);
        barIntervalId = null;
    }
}

function barLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    barClearInterval();
    barIntervalId = setInterval(function () {
        let container = document.getElementById('barCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
        const newData: Object[] = bardata.map(generateRandomValues);
        if (args.chart.series.length > 0) {
            args.chart.series[0].setData(newData, 1400);
        }
    }
    else {
        barClearInterval();
    }
    }, 2000);
};

function rangeLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('rangeCharts');
    chart.setAttribute('title', '');
};

function rangeClearInterval() {
    if (rangeIntervalId) {
        clearInterval(rangeIntervalId);
        rangeIntervalId = null;
    }
}

function rangeLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    rangeClearInterval();
    rangeIntervalId = setInterval(function () {
        let container = document.getElementById('rangeCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
            const newData: Object[] = rangecolumndata.map((item: { x: string, high: number, low: number }) => {
                const highMin: number = 50;
                const highMax: number = 95;
                const lowMin: number = 5;
                const lowMax: number = 45;
                const highValue: number = Math.floor(Math.random() * (highMax - highMin + 1)) + highMin;
                const lowValue: number = Math.floor(Math.random() * (lowMax - lowMin + 1)) + lowMin;
                return { x: item.x, high: highValue, low: lowValue };
            });
            if (args.chart.series.length > 0) {
                args.chart.series[0].setData(newData, 1400);
            }
        }
        else {
            rangeClearInterval();
        }
    }, 2000);
};

function stepLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('stepLineCharts');
    chart.setAttribute('title', '');
};

function stepLineClearInterval() {
    if (stepLineIntervalId) {
        clearInterval(stepLineIntervalId);
        stepLineIntervalId = null;
    }
}
function stepLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    stepLineClearInterval();
    stepLineIntervalId = setInterval(function () {
        let container = document.getElementById('stepLineCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
            const newData: Object[] = steplinedata.map(generateRandomValues);
            if (args.chart.series.length > 0) {
                args.chart.series[0].setData(newData, 1400);
            }
        }
        else {
            stepLineClearInterval();
        }
    }, 2000);
};

function scatterLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('scatterCharts');
    chart.setAttribute('title', '');
};

function scatterClearInterval() {
    if (scatterIntervalId) {
        clearInterval(scatterIntervalId);
        scatterIntervalId = null;
    }
}
function scatterLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    let index: number = 1;
    const datasets: any = [scatterdata, scatterdata1, scatterdata2, scatterdata3, scatterdata4];
    scatterClearInterval();
    scatterIntervalId = setInterval(function () {
        let container = document.getElementById('scatterCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
            const scatterDataSource: any = datasets[index % datasets.length];
            index++;
            args.chart.series[0].setData(scatterDataSource, 2000);
            args.chart.series[1].setData(scatterDataSource, 2000);
        }
        else {
            scatterClearInterval();
        }
    }, 2000);
};

function bubbleClearInterval() {
    if (bubbleIntervalId) {
        clearInterval(bubbleIntervalId);
        bubbleIntervalId = null;
    }
}
function bubbleLoad(args: ILoadedEventArgs): void {
    loadChartTheme(args);
    bubbleClearInterval();
    bubbleIntervalId = setInterval(function () {
        let container = document.getElementById('bubbleCharts');
        if (container && container.children.length > 0 && container.id === args.chart.element.id) {
        if (args.chart.series.length > 0) {
            let newBubbleData: any = bubbledata.map(generateRandomBubbleData);
            newBubbleData = shuffleArray(newBubbleData);
            args.chart.series[0].setData(newBubbleData, 1400);
        }
    }
    else {
        bubbleClearInterval();
    }
    }, 2000);
    
};
function bubbleLoaded(args: ILoadedEventArgs): void {
    let chart: Element = document.getElementById('bubbleCharts');
    chart.setAttribute('title', '');
};
loadCultureFiles();
};