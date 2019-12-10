import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
    IAccAnimationCompleteEventArgs, AccPoints, IAccTextRenderEventArgs, AccumulationSelection,
    IAccLoadedEventArgs, Selection
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, Selection, PieSeries, AccumulationDataLabel, AccumulationTooltip, AccumulationSelection);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Doughnut
 */
let centerTitle: HTMLDivElement = document.createElement('div') as HTMLDivElement;
centerTitle.innerHTML = 'Expenses in Year';
centerTitle.style.position = 'absolute';
centerTitle.style.visibility = 'hidden';
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let count: number = 0;
    let pie: AccumulationChart = new AccumulationChart({
        enableSmartLabels: true,
        selectionMode: 'Point',
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Net-tution and Fees', y: 21, text: '21%' },
                    { 'x': 'Self-supporting Operations', y: 21, text: '21%' },
                    { 'x': 'Private Gifts', y: 8, text: '8%' },
                    { 'x': 'All Other', y: 8, text: '8%' },
                    { 'x': 'Local Revenue', y: 4, text: '4%' },
                    { 'x': 'State Revenue', y: 21, text: '21%' },
                    { 'x': 'Federal Revenue', y: 16, text: '16%' }
                ],
                xName: 'x', yName: 'y', startAngle: 0,
                endAngle: 360, innerRadius: '40%',
                dataLabel: {
                    visible: true, position: 'Inside',
                    font: { color: 'white', fontWeight: '600', size: '14px' }
                }, name: 'Revenue'
            }
        ],
        legendSettings: {
            visible: true, toggleVisibility: false,
            position: 'Right', height: '28%', width: '44%'
        },
        // Triggered animation complete, text render and load event
        animationComplete: (args: IAccAnimationCompleteEventArgs) => {
            centerTitle.style.fontSize = getFontSize(args.accumulation.initialClipRect.width);
            let rect: ClientRect = centerTitle.getBoundingClientRect();
            centerTitle.style.top = (args.accumulation.origin.y - rect.height / 2) + 'px';
            centerTitle.style.left = (args.accumulation.origin.x - rect.width / 2) + 'px';
            centerTitle.style.visibility = 'visible';
            let points: AccPoints[] = args.accumulation.visibleSeries[0].points;
            for (let point of points) {
                if (point.labelPosition === 'Outside' && point.labelVisible) {
                    let label: Element = document.getElementById('container_datalabel_Series_0_text_' + point.index);
                    label.setAttribute('fill', 'black');
                }
            }
        },
        textRender: (args: IAccTextRenderEventArgs) => {
            args.series.dataLabel.font.size = getFontSize(pie.initialClipRect.width);
            args.text = args.text + '%';
        },
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
            args.accumulation.legendSettings.position = Browser.isDevice ? 'Bottom' : 'Right';
        },
        loaded: (args: IAccLoadedEventArgs) => {
            pie.loaded = null;
            let pieinterval: number = setInterval(
                () => {
                    if (document.getElementById('donut-container')) {
                        if (count === 0) {
                            pie.series[0].dataSource = [{ 'x': 'Net-tution and Fees', y: 13, text: '13%' },
                            { 'x': 'Self-supporting Operations', y: 13, text: '13%' },
                            { 'x': 'Private Gifts', y: 17, text: '17%' }, { 'x': 'All Other', y: 18, text: '18%' },
                            { 'x': 'Local Revenue', y: 12, text: '12%' }, { 'x': 'State Revenue', y: 17, text: '17%' },
                            { 'x': 'Federal Revenue', y: 10, text: '10%' }
                            ];
                            pie.animate();
                            count++;
                        } else if (count === 1) {
                            pie.series[0].dataSource = [
                                { 'x': 'Net-tution and Fees', y: 55, text: '55%' },
                                { 'x': 'Self-supporting Operations', y: 14, text: '14%' },
                                { 'x': 'Private Gifts', y: 4, text: '4%' }, { 'x': 'All Other', y: 6, text: '6%' },
                                { 'x': 'Local Revenue', y: 11, text: '11%' }, { 'x': 'State Revenue', y: 5, text: '5%' },
                                { 'x': 'Federal Revenue', y: 6, text: '6%' }
                            ];
                            pie.animate();
                            count++;
                        } else if (count === 2) {
                            pie.series[0].dataSource = [
                                { 'x': 'Net-tution and Fees', y: 8, text: '8%' }, { 'x': 'Self-supporting Operations', y: 26, text: '26%' },
                                { 'x': 'Private Gifts', y: 12, text: '12%' }, { 'x': 'All Other', y: 18, text: '18%' },
                                { 'x': 'Local Revenue', y: 15, text: '15%' }, { 'x': 'State Revenue', y: 11, text: '11%' },
                                { 'x': 'Federal Revenue', y: 9, text: '9%' }
                            ];
                            pie.animate();
                            count++;
                        } else if (count === 3) {
                            pie.series[0].dataSource = [
                                { 'x': 'Net-tution and Fees', y: 10, text: '10%' }, { 'x': 'Self-supporting Operations', y: 7, text: '7%' },
                                { 'x': 'Private Gifts', y: 17, text: '17%' }, { 'x': 'All Other', y: 14, text: '14%' },
                                { 'x': 'Local Revenue', y: 21, text: '21%' }, { 'x': 'State Revenue', y: 14, text: '14%' },
                                { 'x': 'Federal Revenue', y: 17, text: '17%' }
                            ];
                            pie.animate();
                            count++;
                        } else if (count === 4) {
                            pie.series[0].dataSource = [
                                { 'x': 'Net-tution and Fees', y: 13, text: '13%' }, { 'x': 'Self-supporting Operations', y: 6, text: '6%' },
                                { 'x': 'Private Gifts', y: 9, text: '9%' }, { 'x': 'All Other', y: 9, text: '9%' },
                                { 'x': 'Local Revenue', y: 7, text: '7%' }, { 'x': 'State Revenue', y: 13, text: '13%' },
                                { 'x': 'Federal Revenue', y: 39, text: '39%' }
                            ];
                            pie.animate();
                            count = 0;
                        }
                    } else {
                        clearInterval(pieinterval);
                    }
                },
                3000);
        },
        tooltip: { enable: false, header: '<b>${point.x}</b>', format: 'Composition : <b>${point.y}%</b>' },
    });
    pie.appendTo('#donut-container');
    document.getElementById('donut-container').appendChild(centerTitle);
    function getFontSize(width: number): string {
        if (width > 300) {
            return '13px';
        } else if (width > 250) {
            return '8px';
        } else {
            return '6px';
        }
    }
};