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
        orientation: 'Vertical',
        // Set the slider ticks
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Set the slider tooltip
        tooltip:  { isVisible : true, placement: 'Before' }
    });
    defaultObj.appendTo('#default');

    // Initialize Slider component
    let minRangeObj: Slider = new Slider({
        // Set the value for slider
        value: 30,
        // Set the type to render minRange slider
        type: 'MinRange',
        // Set the slider orientation
        orientation: 'Vertical',
        // Set the slider ticks
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Set the slider tooltip
        tooltip:  { isVisible : true, placement: 'Before' }
    });
    minRangeObj.appendTo('#minrange');

    // Initialize Slider component
    let rangeObj: Slider = new Slider({
        // Set the values for slider
        value: [30, 70],
        // Set the type to render range slider
        type: 'Range',
        // Set the slider orientation
        orientation: 'Vertical',
        // Set the slider ticks
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Set the slider tooltip
        tooltip:  { isVisible : true, placement: 'Before' }
    });
    rangeObj.appendTo('#range');

    // Initialize Slider component
    let reverseObj : Slider = new Slider({
        // Set the values for slider
        value: [30, 70],
        // Set maximum value to min property
        min:100,
        // Set Minimum value to max property
        max:0,
        // Set the type to render range slider
        type: 'Range',
        // Set the slider orientation
        orientation: 'Vertical',
        // Set the slider ticks
        ticks: { placement: 'Before', largeStep: 20, smallStep: 5, showSmallTicks: true },
        // Set the slider tooltip
        tooltip:  { isVisible : true, placement: 'Before' }
    });
    reverseObj.appendTo('#reversible');

    // Initialize Checkbox components
    let enableTicks: CheckBox = new CheckBox({ checked: true, change: enableDisableTicks });
    enableTicks.appendTo('#ticks');

    let enableTooltip: CheckBox = new CheckBox({ checked: true, change: enableDisableTooltip });
    enableTooltip.appendTo('#tooltip');

    // Array of slider objects
    let sliders : Slider[] = [defaultObj, minRangeObj, rangeObj, reverseObj];

    // Checkbox change handlers
    function enableDisableTicks(args: ChangeEventArgs): void {
        sliders.forEach((slider: Slider) => {
            // Assigning ticks values to each slider
            slider.ticks.placement = args.checked ? 'Before' : 'None';
        });
    }

    function enableDisableTooltip(args: ChangeEventArgs): void {
        sliders.forEach((slider: Slider) => {
            // Assigning tooltip values to each slider
            slider.tooltip.isVisible = args.checked;
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
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }
};