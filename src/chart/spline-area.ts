import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DateTime, SplineAreaSeries, Legend, ILoadedEventArgs, ChartTheme, DateTimeCategory, Highlight, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(SplineAreaSeries, DateTime, Legend, DateTimeCategory, Highlight, Tooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime', labelFormat: 'y', majorGridLines: { width: 0 }, intervalType: 'Years', edgeLabelPlacement: 'Shift', minimum: new Date(2001, 0, 1), maximum: new Date(2012, 0, 1)
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}%', lineStyle: { width: 0 }, maximum: 4, interval: 1, majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: [
                    { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
                    { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
                    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
                    { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
                    { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
                ],
                name: 'US', xName: 'x', yName: 'y', type: 'SplineArea',
                width:2,
                border: { width: 2 },
                opacity: 0.5,
                marker:{ visible: true, isFilled: true, height: 6, width: 6  ,shape:'Circle'}
            },
            {
                dataSource: [
                    { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
                    { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
                    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
                    { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
                    { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
                ],
                name: 'France', xName: 'x', yName: 'y', type: 'SplineArea',
                border: { width: 2 },
                width:2,
                opacity: 0.5,
                marker:{ visible: true, isFilled: true, height: 7, width: 7  ,shape:'Diamond'}
            },
        ],
        tooltip:{enable: true },
        //Initializing Chart title
        title: 'Inflation Rate in Percentage',
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings:{enableHighlight: true},
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};