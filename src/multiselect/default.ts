/**
 * DropDownList Default Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';


this.default = () => {
    let listObj: MultiSelect = new MultiSelect({
        placeholder: 'Favorite Sports',
        mode: 'box'
    });
    listObj.appendTo('#box');
    let listObj1: MultiSelect = new MultiSelect({
        placeholder: 'Favorite Sports',
        mode: 'default'
    });
    listObj1.appendTo('#default');
    let listObj2: MultiSelect = new MultiSelect({
        placeholder: 'Favorite Sports',
        mode: 'delimiter'
    });
    listObj2.appendTo('#delimiter');
};