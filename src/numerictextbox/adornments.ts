import { loadCultureFiles } from '../common/culture-loader';
import {NumericTextBox} from '@syncfusion/ej2-inputs';

/**
 * Adornments NumericTextBox sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let prependNumeric: NumericTextBox = new NumericTextBox({
        floatLabelType: "Auto",
        value: 1,
        placeholder: 'Enter the price',
        prependTemplate: '<span id="menu" class="e-icons e-menu" title="Menu"></span><span class="e-input-separator"></span><span id="search" class="e-icons e-search" title="Search"></span><span class="e-input-separator"></span>',
        change: () => {
            appendNumeric.value = prependNumeric.value * 5;
            appendNumeric.dataBind();
        }
    });
    prependNumeric.appendTo('#prepend');
    let appendNumeric: NumericTextBox = new NumericTextBox({
        floatLabelType: "Auto",
        placeholder: 'Enter the kg',
        step: 1,
        value: 5,
        appendTemplate: '<span>kg</span>',
        change: () => {
            prependNumeric.value = appendNumeric.value / 5;
            prependNumeric.dataBind();
        }
    });
    appendNumeric.appendTo('#append');
    let iconNumeric: NumericTextBox = new NumericTextBox({
        floatLabelType: "Auto",
        placeholder: 'Enter the Number',
        value: 10,
        showSpinButton: false,
        prependTemplate: '<span id="reset" class="e-icons e-reset" title="Reset"></span><span class="e-input-separator"></span>',
        appendTemplate: '<span class="e-input-separator"></span><span id="subract" class="e-icons e-horizontal-line"></span><span class="e-input-separator"></span><span id="plus" class="e-icons e-plus"></span>',
        created: () => {
            let resetSpan: HTMLElement = document.querySelector('#reset') as HTMLElement;
            if (resetSpan) {
                resetSpan.addEventListener('click', function() {
                    iconNumeric.value = null;
                    iconNumeric.dataBind();
                });
            }
            let subractSpan: HTMLElement = document.querySelector('#subract') as HTMLElement;
            if (subractSpan) {
                subractSpan.addEventListener('click', function() {
                    iconNumeric.value = iconNumeric.value - 1;
                    iconNumeric.dataBind();
                });
            }
            let plusSpan: HTMLElement = document.querySelector('#plus') as HTMLElement;
            if (plusSpan) {
                plusSpan.addEventListener('click', function() {
                    iconNumeric.value = iconNumeric.value + 1;
                    iconNumeric.dataBind();
                });
            }
        }
    });
    iconNumeric.appendTo('#icontemplate');
};
