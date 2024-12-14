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
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 *  Sample for edit  functionalities
 */
// tslint:disable-next-line:max-func-body-length

(window as any).default = (): void => {
    loadCultureFiles();
    let layoutColor;
    let onPointRender: EmitType<IAccPointRenderEventArgs> = (args: IAccPointRenderEventArgs): void => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        if (selectedTheme.indexOf('dark') > -1) {
            if (selectedTheme.indexOf('material') > -1) {
                args.border.color = '#303030';
                layoutColor = '#303030';
            }
            else if (selectedTheme.indexOf('bootstrap5') > -1) {
                args.border.color = '#212529';
                layoutColor = '#212529';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
                layoutColor = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('fabric') > -1) {
                args.border.color = '#201f1f';
                layoutColor = '#201f1f';
            }
            else if (selectedTheme.indexOf('fluent') > -1) {
                args.border.color = '#252423';
                layoutColor = '#252423';
            }
            else if (selectedTheme.indexOf('bootstrap') > -1) {
                args.border.color = '#1A1A1A';
                layoutColor = '#1A1A1A';
            }
            else if (selectedTheme.indexOf('tailwind') > -1) {
                args.border.color = '#1F2937';
                layoutColor = '#1F2937';
            }
            else {
                args.border.color = '#222222';
                layoutColor = '#222222';
            }
        }
        else if (selectedTheme.indexOf('highcontrast') > -1) {
            args.border.color = '#000000';
            layoutColor = '#000000';
        }
        else if (selectedTheme.indexOf('fluent2-highcontrast') > -1) {
            args.border.color = '#000000';
            layoutColor = '#000000';
        }
        else {
            args.border.color = '#FFFFFF';
            layoutColor = '#FFFFFF';
        }
        if ((selectedTheme.indexOf('highcontrast') > -1 || selectedTheme.indexOf('dark') > -1) && document.getElementById('defaultLayout')) {
            let el = document.getElementById('header1');
            el.style.setProperty('color', '#F3F2F1');
            let el1 = document.getElementById('header2');
            el1.style.setProperty('color', '#F3F2F1');
            let el2 = document.getElementById('header3');
            el2.style.setProperty('color', '#F3F2F1');
        }
        if (document.getElementById('defaultLayout')) {
            let element = document.getElementById('layout_0template');
            element.style.setProperty('background', layoutColor);
            let elementBody = document.getElementById('linechart');
            elementBody.style.setProperty('background', layoutColor);
            let element1 = document.getElementById('layout_1template');
            element1.style.setProperty('background', layoutColor);
            let element1Body = document.getElementById('pie');
            element1Body.style.setProperty('background', layoutColor);
            let element2 = document.getElementById('layout_2template');
            element2.style.setProperty('background', layoutColor);
            let element2Body = document.getElementById('chart');
            element2Body.style.setProperty('background', layoutColor);
        }
    }
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
            header: '<div class="title" id="header2">Product Wise Sales - 2021</div>', content: '<div id="pie"  style="height:100%; width:100%"></div>'
        },
        {
            'sizeX': Browser.isDevice ? 1 : 8, 'sizeY': Browser.isDevice ? 1 : 3, 'row': Browser.isDevice ? 1 : 4, 'col': 0,
            header: '<div class="title" id="header3">Monthly Sales for 2021</div>', content: '<div id="chart"  style="height:100%; width:100%"></div>'
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
            width: '99%',
            height: '100%',
            //Initializing Chart Series
            series: [
                {
                    dataSource: [{ Period: '2017', Percentage: 60 },
                    { Period: '2018', Percentage: 56 },
                    { Period: '2019', Percentage: 71 },
                    { Period: '2020', Percentage: 85 },
                    { Period: '2021', Percentage: 73 },],
                    type: "Column", name: "Online", xName: "Period", yName: "Percentage", fill: '#2485FA', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } }
                },
                {
                    type: "Column", name: "Retail", xName: "Period", yName: "Percentage", fill: '#FEC200', marker: { dataLabel: { visible: true, position: 'Middle', font: { color: 'white' } } },
                    dataSource: [{ Period: '2017', Percentage: 40 },
                    { Period: '2018', Percentage: 44 },
                    { Period: '2019', Percentage: 29 },
                    { Period: '2020', Percentage: 15 },
                    { Period: '2021', Percentage: 27 },]
                },
            ],
            load: (args: any) => {
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
                args.chart.theme = <any>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');

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
            pointRender: onPointRender,
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
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
                args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            }
        });
        pie.appendTo('#pie');

        let chart: Chart = new Chart({
            //Initializing Primary Y Axis
            primaryYAxis: {
                majorTickLines: { width: 0 },
                minimum: 0, maximum: 12000, edgeLabelPlacement: 'Shift', labelFormat: '${value}', lineStyle: { width: 0 }, labelStyle: { size: '11px' }, titleStyle: { size: '13px' }
            },
            legendSettings: { enableHighlight: true }, tooltip: { enable: true, shared: true, enableMarker: false },
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
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
                args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Fluent2';
                args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            }
        });
        chart.appendTo('#chart');
    }, 10);
};