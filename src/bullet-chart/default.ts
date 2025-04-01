import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, IBulletLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadBulletChartTheme } from './theme-color';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for default bullet chart.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let chart1: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: true },
        dataSource: [{ value: 270, target: 250 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        margin: { left: Browser.isDevice ? 10 : 62 },
        ranges: [{ end: 150, },
        { end: 250 },
        { end: 300 }
        ],
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        minimum: 0, maximum: 300, interval: 50,
        title: 'Revenue',
        labelFormat: '${value}K',
        subtitle: 'U.S. $',
        titlePosition: Browser.isDevice ? 'Top' : 'Left',
    });
    chart1.appendTo('#container1');

    let chart2: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: true },
        dataSource: [{ value: 23, target: 27 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        margin: { left: Browser.isDevice ? 10 : 80 },
        ranges: [{ end: 20 },
        { end: 25 },
        { end: 30 }
        ],
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        minimum: 0, maximum: 30, interval: 5,
        labelFormat: '{value}%',
        title: 'Profit',
        subtitle: '%',
        titlePosition: Browser.isDevice ? 'Top' : 'Left',
    });
    chart2.appendTo('#container2');

    let chart3: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: true },
        dataSource: [{ value: 350, target: 550 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [
            { end: 350 },
            { end: 500 },
            { end: 600 }
        ],
        margin: { left: Browser.isDevice ? 10 : 21.5 },
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        minimum: 0, maximum: 600, interval: 100,
        title: 'Avg Order Size',
        subtitle: 'U.S. $',
        labelFormat: '${value}',
        titlePosition: Browser.isDevice ? 'Top' : 'Left',
    });
    chart3.appendTo('#container3');

    let chart4: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: true },
        dataSource: [{ value: 1600, target: 2100 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [{ end: 1700, },
        { end: 2000 },
        { end: 2500 }
        ],
        margin: { left: Browser.isDevice ? 10 : 18 },
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        enableGroupSeparator: true,
        minimum: 0, maximum: 2500, interval: 500,
        title: 'New Customers',
        subtitle: 'Count',
        titlePosition: Browser.isDevice ? 'Top' : 'Left',
    });
    chart4.appendTo('#container4');

    let chart5: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '80%',
        tooltip: { enable: false },
        dataSource: [{ value: 4.9, target: 4 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [
            { end: 3.7 },
            { end: 4.2 },
            { end: 5 }
        ],
        margin: { left: Browser.isDevice ? 10 : 7 },
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
        minimum: 0, maximum: 5, interval: 1,
        title: 'Cust Satisfication',
        subtitle: 'Top Rating of 5',
        titlePosition: Browser.isDevice ? 'Top' : 'Left',
    });
    chart5.appendTo('#container5');
};