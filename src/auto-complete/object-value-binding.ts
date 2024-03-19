import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Object Value Binding Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

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

    // Initialize DropDownList component
    let listObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: records,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a Item',
        allowObjectBinding: true,
        fields: { value: 'text' },
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
        change: () => { valueChange();  }
    });
    listObj.appendTo('#object');
    // call the change event's function after initialized the component.
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
        // update the text and value property values in property panel based on selected item in DropDownList
        value.innerHTML = "Selected value : "  + JSON.stringify(listObj.value);
    }
};