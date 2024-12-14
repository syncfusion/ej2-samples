import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Filtering Sample
 */
import { MultiColumnComboBox, ColumnModel, FilteringEventArgs } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


(window as any).default = (): void => {
    loadCultureFiles();
    
    const columns: ColumnModel[] = [
        { field: 'Name', header: 'Name', width: 105 },
        { field: 'Department', header: 'Department', width: 120 },               
        { field: 'Role', header: 'Role', width: 140 },
        { field: 'Location', header: 'Location', width: 100 },
        { field: 'Experience', header: 'Experience in Years', width: 145 } 
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).employee,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Name', value: 'Experience' },
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'e.g. Alice Johnson',
        // set the height of the popup element
        popupHeight: '210px',
        popupWidth: '650px'
    });
    multicolumnObj.appendTo('#filtering');

    let filterTypes = [
        { text: "StartsWith", value: "StartsWith" },
        { text: "EndsWith", value: "EndsWith" },
        { text: "Contains", value: "Contains" },
    ];

    let listObj: DropDownList = new DropDownList({
        // set the index value to select an item based on index at initial rendering
        index: 0,
        // set the placeholder to DropDownList input element
        placeholder: 'select a filter type',
        // set the height of the popup element
        popupHeight: '200px',
        popupWidth: "300px",
        // bind the change event
        change: function (args) { multicolumnObj.filterType = args.value; }
    });
    listObj.appendTo('#filterType');
};