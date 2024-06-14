import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, HiloSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(HiloSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair);
import { Browser } from '@syncfusion/ej2-base';
import { chartValue } from './financial-data';


/**
 * Sample for Hilo series
 */
(window as any).default = (): void => {
    loadCultureFiles();

        let chart: Chart = new Chart({
            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'DateTime',
                crosshairTooltip: { enable: false },
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
                minimum: 10,
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
                    dataSource: chartValue, animation: { enable: true },
                    xName: 'period', low: 'low', high: 'high', name: 'Apple Inc'
                }
            ],
            //Initializing Chart title
            title: 'AAPL Historical',
            //Initializing User Interaction Tooltip, Crosshair and Zoom
            tooltip: {
                enable: true, shared: true, header:'', format:'<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b>', enableMarker: false
            },
            crosshair: {
                enable: true, lineType: 'Vertical', line: {
                    width: 0,
                }
            },
    
            width: Browser.isDevice ? '100%' : '75%',
            load: (args: ILoadedEventArgs) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            }
        });
        chart.appendTo('#container');
    };
