import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, Category, ILoadedEventArgs, ChartTheme, Legend,
    Trendlines, ScatterSeries, SplineSeries, LineSeries, Tooltip
} from '@syncfusion/ej2-charts';
Chart.Inject(Category, ScatterSeries, SplineSeries, LineSeries, Trendlines, Legend, Tooltip);
import { Browser } from '@syncfusion/ej2/base';

/**
 * Samples for Trend Lines
 */
let series1: Object[] = [   { x : 1947, y : 4.76 },
      { x : "1967", y : 7.50 },
      { x : "1974", y : 8.10 },
      { x : "1989", y : 16.64 },
      { x : "1990", y : 17.32},
      { x : "2000", y : 43.56 },
      { x : "2007", y : 39.27 },
      { x : "2013", y : 56.57 },
      { x : "2019", y : 71.74 },
      { x : "2020", y : 76.67 },
      { x : "2021", y : 72.75},];

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: { labelFormat:'yyyy', valueType:'Category', majorTickLines: { width: 0 }, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', lineStyle: { width:1 } },
        primaryYAxis: {
            title: 'Rupees against Dollars',labelFormat: "₹{value}", minimum: 0, maximum: 80,
            interval: 10, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }
        },  
        //Initializing Chart Series
        series: [{
            dataSource: series1, xName: 'x', yName: 'y', name: 'Rupees', type: 'Spline', marker: { visible: true, height: 7, width: 7, isFilled:true },
            //Initializing TrendLines
            trendlines: [{ type: 'Linear', width: 3, name: 'Trends',  fill:  '#C64A75', enableTooltip: false }]
        }],
        //Initializing User Interaction Tooltip 
        tooltip: { enable: true },  //Initializing Chart Title
        width: Browser.isDevice ? '100%' : '75%',
        title: 'USD to INR Rates',
        legendSettings: { visible: true, shapeHeight: 15, shapeWidth: 15 }, chartArea: { border: { width: 0 } },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};