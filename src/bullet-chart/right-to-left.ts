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
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: true },
        dataSource: [{ value: 270, target: 250 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [{ end: 150 },
        { end: 250 },
        { end: 300 }
        ],
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        minimum: 0, maximum: 300, interval: 50,
        title: 'Revenue YTD',
        subtitle: '$ in Thousands',
        labelFormat: '${value}K',
        enableRtl: true,
        titleStyle: { textAlignment: 'Center', },
        orientation: 'Horizontal',
    });
    chart.appendTo('#orientation');
};