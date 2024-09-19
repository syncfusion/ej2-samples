import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Aggregate, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { OverallData } from './data-source';

Grid.Inject(Page, Aggregate, Sort, Filter, Edit, Toolbar);
/**
 * Aggregates
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: OverallData,
        allowFiltering: true,
        filterSettings: { type: 'Excel' },
        allowSorting:true,
        allowMultiSorting:true,
        height:300,
        enableHover: false,
        gridLines:"Vertical",
        columns: [
            {
                field: 'Month',
                isPrimaryKey: true,
                headerText: 'Time Stamp',
                width: 140,
                clipMode:'EllipsisWithTooltip'
            },
            {
                field: 'Sales',
                headerText: 'Sales',
                textAlign: 'Right',
                format: 'C2',
                width: 150,
            },
            {
                field: 'MarketingSpend',
                headerText: 'Marketing Spend',
                textAlign: 'Right',
                format: 'C2',
                width: 190,
                clipMode:'EllipsisWithTooltip'
            },
            {
                field: 'NewCustomers',
                headerText: 'New Customers',
                textAlign: 'Right',
                width: 180,
                clipMode:'EllipsisWithTooltip'
            },
            {
                field: 'ReturningCustomers',
                headerText: 'Returning Customers',
                textAlign: 'Right',
                width: 220,
                clipMode:'EllipsisWithTooltip'
            },
            {
                field: 'WebTraffic',
                headerText: 'Web Traffic',
                textAlign: 'Right',
                width: 160,
                clipMode:'EllipsisWithTooltip'
            },
        ],
        aggregates: [
            {
                columns: [
                    {
                        type: 'Sum',
                        field: 'Sales',
                        format: 'C2',
                        footerTemplate: 'Total: ${Sum}',
                    },
                    {
                        type: 'Sum',
                        field: 'MarketingSpend',
                        format: 'C2',
                        footerTemplate: 'Total: ${Sum}',
                    },
                    {
                        type: 'Sum',
                        field: 'NewCustomers',
                        format: 'N',
                        footerTemplate: 'New Customers: ${Sum}',
                    },
                    {
                        type: 'Sum',
                        field: 'ReturningCustomers',
                        format: 'N',
                        footerTemplate: 'Returning Customers: ${Sum}',
                    },
                ],
            },
            {
                columns: [
                    {
                        type: 'Average',
                        field: 'Sales',
                        format: 'C2',
                        footerTemplate: 'Average: ${Average}',
                    },
                    {
                        type: 'Average',
                        field: 'MarketingSpend',
                        format: 'C2',
                        footerTemplate: 'Average: ${Average}',
                    },
                    {
                        type: 'Min',
                        field: 'WebTraffic',
                        footerTemplate: 'Min: ${Min}',
                    },
                ],
            },
            {
                columns: [
                    {
                        type: 'Max',
                        field: 'WebTraffic',
                        footerTemplate: 'Max: ${Max}',
                    },
                ],
            },
        ],
      });
      grid.appendTo('#default-aggregate-grid');
};

