import { loadCultureFiles } from '../common/culture-loader';
import { SplineSeries, AreaSeries, DateTime, Crosshair } from '@syncfusion/ej2-charts';
import { RangeNavigator, Chart, IChangedEventArgs, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-charts';
import { ChartTheme, RangeTooltip, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(DateTime, SplineSeries, Tooltip, Crosshair);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Fetch } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with datetime axis
 */
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark'];
let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6','#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
let regionColor : string[] = ['rgba(99, 85, 199, 0.3)', 'rgba(143, 128, 244, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)',
    'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)'];

(window as any).default = (): void => {
    loadCultureFiles();
    let dataSource: Object[];
    let fetchApi: Fetch = new Fetch('./src/range-navigator/data-source/stock-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on Fetch success
    fetchApi.onSuccess = (data : Object[]): void => {
        dataSource = data;
        dataSource.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        let chart: Chart = new Chart(
            {
                primaryXAxis: {
                    valueType: 'DateTime',
                    edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
                },
                series: [{
                    dataSource: dataSource, xName: 'x', yName: 'y', width: 2, name: 'Rate', type: 'Spline'
                }],
                chartArea: { border: { width: 0 } },
                tooltip: { enable: true, shared: true },
                primaryYAxis: {
                    labelFormat: 'n1', minimum: 0.6,
                    maximum: 1, interval: 0.1, majorTickLines: { width: 0 }, lineStyle: { width: 0 }
                },
                height: '350', legendSettings: { visible: false },
                width: Browser.isDevice ? '100%' : '80%',
                theme: theme
            }
        );
        chart.appendTo('#chart');
        let range: RangeNavigator = new RangeNavigator(
            {
                valueType: 'DateTime',
                majorTickLines: {
                    width: 0
                },
                tooltip: { enable: true, format: 'yyyy/MM/dd', displayMode: 'Always' },
                value: [new Date('2011-01-01'), new Date('2013-12-31')],
                series: [
                    {
                        dataSource: dataSource, xName: 'x', yName: 'y', type: 'Area',
                        width: 2, animation: { enable: false },
                        fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                        border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                    }
                ],
                changed: (args: IChangedEventArgs) => {
                    chart.primaryXAxis.zoomFactor = args.zoomFactor;
                    chart.primaryXAxis.zoomPosition = args.zoomPosition;
                    chart.dataBind();
                },
                width: Browser.isDevice ? '100%' : '80%',
                theme: theme
            }
        );
        range.appendTo('#container');
    };
};