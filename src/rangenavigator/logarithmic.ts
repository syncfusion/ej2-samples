import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, ILabelRenderEventsArgs, IRangeTooltipRenderEventArgs } from '@syncfusion/ej2-charts';
import { Logarithmic, StepAreaSeries, StepLineSeries, RangeTooltip } from '@syncfusion/ej2-charts';
import { Crosshair, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(Logarithmic, StepAreaSeries, Crosshair);
RangeNavigator.Inject(Logarithmic, StepLineSeries, RangeTooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for range navigator with logarithmic axis
 */

let data: object[] = [];
let max: number = 100;
for (let i: number = 0; i < 100; i++) {
    data.push({
        x: Math.pow(10, i * 0.1),
        y: Math.floor(Math.random() * (80 - 30 + 1)) + 30
    });
}
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart(
        {
            primaryXAxis: {
                valueType: 'Logarithmic', crosshairTooltip: { enable: false }, interval: 1,
                edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 },
                title: 'Numers of Goods Consumers'
            },
            primaryYAxis: {
                title: 'Inflation', minimum: 0, maximum: 100,
                labelFormat: '{value}%', majorTickLines: { width: 0 }, lineStyle: { width: 0 }
            },
            chartArea: { border: { width: 0 } },
            series: [{
                dataSource: data, xName: 'x', yName: 'y', width: 2,
                animation: { enable: false }, type: 'StepArea', marker: { visible: true },
                fill: 'url(#' + theme.toLowerCase() + '-gradient-chart)',
                border: { width: 2, color: borderColor[themes.indexOf(theme)] }
            }],
            height: '350',
            width: Browser.isDevice ? '100%' : '80%',
            theme: theme
        }
    );
    chart.appendTo('#chart');

    let range: RangeNavigator = new RangeNavigator(
        {
            tooltip: { enable: true },
            labelPosition: 'Outside',
            valueType: 'Logarithmic',
            labelIntersectAction: 'None',
            interval: 1,
            series: [{ dataSource: data, xName: 'x', yName: 'y', width: 2, type: 'StepLine' }],
            value: [4, 6],
            labelRender: (args: ILabelRenderEventsArgs) => {
                args.text = (+args.text).toExponential().toLocaleUpperCase();
            },
            tooltipRender: (args: IRangeTooltipRenderEventArgs) => {
                args.text = [(+(+args.text).toFixed(1)).toExponential(1).toString().toLocaleUpperCase()];
            },
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