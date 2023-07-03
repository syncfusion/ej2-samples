import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Legend, Tooltip, ILoadedEventArgs, Highlight } from '@syncfusion/ej2-charts';
import {  ParetoSeries, Category, LineSeries } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(ColumnSeries, Category, ParetoSeries, LineSeries, Legend, Tooltip, Highlight);

/**
 * Sample for Pareto chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            interval: 1,
            valueType: 'Category',
            majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
            lineStyle: { width: 0 },labelIntersectAction: 'Rotate45'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Frequency of Occurence',
            minimum: 0,
            maximum: 25,
            interval: 5,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
            minorGridLines: { width: 1 }, minorTickLines: { width: 0 }
        },

        chartArea: {
            border: {
                width: 0
            }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Pareto',
                dataSource: [
                    { x: 'Button Defect', y: 23 }, { x: 'Pocket Defect', y: 16 },
                    { x: 'Collar Defect', y: 10 }, { x: 'Cuff Defect', y: 7 },
                    { x: 'Sleeve Defect', y: 6 }, { x: 'Other Defect', y: 2}
                ],
                xName: 'x', yName: 'y', name: 'Defect', width: 2, opacity: 0.75, columnWidth: 0.4,
                paretoOptions: {
                    marker: { visible: true, isFilled: true, width: 7, height: 7 },
                    dashArray: '3,2',
                    width: 2
                },
                cornerRadius: { topLeft: Browser.isDevice? 4 : 6, topRight: Browser.isDevice ? 4 : 6 }
            }
        ],
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Defects in Shirts',
        legendSettings: { visible: true, enableHighlight: true },
        //Initializing User Interaction
        tooltip: {
            enable: true,
            shared: true,
            format: '${series.name} : <b>${point.y}</b>'
        },
        // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            if (selectedTheme === 'material3') {
                args.chart.series[0].paretoOptions.fill = '#F7523F';
                args.chart.series[0].paretoOptions.marker.fill = '#F7523F';
            }
            else {
                args.chart.series[0].paretoOptions.fill = null;
                args.chart.series[0].paretoOptions.marker.fill = null;
            }
        }
        // custom code end
    });
    chart.appendTo('#container');
};