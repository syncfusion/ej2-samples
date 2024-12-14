import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Group, LazyLoadGroup, VirtualScroll, Sort } from '@syncfusion/ej2-grids';
import { lazyLoadData, createLazyLoadData } from './data-source';
/**
 * lazy load grouping sample
 */
Grid.Inject(Group, LazyLoadGroup, VirtualScroll, Sort);

(window as any).default = (): void => {
    loadCultureFiles();
    /* create lazyLoadData */
    createLazyLoadData();
    let grid: Grid = new Grid(
        {
            dataSource: lazyLoadData,
            allowGrouping: true,
            height: 400,
            allowSorting: true,
            enableVirtualization: true,
            groupSettings: { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, allowGrouping: false },
                { field: 'ProductName', headerText: 'Product Name', width: 160 },
                { field: 'ProductID', headerText: 'Product ID', textAlign: 'Right', width: 120 },
                { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 }
            ]
        });
    grid.appendTo('#Grid');
};
