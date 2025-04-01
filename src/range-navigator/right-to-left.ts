import { loadCultureFiles } from '../common/culture-loader';
import {
    RangeNavigator, Chart, IChangedEventArgs, LineSeries, AreaSeries, DateTime, ChartTheme, RangeTooltip, Tooltip, Crosshair
} from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, LineSeries, Tooltip, Crosshair);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Fetch } from '@syncfusion/ej2-base';
import { borderColor, loadRangeNavigatorTheme, themes } from './theme-colors';

/**
 * Sample for range navigator with RTL support
 */
let theme: ChartTheme = loadRangeNavigatorTheme();


(window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: Object[];
    let fetchApi: Fetch = new Fetch('./src/range-navigator/data-source/axes-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on FETCH success
    fetchApi.onSuccess = (data: Object[]): void => {
        datasrc = data;
        datasrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['xDate'] = new Date(data['xDate']);
        });
        let chart: Chart = new Chart(
            {
                primaryXAxis: {
                    valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift',
                    majorGridLines: { width: 0 }
                },
                primaryYAxis: {
                    majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
                    maximum: 87, minimum: 82, interval: 1
                },
                chartArea: { border: { width: 0 } },
                series: [{
                    dataSource: datasrc, xName: 'xDate', yName: 'High', width: 2, type: 'Area',
                    fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)', name: 'Profit',
                    border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                }],
                tooltip: { enable: true, shared: true, header: '<b>England</b>', format: '${point.x} : <b>${point.y}</b>' },
                height: '350', enableRtl: true,
                width: Browser.isDevice ? '100%' : '80%',
                theme: theme, legendSettings: { visible: false }
            }
        );
        chart.appendTo('#chart');

        let range: RangeNavigator = new RangeNavigator(
            {
                width: Browser.isDevice ? '100%' : '80%',
                valueType: 'DateTime',
                tooltip: { enable: true, displayMode: 'Always' },
                intervalType: 'Years',
                value: [new Date('2014-01-01'), new Date('2015-12-31')],
                series: [{
                    dataSource: datasrc, xName: 'xDate', yName: 'High', type: 'Area',
                    fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                    border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                }],
                enableRtl: true,
                changed: (args: IChangedEventArgs) => {
                    chart.primaryXAxis.zoomFactor = args.zoomFactor;
                    chart.primaryXAxis.zoomPosition = args.zoomPosition;
                    chart.dataBind();
                },
                theme: theme
            }
        );
        range.appendTo('#container');
    };
};