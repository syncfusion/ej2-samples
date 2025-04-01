import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import * as dataSource from './pivot-data/productData.json';
enableRipple(false);

/**
 * PivotView HeatMap Sample.
 */
let data: IDataSet[] = (dataSource as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let colourScheme: string[] = ['range1', 'range2', 'range3', 'range4', 'range5', 'range6', 'range7', 'range8', 'range9',
    'range10', 'range11', 'range12', 'range13', 'range14'];
    let minValue: number = 0;
    let maxValue: number = 0;
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: false,
            columns: [{ name: 'ProductType' }, { name: 'Product' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            values: [{ name: 'SoldAmount', caption: 'Sold Amount' }],
            dataSource: data,
            rows: [{ name: 'Year' }],
            formatSettings: [{ name: 'SoldAmount', format: 'C0' }],
            groupSettings: [{
                name: 'Year',
                type: 'Number',
                rangeInterval: 2
            }],
            expandAll: true,
            filters: [],
            showColumnSubTotals: false
        },
        width: '100%',
        height: 500,
        gridSettings: { rowHeight:35, columnWidth: 120 },
        cellTemplate: function (args: any): any {
            if (args != null && args.cellInfo) {
                if (args.cellInfo.axis === 'value') {
                    if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum) {
                        args.targetCell.classList.add(cellColour(args.cellInfo.value));
                    }
                    args.targetCell.querySelector('.e-cellvalue').innerText = '$' + (args.cellInfo.value / 1000).toFixed(1) + 'K';
                }
            }
        },
        aggregateCellInfo: function (args: any): any {
            if (args.rowCellType !== "grandTotal" && args.columnCellType !== "grandTotal") {
                minValue = (minValue < args.value && minValue !== 0) ? minValue : args.value;
                maxValue = maxValue > args.value ? maxValue : args.value;
            }
        },
        enginePopulated: function () {
            minValue = minValue - 1000;
            maxValue = maxValue + 1000;
        }
    });

    function cellColour(value: any): string {
        let percentage = (maxValue - minValue) / colourScheme.length;
        let colourIndex = Math.round((value - minValue) / percentage);
        return colourScheme[colourIndex];
    };
    pivotObj.appendTo('#PivotView-Heatmap');
};
