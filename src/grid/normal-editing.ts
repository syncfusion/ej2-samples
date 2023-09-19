import { Grid, Edit, Toolbar, Page, NewRowPosition } from '@syncfusion/ej2-grids';
import { orderDataSource } from './data-source';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

/**
 * Batch Editing sample
 */
Grid.Inject(Edit, Toolbar, Page);

(window as any).default = (): void => {
    let newRowPosition: { [key: string]: Object }[] = [
        { id: 'Top', newRowPosition: 'Top' },
        { id: 'Bottom', newRowPosition: 'Bottom' }
    ];
    let grid: Grid = new Grid(
        {
            dataSource: orderDataSource,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Top' },
            allowPaging: true,
            pageSettings: { pageCount: 5 },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            actionBegin: actionBegin,
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 140
                },
                {
                    field: 'CustomerID', headerText: 'Customer ID',
                    validationRules: { required: true }, width: 140
                },
                {
                    field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit',
                    width: 140, format: 'C2', validationRules: { required: true }
                },
                {
                    field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit',
                    width: 160, format: { type: 'dateTime', format: 'M/d/y hh:mm a' },
                },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit: { params: { popupHeight: '300px' } }
                }],
        });
    grid.appendTo('#Grid');

    function actionBegin(args: any): void {
        if (args.requestType === 'save') {
            if (grid.pageSettings.currentPage !== 1 && grid.editSettings.newRowPosition === 'Top') {
                args.index = (grid.pageSettings.currentPage * grid.pageSettings.pageSize) - grid.pageSettings.pageSize;
            } else if (grid.editSettings.newRowPosition === 'Bottom') {
                args.index = (grid.pageSettings.currentPage * grid.pageSettings.pageSize) - 1;
            }
        }
    }

    let dropDownType: DropDownList = new DropDownList({
        dataSource: newRowPosition,
        fields: { text: 'newRowPosition', value: 'id' },
        value: 'Top',
        change: (e: ChangeEventArgs) => {
            let newRowPosition: string = <string>e.value;
            grid.editSettings.newRowPosition = <NewRowPosition>newRowPosition;
        }
    });
    dropDownType.appendTo('#newRowPosition');
};