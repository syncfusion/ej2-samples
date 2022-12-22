import { loadCultureFiles } from '../common/culture-loader';
import { Chart, ScatterSeries, Legend, Tooltip, ILoadedEventArgs, ChartTheme, Highlight } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { scatterData } from './scatter-data';
Chart.Inject(ScatterSeries, Legend, Tooltip, Highlight );

/**
 * Sample for Scatter Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            minimum: 40,
            maximum: 56,
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift',
            title: 'Shoulder Breadth (cm)'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            majorTickLines: {
                width: 0
            },
            minimum: 70,
            maximum: 140,
            interval: 10,
            lineStyle: {
                width: 0
            },
            title: 'Bust Chest Circumference (cm)',
            rangePadding: 'None'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Scatter',
                dataSource: scatterData.getCluster1Value,
                xName: 'Breadth', width: 2, marker: {
                    visible: false,
                    width: 10,
                    height: 10,
                    shape: 'Circle'
                },
                yName: 'Circumference', name: '18-20 Years'
            },
            {
                type: 'Scatter',
                dataSource: scatterData. getCluster2Value,
                xName: 'Breadth', width: 2, marker: {
                    visible: false,
                    width: 10,
                    height: 10,
                    shape: 'Circle'
                },
                yName: 'Circumference', name: '21-25 Years'
            },
            {
                type: 'Scatter',
                dataSource: scatterData.getCluster3Value,
                xName: 'Breadth', width: 2, marker: {
                    visible: false,
                    width: 10,
                    height: 10,
                    shape: 'Circle'
                },
                yName: 'Circumference', name: '26-30 Years'
            },
            {
                type: 'Scatter',
                dataSource: scatterData.getCluster4Value,
                xName: 'Breadth', width: 2, marker: {
                    visible: false,
                    width: 10,
                    height: 10,
                    shape: 'Circle'
                },
                yName: 'Circumference', name: '31-35 years'
            },
            {
                type: 'Scatter',
                dataSource: scatterData.getCluster5Value,
                xName: 'Breadth', width: 2, marker: {
                    visible: false,
                    width: 10,
                    height: 10,
                    shape: 'Circle'
                },
                yName: 'Circumference', name: '36+ Years'
            }
        ],
        legendSettings:{enableHighlight:true},
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
           
        },
        width: Browser.isDevice ? '100%' : '75%',
        // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
       // custom code end
    });
    chart.appendTo('#container');
};