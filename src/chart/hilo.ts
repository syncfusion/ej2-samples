import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, HiloSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(HiloSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for Hilo series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chartData: Object[];
    let ajax: Ajax = new Ajax('./src/chart/data-source/financial-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        chartData = JSON.parse(data);
        chartData.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        let chart: Chart = new Chart({
            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'DateTime',
                crosshairTooltip: { enable: true },
                minimum: new Date('2016-12-31'),
                maximum: new Date('2017-09-30'),
                majorGridLines: { width: 0 }
    
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: 'Price',
                minimum: 100,
                maximum: 180,
                interval: 20,
                labelFormat: '${value}',
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 }
            },
            legendSettings: { visible: false },
            //Initializing Chart Series
            series: [
                {
                    type: 'Hilo',
                    dataSource: chartData, animation: { enable: true },
                    xName: 'x', low: 'low', high: 'high', name: 'Apple Inc'
                }
            ],
            //Initializing Chart title
            title: 'AAPL Historical',
            //Initializing User Interaction Tooltip, Crosshair and Zoom
            tooltip: {
                enable: true, shared: true
            },
            crosshair: {
                enable: true, lineType: 'Vertical', line: {
                    width: 0,
                }
            },
    
            width: Browser.isDevice ? '100%' : '80%',
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            }
        });
        chart.appendTo('#container');
    };
};