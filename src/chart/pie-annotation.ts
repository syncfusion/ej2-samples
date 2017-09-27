import {
    Chart, StackingColumnSeries, Category, Legend, ILoadedEventArgs, Selection, IMouseEventArgs, IAccLoadedEventArgs,
    ChartAnnotation, AccumulationChart, AccumulationDataLabel, IAnimationCompleteEventArgs,
} from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Legend, Selection, ChartAnnotation);
AccumulationChart.Inject(AccumulationChart, AccumulationDataLabel);
/**
 * Pie chart annootation
 */
this.default = (): void => {
    let pie: AccumulationChart;
    let isRender: boolean = false;
    let dataSource: Object = [
        { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
        { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
        { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
        { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
    ];
    let pieDataSource: Object[] = [
        { x: 'UK', y: 111 }, { x: 'Germany', y: 76 },
        { x: 'France', y: 66 }, { x: 'Italy', y: 34 }
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
            title: 'Sales in Billions', lineStyle: { width: 0 },
            minimum: 0, maximum: 700, interval: 100,
            majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
            minorTickLines: { width: 0 }, labelFormat: '{value}B',
            majorTickLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y0', name: 'UK', dataSource: dataSource },
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y1', name: 'Germany', dataSource: dataSource },
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y2', name: 'France', dataSource: dataSource },
            { type: 'StackingColumn', xName: 'x', width: 2, yName: 'y3', name: 'Italy', dataSource: dataSource }
        ],
        chartArea: { border: { width: 0 } }, title: 'Mobile Game Market by Country',
        selectionMode: 'Cluster',
        selectedDataIndexes: [{ series: 0, point: 0 }],
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        },
        legendSettings: { visible: false },
        annotations: [{
            content: '<div id="chart_annotation" style="width: 200px; height: 200px"></div>',
            x: '20%', y: '25%', coordinateUnits: 'Pixel', region: 'Series'
        }],
        chartMouseUp: (args: IMouseEventArgs) => {
            if (args.target.indexOf('Point') > -1) {
                let pointIndex: number = parseInt(args.target[args.target.length - 1], 10);
                pieDataSource = [];
                for (let series of chart.visibleSeries) {
                    pieDataSource.push({ 'x': series.name, 'y': series.points[pointIndex].y });
                }
                pie.series[0].dataSource = pieDataSource;
                pie.series[0].xName = 'x'; pie.series[0].yName = 'y';
                pie.refresh();
            }
        },
        loaded: (args: ILoadedEventArgs) => {
            if (isRender) {
                pie.destroy();
                pie = new AccumulationChart(pie = new AccumulationChart({
                    background: 'transparent',
                    series: [{
                        radius: '65%', animation: { enable: false },
                        dataSource: pieDataSource,
                        xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                    }],
                    load: (args: IAccLoadedEventArgs) => {
                        let selectedTheme: string = location.hash.split('/')[1];
                        args.accumulation.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
                    },
                    legendSettings: { visible: false }
                }));
                pie.appendTo('#chart_annotation');
            }
        },
        animationComplete: (args: IAnimationCompleteEventArgs) => {
            isRender = true;
            pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                }],
                load: (args: IAccLoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    args.accumulation.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
                },
                legendSettings: { visible: false }
            });
            pie.appendTo('#chart_annotation');
        }
    });
    chart.appendTo('#container');
};