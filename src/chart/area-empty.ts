import { loadCultureFiles } from '../common/culture-loader';
import { Chart, Category, AreaSeries, Legend, ILoadedEventArgs, ChartTheme, Highlight, DateTime, Tooltip} from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, Category, Legend, Highlight, Tooltip, DateTime);
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Area Series with Empty Point
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary Axes
        primaryXAxis: {
            valueType: 'DateTime', labelFormat: 'dd MMM', majorGridLines: { width: 0 }, minimum: new Date(2021, 10, 14), maximum: new Date(2021, 10, 23), edgeLabelPlacement: 'Shift'
        },
        primaryYAxis:
        {
            labelFormat: '{value}MB', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, minimum: 0, maximum: 5, interval: 1 
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Area',
                dataSource: [{ Period: new Date(2021, 10, 14), US_InflationRate: 2.2, IN_InflationRate: 0.8 }, { Period: new Date(2021, 10, 15), US_InflationRate: 2.0, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 16), US_InflationRate: 2.8, IN_InflationRate: 1.8 },
                    { Period: new Date(2021, 10, 17), US_InflationRate: 1.6, IN_InflationRate: 2.1 }, { Period: new Date(2021, 10, 18), US_InflationRate: 2.3, IN_InflationRate: null }, { Period: new Date(2021, 10, 19), US_InflationRate: 2.5, IN_InflationRate: 2.3 },
                    { Period: new Date(2021, 10, 20), US_InflationRate: 2.9, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 21), US_InflationRate: 1.1, IN_InflationRate: 1.5 }, { Period: new Date(2021, 10, 22), US_InflationRate: 1.4, IN_InflationRate: 0.5 },
                    { Period: new Date(2021, 10, 23), US_InflationRate: 1.1, IN_InflationRate: 1.3 }],
                xName: 'Period', width: 2,
                yName: 'US_InflationRate', name: 'Andrew',
                opacity: 0.5, border: { width: 2 },
                marker: { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }
            },
            {
                type: 'Area',
                dataSource: [{ Period: new Date(2021, 10, 14 ), US_InflationRate: 2.2, IN_InflationRate: 0.8 }, { Period: new Date(2021, 10, 15), US_InflationRate: 2.0, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 16), US_InflationRate: 2.8, IN_InflationRate: 1.8 },
                    { Period: new Date(2021, 10, 17), US_InflationRate: 1.6, IN_InflationRate: 2.1 }, { Period: new Date(2021, 10, 18), US_InflationRate: 2.3, IN_InflationRate: null }, { Period: new Date(2021, 10, 19), US_InflationRate: 2.5, IN_InflationRate: 2.3 },
                    { Period: new Date(2021, 10, 20), US_InflationRate: 2.9, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 21), US_InflationRate: 1.1, IN_InflationRate: 1.5 }, { Period:new Date(2021, 10, 22), US_InflationRate: 1.4, IN_InflationRate: 0.5 },
                    { Period: new Date(2021, 10, 23), US_InflationRate: 1.1, IN_InflationRate: 1.3 }],
                xName: 'Period', width: 2,
                yName: 'IN_InflationRate', name: 'Thomas',
                opacity: 0.5, border: { width: 2 },
                marker: { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }
            }
        ],
        //Initializing Chart title
        title: 'Data Consumption',
        width: Browser.isDevice ? '100%' : '75%',
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>' },
        legendSettings: { enableHighlight: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
};