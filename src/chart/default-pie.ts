import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Pie chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Chrome', y: 37, text: '37%' }, { 'x': 'UC Browser', y: 17, text: '17%' },
                    { 'x': 'iPhone', y: 19, text: '19%' },
                    { 'x': 'Others', y: 4, text: '4%' }, { 'x': 'Opera', y: 11, text: '11%' },
                    { 'x': 'Android', y: 12, text: '12%' }
                ],
                dataLabel: {
                    visible: true, position: 'Inside', name: 'text', font: { fontWeight: '600' }
                },
                radius: '70%', xName: 'x', yName: 'y', startAngle: 0, endAngle: 360, innerRadius: '0%',
                explode: true, explodeOffset: '10%', explodeIndex: 0, name: 'Browser'
            }
        ],
        center: { x: '50%', y: '50%' },
        enableSmartLabels: true,
        enableAnimation: false,
        legendSettings: { visible: false },
        // Initialize tht tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' },
        title: 'Mobile Browser Statistics',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    pie.appendTo('#container');
    function anglechange(value: number): void {
        pie.series[0].startAngle = +value;
        pie.series[0].endAngle = +value;
        pie.series[0].animation.enable = false;
        document.getElementById('anglevalue').innerHTML = value.toString();
        pie.removeSvg(); pie.refreshSeries(); pie.refreshChart();
    }
    document.getElementById('pieangle').onpointermove = document.getElementById('pieangle').ontouchmove =
        document.getElementById('pieangle').onchange = (e: Event) => {
            anglechange(+(document.getElementById('pieangle') as HTMLInputElement).value);
        };
    function radiuschange(value: number): void {
        pie.series[0].radius = value + '%';
        pie.series[0].animation.enable = false;
        document.getElementById('radius').innerHTML = (value / 100).toFixed(2);
        pie.removeSvg(); pie.refreshSeries(); pie.refreshChart();
    }
    document.getElementById('pieradius').onpointermove = document.getElementById('pieradius').ontouchmove =
        document.getElementById('pieradius').onchange = (e: Event) => {
            radiuschange(+(document.getElementById('pieradius') as HTMLInputElement).value);
        };
    function exploderadius(value: number): void {
        pie.visibleSeries[0].explodeOffset = value + '%';
        pie.series[0].animation.enable = false;
        document.getElementById('exploderadius').innerHTML = (value / 100).toFixed(2);
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('pieexploderadius').onpointermove = document.getElementById('pieexploderadius').ontouchmove =
        document.getElementById('pieexploderadius').onchange = (e: Event) => {
            exploderadius(+(document.getElementById('pieexploderadius') as HTMLInputElement).value);
        };
    function explodeIndex(value: number): void {
        pie.visibleSeries[0].explodeIndex = +value;
        pie.series[0].animation.enable = false;
        document.getElementById('explodeindex').innerHTML = value.toString();
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('pieexplodeindex').onpointermove = document.getElementById('pieexplodeindex').ontouchmove =
        document.getElementById('pieexplodeindex').onchange = (e: Event) => {
            explodeIndex(+(document.getElementById('pieexplodeindex') as HTMLInputElement).value);
        };
    function xchange(value: number): void {
        pie.center.x = value + '%';
        pie.series[0].animation.enable = false;
        document.getElementById('xvalue').innerHTML = value + '%';
        pie.removeSvg(); pie.refreshSeries(); pie.refreshChart();
    }
    document.getElementById('x').onpointermove = document.getElementById('x').ontouchmove =
        document.getElementById('x').onchange = (e: Event) => {
            xchange(+(document.getElementById('x') as HTMLInputElement).value);
        };
    function ychange(value: number): void {
        pie.center.y = value + '%';
        pie.series[0].animation.enable = false;
        document.getElementById('yvalue').innerHTML = value + '%';
        pie.removeSvg(); pie.refreshSeries(); pie.refreshChart();
    }
    document.getElementById('y').onpointermove = document.getElementById('y').ontouchmove =
        document.getElementById('y').onchange = (e: Event) => {
            ychange(+(document.getElementById('y') as HTMLInputElement).value);
        };

};