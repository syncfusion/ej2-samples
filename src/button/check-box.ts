import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Default CheckBox sample
 */

this.default = (): void => {
    let checkBoxObj: CheckBox = new CheckBox({ label: 'CheckBox: true', checked: true, change: onChange });
    checkBoxObj.appendTo('#checked');

    checkBoxObj = new CheckBox({ label: 'Checked, Disabled', disabled: true, checked: true });
    checkBoxObj.appendTo('#unchecked');

    checkBoxObj = new CheckBox({ label: 'Indeterminate, Disabled', indeterminate: true, disabled: true });
    checkBoxObj.appendTo('#indeterminate');

    function onChange(args: ChangeEventArgs): void {
        this.label = 'CheckBox: ' + args.checked;
    }
};
