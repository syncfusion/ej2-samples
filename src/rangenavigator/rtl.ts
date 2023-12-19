import { loadCultureFiles } from '../common/culture-loader';
import {
    RangeNavigator, Chart, IChangedEventArgs, LineSeries, AreaSeries, DateTime, ChartTheme, RangeTooltip, Tooltip, Crosshair
} from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, LineSeries, Tooltip, Crosshair);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with RTL support
 */
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
(window as any).default = (): void => {
    loadCultureFiles();
    let datasrc: object[];
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    // tslint:disable-next-line:no-function-expression
    xhttp.onreadystatechange = function (): void {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            datasrc = JSON.parse(xhttp.responseText);
            datasrc.map((data: Object) => {
                // tslint:disable-next-line:no-string-literal
                data['xDate'] = new Date(data['xDate']);
            });
            let chart: Chart = new Chart(
                {
                    primaryXAxis: {
                        valueType: 'DateTime', crosshairTooltip: { enable: true }, edgeLabelPlacement: 'Shift',
                        isInversed: true, majorGridLines: { width: 0 }
                    },
                    primaryYAxis: {
                        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelFormat: '{value}%',
                        maximum: 87, minimum: 82, interval: 1
                    },
                    chartArea: { border: { width: 0 } },
                    series: [{
                        dataSource: datasrc, xName: 'xDate', yName: 'High', width: 2, type: 'Area',
                        fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)', name: 'Profit',
                        border: { width: 2, color: borderColor[themes.indexOf(theme)] }
                    }],
                    tooltip: { enable: true, shared: true, header: '<b>England<b>', format: '${point.x} : <b>${point.y}<b>' },
                    height: '350',
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
                        border: { width: 2, color: borderColor[themes.indexOf(theme)] }
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
        }
    };
    xhttp.open('GET', location.origin + location.pathname + 'src/rangenavigator/data-source/axes-data.json', true);
    xhttp.send();
};