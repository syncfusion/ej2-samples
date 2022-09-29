import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Group, LazyLoadGroup, Sort } from '@syncfusion/ej2-grids';
import { lazyLoadData, createLazyLoadData } from './data-source';
/**
 * lazy load grouping sample
 */
Grid.Inject(Page, Group, LazyLoadGroup, Sort);

(window as any).default = (): void => {
    loadCultureFiles();
    /* create lazyLoadData */
    createLazyLoadData();
    let grid: Grid = new Grid(
        {
            dataSource: lazyLoadData,
            allowPaging: true,
            allowGrouping: true,
            allowSorting: true,
            groupSettings: { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ProductName', headerText: 'Product Name', width: 160 },
                { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
                { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 }
            ]
        });
    grid.appendTo('#Grid');
};
