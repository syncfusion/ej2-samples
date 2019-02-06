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
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];

this.renderChart = (dataSource: Object[]): void => {
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
                    axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                        if (args.axis.name === 'primaryYAxis') {
                            args.text = '€' + args.text;
                        }
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
                            border: { width: 2, color: borderColor[themes.indexOf(theme)] }
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
        this.renderChart(dataSource);
    };
};