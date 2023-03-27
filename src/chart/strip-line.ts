import { loadCultureFiles } from '../common/culture-loader';
import { ILoadedEventArgs, StripLineSettingsModel, StripLine, ChartTheme } from '@syncfusion/ej2-charts';
import { Chart, Category, Legend, Tooltip, SplineSeries, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(SplineSeries, Category, Legend, Tooltip, StripLine, Highlight);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2/base';

/**
 * Sample for Striplines
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', majorGridLines: { width: 0 },
            //Initializing Striplines
            majorTickLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 80, maximum: 100, interval: 5,
            lineStyle: { color: '#808080' }, labelFormat: '{value}%', rangePadding: 'None', majorTickLines: { width: 0 },
            //Initializing Striplines
            stripLines: [
                {
                    start: 95, end: 100, text: 'Good', color: '#ff512f', visible: true, horizontalAlignment: 'Middle',
                    textStyle: { size: '16px', color: '#ffffff', fontWeight: '500' }, border: { width: 0 },
                }, {
                    start: 85, end: 95, text: 'Ok', color: '#fc902a', visible: true, horizontalAlignment: 'Middle',
                    textStyle: { size: '16px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 },
                }, {
                    start: 80, end: 85, text: 'Average', visible: true, horizontalAlignment: 'Middle',
                    textStyle: { size: '16px', color: '#ffffff', fontWeight: '600' }, border: { width: 0 }, color: '#f9d423'
                }
            ]
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: [
                      { x : "Jan", y : 90 },
                      { x : "Feb", y : 92 },
                      { x : "Mar", y : 94 },
                      { x : "Apr", y : 95 },
                      { x : "May", y : 94 },
                      { x : "Jun", y : 96 },
                      { x : "Jul", y : 97 },
                      { x : "Aug", y : 98 },
                      { x : "Sep", y : 97 },
                      { x : "Oct", y : 95 },
                      { x : "Nov", y : 90 },
                      { x : "Dec", y : 95 }],
                xName: 'x', width: 2, yName: 'y', type: 'Spline', name: 'Product A',
                marker: { visible: true, width: 7, height: 7 }
            },
            {
                dataSource: [
                      { x : "Jan", y : 85 },
                      { x : "Feb", y : 86 },
                      { x : "Mar", y : 87 },
                      { x : "Apr", y : 88 },
                      { x : "May", y : 87 },
                      { x : "Jun", y : 90 },
                      { x : "Jul", y : 91 },
                      { x : "Aug", y : 90 },
                      { x : "Sep", y : 93 },
                      { x : "Oct", y : 90 },
                      { x : "Nov", y : 85 },
                      { x : "Dec", y : 90 }],
                xName: 'x', width: 2, yName: 'y', type: 'Spline', name: 'Product A',
                marker: { visible: true, width: 7, height: 7 }
            },
            {
                dataSource: [
                      { x : "Jan", y : 80 },
                      { x : "Feb", y : 81 },
                      { x : "Mar", y : 82 },
                      { x : "Apr", y : 83 },
                      { x : "May", y : 84 },
                      { x : "Jun", y : 83 },
                      { x : "Jul", y : 82 },
                      { x : "Aug", y : 81 },
                      { x : "Sep", y : 85 },
                      { x : "Oct", y : 84 },
                      { x : "Nov", y : 83 },
                      { x : "Dec", y : 82 }],
                xName: 'x', width: 2, yName: 'y', type: 'Spline', name: 'Product A',
                marker: { visible: true, width: 7, height: 7 }
            },
        ],
        legendSettings: { visible: true, enableHighlight: true },
        //Initializing Chart Title
        title: 'Weather Report',
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing User Interaction Tooltip
        tooltip: { enable: true, header: '', format: '<b>${point.x}</b> <br> Ratings : <b>${point.y}</b>' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};