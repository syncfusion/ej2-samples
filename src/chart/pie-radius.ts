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
                    { x: 'Argentina', y: 505370, r: '100' },
                    { x: 'Belgium', y: 551500, r: '118.7' },
                    { x: 'Cuba', y: 312685, r: '124.6' },
                    { x: 'Dominican Republic', y: 350000, r: '137.5' },
                    { x: 'Egypt', y: 301000, r: '150.8' },
                    { x: 'Kazakhstan', y: 300000, r: '155.5' },
                    { x: 'Somalia', y: 357022, r: '160.6' }

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
        },
        // Initialize tht tooltip
        tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>' },
        enableAnimation: true,
        // custom code start
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
        // custom code end
    });
    pie.appendTo('#container');
};
