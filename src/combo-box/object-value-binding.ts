import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Object Value Binding Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';

let records: { [key: string]: Object }[] = [];

for (let i = 1; i <= 150; i++) {
    let item: { [key: string]: Object } = {};
    item.id = 'id' + i;
    item.text = `Item ${i}`;

    // Generate a random number between 1 and 4 to determine the group
    const randomGroup = Math.floor(Math.random() * 4) + 1;
    switch (randomGroup) {
        case 1:
            item.group = 'Group A';
            break;
        case 2:
            item.group = 'Group B';
            break;
        case 3:
            item.group = 'Group C';
            break;
        case 4:
            item.group = 'Group D';
            break;
        default:
            break;
    }
    records.push(item);
}

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboBoxObj: ComboBox = new ComboBox({
        // set the height of the popup element
        popupHeight: '200px',
        dataSource: records,
        allowObjectBinding: true,
        fields: { text: 'text', value: 'id' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a Item',
        // bind the change event
        change: () => { valueChange(); }
    });
    comboBoxObj.appendTo('#object');
    // call the change event's function after initialized the component.
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
         // update the text and value property values in property panel based on selected item in ComboBox
        value.innerHTML = comboBoxObj.value === null ? 'null' : "Selected value : "  + JSON.stringify(comboBoxObj.value);
    }
};