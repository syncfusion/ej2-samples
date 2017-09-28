import { Chart, LineSeries, DataLabel, Marker, ILoadedEventArgs, ChartTheme, Category, ITextRenderEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DataLabel, Marker, Category);
/**
 * dataLabel template
 */
this.default = (): void => {
    let theme: ChartTheme;
    let chart: Chart = new Chart({
        title: 'Population of India ( 2010 - 2016 )',
        titleStyle: {
            color: '#606060', fontFamily: 'Roboto',
            fontStyle: 'medium', size: '14px'
        },
        chartArea: { border: { width: 0 }},
        primaryXAxis: {
            minimum: 2010, maximum: 2016,
            interval: 1,
            edgeLabelPlacement: 'Shift',
            labelStyle: {
                color: '#606060',
                fontFamily: 'Roboto',
                fontStyle: 'medium',
                size: '14px'
            },
            majorGridLines: { width: 0 },
            lineStyle: { color: '#eaeaea',  width: 1 }
        },
        primaryYAxis: {
            minimum: 900, maximum: 1300,
            labelFormat: '{value}M',
            labelStyle: {
                color: '#606060',
                fontFamily: 'Roboto',
                fontStyle: 'medium',
                size: '14px'
            },
            interval: 80,
            majorGridLines: {
                color: '#eaeaea',
                width: 1
            },
            lineStyle: {
                color: '#eaeaea',
                width: 1
            }
        },
        series: [
            {
                name: 'Male',
                dataSource: [
                    { x: 2010, y: 1014 }, { x: 2011, y: 1040 },
                    { x: 2012, y: 1065 }, { x: 2013, y: 1110 },
                    { x: 2014, y: 1130 }, { x: 2015, y: 1153 },
                    { x: 2016, y: 1175 }
                ], xName: 'x', yName: 'y',
                marker: {
                    visible: true,
                    shape: 'Circle',
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        margin: { right : 30},
                        template: '#Male-Material'
                    }
                }, width: 2
            }, {
                name: 'Female',
                dataSource: [
                    { x: 2010, y: 990 }, { x: 2011, y: 1010 },
                    { x: 2012, y: 1030 }, { x: 2013, y: 1070 },
                    { x: 2014, y: 1105 }, { x: 2015, y: 1138 },
                    { x: 2016, y: 1155 }
                ], xName: 'x', yName: 'y',
                marker: {
                    visible: true,
                    shape: 'Rectangle',
                    dataLabel: {
                        visible: true,
                        position: 'Bottom',
                        margin: { right : 15},
                        template: '#Female-Material'
                    }
                }, width: 2
            }
        ],
        textRender: (args: ITextRenderEventArgs) => {
            args.template = '#' + args.series.name + '-' + theme;
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
            args.chart.theme = theme;
        },
        legendSettings: {
            visible: true,
        }
    });
    chart.appendTo('#container');
};