import { loadCultureFiles } from '../common/culture-loader';
import { Slider, TicksDataModel, TooltipDataModel } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Orientation sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize Slider component
    let defaultObj: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set the slider orientation
        orientation: 'Vertical'
    });
    defaultObj.appendTo('#default');

    // Initialize Slider component
    let minRangeObj: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set the type to render minRange slider
        type: 'MinRange',
        // Set the slider orientation
        orientation: 'Vertical'
    });
    minRangeObj.appendTo('#minrange');

    // Initialize Slider component
    let rangeObj: Slider = new Slider({
        // Set the values for slider
        value: [30, 70],
        // Set the type to render range slider
        type: 'Range',
        // Set the slider orientation
        orientation: 'Vertical'
    });
    rangeObj.appendTo('#range');

    // Initialize Checkbox components
    let enableTicks: CheckBox = new CheckBox({ checked: false, change: enableDisableTicks });
    enableTicks.appendTo('#ticks');

    let enableTooltip: CheckBox = new CheckBox({ checked: false, change: enableDisableTooltip });
    enableTooltip.appendTo('#tooltip');

    // Array of slider objects
    let sliders : Slider[] = [defaultObj, minRangeObj, rangeObj];

    // Checkbox change handlers
    function enableDisableTicks(args: ChangeEventArgs): void {
        let ticks: TicksDataModel = { placement: args.checked ? 'Before' : 'None', largeStep: 20, smallStep: 5, showSmallTicks: true };
        sliders.forEach((slider: Slider) => {
            // Assigning ticks values to each slider
            slider.ticks = ticks;
        });
    }

    function enableDisableTooltip(args: ChangeEventArgs): void {
        let tooltip: TooltipDataModel = { isVisible : args.checked, placement: 'Before' };
        sliders.forEach((slider: Slider) => {
            // Assigning tooltip values to each slider
            slider.tooltip = tooltip;
        });
    }

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        let slider: Slider[] = [minRangeObj, defaultObj, rangeObj];
        slider.forEach((slider: any) => {
            // Refreshing each slider tooltip object position
            slider.refreshTooltip();
        });
    }
};