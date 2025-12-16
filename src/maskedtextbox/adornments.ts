import { loadCultureFiles } from '../common/culture-loader';
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
    loadCultureFiles();
    let maskObj: MaskedTextBox = new MaskedTextBox({
        mask: "0000-000-000",
        promptChar: '#',
        placeholder: "Enter phone number",
        floatLabelType: "Auto",
        prependTemplate: '<span id="user" class="e-icons e-user" title="User"></span><span class="e-input-separator"></span>',
        appendTemplate: '<span class="e-input-separator"></span><span id="sendIcon" class="e-icons e-send"></span>'
    });
    maskObj.appendTo('#mask');
};