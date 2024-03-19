import { loadCultureFiles } from '../common/culture-loader';
import { Slider, NumericTextBox } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * slider property customization
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // tslint:disable-next-line:max-func-body-length
    let slider: Slider = new Slider({
        value: 30,
        min: 0,
        max: 100,
        tooltip: { isVisible: true, placement: 'Before', showOn: 'Hover' },
        ticks: { placement: 'After', largeStep: 20 },
        change: (args: any) => {
            sliderValue.value = args.value;
        },
        type: 'MinRange'
    });
    slider.appendTo('#slider');


    let sliderValue: NumericTextBox = new NumericTextBox({
        value: 30,
        format: 'n0',
        change: (args: any) => {
            slider.value = args.value;
        }
    });
    sliderValue.appendTo('#value');

    let sliderMin: NumericTextBox = new NumericTextBox({
        value: 0,
        format: 'n0',
        change: (args: any) => {
            slider.min = args.value;
        }
    });
    sliderMin.appendTo('#min');

    let sliderMax: NumericTextBox = new NumericTextBox({
        value: 100,
        format: 'n0',
        change: (args: any) => {
            slider.max = args.value;
        }
    });
    sliderMax.appendTo('#max');

    let sliderStep: NumericTextBox = new NumericTextBox({
        value: 1,
        format: 'n0',
        change: (args: any) => {
            slider.step = args.value;
        }
    });
    sliderStep.appendTo('#step');

    let button: CheckBox = new CheckBox({
        checked: false,
        label: 'Show Buttons',
        change: (args: ChangeEventArgs) => {
            slider.showButtons = args.checked;

        }
    });
    button.appendTo('#button');

    let buttonMb: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
            slider.showButtons = args.checked;

        }
    });
    buttonMb.appendTo('#mb-button');

    let orientationMb: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
            args.checked ? slider.orientation = 'Vertical' : slider.orientation = 'Horizontal';
            slider.refresh();
        }
    });
    orientationMb.appendTo('#mb-orientation');

    let readOnlyMb: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
            slider.readonly = args.checked;
            slider.refresh();
        }
    });
    readOnlyMb.appendTo('#mb-readOnly');

    let disabledMb: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
            slider.enabled = !args.checked;
        }
    });
    disabledMb.appendTo('#mb-disabled');

    let orientation: CheckBox = new CheckBox({
        checked: false,
        label: 'Vertical Orientation',
        change: (args: ChangeEventArgs) => {
            args.checked ? slider.orientation = 'Vertical' : slider.orientation = 'Horizontal';
            slider.refresh();
        }
    });
    orientation.appendTo('#orientation');

    let readOnly: CheckBox = new CheckBox({
        checked: false,
        label: 'Readonly',
        change: (args: ChangeEventArgs) => {
            slider.readonly = args.checked;
            slider.refresh();
        }
    });
    readOnly.appendTo('#readOnly');

    let disabled: CheckBox = new CheckBox({
        checked: false,
        label: 'Disabled',
        change: (args: ChangeEventArgs) => {
            slider.enabled = !args.checked;
        }
    });
    disabled.appendTo('#disabled');

    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }

    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        let sliderScroll: Slider[] = [slider];
        sliderScroll.forEach((slider: any) => {
            // Refreshing each slider tooltip object position
            slider.refreshTooltip(slider.tooltipTarget);
        });
    }

};
