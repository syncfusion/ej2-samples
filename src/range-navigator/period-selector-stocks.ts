import { loadCultureFiles } from '../common/culture-loader';
import { DateTime, Zoom, IAxisLabelRenderEventArgs, IAxisRangeCalculatedEventArgs } from '@syncfusion/ej2-charts';
import { RangeNavigator, Chart, IChangedEventArgs, LineSeries, IMouseEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { ChartTheme, ChartAnnotation, PeriodSelector, CandleSeries, Tooltip, ColumnSeries } from '@syncfusion/ej2-charts';
import { ITooltipRenderEventArgs, IRangeLoadedEventArgs, Crosshair, StripLine, SeriesModel } from '@syncfusion/ej2-charts';
import { getElement, VisibleLabels, IPointRenderEventArgs, PeriodSelectorSettingsModel } from '@syncfusion/ej2-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { SmaIndicator, EmaIndicator, TmaIndicator, AccumulationDistributionIndicator, AtrIndicator } from '@syncfusion/ej2-charts';
import { RsiIndicator, MacdIndicator, StochasticIndicator, MomentumIndicator, BollingerBands } from '@syncfusion/ej2-charts';
import { withInBounds } from '@syncfusion/ej2-charts/src/common/utils/helper';
Chart.Inject(
    CandleSeries, Tooltip, DateTime, Crosshair, LineSeries, Zoom,
    StripLine, ColumnSeries, ChartAnnotation,
    SmaIndicator, EmaIndicator, TmaIndicator, AccumulationDistributionIndicator, AtrIndicator,
    RsiIndicator, MacdIndicator, StochasticIndicator, MomentumIndicator, BollingerBands
);
RangeNavigator.Inject(
    PeriodSelector, DateTime
);
import { chartData } from './stock-chart-data';

/**
 * Sample for stock chart using period selector
 */
let index: number = 0;
let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
let removeSecondaryElement: Function;
let periodsValue: PeriodSelectorSettingsModel = {
    position: 'Top',
    periods: [
        { text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' },
        { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'YTD' },
        { text: '1Y', interval: 1, intervalType: 'Years' },
        { text: '2Y', interval: 2, intervalType: 'Years', selected: true
         },
        { text: 'All' }
    ]
};
let annotationString: string = '<div id="annotation" style="line-height: 18px;' +
    ' font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
    ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;' +
    ' border-radius: 3px">';
removeSecondaryElement = (): void => {
    setTimeout(() => {
        if (getElement('annotation')) {
            remove(getElement('annotation'));
        }
    },
        // tslint:disable-next-line:align
        2000
    );
};
let range: RangeNavigator;
let pointColors: string[] = [];
let chartSeries: SeriesModel[] = [{
    dataSource: chartData, width: 2, type: 'Candle', animation: { enable: true },
    xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
    name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d'
}, {
    dataSource: chartData, width: 2, type: 'Column', animation: { enable: true },
    xName: 'x', yName: 'volume', yAxisName: 'secondary'
}];
let getContent: Function = (value: string): string => {
    let text: string[] = value.split('<br/>'); let html: string = '<table><thead>' + text[0] + '</thead>';
    for (let i: number = 1; i < text.length; i++) {
        let value: string[] = text[i].split(':');
        if (i === text.length - 1) {
            html += '<tr><td style="opacity:0.5">' + value[0] + '</td><td style="padding-left: 5px;">' +
                Math.round(((+value[1].split('</b>')[0].split('<b>')[1]) / 10000000)) + 'B';
        } else {

            html += '<tr><td style="opacity:0.5">' + value[0] + '</td><td style="padding-left: 5px;">$' +
                (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
        }
    }
    return html;
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } },
        annotations: [{ content: '<div id="annotation"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '15%', y: '20%' }],
        primaryYAxis: {
            crosshairTooltip: { enable: true }, labelFormat: 'n0', plotOffset: 25,
            rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, rangePadding: 'None', majorGridLines: { width: 0 }
        }, rows: [{ height: '30%' }, { height: '70%' }],
        axes: [{
            name: 'secondary', opposedPosition: true, rowIndex: 0,
            majorGridLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, rangePadding: 'None'
        }], height: '350',
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            if (args.axis.name === 'secondary') {
                args.text = Math.round((args.value / 10000000)) + 'B';
            } else if (args.axis.orientation === 'Vertical') {
                args.text = '$' + Math.round(args.value);
            }
        },
        axisRangeCalculated: (args: IAxisRangeCalculatedEventArgs) => {
            chart.setAnnotationValue(0, '<div></div>');
        },
        loaded: (args: ILoadedEventArgs) => {
            let labels: VisibleLabels[] = (args.chart.axisCollections[0]).visibleLabels;
            let maxValue: number = args.chart.axisCollections[0].visibleRange.max;
            if (args.chart.primaryXAxis.stripLines.length === 1) {
                for (let i: number = 0; i < labels.length; i += 2) {
                    args.chart.primaryXAxis.stripLines.push({
                        start: new Date(labels[i].value), end: labels[i + 1] ? new Date(labels[i + 1].value) : new Date(maxValue),
                        zIndex: 'Behind', border: { width: 0, color: 'transparent' }, rotation: null,
                        opacity: 0.7, textStyle: {}, text: '', color: 'whitesmoke', visible: true
                    });
                }
                args.chart.refresh();
            }
        },
        series: chartSeries, tooltip: {
            enable: true, shared: true,
            format: '${point.x}<br/>High : <b>${point.high}</b><br/>Low :' +
                ' <b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>'
        },
        indicators: [{
            type: 'Tma', period: 3, fastPeriod: 8, slowPeriod: 5, seriesName: 'Apple Inc', macdType: 'Both', width: 2,
            macdPositiveColor: '#2ecd71', macdNegativeColor: '#e74c3d', fill: '#6063ff'
        }],
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (args.series.type === 'Candle') {
                chart.setAnnotationValue(0, annotationString + (getContent(args.text) + '</table>') + '</div>');
            }
            args.text = '';
        },
        pointRender: (args: IPointRenderEventArgs) => {
            if (args.series.type === 'Candle') { pointColors.push(args.fill); } else {
                args.fill = pointColors[args.point.index];
            }
        },
        chartMouseLeave: (args: IMouseEventArgs) => { removeSecondaryElement(); },
        chartMouseMove: (args: IMouseEventArgs) => {
            if (!withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                removeSecondaryElement();
            }
        }, margin: { top: 0 }, chartArea: { border: { width: 1, color: 'whitesmoke' } },
        // tslint:disable-next-line:max-line-length
        zoomSettings: { enableMouseWheelZooming: true, enablePinchZooming: true, mode: 'XY', toolbarItems: [] }, crosshair: { enable: true, lineType: 'Both' },
        width: Browser.isDevice ? '100%' : '80%', theme: theme, legendSettings: { visible: false }
    });
    chart.appendTo('#chart');
    range = new RangeNavigator(
        {
            valueType: 'DateTime', disableRangeSelector: true,
            dataSource: chartData, xName: 'x', yName: 'close', theme: theme, width: Browser.isDevice ? '100%' : '75%',
            load: (args: IRangeLoadedEventArgs) => {
                args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
            }, periodSelectorSettings: periodsValue,
            loaded: (args: IRangeLoadedEventArgs) => {
                if (!Browser.isDevice) {
                    document.getElementById('container_Secondary_Element').style.transform = 'translate(14%)';
                }
                let value: number = range.svgObject.getBoundingClientRect().left - range.element.getBoundingClientRect().left;
                document.getElementById('stockRange').style.transform = 'translateX(' + (value - 10) + 'px)';
            },
            changed: (args: IChangedEventArgs) => {
                let data: Object[] = chartData.filter((data: object) => {
                    /* tslint:disable:no-string-literal */
                    return (data['x'].getTime() >= (args.start as Date).getTime() &&
                        data['x'].getTime() <= (args.end as Date).getTime());
                });
                chart.series[0].animation.enable = false; chart.primaryXAxis.zoomPosition = 0;
                chart.primaryXAxis.zoomFactor = 1; chart.series[1].animation.enable = false;
                chart.primaryXAxis.stripLines = [{ visible: true }];
                chart.indicators[0].animation.enable = false; pointColors = [];
                chart.series[0].dataSource = data; chart.series[1].dataSource = data;
                chart.refresh(); chart.setAnnotationValue(0, '<div id="annotation"></div>');
            }
        }
    );
    range.appendTo('#container');
};