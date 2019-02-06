import { RadioButton } from '@syncfusion/ej2-buttons';

/**
 * Default RadioButton sample
 */
(window as any).default = (): void => {
    //Checked State
    let radioButton: RadioButton = new RadioButton({label: 'Credit/Debit Card', name: 'payment', value: 'credit/debit', checked: true});
    radioButton.appendTo('#radio1');

    radioButton = new RadioButton({label: 'Net Banking', name: 'payment', value: 'netbanking'});
    radioButton.appendTo('#radio2');

    radioButton = new RadioButton({label: 'Cash on Delivery', name: 'payment', value: 'cashondelivery'});
    radioButton.appendTo('#radio3');

    radioButton = new RadioButton({label: 'Other Wallets', name: 'payment', value: 'others'});
    radioButton.appendTo('#radio4');
};