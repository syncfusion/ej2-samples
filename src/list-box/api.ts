import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListBox sorting sample.
 */
import { ListBox, DropDownList, SelectionMode } from '@syncfusion/ej2-dropdowns';
import { SortOrder } from '@syncfusion/ej2-lists';
import * as data from './datasource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize ListBox component.
    let listObj: ListBox = new ListBox({
        // Set the vegetableData to the data source.
        dataSource: (data as any).vegetableData,

        // Map the appropriate columns to fields property along with groupBy option.
        fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id' },
    });
    listObj.appendTo('#listbox-group');

    // Initialize DropDownList component.
    let ddlObj: DropDownList = new DropDownList(
        {
            value: 'None',
            popupHeight: '200px',
            // Change event of the Dropdownlist.
            change: () => {
                listObj.sortOrder = ddlObj.value as SortOrder;
            }
        });
    ddlObj.appendTo('#ddl');

    let ddlObj1: DropDownList = new DropDownList(
        {
            value: 'Multiple',
            popupHeight: '200px',
            // Change event of the Dropdownlist.
            change: () => {
                listObj.selectionSettings.mode = ddlObj1.value as SelectionMode;
            }
        });
    ddlObj1.appendTo('#mode');

};