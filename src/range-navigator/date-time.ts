import { loadCultureFiles } from '../common/culture-loader';
import { SplineSeries, AreaSeries, DateTime, Crosshair } from '@syncfusion/ej2-charts';
import { RangeNavigator, Chart, IChangedEventArgs, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-charts';
import { ChartTheme, RangeTooltip, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(DateTime, SplineSeries, Tooltip, Crosshair);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Fetch } from '@syncfusion/ej2-base';
import { borderColor, loadRangeNavigatorTheme, themes } from './theme-colors';

/**
 * Sample for range navigator with datetime axis
 */

let theme: ChartTheme = loadRangeNavigatorTheme();
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