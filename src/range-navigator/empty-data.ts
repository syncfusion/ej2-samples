import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, CandleSeries, AreaSeries, DateTime, Crosshair, Points } from '@syncfusion/ej2-charts';
import { ChartTheme, RangeTooltip, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, CandleSeries, Crosshair, Tooltip);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Fetch } from '@syncfusion/ej2-base';
import { borderColor, loadRangeNavigatorTheme, themes } from './theme-colors';

/**
 * Sample for empty points
 */

let startDate: Date = new Date(2012, 4, 2);

let theme: ChartTheme = loadRangeNavigatorTheme();
(window as any).default = (): void => {
    loadCultureFiles();
    let dataSrc: Object[];
    let stockData: Object[] = [];
    let fetchApi: Fetch = new Fetch('./src/range-navigator/data-source/empty-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on FETCH success
    fetchApi.onSuccess = (data: Object[]): void => {
        dataSrc = data;
        dataSrc.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        for (let i: number = 0; i <= 250; i++) {
            stockData.push(dataSrc[i]);
            if (i > 45 && 50 > i) {
                (stockData[i] as Points).open = null;
            } else if (i > 95 && 100 > i) {
                (stockData[i] as Points).open = null;
            } else if (i > 145 && 150 > i) {
                (stockData[i] as Points).open = null;
            } else if (i > 195 && 200 > i) {
                (stockData[i] as Points).open = null;
            } else if (i > 245 && 250 > i) {
                (stockData[i] as Points).open = null;
            }
        }
        let chart: Chart = new Chart(
            {
                primaryXAxis: {
                    valueType: 'DateTime', crosshairTooltip: { enable: true },
                    edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }
                },
                series: [{
                    dataSource: stockData, xName: 'x', yName: 'open', type: 'Area', name: 'AAPL',
                    fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                    border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                }],
                chartArea: { border: { width: 0 } },
                primaryYAxis: {
                    labelFormat: '${value}', minimum: 40, maximum: 140, interval: 20,
                    majorTickLines: { width: 0 }, lineStyle: { width: 0 }
                },
                tooltip: { enable: true, shared: true },
                height: '350', legendSettings: { visible: false },
                width: Browser.isDevice ? '100%' : '80%',
                theme: theme
            }
        );
        chart.appendTo('#chart');
    
        let range: RangeNavigator = new RangeNavigator(
            {
                labelPosition: 'Outside',
                valueType: 'DateTime',
                majorTickLines: {
                    width: 0
                },
                majorGridLines: {
                    width: 0
                },
                tooltip: { enable: true, displayMode: 'Always' },
                value: [new Date('2013-12-27'), new Date('2015-03-23')],
                navigatorBorder: { width: 0 },
                series: [{
                    dataSource: stockData, xName: 'x', yName: 'open', type: 'Area', width: 2, animation: { enable: false },
                    fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                    border: { width: 2, color: borderColor[themes.indexOf(theme.toLowerCase())] }
                }],
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