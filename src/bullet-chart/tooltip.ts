import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadBulletChartTheme } from './theme-color';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for Bullet chart in RTL mode.
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '70%',
        tooltip: { enable: true, template : '#Tooltip' },
        dataSource: [{ value: 70, target: 50 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [{ end: 30, color: '#599C20' },
        { end: 60, color: '#EFC820' },
        { end: 100, color: '#CA4218' }
        ],
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        minimum: 0, maximum: 100, interval: 10,
        title: 'Revenue YTD',
        subtitle: 'US $ in Thousands',
        labelFormat: '${value}K',
    });
    chart.appendTo('#tooltip');
};