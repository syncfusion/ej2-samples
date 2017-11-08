import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 * Sample for Pie chart
 */
this.default = (): void => {
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { 'x': 'Chrome', y: 37.42, text: '37.42%' }, { 'x': 'UC Browser', y: 16.94, text: '16.94%' },
                    { 'x': 'iPhone', y: 17.94, text: '17.94%' },
                    { 'x': 'Others', y: 3.69, text: '3.69%' }, { 'x': 'Opera', y: 11.37, text: '11.37%' },
                    { 'x': 'Android', y: 11.73, text: '11.73%' }
                ],
                dataLabel: {
                    visible: true,
                    position: 'Inside', name: 'text',
                    font: {
                        fontWeight: '600',
                        color: '#ffffff'
                    }
                },
                radius: '70%', xName: 'x',
                yName: 'y', startAngle: 0,
                endAngle: 360, innerRadius: '0%',
                explode: true, explodeOffset: '10%', explodeIndex: 0
            }
        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: false,
        },
        // Initialize tht tooltip
        tooltip: { enable: true, format: '${point.x} <br> ${point.y} %' },
        title: 'Mobile Browser Statistics',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    pie.appendTo('#container');
    function anglechange(value: number): void {
        pie.series[0].startAngle = +value;
        pie.series[0].endAngle = +value;
        document.getElementById('anglevalue').innerHTML = value.toString();
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('pieangle').onpointermove = document.getElementById('pieangle').ontouchmove =
        document.getElementById('pieangle').onchange = (e: Event) => {
            anglechange(+(document.getElementById('pieangle') as HTMLInputElement).value);
        };
    function radiuschange(value: number): void {
        pie.series[0].radius = value + '%';
        document.getElementById('radius').innerHTML = (value / 100).toFixed(2);
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('pieradius').onpointermove = document.getElementById('pieradius').ontouchmove =
        document.getElementById('pieradius').onchange = (e: Event) => {
            radiuschange(+(document.getElementById('pieradius') as HTMLInputElement).value);
        };
    function exploderadius(value: number): void {
        pie.visibleSeries[0].explodeOffset = value + '%';
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
        document.getElementById('explodeindex').innerHTML = value.toString();
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    }
    document.getElementById('pieexplodeindex').onpointermove = document.getElementById('pieexplodeindex').ontouchmove =
        document.getElementById('pieexplodeindex').onchange = (e: Event) => {
            explodeIndex(+(document.getElementById('pieexplodeindex') as HTMLInputElement).value);
        };
};