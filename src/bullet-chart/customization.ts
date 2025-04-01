import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip,  ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { loadBulletChartTheme } from './theme-color';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for default bullet chart.
 */

let featureValue: number;
let targetValue: number;
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: BulletChart = new BulletChart({
        width: Browser.isDevice ? '100%' : '100%',
        tooltip: { enable: true },
        dataSource: [{ value: 1.7, target: 2.5 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [{ end: 1.5, color: '#599C20' },
        { end: 2.5, color: '#EFC820' },
        { end: 3, color: '#CA4218' }
        ],
        minimum: 0, maximum: 3, interval: 0.5,
        title: 'Package Downloads',
        subtitle: 'in Thousands',
        minorTickLines: { width: 0},
        load: (args: IBulletLoadedEventArgs) => {
            loadBulletChartTheme(args);
        },
    });
    chart.appendTo('#container');

    let colorPicker: ColorPicker = new ColorPicker(
        {
            value: '#599C20',
            mode: 'Palette',
            change: (args: ColorPickerEventArgs) => {
                chart.ranges[0].color = args.currentValue.hex;
                chart.refresh();
            }
        });
    colorPicker.appendTo('#color-picker1');
    let colorPicker2: ColorPicker = new ColorPicker(
        {
            value: '#EFC820',
            mode: 'Palette',
            change: (args: ColorPickerEventArgs) => {
                chart.ranges[1].color = args.currentValue.hex;
                chart.refresh();
            }
        });
    colorPicker2.appendTo('#color-picker2');
    let colorPicker3: ColorPicker = new ColorPicker(
        {
            value: '#CA4218',
            mode: 'Palette',
            change: (args: ColorPickerEventArgs) => {
                chart.ranges[2].color = args.currentValue.hex;
                chart.refresh();
            }
        });
    colorPicker3.appendTo('#color-picker3');

    let rangeColor: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
            chart.majorTickLines.useRangeColor = args.checked;
            chart.minorTickLines.useRangeColor = args.checked;
            chart.labelStyle.useRangeColor = args.checked;
            chart.refresh();
        }
    });
    rangeColor.appendTo('#rangeColor');
    let position: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
           chart.opposedPosition = args.checked;
           chart.refresh();
        }
    });
    position.appendTo('#position');


};