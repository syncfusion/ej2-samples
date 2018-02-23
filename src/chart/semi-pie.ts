import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip,
    IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip);

/**
 * Sample fro Semi Pie chart
 */
this.default = (): void => {
    let pie: AccumulationChart = new AccumulationChart({
        //Initializing Series
        series: [
            {
                dataSource: [
                    { x: 'Australia', y: 53, text: 'AUS: 14%' },
                    { x: 'China', y: 56, text: 'CHN: 15%' },
                    { x: 'India', y: 61, text: 'IND: 16%' },
                    { x: 'Japan', y: 13, text: 'JPN: 3%' },
                    { x: 'South Africa', y: 79, text: 'ZAF: 21%' },
                    { x: 'United Kingdom', y: 71, text: 'UK: 19%' },
                    { x: 'United States', y: 45, text: 'USA: 12%' }
                ],
                xName: 'x', name: 'Agricultural',
                yName: 'y',
                startAngle: 270,
                endAngle: 90,
                radius: '90%',
                innerRadius: '40%',
                dataLabel: {
                    visible: true, position: 'Outside',
                    connectorStyle: { length: '10%' }, name: 'text',
                    font: { size: '14px' }
                },
            }
        ],
        //Initializing Tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}%</b>' },
        legendSettings: {
            visible: false,
        },
        //Initializing Title
        title: 'Agricultural Land Percentage',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
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