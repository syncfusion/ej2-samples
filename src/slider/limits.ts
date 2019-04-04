import { loadCultureFiles } from '../common/culture-loader';
import { Slider, NumericTextBox, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs as CheckBoxChange } from '@syncfusion/ej2-buttons';

/**
 * Limits sample
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize Slider Component
    let minrangeObj: Slider = new Slider({
        // Set slider minimum and maximum values
        min: 0, max: 100,
        // Set the value for slider
        value: 25,
        // Set the step value
        step: 1,
        // Initialize ticks with placement, largestep, smallstep
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Set the type for slider
        type: 'MinRange',
        // Set the limit values for the slider
        limits: { enabled: true, minStart: 10, minEnd: 40 },
        // Initialize tooltip with placement and showOn
        tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' }
    });
    minrangeObj.appendTo('#minrange');

    // Initialize Slider Component
    let rangeObj: Slider = new Slider({
        // Set slider minimum and maximum values
        min: 0, max: 100,
        // Set the intial range values for slider
        value: [25, 75],
        // Set the step value
        step: 1,
        // Set the type to render range slider
        type: 'Range',
        // Initialize ticks with placement, largestep, smallstep
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Set the limit values for the slider
        limits: { enabled: true, minStart: 10, minEnd: 40, maxStart: 60, maxEnd: 90 },
        // Initialize tooltip with placement and showOn
        tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' }
    });
    rangeObj.appendTo('#range');

    // Initialize NumericTextBox
    let minStart: NumericTextBox = new NumericTextBox({
        value: 10,
        min: 0,
        max: 100,
        change: minStartChange
    });
    minStart.appendTo('#minStart');

    let minEnd: NumericTextBox = new NumericTextBox({
        value: 40,
        min: 0,
        max: 100,
        change: minEndChange
    });
    minEnd.appendTo('#minEnd');

    let maxStart: NumericTextBox = new NumericTextBox({
        value: 60,
        min: 0,
        max: 100,
        change: maxStartChange
    });
    maxStart.appendTo('#maxStart');

    let maxEnd: NumericTextBox = new NumericTextBox({
        value: 90,
        min: 0,
        max: 100,
        change: maxEndChange
    });
    maxEnd.appendTo('#maxEnd');

    // Initialize Checkbox
    let fixedOne: CheckBox = new CheckBox({ change: fixOne });
    fixedOne.appendTo('#fixedOne');

    let fixedSecond: CheckBox = new CheckBox({ change: fixSecond });
    fixedSecond.appendTo('#fixedSecond');

    // Eventlisteners to lock first handle of the both sliders
    function fixOne(args: CheckBoxChange): void {
        minrangeObj.limits.startHandleFixed = args.checked;
        rangeObj.limits.startHandleFixed = args.checked;
    }

    // Eventlisteners to lock second handle of the both sliders
    function fixSecond(args: CheckBoxChange): void {
        minrangeObj.limits.endHandleFixed = args.checked;
        rangeObj.limits.endHandleFixed = args.checked;
    }

    // Eventlisteners to change limit values for both sliders
    function minStartChange(args: ChangeEventArgs): void {
        minrangeObj.limits.minStart = args.value;
        rangeObj.limits.minStart = args.value;
    }

    function minEndChange(args: ChangeEventArgs): void {
        minrangeObj.limits.minEnd = args.value;
        rangeObj.limits.minEnd = args.value;
    }

    function maxStartChange(args: ChangeEventArgs): void {
        minrangeObj.limits.maxStart = args.value;
        rangeObj.limits.maxStart = args.value;
    }

    function maxEndChange(args: ChangeEventArgs): void {
        minrangeObj.limits.maxEnd = args.value;
        rangeObj.limits.maxEnd = args.value;
    }

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        let slider: Slider[] = [minrangeObj, rangeObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
};
