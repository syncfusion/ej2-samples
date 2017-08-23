/**
 * DropDownList Default Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    let listObj: DropDownList = new DropDownList({
        index: 2,
        placeholder: 'Select a game',
        popupHeight: '200px',
        change: () => {
            let value: Element = document.getElementById('value');
            let index: Element = document.getElementById('index');
            let text: Element = document.getElementById('text');
            value.innerHTML = listObj.value as string;
            text.innerHTML = listObj.text;
            index.innerHTML = listObj.index.toString();
        }
    });
    listObj.appendTo('#list');
};