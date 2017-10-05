/**
 * Sample demonstrates custom characters and regular expression support.
 */
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

this.default = (): void => {

    let mask1: MaskedTextBox = new MaskedTextBox({
        mask: '00:00 >PM',
        customCharacters: {
            P: 'P,A,a,p',
            M: 'M,m'
        },
        floatLabelType: 'Never'
    });
    mask1.appendTo('#mask1');
    let mask2: MaskedTextBox = new MaskedTextBox({
        mask: '[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5]',
        floatLabelType: 'Never'
    });
    mask2.appendTo('#mask2');
};
