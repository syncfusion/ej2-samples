import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
/**
 * Sample for Pie with Various Radius
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: AccumulationChart = new AccumulationChart({
        // Initialize the chart series
        series: [
            {
                dataSource: [
                    { x: 'Argentina', y: 505370, r: '50%' },
                    { x: 'Belgium', y: 551500, r: '70%' },
                    { x: 'Cuba', y: 312685, r: '84%' },
                    { x: 'Dominican Republic', y: 350000, r: '97%' },
                    { x: 'Egypt', y: 301000, r: '84%' },
                    { x: 'Kazakhstan', y: 300000, r: '70%' },
                    { x: 'Somalia', y: 357022, r: '90%' }

                ],
                dataLabel: {
                    visible: true, position: 'Outside',
                    name: 'x'
                },
                radius: 'r', xName: 'x',
                yName: 'y', innerRadius: '20%'
            },

        ],
        enableSmartLabels: true,
        legendSettings: {
            visible: true,
            reverse: true
        },
        // Initialize tht tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>' },
        enableAnimation: true,
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    pie.appendTo('#container');
};
