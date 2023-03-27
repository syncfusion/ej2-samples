import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboBoxObj1: ComboBox = new ComboBox({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'https://ej2services.syncfusion.com/js/development/api/Employees',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        }),
        // bind the Query instance to query property
        query: new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount(),
        // map the appropriate columns to fields property
        fields: { text: 'FirstName', value: 'EmployeeID' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a name',
        // set the height of the popup element
        popupHeight: '200px',
        // sort the resulted items
        sortOrder: 'Ascending',
        // enable the autofill property to fill a first matched value in input when press a down key
        autofill: true
    });
    comboBoxObj1.appendTo('#customers');

    // initialize ComboBox component
    let comboBoxObj2: ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).sportsData,
        // map the appropriate columns to fields property
        fields: { text: 'Game', value: 'Id' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a game',
        // sort the resulted items
        sortOrder: 'Ascending',
        // set the height of the popup element
        popupHeight: '230px',
        // enable the autofill property to fill a first matched value in input when press a down key
        autofill: true
    });
    comboBoxObj2.appendTo('#games');

    // Initialize the CheckBox component
    let checkBoxObj: CheckBox = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'Autofill',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the autofill in remote data ComboBox based on CheckBox checked state
            comboBoxObj1.autofill = args.checked;
            // enable or disable the autofill in local data ComboBox based on CheckBox checked state
            comboBoxObj2.autofill = args.checked;
        }
    });
    checkBoxObj.appendTo('#checkAutofill');
};