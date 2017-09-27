import {
    Chart, StackingColumnSeries, Category, Legend, ILoadedEventArgs, Selection, IMouseEventArgs, IAccLoadedEventArgs,
    ChartAnnotation, AccumulationChart, AccumulationDataLabel
} from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Legend, Selection, ChartAnnotation);
AccumulationChart.Inject(AccumulationChart, AccumulationDataLabel);
/**
 * Pie chart annootation
 */
this.default = (): void => {
    let pie: AccumulationChart;
    let dataSource: Object = [
        { x: '2014', y0: 51.1, y1: 76.9, y2: 66.1, y3: 34.1 },
        { x: '2015', y0: 67.3, y1: 49.5, y2: 19.3, y3: 38.2 },
        { x: '2016', y0: 143.4, y1: 121.7, y2: 91.4, y3: 44.0 },
        { x: '2017', y0: 19.9, y1: 28.5, y2: 65.4, y3: 51.6 },
        { x: '2018', y0: 30, y1: 66.7, y2: 32.9, y3: 61.9 },
        { x: '2019', y0: 189.0, y1: 128.9, y2: 122.4, y3: 76.5 },
        { x: '2020', y0: 72.7, y1: 97.3, y2: 65.9, y3: 82.0 }
    ];

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Years', lineStyle: { width: 0 },
            majorGridLines: { width: 0 }, minorGridLines: { width: 1 },
            minorTickLines: { width: 1 }, interval: 1,
            labelIntersectAction: 'Rotate45',
            valueType: 'Category'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Sales in Billions',
            minimum: 0, maximum: 700, interval: 100,
            majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
            minorTickLines: { width: 1 }, labelFormat: '{value}B',
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingColumn', xName: 'x', width: 2, yName: 'y0', name: 'UK',
                dataSource: dataSource,
            },
            {
                type: 'StackingColumn', xName: 'x', width: 2, yName: 'y1', name: 'Germany',
                dataSource: dataSource,
            },
            {
                type: 'StackingColumn', xName: 'x', width: 2, yName: 'y2', name: 'France',
                dataSource: dataSource,
            },
            {
                type: 'StackingColumn', xName: 'x', width: 2, yName: 'y3', name: 'Italy',
                dataSource: dataSource,
            }
        ],
        title: 'Mobile Game Market by Country',
        selectionMode: 'Cluster',
        selectedDataIndexes: [{ series: 0, point: 0 }],
        tooltip: { enable: true, format: '${series.name}<br>${point.x} : ${point.y}' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        },
        annotations: [{
            content: '<div id="chart_annotation" style="width: 200px; height: 200px"></div>',
            x: '20%',
            y: '25%',
            coordinateUnits: 'Pixel',
            region: 'Series'
        }],
        chartMouseUp: (args: IMouseEventArgs) => {
            if (args.target.indexOf('Point') > -1) {
                let pointIndex: number = parseInt(args.target[args.target.length - 1], 10);
                let pieDataSurce: Object[] = [];
                for (let series of chart.visibleSeries) {
                    let data: Object = {
                        'x': series.name,
                        'y': series.points[pointIndex].y
                    };
                    pieDataSurce.push(data);
                }
                pie.series[0].dataSource = pieDataSurce;
                pie.series[0].xName = 'x';
                pie.series[0].yName = 'y';
                pie.refresh();
            }
        },
        loaded: (args: ILoadedEventArgs) => {
            pie = new AccumulationChart({
                background: 'transparent',
                series: [{
                        radius: '65%', animation: { enable: false},
                        dataSource: [{ x: 'UK', y: 111.1 }, { x: 'Germany', y: 76.9 }, { x: 'France', y: 66.1 }, { x: 'Italy', y: 34.1 }],
                        xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font : { color: 'white'}},
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