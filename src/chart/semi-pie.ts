import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
    IAccLoadedEventArgs } from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip);

/**
 * Semi Pie sample
 */
this.default = (): void => {
    let pie: AccumulationChart = new AccumulationChart({
        series: [
            {
                dataSource: [
                    { x: 'Australia', y: 53.3, text: 'Australia' },
                    { x: 'China', y: 55.7, text: 'China' },
                    { x: 'India', y: 60.5, text: 'India' },
                    { x: 'Japan', y: 12.5, text: 'Japan' },
                    { x: 'South Africa', y: 79.4, text: 'South Africa' },
                    { x: 'United Kingdom', y: 70.9, text: 'United Kingdom' },
                    { x: 'United States', y: 45.0, text: 'United States' }
                ],
                xName: 'x',
                yName: 'y',
                startAngle: 270,
                endAngle: 90,
                radius: '90%',
                innerRadius: '40%',
                dataLabel: {
                    visible: true, position: 'Outside',
                    connectorStyle: { length: '10%' }, name: 'text',
                    font: { size: '14px'}
                },
            }
        ],
        tooltip: { enable: true, format : '${point.x} : ${point.y}%' },
        legendSettings: {
            visible: false,
        },
        title: 'Agricultural land percentage',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.accumulation.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    pie.appendTo('#container');
    document.getElementById('inner-radius').onpointermove = document.getElementById('inner-radius').ontouchmove =
    document.getElementById('inner-radius').onchange = (e: Event) => {
        let innerradius: number = +(document.getElementById('inner-radius') as HTMLInputElement).value;
        pie.series[0].innerRadius = innerradius + '%';
        document.getElementById('innerradius').innerHTML = (innerradius / 100).toFixed(2);
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    };
    document.getElementById('range-min').onpointermove = document.getElementById('range-min').ontouchmove =
    document.getElementById('range-min').onchange = (e: Event) => {
        let rangeMin: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('range-min'));
        pie.series[0].startAngle = parseFloat(rangeMin.value);
        document.getElementById('startangle').innerHTML = rangeMin.value;
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    };
    document.getElementById('range-max').onpointermove = document.getElementById('range-max').ontouchmove =
    document.getElementById('range-max').onchange = (e: Event) => {
        let rangeMax: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('range-max'));
        pie.series[0].endAngle = parseFloat(rangeMax.value);
        document.getElementById('endangle').innerHTML = rangeMax.value;
        pie.series[0].animation.enable = false;
        pie.removeSvg();
        pie.refreshSeries();
        pie.refreshChart();
    };
};