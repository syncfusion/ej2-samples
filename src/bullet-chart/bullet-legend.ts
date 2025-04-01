import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { BulletChartLegend, IBulletLegendRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadBulletChartTheme } from './theme-color';
BulletChart.Inject(BulletTooltip, BulletChartLegend);

/**
 * Sample for default bullet chart.
 */

let featureValue: number;
let targetValue: number;
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '70%',
        height: '160',
        tooltip: { enable: true },
        dataSource: [{ value: 25, target: [20, 26, 28] }],
        valueField: 'value',
        targetField: 'target',
        labelFormat: '{value}K',
        animation: { enable: false },
        ranges: [{ end: 8, color: '#CA4218', name: 'Poor' },
            { end: 18, color: '#EFC820', name: 'Avg' },
            { end: 30,  color: '#599C20', name: 'Good' }
        ],
        minimum: 0, maximum: 30, interval: 5,
        title: 'Package Downloads',
        subtitle: 'in Thousands',
        legendSettings: { visible: true },
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        legendRender: (args: IBulletLegendRenderEventArgs) => {
            if (args.text === 'Target_0') {
                args.text = 'Previous Target';
            }
            if (args.text === 'Target_1') {
                args.text = 'Current Target';
            }
            if (args.text === 'Target_2') {
                args.text = 'Future Target';
            }
        }
    });
    chart.appendTo('#container');
};