import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample demonstrates the standard mask elements of the MaskedTextBox.
 */
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
(window as any).default = (): void => {
    loadCultureFiles();
    // Render Masked Textbox with default mask
    let mask: MaskedTextBox = new MaskedTextBox({
        mask: '000-000-0000'
    });
    mask.appendTo('#mask1');

    let mask2: MaskedTextBox = new MaskedTextBox({
        mask: '>LL / LLL'
    });
    mask2.appendTo('#mask2');

    let mask3: MaskedTextBox = new MaskedTextBox({
        mask: '00/00/0000'
    });
    mask3.appendTo('#mask3');

    let mask4: MaskedTextBox = new MaskedTextBox({
        mask: '>AAAAA-AAAAA-AAAAA-AAAAA'
    });
    mask4.appendTo('#mask4');
};