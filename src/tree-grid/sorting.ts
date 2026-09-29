import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { TreeGrid, Sort, Page } from '@syncfusion/ej2-treegrid';
import { SortEventArgs } from '@syncfusion/ej2-grids';
import { sortData } from './data-source';

TreeGrid.Inject(Sort, Page);
/**
 * Sorting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sortData,
            allowPaging: true,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 0,
            allowSorting: true,
            columns: [
                { field: 'orderName', headerText: 'Order Name', width: 200 },
                { field: 'Category', headerText: 'Category', width: 140 },
                { field: 'orderDate', headerText: 'Order Date', width: 150, textAlign: 'Right', format: 'yMd', type: 'date' },
                { field: 'units', headerText: 'Units', width: 110, textAlign: 'Right' }
            ],
            actionComplete: sort,
            sortSettings: { columns: [{ field: 'Category', direction: 'Ascending' }, { field: 'orderName', direction: 'Ascending' }] }
        });
    treegrid.appendTo('#TreeGrid');

    let orderName: CheckBox = new CheckBox({ checked: true }); orderName.appendTo('#OrderName');
    let category: CheckBox = new CheckBox({ checked: true }); category.appendTo('#Category');
    let orderDate: CheckBox = new CheckBox(); orderDate.appendTo('#OrderDate');
    let units: CheckBox = new CheckBox(); units.appendTo('#Units');
    let unitprice: CheckBox = new CheckBox(); unitprice.appendTo('#Unit');
    let price: CheckBox = new CheckBox(); price.appendTo('#Price');

    document.getElementById('OrderName').onclick = () => {
        if (orderName.checked) {
            treegrid.sortByColumn('orderName', 'Ascending', true);
        } else {
            treegrid.grid.removeSortColumn('orderName');
        }
    };
    document.getElementById('Category').onclick = () => {
        if (category.checked) {
            treegrid.sortByColumn('Category', 'Ascending', true);
        } else {
            treegrid.grid.removeSortColumn('Category');
        }
    };
    document.getElementById('OrderDate').onclick = () => {
        if (orderDate.checked) {
            treegrid.sortByColumn('orderDate', 'Ascending', true);
         } else {
            treegrid.grid.removeSortColumn('orderDate');
         }
    };
    document.getElementById('Units').onclick = () => {
        if (units.checked) {
            treegrid.sortByColumn('units', 'Ascending', true);
        } else {
            treegrid.grid.removeSortColumn('units');
        }
    };
    function sort(args: SortEventArgs): void {
        if (args.requestType === 'sorting') {
            for (let columns of treegrid.getColumns()) {
                for (let sortcolumns of treegrid.sortSettings.columns) {
                    if (sortcolumns.field === columns.field) {
                        check(sortcolumns.field, true); break;
                    } else {
                        check(columns.field, false);
                    }
                }
            }
        }
    }
    function check(field: string, state: boolean): void {
        switch (field) {
            case 'orderName':
                orderName.checked = state; break;
            case 'Category':
                category.checked = state; break;
            case 'orderDate':
                orderDate.checked = state; break;
            case 'units':
                units.checked = state; break;
            case 'unitPrice':
                unitprice.checked = state; break;
            case 'price':
                price.checked = state; break;
        }
    }
};
