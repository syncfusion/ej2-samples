import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Aggregate, Group, Sort, Filter } from '@syncfusion/ej2-grids';
import { categoryData } from './data-source';

Grid.Inject(Page, Group, Aggregate, Sort, Filter);
/**
 * Aggregates
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let refresh: Boolean;
    let grid: Grid = new Grid(
        {
            dataSource: categoryData,
            allowPaging: true,
            pageSettings: {pageCount: 5},
            allowGrouping: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            groupSettings: { showDropArea: false, columns: ['CategoryName'] },
            columns: [
                { field: 'CategoryName', headerText: 'Category Name', width: 160 },
                { field: 'ProductName', headerText: 'Product Name', width: 170 },
                { field: 'QuantityPerUnit', headerText: 'Quantity Per Unit', width: 170, textAlign: 'Right' },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 170, textAlign: 'Right' },
                {
                    field: 'Discontinued', headerText: 'Discontinued', width: 150,
                    textAlign: 'Center', displayAsCheckBox: true, type: 'boolean'
                }
            ],
            aggregates: [{
                columns: [{
                    type: 'Sum',
                    field: 'UnitsInStock',
                    groupFooterTemplate: 'Total units: ${Sum}'
                },
                {
                    type: 'TrueCount',
                    field: 'Discontinued',
                    groupFooterTemplate: 'Discontinued: ${TrueCount}'
                },
                {
                    type: 'Max',
                    field: 'UnitsInStock',
                    groupCaptionTemplate: 'Maximum: ${Max}'
                }]
            }],
            load: () => {
                refresh = (<any>grid).refreshing;
            },
            dataBound: () => {
                if (refresh) {
                    grid.groupColumn('CategoryName');
                    refresh = false;
                }
            },

        });
    grid.appendTo('#Grid');
};

