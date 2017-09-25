/**
 * ComboBox Default functionality Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    let comboBoxObj: ComboBox = new ComboBox({
        popupHeight: '230px',
        index: 2,
        placeholder: 'Select a game',
        change: () => { valueChange();  }
    });
    comboBoxObj.appendTo('#games');
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
        value.innerHTML = comboBoxObj.value === null ? 'null' : comboBoxObj.value.toString();
        text.innerHTML = comboBoxObj.text === null ? 'null' : comboBoxObj.text.toString();
    }
};