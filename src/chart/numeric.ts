import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, IAxisLabelRenderEventArgs, DataLabel,
    ILoadedEventArgs, Tooltip, Legend, ChartTheme, Highlight
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Tooltip, Legend, Highlight);
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Numeric Axis
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            minimum: 15,
            maximum: 21,
            interval: 1,
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
                xName: 'x', width: 2, columnSpacing: 0.1,
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
                xName: 'x', width: 2, columnSpacing: 0.1,
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
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings:{ enableHighlight: true, visible: true},
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            if (selectedTheme === 'highcontrast') {
               args.chart.series[0].fill = '#57BCFF';
               args.chart.series[1].fill = '#E58184';
            }
        },
        //Initializing Chart title
        title: 'England vs West Indies',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>' }
    });
    chart.appendTo('#container');
};