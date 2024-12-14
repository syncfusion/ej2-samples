import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Remote DataBinding Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


(window as any).default = (): void => {
    loadCultureFiles();

    const columns: ColumnModel[] = [
        { field: 'EmployeeID', header: 'Employee ID', width: 120 },
        { field: 'FirstName', header: 'Name', width: 130 },
        { field: 'Designation', header: 'Designation', width: 120 },
        { field: 'Country', header: 'Country', width: 90 },
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the remote data to dataSource property
        dataSource: new DataManager({
            url: 'https://services.syncfusion.com/js/production/api/Employees',
            adaptor: new WebApiAdaptor,
            crossDomain: true
        }),
        //set the column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'FirstName', value: 'EmployeeID' },
        // bind the Query instance to query property
        query: new Query().select(['FirstName', 'EmployeeID', 'Designation', 'Country']).take(10).requiresCount(),
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'eg. Andrew',
        // set the height of the popup element
        popupHeight: '210px',
        popupWidth: '500px',
        allowSorting: false
    });
    multicolumnObj.appendTo('#remote');
};