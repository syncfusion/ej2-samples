/**
 * DropDownList Default Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    // Initialize DropDownList component
    let listObj: DropDownList = new DropDownList({
        // set the index value to select an item based on index at initial rendering
        index: 2,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a game',
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
        change: () => { valueChange();  }
    });
    listObj.appendTo('#games');
    // call the change event's function after initialized the component.
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
        // update the text and value property values in property panel based on selected item in DropDownList
        value.innerHTML = listObj.value as string;
        text.innerHTML = listObj.text;
    }
};