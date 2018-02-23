import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Grid, Filter, Page, Selection, FilterType } from '@syncfusion/ej2-grids';
import { orderDetails } from './datasource';

Grid.Inject(Filter, Page, Selection);

/**
 * Filtering sample
 */
this.default = (): void => {
    let filtertype: { [key: string]: Object }[] = [
        { id: 'Menu', type: 'Menu' },
        { id: 'CheckBox', type: 'CheckBox' },
        { id: 'Excel', type: 'Excel' }
    ];

    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowPaging: true,
            allowFiltering: true,
            filterSettings: { type: 'Menu' },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');

    let dropDownFilterType: DropDownList = new DropDownList({
        dataSource: filtertype,
        fields: { text: 'type', value: 'id' },
        value: 'Menu',
        change: (e: ChangeEventArgs) => {
            let dropSelectedValue: FilterType = <FilterType>e.value;
            grid.filterSettings.type = dropSelectedValue;
            grid.clearFiltering();
        }
    });
    dropDownFilterType.appendTo('#filterType');
};