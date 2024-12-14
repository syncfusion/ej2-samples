import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { formatData } from './data-source';


TreeGrid.Inject(Page);
/**
 * Stacked header Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let columnNames: { [key: string]: Object }[] = [
        { id: 'price', name: 'Price' },
        { id: 'orderDate', name: 'Order Date' }
    ];

    let priceFormat: { [key: string]: Object }[] = [
        { id: 'n2', format: 'n2' },
        { id: 'n3', format: 'n3' },
        { id: 'c2', format: 'c2' },
        { id: 'c3', format: 'c3' },
        { id: 'p2', format: 'p2' },
        { id: 'p3', format: 'p3' }
    ];

    let dateFormat: { [key: string]: Object }[] = [
        { id: 'M/d/yyyy', format: 'Short Date' },
        { id: 'dddd, MMMM dd, yyyy', format: 'Long Date' },
        { id: 'MMMM, yyyy', format: 'Month/Year' },
        { id: 'MMMM, dd', format: 'Month/Day' }
    ];

    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: formatData,
            allowPaging: true,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 1,
            pageSettings: { pageCount: 5 },
            columns: [
                { field: 'orderID', headerText: 'Order ID', textAlign: 'Right', width: 110 },
                { field: 'orderName', headerText: 'Order Name', textAlign: 'Left', width: 210 },
                { field: 'orderDate', headerText: 'Order Date', textAlign: 'Right', width: 190,
                format: { format: 'dd/MM/yyyy', type: 'date' } },
                { field: 'price', headerText: 'Price', textAlign: 'Right', width: 120, format: 'c2', type: 'number' },
            ]
        });
    treegrid.appendTo('#TreeGrid');

    setTimeout(() => {
        let dropDownColumn: DropDownList = new DropDownList({
        dataSource: columnNames,
        popupWidth: '100%',
        fields: { text: 'name', value: 'id' },
        width:'140px',
        value: 'price',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string> e.value;
            if ( columnName === 'price' ) {
                dropDownFormat.dataSource = priceFormat;
            }
            if ( columnName === 'orderDate' ) {
                dropDownFormat.dataSource = dateFormat;
            }
            dropDownFormat.index = 0;
        }
    });
    dropDownColumn.appendTo('#columns');

    let dropDownFormat: DropDownList = new DropDownList({
        dataSource: priceFormat,
        fields: { text: 'format', value: 'id' },
        value: 'c2',
        width:'140px',
        change: (e: ChangeEventArgs) => {
            let formatval: any = <string> e.value;
            let columnName: string = <string> dropDownColumn.value;
            if ( columnName === 'price' ) {
                treegrid.getColumnByField( columnName ).format =  formatval;
            }
            if ( columnName === 'orderDate' ) {
                treegrid.getColumnByField( columnName ).format = { format : formatval, type: 'date' };
            }
            treegrid.refreshColumns();
        }
    });
    dropDownFormat.appendTo('#format');
    }, 2);
};
