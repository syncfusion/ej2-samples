import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, } from '@syncfusion/ej2-charts';
import {
    ChartTheme, Crosshair, StepLineSeries, RangeTooltip, Tooltip, IRangeTooltipRenderEventArgs,
    IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-charts';
import { SplineSeries, ChartAnnotation, ILoadedEventArgs, ChartAnnotationSettingsModel, getSeriesColor } from '@syncfusion/ej2-charts';
Chart.Inject(SplineSeries, Crosshair, ChartAnnotation, Tooltip);
RangeNavigator.Inject(StepLineSeries, RangeTooltip);
import { Browser, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with numeric axis
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
let chartAnnotation: ChartAnnotationSettingsModel[] = [];
chartAnnotation.push({ content: '<div id="exchangeRate"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '85%', y: '15%' });
let backgroundColor: string = 'white';

let datasrc: object[];
let sl: object[]; let aus: object[] = [];
this.renderChart = (chartData: Object[]): void => {
    let chart: Chart = new Chart(
        {
            primaryXAxis: { title: 'Overs', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, labelFormat: 'n1' },
            primaryYAxis: { title: 'Runs', minimum: 0, majorTickLines: { width: 0 }, lineStyle: { width: 0 } },
            chartArea: { border: { width: 0 } },
            series: [
                { name: 'AUS', dataSource: aus, xName: 'x', yName: 'y', width: 2, animation: { enable: false }, type: 'Spline' },
                { name: 'SL', dataSource: sl, xName: 'x', yName: 'y', width: 2, animation: { enable: false }, type: 'Spline' }
            ],
            annotations: chartAnnotation,
            height: '350', legendSettings: { visible: false },
            width: Browser.isDevice ? '100%' : '80%',
            theme: theme,
            axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                if (args.axis.orientation === 'Horizontal') {
                    let value: number = Math.abs(Number(args.text));
                    args.text = String(value);
                }
            },
            loaded: (args: ILoadedEventArgs) => {
                let series1: string = args.chart.visibleSeries[0].interior;
                let series2: string = args.chart.visibleSeries[1].interior;
                let html: string = '<table>';
                html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid '
                    + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
                html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid '
                    + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
                html += '</table>';
                chart.setAnnotationValue(0, '<div id="exchangeRate" style="line-height: 18px;' +
                    'font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                    ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;' +
                    'border-radius: 3px">' +
                    html +
                    '</div>');
            }
        }
    );
    chart.appendTo('#chart');

    let range: RangeNavigator = new RangeNavigator(
        {
            labelPosition: 'Outside',
            tooltip: { enable: true },
            value: [31, 50],
            series: [
                { dataSource: aus, xName: 'x', yName: 'y' },
                { dataSource: sl, xName: 'x', yName: 'y' }
            ],
            changed: (args: IChangedEventArgs) => {
                chart.primaryXAxis.zoomFactor = args.zoomFactor;
                chart.primaryXAxis.zoomPosition = args.zoomPosition;
                chart.dataBind();
            },
            tooltipRender: (args: IRangeTooltipRenderEventArgs) => {
                args.text[0] = Math.round(parseInt(args.text[0], 10)).toString();
            },
            width: Browser.isDevice ? '100%' : '80%',
            theme: theme
        }
    );
    range.appendTo('#container');
};
(window as any).default = (): void => {
    loadCultureFiles();
    let ajax: Ajax = new Ajax('./src/range-navigator/data-source/double.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        datasrc = JSON.parse(data);
        // tslint:disable-next-line:no-string-literal
        sl = datasrc['srilanka']; aus = datasrc['aus'];
        getAnnotaiton(aus, getSeriesColor(theme)[0]);
        getAnnotaiton(sl, getSeriesColor(theme)[1]);
        this.renderChart(datasrc);
    };
};

function getAnnotaiton(args: Object[], color: string): void {
    for (let i: number = 0; i < args.length; i++) {
        /* tslint:disable:no-string-literal */
        if (args[i]['isWicket']) {
            chartAnnotation.push({
                content: '<div id= "wicket" style="width: 20px; height:20px; border-radius: 5px;' +
                'background: ' + backgroundColor + '; border: 2px solid ' + color + '; color:' + color + '">W</div>',
                /* tslint:disable:no-string-literal */
                x: args[i]['x'],
                /* tslint:disable:no-string-literal */
                y: args[i]['y'],
                coordinateUnits: 'Point'
            });
        }
    }
}