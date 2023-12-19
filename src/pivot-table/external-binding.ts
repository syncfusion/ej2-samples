import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { PivotCellSelectedEventArgs, CellSelectedObject } from '@syncfusion/ej2-pivotview';
import { HeatMap, Adaptor, ILoadedEventArgs, HeatMapTheme, Tooltip, Legend } from '@syncfusion/ej2-heatmap';
import { enableRipple } from '@syncfusion/ej2-base';
import * as pivotData from './pivot-data/Pivot_Data.json';
enableRipple(false);

/**
 * PivotView Sample with Selection feature with HeatMap integration.
 */

/* tslint:disable */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let onInit: boolean = true;
    let measureList: { [key: string]: string } = {};
    let heatmap: HeatMap;
    let selectedCells: CellSelectedObject[];
    let xLabels: string[] = [];
    let yLabels: string[] = [];
    let jsonDataSource: object[] = [];

    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            dataSource: Pivot_Data,
            expandAll: true,
            values: [{ name: 'Sold', caption: 'Units Sold' }],
            filters: [],
            formatSettings: [{ name: 'Sold', format: 'N0' }],
        },
        showTooltip: false,
        width: '100%',
        height: 300,
        dataBound: () => {
            if (onInit) {
                pivotObj.grid.selectionModule.selectCellsByRange({ cellIndex: 1, rowIndex: 1 }, { cellIndex: 3, rowIndex: 4 });
            }
        },
        gridSettings: {
            columnWidth: 120,
            allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
        },
        cellSelected: (args: PivotCellSelectedEventArgs) => {
            selectedCells = args.selectedCellsInfo;
            if (selectedCells && selectedCells.length > 0) {
                frameSeries();
                heatmapUpdate();
            }
        }
    });
    pivotObj.appendTo('#PivotView');

    function frameSeries(): void {
        let columnGroupObject: { [key: string]: { x: string, y: number }[] } = {};
        xLabels = [];
        yLabels = [];
        jsonDataSource = [];
        for (let cell of selectedCells) {
            if (cell.measure !== '') {
                let columnSeries: string = (pivotObj.dataSourceSettings.values.length > 1 && measureList[cell.measure]) ?
                    (cell.columnHeaders.toString() + ' ~ ' + measureList[cell.measure]) : cell.columnHeaders.toString();
                columnSeries = columnSeries == '' && cell.measure != '' ? 'Grand Total' : columnSeries;
                let rHeaders: string = cell.rowHeaders == '' && cell.currentCell.axis != 'column' ? 'Grand Total' : cell.rowHeaders.toString();
                if (columnGroupObject[columnSeries]) {
                    columnGroupObject[columnSeries].push({ x: rHeaders.toString(), y: Number(cell.value) });
                } else {
                    columnGroupObject[columnSeries] = [{ x: rHeaders.toString(), y: Number(cell.value) }];
                    yLabels.push(columnSeries);
                }
                if (xLabels.indexOf(rHeaders.toString()) == -1) {
                    xLabels.push(rHeaders.toString());
                }
            }
        }
        for (let xcnt: number = 0; xcnt < xLabels.length; xcnt++) {
            let xName: string = xLabels[xcnt];
            let row: object = { 'xMember': xName };
            for (let ycnt: number = 0; ycnt < yLabels.length; ycnt++) {
                let YName: string = yLabels[ycnt];
                let col: { x: string, y: number }[] = columnGroupObject[YName].filter(function (item) { return item.x == xName; });
                row[YName] = col.length > 0 ? col[0].y : '';
            }
            jsonDataSource.push(row);
        }
    }

    function heatmapUpdate() {
        if (onInit) {
            onInit = false;
            HeatMap.Inject(Adaptor, Tooltip, Legend);
            heatmap = new HeatMap({
                titleSettings: {
                    text: 'Sales Analysis'
                },
                legendSettings: {
                    visible: false,
                    position: 'Top'
                },
                xAxis: {
                    title: { text: pivotObj.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: xLabels,
                    labelIntersectAction: "Trim"
                },
                yAxis: {
                    title: { text: pivotObj.dataSourceSettings.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: yLabels
                },
                dataSource: jsonDataSource,
                dataSourceSettings: {
                    isJsonData: true,
                    adaptorType: 'Table',
                    xDataMapping: 'xMember'
                },
                load: (args: ILoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
                },
            }, '#heatmap');
        } else {
            heatmap.dataSource = jsonDataSource;
            heatmap.xAxis = {
                title: { text: pivotObj.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: xLabels,
                labelIntersectAction: "Trim"
            };
            heatmap.yAxis = {
                title: { text: pivotObj.dataSourceSettings.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: yLabels
            };
            heatmap.refresh();
        }
    }
};
