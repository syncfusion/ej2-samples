import { TreeGrid, Page, Aggregate } from '@syncfusion/ej2-treegrid';
import { summaryRowData } from './data-source';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

TreeGrid.Inject(Page, Aggregate);
/**
 * Aggregates
 */
(window as any).default = (): void => {
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: summaryRowData,
            childMapping: 'children',
            treeColumnIndex: 0,
            height: 400,
            columns: [
                { field: 'FreightID', headerText: 'Freight ID', width: 130 },
                { field: 'FreightName', width: 200, headerText: 'Freight Name' },
                { field: 'UnitWeight', headerText: 'Weight Per Unit', type: 'number', width: 140, textAlign: 'Right' },
                { field: 'TotalUnits', headerText: 'Total Units', type: 'number', width: 140, textAlign: 'Right' }
            ],
            aggregates: [{
                    columns: [
                        {
                            type: 'Max',
                            field: 'UnitWeight',
                            columnName: 'UnitWeight',
                            footerTemplate: 'Maximum: ${Max}'
                        },
                        {
                        type: 'Min',
                        field: 'TotalUnits',
                        columnName: 'TotalUnits',
                        footerTemplate: 'Minimum: ${Min}'
                    }]
            }]
        });
    grid.appendTo('#Grid');

    let checkBoxObj: CheckBox = new CheckBox({ checked: true, change: onChange });
    checkBoxObj.appendTo('#checked');

    function onChange( args: ChangeEventArgs): void {
        if (args.checked) {
            grid.aggregates[0].showChildSummary = true;
            grid.refresh();
         } else {
            grid.aggregates[0].showChildSummary = false;
            grid.refresh();
        }
    }
};



