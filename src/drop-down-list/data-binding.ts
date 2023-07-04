import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownList Remote Data & Local Data Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, WebApiAdaptor  } from '@syncfusion/ej2-data';

import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/Employees',
            adaptor: new WebApiAdaptor ,
            crossDomain: true
        }),
        // bind the Query instance to query property
        query: new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount(),
        // map the appropriate columns to fields property
        fields: { text: 'FirstName', value: 'EmployeeID' },
         // set the placeholder to DropDownList input element
        placeholder: 'Select a name',
        // sort the resulted items
        sortOrder: 'Ascending',
        // set the height of the popup element
        popupHeight: '200px'
    });
    dropDownListObj.appendTo('#customers');

    // initialize DropDownList component
    let games: DropDownList = new DropDownList({
        // set the local data to dataSource property
        dataSource: (data as any).sportsData,
        // map the appropriate columns to fields property
        fields: { text: 'Game' },
        // set the placeholder to DropDownList input element
        placeholder: 'Select a game',
        // set the height of the popup element
        popupHeight: '200px'
    });
    games.appendTo('#games');
};