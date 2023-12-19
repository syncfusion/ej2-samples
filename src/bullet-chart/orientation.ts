import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, OrientationType, ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for bullet chart with Orientation.
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: BulletChart = new BulletChart({
        width: '19%',
        tooltip: { enable: true },
        dataSource: [{ value: 23, target: 27, name: 'Product A' }],
        valueField: 'value',
        targetField: 'target',
        categoryField: 'name',
        animation: { enable: false },
        margin: { left: Browser.isDevice ? 10 : 10 },
        ranges: [{ end: 20 },
        { end: 25 },
        { end: 30 }
        ],
        load: (args: IBulletLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');;
        },
        height: '400',
        minimum: 0, maximum: 30, interval: 5,
        labelFormat: '{value}%',
        orientation: 'Vertical'
    });
    chart.appendTo('#orientation');

    let chnageOrientation: DropDownList = new DropDownList({
        dataSource: ['Vertical', 'Horizontal'],
        value : 'Vertical',
        change: (args: ChangeEventArgs) => {
            if (args.value === 'Horizontal') {
                chart.width = '80%';
                chart.height = '100px';
              } else {
                chart.width = '19%';
                chart.height = '400px';
            }
            chart.orientation = args.value as OrientationType;
            chart.refresh();
        }
    });
    chnageOrientation.appendTo('#orientationSelect');
};