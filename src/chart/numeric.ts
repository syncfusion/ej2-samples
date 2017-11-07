import {
    Chart, ColumnSeries, IAxisLabelRenderEventArgs, DataLabel,
    ILoadedEventArgs, Tooltip, Legend, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Tooltip, Legend);
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Numeric Axis Sample
 */
let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.orientation === 'Horizontal') {
        args.cancel = args.value === 15 || args.value === 21;
    }
};
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Death Overs',
            minimum: 15,
            maximum: 21,
            majorGridLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0,
            maximum: 25,
            interval: 5,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 16, y: 2 }, { x: 17, y: 14 },
                    { x: 18, y: 7 }, { x: 19, y: 7 },
                    { x: 20, y: 10 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'England', fill: '#1e90ff',
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        font: {
                            fontWeight: '600'
                        }
                    }
                }
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 16, y: 7 }, { x: 17, y: 7 },
                    { x: 18, y: 11 }, { x: 19, y: 8 },
                    { x: 20, y: 24 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'West Indies', fill: '#b22222',
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        font: {
                            fontWeight: '600'
                        }
                    }
                }
            }
        ],
        axisLabelRender: labelRender,
        width: Browser.isDevice ? '100%' : '60%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        //Initializing Chart title
        title: 'England vs West Indies',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true, format: '${point.x}th Over : ${point.y} Runs' }
    });
    chart.appendTo('#container');
};