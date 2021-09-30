import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, CandleSeries, AreaSeries, DateTime, Crosshair, Points } from '@syncfusion/ej2-charts';
import { ChartTheme, RangeTooltip, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, CandleSeries, Crosshair, Tooltip);
RangeNavigator.Inject(AreaSeries, DateTime, RangeTooltip);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for empty points
 */

let startDate: Date = new Date(2012, 4, 2);

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
let borderColor : string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
let regionColor : string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)'];


this.renderChart = (stockData: Object[]): void => {
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
(window as any).default = (): void => {
    loadCultureFiles();
    let dataSrc: Object[];
    let stockData: Object[] = [];
    let ajax: Ajax = new Ajax('./src/range-navigator/data-source/empty-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        dataSrc = JSON.parse(data);
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
        this.renderChart(stockData);
    };
};