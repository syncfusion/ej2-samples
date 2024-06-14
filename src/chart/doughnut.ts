import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationDataLabel);
/**
 * Sample for Doughnut chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [{ x: 'Labour', y: 18, text: '18%' }, { x: 'Legal', y: 8, text: '8%' },
                { x: 'Production', y: 15, text: '15%' }, { x: 'License', y: 11, text: '11%' },
                { x: 'Facilities', y: 18, text: '18%' }, { x: 'Taxes', y: 14, text: '14%' },
                { x: 'Insurance', y: 16, text: '16%' }],
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
                endAngle: 360, innerRadius: '40%', name: 'Project',
                explode: true, explodeOffset: '10%', explodeIndex: 3
            }
        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: true, position: 'Top'
        },
        // Initialize the tooltip
        tooltip: { enable: false },
        title: 'Project Cost Breakdown',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    pie.appendTo('#container');
};