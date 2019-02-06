import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, WebApiAdaptor  } from '@syncfusion/ej2-data';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    let loader: HTMLElement;
    // initialize AutoComplete component
    let atcObj1: AutoComplete = new AutoComplete({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        }),
        // set the count for displays the suggestion items.
        suggestionCount: 5,
        // bind the Query instance to query property
        query: new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount(),
        // map the appropriate columns to fields property
        fields: { value: 'FirstName' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Andrew Fuller',
        // sort the resulted items
        sortOrder: 'Ascending',
        // enable the autofill property to fill a first matched value in input when press a down key
        autofill: true,
        // set the filterType to searching operation
        filterType: 'StartsWith'
    });
    atcObj1.appendTo('#products');

    // initialize AutoComplete component
    let atcObj2: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { value: 'Name' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Australia',
        // sort the resulted items
        sortOrder: 'Ascending',
        // set the filterType to searching operation
        filterType: 'StartsWith',
        // enable the autofill property to fill a first matched value in input when press a down key
        autofill: true
    });
    atcObj2.appendTo('#country');

    // initialize check box component
    let checkBoxObj: CheckBox = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'Autofill',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the autofill in remote data AutoComplete based on CheckBox checked state
            atcObj1.autofill = args.checked;
            // enable or disable the autofill in local data AutoComplete based on CheckBox checked state
            atcObj2.autofill = args.checked;
        }
    });
    checkBoxObj.appendTo('#checkAutofill');
};