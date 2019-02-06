import { loadCultureFiles } from '../common/culture-loader';
/**
 * Sample demonstrates custom characters and regular expression support.
 */
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

(window as any).default = (): void => {
    loadCultureFiles();
    // Render the Masked Textbox
    let mask1: MaskedTextBox = new MaskedTextBox({
        mask: '00:00 >PM',
        // Custom characters to specify time value
        customCharacters: {
            P: 'P,A,a,p',
            M: 'M,m'
        },
        floatLabelType: 'Never'
    });
    mask1.appendTo('#mask1');
    // Render the Masked Textbox
    let mask2: MaskedTextBox = new MaskedTextBox({
        // Mask in range format
        mask: '[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9]',
        floatLabelType: 'Never'
    });
    mask2.appendTo('#mask2');
};
