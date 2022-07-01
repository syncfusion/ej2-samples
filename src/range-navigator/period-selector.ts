import { loadCultureFiles } from '../common/culture-loader';
import { RangeNavigator, Chart, IChangedEventArgs, LineSeries, AreaSeries, DateTime, Crosshair } from '@syncfusion/ej2-charts';
import { ChartTheme, ChartAnnotation, PeriodSelector, CandleSeries, MomentumIndicator, Tooltip } from '@syncfusion/ej2-charts';
import { IAxisLabelRenderEventArgs, withInBounds, IAxisRangeCalculatedEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { RangeTooltip, IRangeLoadedEventArgs, Zoom, getElement, ITooltipRenderEventArgs } from '@syncfusion/ej2-charts';
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
Chart.Inject(AreaSeries, DateTime, LineSeries, Crosshair, ChartAnnotation, CandleSeries, MomentumIndicator, Tooltip, Zoom);
RangeNavigator.Inject(AreaSeries, DateTime, PeriodSelector, RangeTooltip);
import { Browser, remove, Ajax } from '@syncfusion/ej2-base';

/**
 * Sample for period selector
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');

// tslint:disable-next-line:max-func-body-length
let removeSecondaryElement: Function;
let datasrc: object[];
let data1: object[] = [];
(window as any).default = (): void => {
    loadCultureFiles();
    let value: object;
    let j: number = 2100;
    let ajax: Ajax = new Ajax('./src/range-navigator/data-source/period-data.json', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        datasrc = JSON.parse(data);
        for (let i: number = 0; i < datasrc.length; i++) {
            value = datasrc[i];
            /* tslint:disable:no-string-literal */
            data1.push({
                High: value['High'], Low: value['Low'], Close: value['Close'], Open: value['Open'], date: new Date(2010, 6, j)
            });
            j++;
        }
        let chart: Chart = new Chart({
            series: [{
                dataSource: data1, width: 2, type: 'Candle', animation: { enable: true }, xName: 'date', low: 'Low',
                high: 'High', close: 'Close', volume: 'Volume', open: 'Open', name: 'Bitcoin', bearFillColor: '#2ecd71',
                bullFillColor: '#e74c3d', yName: 'Close'
            }], width: Browser.isDevice ? '100%' : '80%', crosshair: { enable: true },
            annotations: [{ content: '<div id="annotation"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '15%', y: '25%' }],
            zoomSettings: { enableMouseWheelZooming: true, mode: 'X', toolbarItems: [] }, tooltip: { enable: true, shared: true },
            chartArea: { border: { width: 0 } }, theme: theme, legendSettings: { visible: false }, height: '250',
            axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                if (args.axis.opposedPosition) {
                    let value: number = Math.round(Number(args.text)) / 1000; args.text = '$' + String(value) + 'k';
                }
            }, primaryYAxis: { labelFormat: 'n0', opposedPosition: true, lineStyle: { width: 0 } },
            tooltipRender: (args: ITooltipRenderEventArgs) => {
                if (args.text.length > 0) {
                    let text: string[] = args.text.split('<br/>'); let html: string = '<table><thead>' + text[0] + '</thead>';
                    let value: string[];
                    for (let i: number = 1; i < text.length; i++) {
                        value = text[i].split(':');
                        html += '<tr><td style="opacity:0.5">' + value[0] + ':</td><td style="padding-left: 5px;">$' +
                            (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
                    }
                    html += '</table>';
                    chart.setAnnotationValue(
                        0,
                        '<div id="annotation" style="line-height: 18px;font-size:13px;background: #fff; opacity:0.9; color: #464e56; ' +
                        ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>');
                }
                args.text = '';
            }, primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' },
            chartMouseMove: () => {
                if (!withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) { removeSecondaryElement(); }
            },
            load: (args: ILoadedEventArgs) => {
                args.chart.tooltip.format = args.chart.series[0].type === 'Candle' ?
                    '${point.x}<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                    'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>' :
                    '${point.x}<br/>Close : <b>${point.close}</b>';
                document.getElementById('switch').style.display = 'block';
            }, axisRangeCalculated: (args: IAxisRangeCalculatedEventArgs) => { chart.setAnnotationValue(0, '<div></div>'); },
        });
        chart.appendTo('#chart');
        removeSecondaryElement = (): void => {
            setTimeout(() => { if (getElement('annotation')) { remove(getElement('annotation')); } }, 2000);
        };
        let rangeTop: RangeNavigator = new RangeNavigator({
            loaded: (args: IRangeLoadedEventArgs) => {
                if (!Browser.isDevice) { document.getElementById('container_Secondary_Element').style.transform = 'translate(13%)'; }
            }, disableRangeSelector: true, width: Browser.isDevice ? '100%' : '80%',
            load: (args: IRangeLoadedEventArgs) => {
                args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
            }, labelPosition: 'Outside', valueType: 'DateTime', dataSource: data1, xName: 'date', yName: 'Close', theme: theme,
            periodSelectorSettings: {
                periods: [{ text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' },
                { text: '6M', interval: 6, intervalType: 'Months' }, { text: '1Y', interval: 1, intervalType: 'Years' },
                { text: '2Y', interval: 2, intervalType: 'Years', selected: true }, { text: 'ALL' }], position: 'Top',
            }
        });
        rangeTop.appendTo('#container');
        let switchObj: Switch = new Switch({
            change: (args: ChangeEventArgs) => {
                chart.series[0].type = !args.checked ? 'Line' : 'Candle'; chart.annotations[0].content = ''; chart.refresh();
            }, name: 'Closing Value', cssClass: 'custom-iOS', value: 'Closing value', checked: true,
        });
        switchObj.appendTo('#switch');
        let rangeBottom: RangeNavigator = new RangeNavigator({
            labelPosition: 'Outside', valueType: 'DateTime', series: [{ dataSource: data1, xName: 'date', yName: 'Close' }],
            changed: (args: IChangedEventArgs) => {
                rangeTop.periodSelectorModule.datePicker.startDate = args.start as Date;
                rangeTop.periodSelectorModule.datePicker.endDate = args.end as Date; rangeTop.dataBind();
                chart.primaryXAxis.zoomFactor = 1; chart.primaryXAxis.zoomPosition = 0;
                let filterData: Object[] = data1.filter((data: object) => {
                    /* tslint:disable:no-string-literal */
                    return (data['date'].getTime() >= (args.start as Date).getTime() &&
                        data['date'].getTime() <= (args.end as Date).getTime());
                });
                chart.series[0].animation.enable = false;
                chart.series[0].dataSource = filterData; chart.setAnnotationValue(0, '<div id="annotation"></div>'); chart.refresh();
            }, width: Browser.isDevice ? '100%' : '80%', value: [new Date('2016-05-15'), new Date('2018-05-15')], theme: theme,
        });
        rangeBottom.appendTo('#range');
        rangeTop.changed = (args: IChangedEventArgs) => {
            rangeBottom.rangeSlider.setSlider((args.start as Date).getTime(), (args.end as Date).getTime(), false, false);
            let filterData: Object[] = data1.filter((data: object) => {
                /* tslint:disable:no-string-literal */
                return (data['date'].getTime() >= (args.start as Date).getTime() &&
                    data['date'].getTime() <= (args.end as Date).getTime());
            });
            chart.series[0].animation.enable = false;
            chart.series[0].dataSource = filterData; chart.refresh(); chart.setAnnotationValue(0, '<div id="annotation"></div>');
        };
    };
};