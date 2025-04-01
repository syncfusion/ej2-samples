// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * sparkline sample for customization
 */
import { Sparkline, ISparklineLoadEventArgs, SparklineTheme, SparklineTooltip } from '@syncfusion/ej2-charts';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents} from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { loadSparkLineTheme } from './theme-color';
Sparkline.Inject(SparklineTooltip);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let percentage: Sparkline = new Sparkline({
        // custom code start
        load: (args: ISparklineLoadEventArgs) => {
            loadSparkLineTheme(args);
        },
        // custom code end
        height: '200px',
        width: '180px',
        lineWidth: 1,
        type: 'Column',
        valueType: 'Category',
        dataSource: [
            { x: 0, xval: 'AUDI', yval: 1 },
            { x: 1, xval: 'BMW', yval: 5 },
            { x: 2, xval: 'BUICK', yval: -1 },
            { x: 3, xval: 'CETROEN', yval: -6 },
            { x: 4, xval: 'CHEVROLET', yval: 0 },
            { x: 5, xval: 'FIAT', yval: 1 },
            { x: 6, xval: 'FORD', yval: -2 },
            { x: 7, xval: 'HONDA', yval: 7 },
            { x: 8, xval: 'HYUNDAI', yval: -9 },
            { x: 9, xval: 'JEEP', yval: 0 },
            { x: 10, xval: 'KIA', yval: -10 },
            { x: 11, xval: 'MAZDA', yval: 3 },
            { x: 12, xval: 'MERCEDES', yval: 13 },
            { x: 13, xval: 'NISSAN', yval: 5 },
            { x: 14, xval: 'OPEL/VHALL', yval: -6 },
            { x: 15, xval: 'PEUGEOT', yval: 0 },
            { x: 16, xval: 'RENAULT', yval: 7 },
            { x: 17, xval: 'SKODA', yval: 5 },
            { x: 18, xval: 'SUBARU', yval: 5 },
            { x: 19, xval: 'SUZUKI', yval: 11 },
            { x: 20, xval: 'TOYOTA', yval: 5 },
            { x: 21, xval: 'VOLKSWAGEN', yval: 3 },
        ],
        xName: 'xval', yName: 'yval',
        axisSettings: {
            lineSettings: {
                color: 'red',
                width: 2
            }
        },
        markerSettings: {
            fill: 'red',
            size: 5
        },
        tooltipSettings: {
            format: '${xval}: ${yval}',
            trackLineSettings: {
                color: 'red',
                width: 1
            }
        }
    });
    percentage.appendTo('#percentage');
    let sales: Sparkline = new Sparkline({
        // custom code start
        load: (args: ISparklineLoadEventArgs) => {
            loadSparkLineTheme(args);
        },
        // custom code end
        height: '200px',
        width: '180px',
        lineWidth: 1,
        type: 'Column',
        valueType: 'Category',
        dataSource: [
            { x: 0, xval: 'AUDI', yval: 1847613 },
            { x: 1, xval: 'BMW', yval: 2030331 },
            { x: 2, xval: 'BUICK', yval: 1465823 },
            { x: 3, xval: 'CETROEN', yval: 999888 },
            { x: 4, xval: 'CHEVROLET', yval: 3857388 },
            { x: 5, xval: 'FIAT', yval: 1503806 },
            { x: 6, xval: 'FORD', yval: 5953122 },
            { x: 7, xval: 'HONDA', yval: 4967689 },
            { x: 8, xval: 'HYUNDAI', yval: 3951176 },
            { x: 9, xval: 'JEEP', yval: 1390130 },
            { x: 10, xval: 'KIA', yval: 2511293 },
            { x: 11, xval: 'MAZDA', yval: 1495557 },
            { x: 12, xval: 'MERCEDES', yval: 2834181 },
            { x: 13, xval: 'NISSAN', yval: 4834694 },
            { x: 14, xval: 'OPEL/VHALL', yval: 996559 },
            { x: 15, xval: 'PEUGEOT', yval: 1590300 },
            { x: 16, xval: 'RENAULT', yval: 2275227 },
            { x: 17, xval: 'SKODA', yval: 1180672 },
            { x: 18, xval: 'SUBARU', yval: 1050390 },
            { x: 19, xval: 'SUZUKI', yval: 2891415 },
            { x: 20, xval: 'TOYOTA', yval: 7843423 },
            { x: 21, xval: 'VOLKSWAGEN', yval: 6639250 },
        ],
        xName: 'xval', yName: 'yval',
        axisSettings: {
            lineSettings: {
                color: 'red',
                width: 2
            }
        },
        markerSettings: {
            fill: 'red',
            size: 5
        },
        tooltipSettings: {
            format: '${xval}: ${yval}',
            trackLineSettings: {
                color: 'red',
                width: 1
            }
        }
    });
    sales.appendTo('#sales');
    // code for property panel
    let sampleChange: EmitType<ChangeEventArgs>;
    let sampleValue: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Sales Percentage',
        width: '100%',
        change: sampleChange
    });
    let sliderChange: EmitType<SliderChangeEventArgs>;
    let slider: Slider = new Slider(
    {
        value: 0,  type: 'MinRange',
        change: sliderChange,
        max: 100, min: 0
    },
    '#range');
    let allchange: EmitType<CheckBoxChangeEvents>;
    let allCheckBox: CheckBox = new CheckBox(
    {
        checked: true, change: allchange
    },
    '#all');
    let otherchange: EmitType<CheckBoxChangeEvents>;
    let negativeCheckBox: CheckBox = new CheckBox(
    {
        change: otherchange, disabled: true
    },
    '#negative');
    let firstCheckBox: CheckBox = new CheckBox(
    {
        change: otherchange, disabled: true
    },
    '#first');
    let lastCheckBox: CheckBox = new CheckBox(
    {
        change: otherchange, disabled: true
    },
    '#last');
    let highCheckBox: CheckBox = new CheckBox(
    {
        change: otherchange, disabled: true
    },
    '#high');
    let lowCheckBox: CheckBox = new CheckBox(
    {
        change: otherchange, disabled: true
    },
    '#low');
    let markerchange: EmitType<CheckBoxChangeEvents>;
    let markerCheckBox: CheckBox = new CheckBox(
    {
        change: markerchange
    },
    '#marker');
    let datalabelchange: EmitType<CheckBoxChangeEvents>;
    let datalabelCheckBox: CheckBox = new CheckBox(
    {
        change: datalabelchange
    },
    '#datalabel');
    let enableRTLchange: EmitType<CheckBoxChangeEvents>;
    let enableRTLCheckBox: CheckBox = new CheckBox(
    {
        change: enableRTLchange
    },
    '#enableRTL');
    let tooltipchange: EmitType<CheckBoxChangeEvents>;
    let tooltipCheckBox: CheckBox = new CheckBox(
    {
        change: tooltipchange
    },
    '#tooltip');
    let trackerchange: EmitType<CheckBoxChangeEvents>;
    let trackerCheckBox: CheckBox = new CheckBox(
    {
        change: trackerchange
    },
    '#trackline');
    let axislinechange: EmitType<CheckBoxChangeEvents>;
    let axislineCheckBox: CheckBox = new CheckBox(
    {
        change: axislinechange
    },
    '#axis1');

    // tslint:disable-next-line:max-func-body-length
    sampleValue.change = sampleChange = (drop: ChangeEventArgs) => {
        if (drop.value === 'salespercentage') {
            slider.min = 0;
            slider.max = 10;
            slider.value = percentage.axisSettings.value;
        } else {
            slider.min = 0;
            slider.max = 5000000;
            slider.value = sales.axisSettings.value;
        }
        if ((drop.value === 'salespercentage' && percentage.markerSettings.visible.length) ||
            (drop.value === 'salescount' && sales.markerSettings.visible.length)) {
            markerCheckBox.checked = true;
        } else {
            markerCheckBox.checked = false;
        }
        markerCheckBox.change = markerchange = (e: CheckBoxChangeEvents) => {
            let boolean: boolean = e.checked;
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            if (boolean) {
                spark.markerSettings.visible = getVisible();
            } else {
                spark.markerSettings.visible = [];
            }
            spark.refresh();
        };
        if ((drop.value === 'salespercentage' && percentage.dataLabelSettings.visible.length) ||
            (drop.value === 'salescount' && sales.dataLabelSettings.visible.length)) {
            datalabelCheckBox.checked = true;
        } else {
            datalabelCheckBox.checked = false;
        }
        let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
        if (!markerCheckBox.checked && !datalabelCheckBox.checked) {
            allCheckBox.checked = false;
            negativeCheckBox.checked = false;
            firstCheckBox.checked = false;
            lastCheckBox.checked = false;
            highCheckBox.checked = false;
            lowCheckBox.checked = false;
        }
        if (markerCheckBox.checked) {
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            allCheckBox.checked = spark.markerSettings.visible.indexOf('All') > -1;
            negativeCheckBox.checked = spark.markerSettings.visible.indexOf('Negative') > -1;
            firstCheckBox.checked = spark.markerSettings.visible.indexOf('Start') > -1;
            lastCheckBox.checked = spark.markerSettings.visible.indexOf('End') > -1;
            highCheckBox.checked = spark.markerSettings.visible.indexOf('High') > -1;
            lowCheckBox.checked = spark.markerSettings.visible.indexOf('Low') > -1;
        }
        if (datalabelCheckBox.checked) {
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            allCheckBox.checked = spark.dataLabelSettings.visible.indexOf('All') > -1;
            negativeCheckBox.checked = spark.dataLabelSettings.visible.indexOf('Negative') > -1;
            firstCheckBox.checked = spark.dataLabelSettings.visible.indexOf('Start') > -1;
            lastCheckBox.checked = spark.dataLabelSettings.visible.indexOf('End') > -1;
            highCheckBox.checked = spark.dataLabelSettings.visible.indexOf('High') > -1;
            lowCheckBox.checked = spark.dataLabelSettings.visible.indexOf('Low') > -1;
        }
        datalabelCheckBox.change = datalabelchange = (e: CheckBoxChangeEvents) => {
            let boolean: boolean = e.checked;
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            if (boolean) {
                spark.dataLabelSettings.visible = getVisible();
            } else {
                spark.dataLabelSettings.visible = [];
            }
            spark.refresh();
        };
        if ((drop.value === 'salespercentage' && percentage.tooltipSettings.visible === true) ||
            (drop.value === 'salescount' && sales.tooltipSettings.visible === true)) {
            tooltipCheckBox.checked = true;
        } else {
            tooltipCheckBox.checked = false;
        }
        tooltipCheckBox.change = tooltipchange = (e: CheckBoxChangeEvents) => {
            let boolean: boolean = e.checked;
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            if (boolean) {
                spark.tooltipSettings.visible = true;
            } else {
                spark.tooltipSettings.visible = false;
            }
            spark.refresh();
        };
        if ((drop.value === 'salespercentage' && percentage.enableRtl === true) ||
            (drop.value === 'salescount' && sales.enableRtl === true)) {
            enableRTLCheckBox.checked = true;
        } else {
            enableRTLCheckBox.checked = false;
        }
        enableRTLCheckBox.change = enableRTLchange = (e: CheckBoxChangeEvents) => {
            let boolean: boolean = e.checked;
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            if (boolean === true) {
                spark.enableRtl = true;
            } else {
                spark.enableRtl = false;
            }
            spark.refresh();
        };
        if ((drop.value === 'salespercentage' && percentage.tooltipSettings.trackLineSettings.visible === true) ||
            (drop.value === 'salescount' && sales.tooltipSettings.trackLineSettings.visible === true)) {
            trackerCheckBox.checked = true;
        } else {
            trackerCheckBox.checked = false;
        }
        trackerCheckBox.change = trackerchange =  (e: CheckBoxChangeEvents) => {
            let boolean: boolean = e.checked;
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            if (boolean) {
                spark.tooltipSettings.trackLineSettings.visible = true;
            } else {
                spark.tooltipSettings.trackLineSettings.visible = false;
            }
            spark.refresh();
        };
        if ((drop.value === 'salespercentage' && percentage.axisSettings.lineSettings.visible === true) ||
            (drop.value === 'salescount' && sales.axisSettings.lineSettings.visible === true)) {
            axislineCheckBox.checked = true;
        } else {
            axislineCheckBox.checked = false;
        }
        axislineCheckBox.change = axislinechange =  (e: CheckBoxChangeEvents) => {
            let boolean: boolean = e.checked;
            let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
            if (boolean) {
                spark.axisSettings.lineSettings.visible = true;
            } else {
                spark.axisSettings.lineSettings.visible = false;
            }
            spark.refresh();
        };
        if (drop.value === 'salespercentage' && percentage.axisSettings.value !== 0) {
            slider.value =  percentage.axisSettings.value;
            slider.min = 0;
            slider.max = 10;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + percentage.axisSettings.value;
        }
        if (drop.value === 'salescount' && sales.axisSettings.value !== 0) {
            slider.value =  sales.axisSettings.value;
            slider.min = 0;
            slider.max = 5000000;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + sales.axisSettings.value;
        }
        slider.change = sliderChange = (e: SliderChangeEventArgs) => {
                let spark: Sparkline = drop.value === 'salespercentage' ? percentage : sales;
                spark.axisSettings.value = e.value as number;
                document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + e.value;
                spark.refresh();
            };
        allCheckBox.checked = !(negativeCheckBox.checked || highCheckBox.checked || lowCheckBox.checked ||
            firstCheckBox.checked || lastCheckBox.checked);
        negativeCheckBox.disabled = highCheckBox.disabled = lowCheckBox.disabled = firstCheckBox.disabled =
        lastCheckBox.disabled = allCheckBox.checked;
    };
    sampleValue.appendTo('#spark');
    if (sampleValue.value === 'salespercentage') {
        slider.min = 0;
        slider.max = 10;
    } else {
        slider.min = 0;
        slider.max = 5000000;
    }
    allCheckBox.change = allchange = (e: CheckBoxChangeEvents) => {
        let checked: boolean = e.checked;
        negativeCheckBox.disabled = checked;
        firstCheckBox.disabled = checked;
        lastCheckBox.disabled = checked;
        highCheckBox.disabled = checked;
        lowCheckBox.disabled = checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        spark.markerSettings.visible = (checked && markerCheckBox.checked) ? ['All'] : (markerCheckBox.checked) ? getVisible() : [];
        spark.dataLabelSettings.visible = (checked && datalabelCheckBox.checked) ? ['All'] :
        (datalabelCheckBox.checked) ? getVisible() : [];
        spark.refresh();
    };
    negativeCheckBox.change = otherchange = firstCheckBox.change = lastCheckBox.change = highCheckBox.change =
    lowCheckBox.change = (e: CheckBoxChangeEvents) => {
        processMarkerLabel(e);
    };
    let processMarkerLabel: Function = (e: CheckBoxChangeEvents): void => {
        let checked: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (markerCheckBox.checked) {
            spark.markerSettings.visible = getVisible();
            spark.refresh();
        }
        if (datalabelCheckBox.checked) {
            spark.dataLabelSettings.visible = getVisible();
            spark.refresh();
        }
    };
    let getVisible: Function = (): string[] => {
        let visible: string[] = [];
        if (allCheckBox.checked) { return ['All']; }
        if (negativeCheckBox.checked) { visible.push('Negative'); }
        if (firstCheckBox.checked) { visible.push('Start'); }
        if (lastCheckBox.checked) { visible.push('End'); }
        if (highCheckBox.checked) { visible.push('High'); }
        if (lowCheckBox.checked) { visible.push('Low'); }
        return visible;
    };
    markerCheckBox.change = markerchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (boolean) {
            spark.markerSettings.visible = getVisible();
        } else {
            spark.markerSettings.visible = [];
        }
        spark.refresh();
    };
    datalabelCheckBox.change = datalabelchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (boolean) {
            spark.dataLabelSettings.visible = getVisible();
        } else {
            spark.dataLabelSettings.visible = [];
        }
        spark.refresh();
    };
    enableRTLCheckBox.change = enableRTLchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (boolean === true) {
            spark.enableRtl =  true;
        } else {
            spark.enableRtl =  false;
        }
        spark.refresh();
    };

    tooltipCheckBox.change = tooltipchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (boolean) {
            spark.tooltipSettings.visible = true;
            spark.tooltipSettings.format = '${xval}: ${yval}';
        } else {
            spark.tooltipSettings.visible = false;
        }
        spark.refresh();
    };
    trackerCheckBox.change = trackerchange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (boolean) {
            spark.tooltipSettings.trackLineSettings.visible = true;
            spark.tooltipSettings.trackLineSettings.color = 'red';
            spark.tooltipSettings.trackLineSettings.width = 1;
        } else {
            spark.tooltipSettings.trackLineSettings.visible = false;
        }
        spark.refresh();
    };
    axislineCheckBox.change = axislinechange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
        if (boolean) {
            spark.axisSettings.lineSettings.visible = true;
            spark.axisSettings.lineSettings.color = 'red';
            spark.axisSettings.lineSettings.width = 2;
        } else {
            spark.axisSettings.lineSettings.visible = false;
        }
        spark.refresh();
    };
    slider.change = sliderChange = (e: SliderChangeEventArgs) => {
            let spark: Sparkline = sampleValue.value === 'salespercentage' ? percentage : sales;
            spark.axisSettings.value = e.value as number;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + e.value;
            spark.refresh();
    };
};