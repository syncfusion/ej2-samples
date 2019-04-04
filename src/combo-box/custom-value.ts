import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Filtering Samples
 */
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboBoxObj: ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a country',
        // set the height of the popup element
        popupHeight: '300px',
        // set the width of the ComboBox element
        width: '250px',
        // set true for enable the filtering support
        allowFiltering: true,
        // set the template content when the typed character(s) is not present in the list
        noRecordsTemplate:
        '<div><div id="nodata"> No matched item, do you want to add it as new item in list?</div>'
        + '<button id="btn" class="e-control e-btn">Add New Item</button></div>',
        // bind the filtering event
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData((data as any).countries, query);
            if (document.getElementById('nodata')) {
              // bind click event to button which is shown in popup element when the typed character(s) is not present in the list
              document.getElementById('btn').onclick = () => {
                // get the typed characters
                let customValue: string = (document.getElementById('country') as HTMLInputElement).value;
                // make new object based on typed characters
                let newItem: { [key: string]: Object; } = {'Name': customValue, 'Code': customValue };
                // new object added to data source.
                (comboBoxObj.dataSource as Object[]).push(newItem);
                // close the popup element.
                comboBoxObj.hidePopup();
                // pass new object to addItem method.
                comboBoxObj.addItem(newItem);
                // select the newly added item.
                comboBoxObj.value = customValue;
              };
            }
        }
    });
    comboBoxObj.appendTo('#country');
};