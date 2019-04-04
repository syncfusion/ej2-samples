import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet, SelectionMode } from '@syncfusion/ej2-pivotview';
import { PivotCellSelectedEventArgs } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { SelectionType } from '@syncfusion/ej2-grids';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

/**
 * PivotView Sample with Selection feature.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            data: Pivot_Data,
            expandAll: true,
            values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
            filters: [],
            valueSortSettings: { headerDelimiter: ' - ' }
        },
        showTooltip: false,
        width: '100%',
        height: 300,
        gridSettings: {
            columnWidth: 120,
            allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
        },
        cellSelected: (args: PivotCellSelectedEventArgs) => {
            document.getElementById('selection-EventLog').innerHTML = '';
            if (args.selectedCellsInfo.length > 0) {
                for (let cell of args.selectedCellsInfo) {
                    let summMeasure = pivotGridObj.engineModule.fieldList[cell.measure] ? pivotGridObj.engineModule.fieldList[cell.measure].aggregateType + ' of ' +
                        pivotGridObj.engineModule.fieldList[cell.measure].caption : '';
                    appendElement(
                        (cell.columnHeaders == '' ? '' : 'Column Headers: ' + '<b>' + cell.columnHeaders + '</b></br>') +
                        (cell.rowHeaders == '' ? '' : 'Row Headers: ' + '<b>' + cell.rowHeaders + '</b></br>') +
                        (summMeasure == '' ? '' : 'Measure: ' + '<b>' + summMeasure + '</b></br>') +
                        'Value: ' + '<b>' + cell.currentCell.formattedText + '</b><hr></br>');
                }
            }
        }
    });
    pivotGridObj.appendTo('#PivotView');
    let modeddl: DropDownList = new DropDownList({
        floatLabelType: 'Auto',
        width: 150,
        change: function (args: ChangeEventArgs) {
            pivotGridObj.gridSettings = { columnWidth: 240 };
            pivotGridObj.gridSettings.selectionSettings.mode = args.value as SelectionMode;
            pivotGridObj.renderModule.updateGridSettings();
        }
    });
    modeddl.appendTo('#mode');
    let typeddl: DropDownList = new DropDownList({
        floatLabelType: 'Auto',
        width: 150,
        change: function (args: ChangeEventArgs) {
            pivotGridObj.gridSettings.selectionSettings.type = args.value as SelectionType;
            pivotGridObj.renderModule.updateGridSettings();
        }
    });
    typeddl.appendTo('#type');
    function appendElement(html: string) {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('selection-EventLog');
        log.appendChild(span);
    }
};
