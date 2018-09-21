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
                    { 'x': 'Chrome', y: 37, text: '37%' }, { 'x': 'UC Browser', y: 17, text: '17%' },
                    { 'x': 'iPhone', y: 19, text: '19%' },
                    { 'x': 'Others', y: 4, text: '4%' }, { 'x': 'Opera', y: 11, text: '11%' },
                    { 'x': 'Android', y: 12, text: '12%' }
                ],
                dataLabel: {
                    visible: true,
                    position: 'Inside', name: 'text',
                    font: {
                        fontWeight: '600'
                    }
                },
                radius: '70%', xName: 'x',
                yName: 'y', startAngle: 0,
                endAngle: 0, innerRadius: '0%',
                explode: true, explodeOffset: '10%', explodeIndex: 0, name: 'Browser'
            }
        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: false,
        },
        // Initialize tht tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' },
        enableAnimation: false,
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