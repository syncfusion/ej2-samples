import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListBox drag and drop sample.
 */
import { ListBox, DragEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import * as data from './datasource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    let dataA: DataManager = new DataManager({
        json: (data as any).dragAndDropA
    });

    // Initialize ListBox component.
    let listObj1: ListBox = new ListBox({
        // Set the scope of the ListBox.
        scope: 'combined-list',

        // Set the dragAndDropA to the data source.
        dataSource: dataA,

        // Set allowDragAndDrop as `true`.
        allowDragAndDrop: true,

        height: '330px',

        drop: onDropGroupA,

        // Map the appropriate columns to fields property.
        fields: { text: 'Name' }
    });

    listObj1.appendTo('#listbox1');

    let dataB: DataManager = new DataManager({
        json: (data as any).dragAndDropB
    });
    // Initialize ListBox component.
    let listObj2: ListBox = new ListBox({
        // Set the scope of the ListBox.
        scope: 'combined-list',

        // Set the dragAndDropB data to the data source.
        dataSource: dataB,

        // Set allowDragAndDrop as `true`.
        allowDragAndDrop: true,

        height: '330px',

        // Set field property with text as `Name`.
        fields: { text: 'Name' },

        drop: onDropGroupB
    });

    listObj2.appendTo('#listbox2');

    let modifiedDataA: ModifiedRecords = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    let modifiedDataB: ModifiedRecords = { addedRecords: [], deletedRecords: [], changedRecords: [] };

    document.getElementById('savechange').onclick = (): void => {
        // Saving the manipulated records in to data manager.
        dataA.saveChanges(modifiedDataA, listObj1.fields.text);
        dataB.saveChanges(modifiedDataB, listObj2.fields.text);
        modifiedDataA.addedRecords = []; modifiedDataB.addedRecords = [];
    };

    function onDropGroupA(args: DragEventArgs): void {
        args.items.forEach((item: { [key: string]: Object; }): void => {
            /*Preventing item manipulation on drag and drop within same list box.*/
            if (!listObj1.getDataByValue(item[listObj1.fields.text] as string)) {
                modifiedDataB.addedRecords.push(item);
                modifiedDataA.deletedRecords.push(item);
            }
        });
    }

    function onDropGroupB(args: DragEventArgs): void {
        args.items.forEach((item: { [key: string]: Object; }): void => {
            if (!listObj2.getDataByValue(item[listObj2.fields.text] as string)) {
                modifiedDataA.addedRecords.push(item);
                modifiedDataB.deletedRecords.push(item);
            }
        });
    }
};

interface ModifiedRecords {
    addedRecords: { [key: string]: Object }[];
    deletedRecords: { [key: string]: Object }[];
    changedRecords: { [key: string]: Object }[];
}