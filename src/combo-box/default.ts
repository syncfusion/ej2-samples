import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Default functionality Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';


(window as any).default = (): void => {
    loadCultureFiles();

    // initialize ComboBox component
    let comboBoxObj: ComboBox = new ComboBox({
        // set the height of the popup element
        popupHeight: '230px',
        // set the index value to select an item based on index at initial rendering
        index: 2,
        // set the placeholder to ComboBox input element
        placeholder: 'Select a game',
        // bind the change event
        change: () => { valueChange();  }
    });
    comboBoxObj.appendTo('#games');
    // call the change event's function after initialized the component.
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
         // update the text and value property values in property panel based on selected item in ComboBox
        value.innerHTML = comboBoxObj.value === null ? 'null' : comboBoxObj.value.toString();
        text.innerHTML = comboBoxObj.text === null ? 'null' : comboBoxObj.text.toString();
    }
};