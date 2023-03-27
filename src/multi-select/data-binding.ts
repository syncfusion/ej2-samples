import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Remote Data & Local Data Samples
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, WebApiAdaptor  } from '@syncfusion/ej2-data';

import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // initialize MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'https://ej2services.syncfusion.com/js/development/api/Employees',
            adaptor: new WebApiAdaptor ,
            crossDomain: true
        }),
        // bind the Query instance to query property
        query: new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount(),
        // map the appropriate columns to fields property
        fields: { text: 'FirstName', value: 'EmployeeID' },
        // set the placeholder to MultiSelect input element
        placeholder: 'Select name',
        // sort the resulted items
        sortOrder: 'Ascending'
    });
    listObj.appendTo('#remote');

    // initialize MultiSelect component
    let games: MultiSelect = new MultiSelect({
        // set the local data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code'},
        // set the placeholder to MultiSelect input element
        placeholder: 'Select countries',
    });
    games.appendTo('#local');
};