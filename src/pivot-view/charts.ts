import { PivotView, IGridValues, IAxisSet, PivotEngine } from '@syncfusion/ej2-pivotview';
import { Pivot_Data } from './data-source';
import { Chart, Category, Legend, Tooltip, ColumnSeries, LineSeries } from '@syncfusion/ej2-charts';
import { SeriesModel, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { extend, enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

/**
 * PivotView Sample with Chart integration.
 */

this.default = (): void => {
    let onInit: boolean = true;
    let measure: string = 'In Stock';
    let engineModule: PivotEngine;
    let chart: Chart;
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            enableSorting: true,
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            rows: [{ name: 'Country' }, { name: 'Products' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            data: Pivot_Data,
            expandAll: false,
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' }],
            filters: []
        },
        width: '100%',
        height: 300,
        gridSettings: { columnWidth: 120 },
        dataBound: (args: any): void => {
            if (onInit) {
                onChartLoad();
            }
        }
    });
    pivotGridObj.appendTo('#PivotView');

    let measuresddl: DropDownList = new DropDownList({
        change: (args: ChangeEventArgs) => {
            measure = args.value.toString();
            onChartLoad();
        }
    });
    measuresddl.appendTo('#measures');

    /* tslint:disable */
    function onChartLoad() {
        if (onInit) {
            onInit = false;
            engineModule = extend({}, pivotGridObj.engineModule, null, true) as PivotEngine;
        }
        if (engineModule) {
            let valuesContent: IGridValues = engineModule.valueContent;
            let data: IGridValues = [];
            for (let cCnt: number = 0; cCnt < valuesContent.length; cCnt++) {
                if (!valuesContent[cCnt][0].type) {
                    data[cCnt] = valuesContent[cCnt];
                }
            }
            let chartSeries: SeriesModel[];
            for (let cCnt: number = 0; cCnt < 1; cCnt++) {
                if (data[cCnt]) {
                    for (let rCnt: number = measure === 'In Stock' ? 1 : 2; rCnt < Object.keys(data[cCnt]).length; rCnt++) {
                        if (data[cCnt][rCnt] && !(engineModule.pivotValues[0][rCnt] as IAxisSet).type && !data[cCnt][rCnt].type && rCnt > 0) {
                            let colText: string = (engineModule.pivotValues[0][rCnt] as IAxisSet).formattedText;
                            if (!chartSeries) {
                                chartSeries = [{
                                    dataSource: data,
                                    xName: cCnt + '.valueSort.levelName',
                                    yName: rCnt + '.value',
                                    type: 'Column',
                                    name: colText
                                }];
                            } else {
                                chartSeries.push({
                                    dataSource: data,
                                    xName: cCnt + '.valueSort.levelName',
                                    yName: rCnt + '.value',
                                    type: 'Column',
                                    name: colText
                                });
                            }
                            rCnt++;
                        }
                    }
                }
            }
            if (chart && chart.element) {
                chart.primaryYAxis = {
                    title: measure
                };
                chart.primaryXAxis = {
                    valueType: 'Category',
                    title: 'Country',
                    labelIntersectAction: 'Rotate45'
                };
                chart.series = chartSeries;
                chart.refresh();
            } else {
                Chart.Inject(ColumnSeries, LineSeries, Legend, Tooltip, Category);
                chart = new Chart({
                    title: 'Sales Analysis',
                    legendSettings: {
                        visible: true
                    },
                    tooltip: {
                        enable: true
                    },
                    primaryYAxis: {
                        title: measure,
                    },
                    primaryXAxis: {
                        valueType: 'Category',
                        title: 'Country',
                        labelIntersectAction: 'Rotate45'
                    },
                    series: chartSeries,
                    load: (args: ILoadedEventArgs) => {
                        let selectedTheme: string = location.hash.split('/')[1];
                        selectedTheme = selectedTheme ? selectedTheme : 'Material';
                        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                    }
                }, '#chart');
            }
        }
    }
};
