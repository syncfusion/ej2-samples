import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, StackingColumnSeries, Category, Legend, ILoadedEventArgs, Selection, IMouseEventArgs, IAccLoadedEventArgs,
    ChartAnnotation, AccumulationChart, AccumulationDataLabel, IAnimationCompleteEventArgs, AccumulationTheme, ChartTheme,
    Series, IAccResizeEventArgs
} from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Legend, Selection, ChartAnnotation);
AccumulationChart.Inject(AccumulationChart, AccumulationDataLabel);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for annotation in chart
 */
export function getValue(series: Series[], pointIndex: number, y: number): string {
    let totalValue: number = 0;
    for (let ser of series) {
        totalValue += ser.points[pointIndex].y as number;
    }
    return (Math.round((y / totalValue) * 100)) + '%';
}
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart; let isRender: boolean = false;
    let dataSource: Object = [
        { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
        { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
        { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
        { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
    ];
    let pieDataSource: Object[] = [
        { x: 'UK', y: 51, text: '22%' }, { x: 'Germany', y: 77, text: '34%' },
        { x: 'France', y: 66, text: '29%' }, { x: 'Italy', y: 34, text: '15%' }
    ];
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 1 },
            minorTickLines: { width: 1 }, interval: 1, labelIntersectAction: 'Rotate45',
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Sales', lineStyle: { width: 0 }, minimum: 0, maximum: 700, interval: 100,
            majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
            minorTickLines: { width: 0 }, labelFormat: '{value}B', majorTickLines: { width: 0 }
        },
        //Initializing Series
        series: [
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y0', name: 'UK', dataSource: dataSource },
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y1', name: 'Germany', dataSource: dataSource },
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y2', name: 'France', dataSource: dataSource },
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y3', name: 'Italy', dataSource: dataSource }
        ],
        chartArea: { border: { width: 0 } }, title: 'Mobile Game Market by Country',
        //Initializing Selection
        selectionMode: 'Cluster', selectedDataIndexes: [{ series: 0, point: 0 }],
        width: Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        },
        legendSettings: { visible: true, toggleVisibility: false },
        //Initializing Annotation
        annotations: [{
            content: '<div id="chart_annotation" style="width: 200px; height: 200px"></div>',
            x: '20%', y: '25%', coordinateUnits: 'Pixel', region: 'Series'
        }],
        chartMouseUp: (args: IMouseEventArgs) => {
            if (args.target.indexOf('Point') > -1 && args.target.indexOf('annotation') === -1) {
                let pointIndex: number = parseInt(args.target[args.target.length - 1], 10);
                pieDataSource = [];
                for (let series of chart.visibleSeries) {
                    let value: number = series.points[pointIndex].y as number;
                    pieDataSource.push({
                        'x': series.name, 'y': value, 'text': getValue(chart.visibleSeries, pointIndex, value)
                    });
                }
                pie.series[0].dataSource = pieDataSource;
                pie.series[0].xName = 'x'; pie.series[0].yName = 'y';
                pie.refresh();
            }
        },
        loaded: (args: ILoadedEventArgs) => {
            if (isRender) {
                pie.destroy();
                pie = new AccumulationChart({
                    background: 'transparent',
                    series: [{
                        radius: '65%', animation: { enable: false },
                        dataSource: pieDataSource,
                        xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' }, name: 'text' },
                    }],
                    load: (args: IAccLoadedEventArgs) => {
                        let selectedTheme: string = location.hash.split('/')[1];
                        selectedTheme = selectedTheme ? selectedTheme : 'Material';
                        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                        selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
                    },
                    legendSettings: { visible: false }
                });
                pie.appendTo('#chart_annotation');
            }
        },
        animationComplete: (args: IAnimationCompleteEventArgs) => {
            isRender = true;
            let selectedTheme: string = location.hash.split('/')[1];
            pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', name: 'text' },
                }],
                theme: <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)),
                legendSettings: { visible: false },
                resized: (args: IAccResizeEventArgs) => { location.reload();  }
            });
            pie.appendTo('#chart_annotation');
        }
    });
    chart.appendTo('#container');
};