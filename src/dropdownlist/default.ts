/**
 * DropDownList Default Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    let listObj: DropDownList = new DropDownList({
        index: 2,
        placeholder: 'Select a game',
        popupHeight: '200px',
        change: () => { valueChange();  }
    });
    listObj.appendTo('#games');
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
        value.innerHTML = listObj.value as string;
        text.innerHTML = listObj.text;
    }
};