/**
 * MultiSelect Default Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    // initialize MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // set the placeholder to MultiSelect input element
        placeholder: 'Favorite Sports',
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Box'
    });
    listObj.appendTo('#box');

    // initialize MultiSelect component
    let listObj1: MultiSelect = new MultiSelect({
        // set the placeholder to MultiSelect input element
        placeholder: 'Favorite Sports',
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Default'
    });
    listObj1.appendTo('#default');

    // initialize MultiSelect component
    let listObj2: MultiSelect = new MultiSelect({
        // set the placeholder to MultiSelect input element
        placeholder: 'Favorite Sports',
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Delimiter'
    });
    listObj2.appendTo('#delimiter');
};