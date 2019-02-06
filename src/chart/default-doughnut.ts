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
centerTitle.innerHTML = 'Expenses <br> Year  &nbsp 2013';
centerTitle.style.position = 'absolute';
centerTitle.style.visibility = 'hidden';
(window as any).default = (): void => {
    loadCultureFiles();
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
                    name: 'text',
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
            pie.animateSeries = true;
        },
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
            args.accumulation.legendSettings.position = Browser.isDevice ? 'Bottom' : 'Right';
        },
        tooltip: {
            enable: true,
            header: '<b>${point.x}</b>',
            format: 'Composition : <b>${point.y}%</b>'
        },
        title: 'Education Institutional Revenue',
    });
    pie.appendTo('#container');
    document.getElementById('container').appendChild(centerTitle);
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