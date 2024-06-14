import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Virtualization Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

(window as any).default = (): void => {
    loadCultureFiles();

    //Generate large datas
    let data: Function = (count: number) => {
        let names = ["John", "Alice", "Bob", "Mario Pontes", "Yang Wang", "Michael", "Nancy", "Robert King"];
        let hours = [8, 12, 16];
        let status = ["Pending", "Completed", "In Progress"];
        let designation = ["Engineer", "Manager", "Tester"];
        let result: Object[] = [];
        for (let i = 0; i < count; i++) {
            result.push({
                TaskID: i + 1,
                Engineer: names[Math.floor(Math.random() * names.length)],
                Designation: designation[Math.floor(Math.random() * designation.length)],
                Estimation: hours[Math.floor(Math.random() * hours.length)],
                Status: status[Math.floor(Math.random() * status.length)]
            });
        }
        return result;
    };

    const columns: ColumnModel[] = [
        { field: 'TaskID', header: 'Task ID', width: 100 },
        { field: 'Engineer', header: 'Engineer', width: 140 },
        { field: 'Designation', header: 'Designation', width: 130 },
        { field: 'Estimation', header: 'Estimation', width: 120 },
        { field: 'Status', header: 'Status', width: 120, }
    ];

    // Initialize multicolumn ComboBox component
    let virtualComboboxObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the random generated data to dataSource property
        dataSource: data(150),
        //set column of the multicolumn combobox
        columns: columns,
        //Set enableVirtualization true to enable virtual scroll
        enableVirtualization: true,
        //set the fields of the multicolumn combobox
        fields: { text: 'Engineer', value: 'TaskID'},
        //set the placeholder to multiColumn comboBox input element
        placeholder: 'Select an engineer',
        // set the height of the popup element
        popupHeight: '230px',
        gridSettings: { rowHeight: 40 }
    });
    virtualComboboxObj.appendTo('#virtual');
};