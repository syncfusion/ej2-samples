import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, HiloOpenCloseSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-charts';
Chart.Inject(HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for Hilo Open Close series
 */
this.renderChart = (chartData: Object[]): void => {
            let chart: Chart = new Chart({

                //Initializing Primary X Axis
                primaryXAxis: {
                    valueType: 'DateTime',
                    crosshairTooltip: { enable: true },
                    majorGridLines: { width: 0 }

                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    title: 'Price',
                    labelFormat: 'n0',
                    lineStyle: { width: 0 }, rangePadding: 'None',
                    majorTickLines: { width: 0 }
                },
                chartArea: { border: { width: 0 } },
                //Initializing Chart Series
                series: [
                    {
                        type: 'HiloOpenClose',
                        dataSource: chartData, animation: { enable: true },
                        bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                        xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc'
                    }
                ],
                //Initializing Chart title     
                tooltip: { enable: true, shared: true },
                crosshair: {
                    enable: true, lineType: 'Vertical', line: { width: 0 }
                },
                legendSettings: { visible: false }, width: Browser.isDevice ? '100%' : '80%',
                axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                    if (args.axis.title === 'Price') {
                        args.text = '$' + args.text;
                    }
                },
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
        this.renderChart(chartData);
    };
};
