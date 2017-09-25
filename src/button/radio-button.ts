import { RadioButton } from '@syncfusion/ej2-buttons';

/**
 * Default RadioButton sample
 */
this.default = (): void => {
    //Checked State
    let radiobutton: RadioButton = new RadioButton({label: 'Credit/Debit Card', name: 'payment', value: 'credit/debit', checked: true});
    radiobutton.appendTo('#radio1');

    let radiobutton1: RadioButton = new RadioButton({label: 'Net Banking', name: 'payment', value: 'netbanking'});
    radiobutton1.appendTo('#radio2');

    let radiobutton2: RadioButton = new RadioButton({label: 'Cash on Delivery', name: 'payment', value: 'cashondelivery'});
    radiobutton2.appendTo('#radio3');

    let radiobutton3: RadioButton = new RadioButton({label: 'Other Wallets', name: 'payment', value: 'others'});
    radiobutton3.appendTo('#radio4');
};