import { loadCultureFiles } from '../common/culture-loader';
import { SplineSeries, AreaSeries, DateTime, Crosshair } from '@syncfusion/ej2-charts';
import { RangeNavigator, Chart, IChangedEventArgs, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-charts';
import { ChartTheme, RangeTooltip, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(DateTime, SplineSeries, Tooltip, Crosshair);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with datetime axis
 */
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentDark'];
let borderColor : string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113'];
let regionColor : string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)'];

(window as any).default = (): void => {
    loadCultureFiles();
    let dataSource: Object[];
    let ajax: Ajax = new Ajax('./src/range-navigator/data-source/stock-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        dataSource = JSON.parse(data);
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