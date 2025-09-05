import { loadCultureFiles } from '../common/culture-loader';
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { enableRipple } from '@syncfusion/ej2-base';
import { Sparkline, SparklineTooltip } from '@syncfusion/ej2-charts';
import * as pivotData from './pivot-data/sparklineData.json';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
enableRipple(false);

/* tslint:disable */

/**
 * PivotView Default Sample.
 */
let Pivot_Data: IDataSet[] = (pivotData as any).data;
(window as any).default = (): void => {
    loadCultureFiles();
    let chartType = 'Column';
    let isDropDownExist = true;
    let chartData: string[] = ['Line', 'Column', 'Area', 'WinLoss'];
    let obj = {};
    let sparkline: Sparkline;
    Sparkline.Inject(SparklineTooltip);
    let pivotObj: PivotView = new PivotView({
        dataSourceSettings: {
            enableSorting: true,
            dataSource: Pivot_Data,
            rows: [{ name: 'Region' }, { name: 'Product' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            expandAll: false,
            filters: [],
            drilledMembers: [{ name: 'Region', items: ['Asia'] }]
        },
        width: '100%',
        height: 450,
        showTooltip: false,
        gridSettings: {
            columnWidth: 110,
            rowHeight: 70,
            columnRender: function (args) {
                args.columns[0].width = 175;
                for (let i = 1; i < args.columns.length - 1; i++) {
                    args.columns[i].width = 140;
                }
                args.columns[args.columns.length-1].width = 500;
            },
            headerCellInfo: function (args) {
                if (args.cell?.column?.customAttributes?.cell.type == 'grand sum') {
                    let input = document.createElement('input');
                    input.type = 'text';
                    input.tabIndex = 1;
                    input.id = 'grandTotal_dropdown';
                    args.node.style.textAlign = 'right';
                    args.node.querySelector('.e-pivotcell-container').appendChild(input);
                    args.node.querySelector('.e-headertext').style.alignSelf = 'unset';
                    args.node.querySelector('.e-headertext').innerText = 'Total Sales Comparison';
                    isDropDownExist = true;
                }
            },
            queryCellInfo: function (args) {
                let colIndex = Number(args.cell.getAttribute('aria-colindex')) - 1;
                if (args.data[colIndex].isGrandSum && args.data[colIndex].columnHeaders == '') {
                    args.cell.innerText = '';
                    let div = document.createElement('div');
                    div.id = 'chart' + args.data[colIndex].rowIndex;
                    div.style.marginTop = '20px';
                    args.cell.appendChild(div);

                    let data: any = [];
                    for (let i = 1; i < Object.keys(args.data).length - 1; i++) {
                        let object = {
                            x: i,
                            xval: args.data[i].columnHeaders,
                            yval: args.data[i].actualValue,
                        };
                        data.push(object);
                    }
                    obj[args.data[colIndex].rowIndex] = data;
                }
            }
        },
        dataBound: function () {
            if (isDropDownExist) {
                isDropDownExist = false;
                let chartTypeDropDown: DropDownList = new DropDownList({
                    floatLabelType: 'Auto',
                    dataSource: chartData,
                    value:chartType,
                    width: 200,
                    change: (args: any) => {
                      chartType = args.value as any;
                      pivotObj.refreshData();
                    },
                  });
              chartTypeDropDown.appendTo('#grandTotal_dropdown');
            }
            let keys = Object.keys(obj);
            for (let i = 0; i < Object.keys(obj).length; i++) {
                sparkline = new Sparkline({
                    height: '30px',
                    lineWidth: 1,
                    type: chartType as any,
                    valueType: 'Category',
                    dataSource: obj[keys[i]],
                    xName: 'xval',
                    yName: 'yval',
                    markerSettings: {
                        visible: ['High', 'Low'],
                        size: 3,
                    },
                    highPointColor: 'blue',
                    lowPointColor: 'red',
                    tiePointColor: 'pink',
                    tooltipSettings: {
                        format: '${xval}: $ ${yval}',
                        visible: true,
                        trackLineSettings: {
                            visible: true,
                            color: '#033e96',
                            width: 1
                        }
                    },
                });
                sparkline.appendTo('#chart' + keys[i]);
            }
        }
    });
    pivotObj.appendTo('#PivotView_sparkline');
};
