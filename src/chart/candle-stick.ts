import {
    ChartTheme, Chart, CandleSeries, Legend, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries,
    Crosshair, StripLine, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs
} from '@syncfusion/ej2-charts';
import { RangeNavigator, PeriodSelector, IRangeLoadedEventArgs, IChangedEventArgs, IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser, Ajax } from '@syncfusion/ej2-base';
Chart.Inject(CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair, Legend);
RangeNavigator.Inject(PeriodSelector);
let pointColors: string[] = [];

let getLabelText: Function = (value: number): string => {
    return (((value) / 1000000000)).toFixed(1) + 'bn';
};

/**
 * Sample for Candle series
 */
this.renderChart = (chartData: Object[]): void => {
            let chart: Chart = new Chart({
                // Initialize the axes
                primaryXAxis: {
                    valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 },
                },
                primaryYAxis: {
                    title: 'Volume', valueType: 'Logarithmic', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 },
                    stripLines: [
                        {
                            end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                            opacity: 0.03, zIndex: 'Behind'
                        }]
                },
                axes: [{
                    name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
                    labelFormat: 'n0', title: 'Price', plotOffset: 30, lineStyle: { width: 0 }, rangePadding: 'None'
                }],
                // Initialize the chart rows
                rows: [{ height: '30%' }, { height: '70%' }],
                // Initialize the chart series
                series: [
                    { type: 'Column', dataSource: chartData, animation: { enable: true }, xName: 'x', yName: 'volume', name: 'Volume' },
                    {
                        type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                        dataSource: chartData, animation: { enable: true }, volume: 'volume',
                        xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc',
                    }
                ], tooltip: { enable: true, shared: true },
                tooltipRender: (args: ITooltipRenderEventArgs) => {
                    if (!args.series.index) {
                        args.text = 'Volume : <b>' + getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
                    }
                },
                pointRender: (args: IPointRenderEventArgs) => {
                    if (args.series.type === 'Candle') { pointColors.push(args.fill); } else {
                        args.fill = pointColors[args.point.index];
                    }
                },
                axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                    if (args.axis.name === 'primaryYAxis') { args.text = getLabelText(+args.text); }
                    if (args.axis.name === 'secondary') { args.text = '$' + args.text; }
                },
                load: (args: ILoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                },
                width: Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } },
                crosshair: { enable: true, lineType: 'Vertical' },
                legendSettings: { visible: false },
            });
            chart.appendTo('#container');
            let range: RangeNavigator = new RangeNavigator({
                dataSource: chartData, xName: 'x', yName: 'close', disableRangeSelector: true, width: Browser.isDevice ? '100%' : '80%',
                load: (args: IRangeLoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.rangeNavigator.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                },
                loaded: (args: IRangeLoadedEventArgs) => {
                    if (!Browser.isDevice) {
                        document.getElementById('selector_Secondary_Element').style.transform = 'translate(14%)';
                    }
                },
                changed: (args: IChangedEventArgs) => {
                    chart.primaryXAxis.zoomFactor = 1; chart.primaryXAxis.zoomPosition = 0;
                    let filterData: Object[] = chartData.filter((data: object) => {
                        /* tslint:disable:no-string-literal */
                        return (data['x'].getTime() >= (args.start) && data['x'].getTime() <= (args.end));
                    });
                    chart.series[0].animation.enable = false; chart.series[0].dataSource = filterData;
                    chart.series[1].animation.enable = false; chart.series[1].dataSource = filterData; chart.refresh();
                },
                periodSelectorSettings: {
                    position: 'Top',
                    periods: [
                        { text: '1M', interval: 1, intervalType: 'Months' },
                        { text: '3M', interval: 2, intervalType: 'Months' },
                        { text: '2Q', interval: 2, intervalType: 'Quarter' },
                        { text: '1Y', interval: 1, intervalType: 'Years' },
                        { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
                        { text: 'YTD' }, { text: 'All' }
                    ]
                }
            });
            range.appendTo('#selector');
        };
this.default = (): void => {
    let chartData: Object[];
    let ajax: Ajax = new Ajax('./src/chart/data-source/financial-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        chartData = JSON.parse(data);
        chartData.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        this.renderChart(chartData);
    };
};
