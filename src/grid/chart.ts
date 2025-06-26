import { loadCultureFiles } from '../common/culture-loader';
import { Grid, ContextMenu, ContextMenuClickEventArgs, Filter, Sort, Freeze, QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { sales } from './data-source';
import { CategorySeries, ChartChanges, ChartPopupArgs, GridChart, UpdateChartArgs } from '@syncfusion/ej2-grid-chart';
import { AccumulationChartModel, ChartModel, IAccLoadedEventArgs, ILoadedEventArgs } from '@syncfusion/ej2/charts';
import { loadAccumulationChartTheme, loadChartTheme } from './grid-chart-theme-color';
import { isNullOrUndefined } from '@syncfusion/ej2/base';

Grid.Inject(ContextMenu, Filter, Sort, Freeze);

/**
 * Integrate Chart in Grid Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let gridChart: GridChart;
    let grid: Grid = new Grid(
        {
            dataSource: sales,
            height: 500,
            allowFiltering: true,
            filterSettings: { type: 'Menu' },
            allowSorting: true,
            allowMultiSorting: true,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            contextMenuItems: [
                'Bar', 'StackingBar', 'StackingBar100',
                'Pie',
                'Column', 'StackingColumn', 'StackingColumn100',
                'Line', 'StackingLine', 'StackingLine100',
                'Area', 'StackingArea', 'StackingArea100',
                'Scatter'
            ],
            gridLines: 'Both',
            columns: [
                { type: 'checkbox', width: 50, freeze: 'Left', textAlign: 'Center', customAttributes: { class: 'grid-chart-checkbox-css' } },
                { field: 'Product', headerText: 'Products', template: '#producttemplate', width: 200, freeze: 'Left' },
                { field: 'Category', headerText: 'Categories', template: '#categorytemplate', width: 160 },
                { field: 'Year', headerText: 'Year', textAlign: 'Right', width: 140 },
                { field: 'Online', headerText: 'Online', format: 'C2', textAlign: 'Right', width: 160 },
                { field: 'Retail', headerText: 'Retail', format: 'C2', textAlign: 'Right', width: 160 },
                { field: 'ProfitLoss', headerText: 'Profit/Loss', format: 'C2', textAlign: 'Right', width: 200 },
                { field: 'UnitsSold', headerText: 'Units Sold', textAlign: 'Right', width: 160 },
                { field: 'Revenue', headerText: 'Revenue', format: 'C2', textAlign: 'Right', freeze: 'Right', width: 160 },
            ],
            queryCellInfo: (args: QueryCellInfoEventArgs) => {
                if (args.column.field === 'ProfitLoss') {
                    args.cell.classList.add((<{ ProfitLoss?: number }>args.data).ProfitLoss < 0 ? 'e-gridchart-sales-loss' : 'e-gridchart-sales-profit');
                }
            },
            created: () => {
                gridChart = new GridChart({
                    enablePropertyPanel: true,
                    allowExport: true,
                    enableRtl: grid.enableRtl,
                    locale: grid.locale,
                    updateChartSettings: updateChartSettings
                });
            },
            contextMenuClick: (args: ContextMenuClickEventArgs) => {
                if (args.chartType) {
                    const chartArgs: ChartPopupArgs = {
                        gridInstance: args.gridInstance,
                        chartType: args.chartType,
                        records: args.records
                    };
                    const chartModel: ChartModel = {
                        primaryXAxis: {
                            valueType: 'Category',
                            labelRotation: 315
                        },
                        primaryYAxis: {
                            title: 'Sales in amount',
                            titleStyle: { size: '11px' }
                        },
                        load: (args: ILoadedEventArgs) => {
                            loadChartTheme(args);
                        }
                    };
                    const accumulationChartModel: AccumulationChartModel = {
                        load: (args: IAccLoadedEventArgs) => {
                            loadAccumulationChartTheme(args);
                        }
                    };
                    chartModel.margin = accumulationChartModel.margin = { top: 20, bottom: 20, right: 20, left: 20 };
                    const model: ChartChanges = { chart: chartModel, accumulationChart: accumulationChartModel };
                    const categorySeries: CategorySeries = {
                        category: ['Product', 'Year'],
                        series: ['Online', 'Retail', 'Revenue']
                    };
                    gridChart.render(chartArgs, model, categorySeries);
                }
            }
        });
    grid.appendTo('#GridChart');

    function updateChartSettings(args: UpdateChartArgs): void {
        const chartMargin = args.changes.chart.margin;
        if (!isNullOrUndefined(chartMargin)) {
            const accumulationChartMargin = args.changes.accumulationChart.margin;
            if (!isNullOrUndefined(chartMargin.top)) {
                accumulationChartMargin.top = chartMargin.top = chartMargin.top < 20 ? 20 : chartMargin.top > 100 ? 100 : chartMargin.top;
            } else if (!isNullOrUndefined(chartMargin.bottom)) {
                accumulationChartMargin.bottom = chartMargin.bottom = chartMargin.bottom < 20 ? 20 : chartMargin.bottom > 100 ? 100 : chartMargin.bottom;
            } else if (!isNullOrUndefined(chartMargin.left)) {
                accumulationChartMargin.left = chartMargin.left = chartMargin.left < 20 ? 20 : chartMargin.left > 100 ? 100 : chartMargin.left;
            } else if (!isNullOrUndefined(chartMargin.right)) {
                accumulationChartMargin.right = chartMargin.right = chartMargin.right < 20 ? 20 : chartMargin.right > 100 ? 100 : chartMargin.right;
            }
        }
    }

    (<{ productTemplate?: Function }>window).productTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'e-product-info';
        const imgElement = document.createElement('img');
        imgElement.src = 'src/grid/images/product/' + e.Image + '.png';
        imgElement.alt = e.Product;
        const nameElement = document.createElement('span');
        nameElement.innerText = e.Product;
        divElement.appendChild(imgElement);
        divElement.appendChild(nameElement);
        return divElement.outerHTML;
    };

    (<{ categoryTemplate?: Function }>window).categoryTemplate = (e: any): any => {
        const divElement = document.createElement('div');
        divElement.className = 'e-category-info';
        const svgElement = document.createElement('div');
        svgElement.innerHTML = e.CategoryIcon;
        const nameElement = document.createElement('span');
        nameElement.innerText = e.Category;
        divElement.appendChild(svgElement);
        divElement.appendChild(nameElement);
        return divElement.outerHTML;
    };
};
