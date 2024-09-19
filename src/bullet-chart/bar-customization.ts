import { loadCultureFiles } from '../common/culture-loader';
import { BulletChart, BulletTooltip, FeatureType, ChartTheme, IBulletLoadedEventArgs } from '@syncfusion/ej2-charts';
import { ColorPicker, ColorPickerEventArgs, Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
BulletChart.Inject(BulletTooltip);

/**
 * Sample for default bullet chart.
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: BulletChart = new BulletChart({
        tooltip: { enable: true },
        dataSource: [{ value: 270, target: 250 }],
        valueField: 'value',
        targetField: 'target',
        animation: { enable: false },
        ranges: [{ end: 150 },
        { end: 250 },
        { end: 300 }
        ],
        minimum: 0, maximum: 300, interval: 50,
        title: 'New Customers',
        subtitle: 'in Thousands',
        titlePosition: Browser.isDevice ? 'Top' : 'Left',
        titleStyle: { textAlignment: 'Center', },
        orientation: 'Horizontal',
        load: (args: IBulletLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        },
    });
    chart.appendTo('#dotCustomization');

    let colorPicker: ColorPicker = new ColorPicker(
        {
            value: '#000000',
            mode: 'Palette',
            change: (args: ColorPickerEventArgs) => {
                chart.valueFill = args.currentValue.hex;
                chart.refresh();
            }
        });
    colorPicker.appendTo('#color-picker');
    let colorPicker2: ColorPicker = new ColorPicker(
        {
            value: '#000000',
            mode: 'Palette',
            change: (args: ColorPickerEventArgs) => {
                chart.targetColor = args.currentValue.hex;
                chart.refresh();
            }
        });
    colorPicker2.appendTo('#color-picker2');

    let featureType: DropDownList = new DropDownList({
        dataSource: ['Rect', 'Dot'],
        value: 'Rect',
        change: (args: ChangeEventArgs) => {
            chart.type = args.value as FeatureType;
            chart.refresh();
        }
    });
    featureType.appendTo('#featureType');

    let actualValueSlider: Slider = new Slider({
        value: 270,
        min: 0,
        step: 10,
        max: 300,
        tooltip: { isVisible: true},
        change: (args: SliderChangeEventArgs) => {
            chart.dataSource[0].value = args.value;
            chart.refresh();
        }
    });
    actualValueSlider.appendTo('#actualValue');

    let targetValueSlider: Slider = new Slider({
        value: 250,
        min: 0,
        max: 300,
        step: 10,
        tooltip: { isVisible: true},
        change: (args: SliderChangeEventArgs) => {
            chart.dataSource[0].target = args.value;
            chart.refresh();
        }
    });
    targetValueSlider.appendTo('#targetValue');

};