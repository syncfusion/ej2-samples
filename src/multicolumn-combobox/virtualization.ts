import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Virtualization Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

(window as any).default = (): void => {
    loadCultureFiles();

    //Generate large datas
    let data: Function = (count: number) => {
        let names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emily Davis"];
        let departments = ["HR", "IT", "Finance", "Marketing", "Sales"];
        let roles = ["Manager", "Developer", "Analyst", "Consultant", "Executive"];
        let locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];
        let result: Object[] = [];
        for (let i = 0; i < count; i++) {
            result.push({
                Name: names[Math.floor(Math.random() * names.length)],
                Department: departments[Math.floor(Math.random() * departments.length)],
                Role: roles[Math.floor(Math.random() * roles.length)],
                Location: locations[Math.floor(Math.random() * locations.length)]
            });
        }
        return result;
    };

    const columns: ColumnModel[] = [
        { field: 'Name', header: 'Name', width: 100 },
        { field: 'Department', header: 'Department', width: 100 },
        { field: 'Role', header: 'Role', width: 90 },
        { field: 'Location', header: 'Location', width: 90,}
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
        fields: { text: 'Name', value: 'Name'},
        //set the placeholder to multiColumn comboBox input element
        placeholder: 'e.g. Alice Johnson',
        // set the height of the popup element
        popupHeight: '210px',
        popupWidth: '530px',
        gridSettings: { rowHeight: 40 }
    });
    virtualComboboxObj.appendTo('#virtual');
};