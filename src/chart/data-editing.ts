import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, ColumnSeries, Category, DataEditing, Legend, DateTime, Tooltip,
    ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(LineSeries, ColumnSeries, Category, Legend, Tooltip, DateTime, DataEditing);
/**
 * Sample for Data Editing
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelFormat: 'yyyy',
            intervalType: 'Years',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            rangePadding: 'None',
            minimum: 0,
            title : 'Production(Billion in kWh)',
            labelFormat: '{value}B',
            maximum: 100,
            interval: 20,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                dragSettings: { enable: true },
                type: 'Column',
                dataSource: [
                      { x : 2005, y : 21 },
                      { x : 2006, y : 24 },
                      { x : 2007, y : 36 },
                      { x : 2008, y : 38 },
                      { x : 2009, y : 54 },
                      { x : 2010, y : 57 },
                      { x : 2011, y : 70 }
                ],
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 7,
                    height: 7
                },
                yName: 'y', name: 'Renewable'
            },
            {
                type: 'Line',
                dataSource: [
                      { x : 2005, y : 28 },
                      { x : 2006, y : 44 },
                      { x : 2007, y : 48 },
                      { x : 2008, y : 50 },
                      { x : 2009, y : 66 },
                      { x : 2010, y : 78 },
                      { x : 2011, y : 84 },
                ],
                dragSettings: { enable: true },
                xName: 'x', width: 2, marker: {
                    visible: true,
                    width: 7,
                    height: 7, 
                    isFilled: true
                },
                yName: 'y', name: 'Non-Renewable'
            },

        ],
        //Initializing Chart title
        title: 'Electricity - Production',
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#dataediting');
};
