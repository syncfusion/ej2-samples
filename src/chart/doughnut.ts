import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
/**
 * Sample for Doughnut chart
 */
this.default = (): void => {
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [{ x: 'Labour', y: 28, text: '28%' }, { x: 'Legal', y: 10, text: '10%' },
                { x: 'Production', y: 20, text: '20%' }, { x: 'License', y: 15, text: '15%' },
                { x: 'Facilities', y: 23, text: '23%' }, { x: 'Taxes', y: 17, text: '17%' },
                { x: 'Insurance', y: 12, text: '12%' }],
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Inside',
                    font: {
                        fontWeight: '600',
                        color: '#ffffff'
                    }
                },
                radius: '70%', xName: 'x',
                yName: 'y', startAngle: 0,
                endAngle: 360, innerRadius: '40%',
                explode: true, explodeOffset: '10%', explodeIndex: 3
            }
        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: false,
        },
        // Initialize the tooltip
        tooltip: { enable: true, format: '${point.x} <br> ${point.y} %' },
        title: 'Project Cost Breakdown',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    pie.appendTo('#container');
};