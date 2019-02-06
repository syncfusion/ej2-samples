import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider, TooltipPlacement, TooltipShowOn } from '@syncfusion/ej2-inputs';

/**
 * Tooltip sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize Slider Component
    let defaultObj: Slider = new Slider({
        // set the value for slider
        value: 30,
        // Set slider buttons
        showButtons: true,
        // Initialize tooltip with placement and showOn
        tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' }
    });
    defaultObj.appendTo('#default');

    // Initialize Slider Component
    let rangeObj: Slider = new Slider({
        // Set the initial range values for slider
        value: [30, 70],
        // Set the type to render range slider
        type: 'Range',
        // Set slider buttons
        showButtons: true,
        // Initialize tooltip with placement and showOn
        tooltip: { isVisible: true, placement: 'Before', showOn: 'Focus' }
    });
    rangeObj.appendTo('#range');

    // Initialize DropDownList Component
    let placementObj: DropDownList = new DropDownList({
        // Set the initial index of the list
        index: 0,
        // set the height of the dropdown list component
        popupHeight: '200px',
        // Handling the dropdown list change event to change slider tooltip placement
        change: () => {
            defaultObj.tooltip = { placement: placementObj.value as TooltipPlacement };
            defaultObj.dataBind();
            rangeObj.tooltip = { placement: placementObj.value as TooltipPlacement };
            rangeObj.dataBind();
        }
    });
    placementObj.appendTo('#placement');

    // Initialize DropDownList Component
    let showonObj: DropDownList = new DropDownList({
        // Set the initial index of the list
        index: 1,
        // set the height of the dropdown list component
        popupHeight: '200px',
        // Handling the dropdown list change event to change slider tooltip showOn property
        change: () => {
            defaultObj.tooltip = { showOn: showonObj.value as TooltipShowOn };
            defaultObj.dataBind();
            rangeObj.tooltip = { showOn: showonObj.value as TooltipShowOn };
            rangeObj.dataBind();
        }
    });
    showonObj.appendTo('#showon');

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        let slider: Slider[] = [defaultObj, rangeObj];
        slider.forEach((slider: any) => {
            slider.refreshTooltip();
        });
    }

};