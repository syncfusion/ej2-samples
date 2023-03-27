import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, LineSeries, Category,
    Legend, ILoadedEventArgs, ChartTheme, DataLabel
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { Tooltip } from '@syncfusion/ej2/charts';
Chart.Inject(ColumnSeries, LineSeries, Category, Legend, DataLabel, Tooltip);

/**
 * Sample for Indexed Category Axis
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            isIndexed: true,
            labelRotation: Browser.isDevice ? -45 : 0,
            labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
            majorTickLines: { width: 0 }, crosshairTooltip: { enable: true }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            
            labelFormat: '{value}%', majorTickLines: { width: 0 }
        },
        chartArea: {
            border: {   
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: "India", y: 7.9 },
                    { x: "Myanmar", y: 7.3 },
                    { x: "Bangladesh", y: 6.0 },
                    { x: "Cambodia", y: 7.0 },
                    { x: "China", y: 6.9 },
                ],
                xName: 'x', width: 2, marker: { visible: false, height: 10, width: 10, dataLabel: { visible: true,  position: 'Top', font: { size : Browser.isDevice ? '8px' : '11px'}}},
                yName: 'y', name: '2015',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: "Australia", y: 2.5 },
                    { x: "Poland", y: 2.7 },
                    { x: "Singapore", y: 2.0 },
                    { x: "Canada", y: 1.4 },
                    { x: "Germany", y: 1.8 },
                ],
                xName: 'x', width: 2, marker: { visible: false, height: 10, width: 10, dataLabel: { visible: true,  position: 'Top', font: { size : Browser.isDevice ? '8px' : '11px'}}},
                yName: 'y', name: '2016',
            },
        ],

        //Initializing Chart title
        title: 'Real GDP Growth',
        //Initializing User Interaction Tooltip and Crosshair
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
    document.getElementById('isIndexed').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('isIndexed'));
        chart.primaryXAxis.isIndexed = element.checked;
        if (chart.primaryXAxis.isIndexed) {
            chart.series[0].type = 'Column';
            chart.series[1].type = 'Column';
            chart.series[0].marker.visible = false;
            chart.series[1].marker.visible = false;
            chart.primaryXAxis.labelRotation = 0;
        } else {
            chart.series[0].type = 'Line';
            chart.series[1].type = 'Line';
            chart.series[0].marker.visible = true;
            chart.series[0].marker.dataLabel.visible = true;
            chart.series[0].marker.dataLabel.position = 'Top';
            chart.series[1].marker.visible = true;
            chart.series[1].marker.dataLabel.visible = true;
            chart.series[1].marker.dataLabel.position = 'Top';
            chart.primaryXAxis.labelRotation = 90;
        }
        chart.refresh();
    };
};