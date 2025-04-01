import { loadCultureFiles } from '../common/culture-loader';
import { Browser } from '@syncfusion/ej2-base';
import { DashboardLayout, PanelModel, ResizeArgs } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import { Chart, LineSeries, DateTime, Legend, Tooltip, ColumnSeries, DataLabel, Category, Highlight, IPointRenderEventArgs, IAccPointRenderEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend, Tooltip, Highlight);
import { SplineAreaSeries, ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(SplineAreaSeries, DateTime, Legend, Highlight);
Chart.Inject(LineSeries, DateTime, Legend, Tooltip, Highlight);
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip, Highlight);
import { Dialog } from '@syncfusion/ej2-popups';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
import { EmitType, setStyleAttribute } from '@syncfusion/ej2-base';
import { loadAccumulationChartTheme, loadChartTheme, overViewPointrender } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 *  Sample for edit  functionalities
 */
// tslint:disable-next-line:max-func-body-length

(window as any).default = (): void => {
    loadCultureFiles();
    let dashboardObject: DashboardLayout = new DashboardLayout({

        cellSpacing: [15, 15],

        cellAspectRatio: Browser.isDevice ? 1 : 0.8,
        columns: Browser.isDevice ? 2 : 8,

        panels: [{
            'sizeX': Browser.isDevice ? 1 : 5, 'sizeY': Browser.isDevice ? 1 : 2, 'row': 0, 'col': 0,
            header: '<div class="title" id="header1">Sales - Yearly Performance</div>', content: '<div id="linechart"  style="height:100%; width:100%"></div>'
        },
        {
            'sizeX': Browser.isDevice ? 1 : 3, 'sizeY': Browser.isDevice ? 1 : 2, 'row': 0, 'col': Browser.isDevice ? 1 : 5,
            header: '<div class="title" id="header2">Product Wise Sales - 2024</div>', content: '<div id="pie"  style="height:100%; width:100%"></div>'
        },
        {
            'sizeX': Browser.isDevice ? 1 : 8, 'sizeY': Browser.isDevice ? 1 : 3, 'row': Browser.isDevice ? 1 : 4, 'col': 0,
            header: '<div class="title" id="header3">Monthly Sales for 2024</div>', content: '<div id="chart"  style="height:100%; width:100%"></div>'
        }]
    });
    dashboardObject.appendTo('#defaultLayout');


    setTimeout(() => {
        let linechartObj: Chart = new Chart({
            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'Category', majorGridLines: { width: 0 }, labelStyle: { size: '11px' }
            },
            chartArea: { border: { width: 0 } },
            //Initializing Primary X Axis
            primaryYAxis: {
                minimum: 0, maximum: 100, majorTickLines: { width: 0 }, labelFormat: '{value}%', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' },
            },
            legendSettings: { padding:5, shapeHeight:8, shapeWidth:8, enableHighlight: true },
            width: '99%',
            height: '100%',
            //Initializing Chart Series
            series: [
                {
                    dataSource: [{ Period: '2020', Percentage: 60 },
                    { Period: '2021', Percentage: 56 },
                    { Period: '2022', Percentage: 71 },
                    { Period: '2023', Percentage: 85 },
                    { Period: '2024', Percentage: 73 },],
                    type: "Column", name: "Online", xName: "Period", yName: "Percentage", fill: '#2485FA', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } },
                    cornerRadius: { topLeft: 4, topRight: 4}
                },
                {
                    type: "Column", name: "Retail", xName: "Period", yName: "Percentage", fill: '#FEC200', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } },
                    cornerRadius: { topLeft: 4, topRight: 4},
                    dataSource: [{ Period: '2020', Percentage: 40 },
                    { Period: '2021', Percentage: 44 },
                    { Period: '2022', Percentage: 29 },
                    { Period: '2023', Percentage: 15 },
                    { Period: '2024', Percentage: 27 },]
                },
            ],
            load: (args: any) => {
                loadChartTheme(args);

            }
        });
        linechartObj.appendTo('#linechart');
        let pie: AccumulationChart = new AccumulationChart({
            enableSmartLabels: false,
            series: [
                {
                    dataSource: [
                        { Product: "TV : 30 (12%)", Percentage: 12, r: 'TV, 30<br>12%' },
                        { Product: "PC : 20 (8%)", Percentage: 8, r: 'PC, 20<br>8%' },
                        { Product: "Laptop : 40 (16%)", Percentage: 16, r: 'Laptop, 40<br>16%' },
                        { Product: "Mobile : 90 (36%)", Percentage: 36, r: 'Mobile, 90<br>36%' },
                        { Product: "Camera : 27 (11%)", Percentage: 11, r: 'Camera, 27<br>11%' },
                    ],
                    palettes: ["#61EFCD", "#CDDE1F", "#FEC200", "#CA765A", "#2485FA", "#F57D7D", "#C152D2",
                        "#8854D9", "#3D4EB8", "#00BCD7", "#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e", "#997300"],
                    dataLabel: {
                        visible: true,
                        position: 'Outside', name: 'r',
                        connectorStyle: { length: '10px', type: 'Curve' }
                    },
                    xName: "Product", yName: "Percentage", radius: "75%", startAngle: 270, endAngle: 270, innerRadius: "40%", tooltipMappingName: 'Product',
                }

            ],
            pointRender: overViewPointrender,
            tooltip: {
                enable: true, format: "${point.tooltip}", enableHighlight: true
            },

            enableBorderOnMouseMove: false,
            legendSettings: {
                visible: false, toggleVisibility: false
            },
            width: '99%',
            height: '100%',
            load: (args: IAccLoadedEventArgs) => {
               loadAccumulationChartTheme(args);
            }
        });
        pie.appendTo('#pie');

        let chart: Chart = new Chart({
            //Initializing Primary Y Axis
            primaryYAxis: {
                majorTickLines: { width: 0 },
                minimum: 0, maximum: 12000, edgeLabelPlacement: 'Shift', labelFormat: '${value}', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' }
            },
            legendSettings: { enableHighlight: true }, tooltip: { enable: true, showNearestTooltip: true, enableMarker: false, enableHighlight: true },
            //Initializing Primary X Axis
            primaryXAxis: {
                majorTickLines: { width: 0 }, valueType: "Category", majorGridLines: { width: 0 }, labelStyle: { size: '11px' }
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            //Initializing Chart Series
            series: [
                {
                    dataSource: [
                        { period: 'Jan', percentage: 3600 }, { period: 'Feb', percentage: 6200 },
                        { period: 'Mar', percentage: 8100 }, { period: 'Apr', percentage: 5900 },
                        { period: 'May', percentage: 8900 }, { period: 'Jun', percentage: 7200 },
                        { period: 'Jul', percentage: 4300 }, { period: 'Aug', percentage: 4600 },
                        { period: 'Sep', percentage: 5500 }, { period: 'Oct', percentage: 6350 },
                        { period: 'Nov', percentage: 5700 }, { period: 'Dec', percentage: 8000 },
                    ],
                    name: 'Online', xName: 'period', yName: 'percentage', type: 'SplineArea',
                    width: 2.5,
                    fill: '#2485FA', border: { width: 2.75, color: '#2485FA' },
                    opacity: 0.3
                },
                {
                    dataSource: [
                        { period: 'Jan', percentage: 6400 }, { period: 'Feb', percentage: 5300 },
                        { period: 'Mar', percentage: 4900 }, { period: 'Apr', percentage: 5300 },
                        { period: 'May', percentage: 4200 }, { period: 'Jun', percentage: 6500 },
                        { period: 'Jul', percentage: 7900 }, { period: 'Aug', percentage: 3800 },
                        { period: 'Sep', percentage: 6800 }, { period: 'Oct', percentage: 3400 },
                        { period: 'Nov', percentage: 6400 }, { period: 'Dec', percentage: 6800 },
                    ],
                    border: { width: 2.75, color: '#FEC200' },
                    width: 2.5,
                    opacity: 0.3, name: 'Retail', xName: 'period', yName: 'percentage', type: 'SplineArea',
                    fill: '#FEC200',
                }
            ],
            width: '99%',
            height: '100%',
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            }
        });
        chart.appendTo('#chart');
    }, 10);
};