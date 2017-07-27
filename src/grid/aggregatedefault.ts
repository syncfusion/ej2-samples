import { Grid, Page, Aggregate } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Page, Aggregate);
/**
 * Aggregates
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            columns: [
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'Freight', width: 160, format: 'C2', textAlign: 'right' },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 140 }
            ],
            aggregates: [{
                    columns: [{
                        type: 'sum',
                        field: 'Freight',
                        format: 'C2',
                        footerTemplate: 'Sum: ${sum}'
                    }]
                },
                {
                    columns: [{
                        type: 'average',
                        field: 'Freight',
                        format: 'C2',
                        footerTemplate: 'Average: ${average}'
                    }]
                }]
        });
    grid.appendTo('#Grid');
};

