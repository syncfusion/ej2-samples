import { loadCultureFiles } from '../common/culture-loader';
import { DashboardLayout, PanelModel, ResizeArgs } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import { Chart, LineSeries, DateTime, Legend, Tooltip, ColumnSeries, DataLabel, Category } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend, Tooltip);
import { SplineAreaSeries, ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(SplineAreaSeries, DateTime, Legend);
Chart.Inject(LineSeries, DateTime, Legend, Tooltip);
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip);
import { Dialog } from '@syncfusion/ej2-popups';
import {
    AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme
} from '@syncfusion/ej2-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);

/**
 *  Sample for edit  functionalities
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let dashboardObject: DashboardLayout = new DashboardLayout({
        cellSpacing: [10, 10],
        cellAspectRatio: 100 / 85,
        allowDragging: false,
        columns: 2,
        allowResizing: false,
        resizeStop: onPanelResize,
        panels: [{
            'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
            header: '<div>Line Chart</div>', content: '<div id="linechart" style="height:100%; width:100%"></div>'
        },
        {
            'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 1,
            header: '<div>Pie Chart</div>', content: '<div id="pie" style="height:100%; width:100%"></div>'
        },
        {
            'sizeX': 2, 'sizeY': 1, 'row': 1, 'col': 0,
            header: '<div>Spline Chart</div>', content: '<div id="chart" style="height:100%; width:100%"></div>'
        }]
    });
    dashboardObject.appendTo('#defaultLayout');
    let toggleBtn: Button = new Button({
        cssClass: 'e-outline e-flat e-primary',
        iconCss: 'edit',
        isToggle: true
    });
    toggleBtn.appendTo('#togglebtn');
    toggleBtn.element.onclick = () => {
        if (toggleBtn.element.classList.contains('e-active')) {
            dashboardObject.allowResizing = true;
            dashboardObject.allowDragging = true;
            toggleBtn.content = 'SAVE';
            toggleBtn.iconCss = 'save';
            document.getElementById('dialogBtn').style.display = 'block';
        } else {
            dashboardObject.allowResizing = false;
            dashboardObject.allowDragging = false;
            toggleBtn.content = 'EDIT';
            toggleBtn.iconCss = 'edit';
            document.getElementById('dialogBtn').style.display = 'none';
        }
    };

    function onPanelResize(args: ResizeArgs): void {
        if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div')) {
            let chartObj: any = (<any>args.element.querySelector('.e-panel-container .e-panel-content div')).ej2_instances[0];
            chartObj.height = '95%';
            chartObj.width = '100%';
            chartObj.refresh();
        }
    }

    let linechartObj: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
        },
        chartArea: { border: { width: 0 } },
        //Initializing Primary X Axis
        primaryYAxis: {
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
        },
        width: '99%',
        height: '100%',
        //Initializing Chart Series
        series: [
            {
                dataSource: [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }],
                marker: {
                    dataLabel: {
                        visible: false, position: 'Top', font: {
                            fontWeight: '600', color: '#ffffff'
                        }
                    }
                },
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Jan', fill: '#00bdae',

            },
            {
                dataSource: [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }],
                type: 'Column', yName: 'y', xName: 'x', width: 2, name: 'Feb', fill: '#e56691',
                marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
            },
            {
                dataSource: [{ x: 'Jan', y: 38 }, { x: 'Feb', y: 17 }, { x: 'Mar', y: 26 }],
                type: 'Column', xName: 'x', name: 'Mar', width: 2, yName: 'y', fill: '#357cd2',
                marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
            }
        ],
        load: (args: any) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <any>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
            if (selectedTheme === 'highcontrast') {
                args.chart.series[0].marker.dataLabel.font.color = '#000000';
                args.chart.series[1].marker.dataLabel.font.color = '#000000';
                args.chart.series[2].marker.dataLabel.font.color = '#000000';
            }
        }
    });
    linechartObj.appendTo('#linechart');
    let pie: AccumulationChart = new AccumulationChart({
        series: [
            {
                dataSource: [
                    { 'x': 'Jan', y: 12.5, text: 'January' },
                    { 'x': 'Feb', y: 25, text: 'February' },
                    { 'x': 'Mar', y: 50, text: 'March' },
                ],
                palettes: ['#00bdae', '#357cd2', '#e56691'],
                dataLabel: {
                    visible: true,
                    name: 'value',
                    position: 'Inside'
                },
                radius: '100%', xName: 'x', yName: 'y', startAngle: 0, endAngle: 360, innerRadius: '40%', name: 'Earnings',
            }

        ],
        tooltip: {
            enable: true,
            header: '<b>${point.x}</b>',
            format: 'Composition : <b>${point.y}%</b>'
        },

        legendSettings: {
            visible: false, toggleVisibility: false
        },
        width: '99%',
        height: '100%',
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    pie.appendTo('#pie');

    let chart: Chart = new Chart({
        //Initializing Primary Y Axis
        primaryYAxis: {
            maximum: 4, interval: 1,
            labelFormat: '{value}',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            labelFormat: 'MMM',
            majorGridLines: { width: 0 },
            intervalType: 'Months',
            edgeLabelPlacement: 'Shift'
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
                    { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.4 },
                    { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.6 },
                    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.5 },
                    { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.8 },
                    { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
                ],
                name: 'Jan', xName: 'x', yName: 'y', type: 'SplineArea',
                fill: 'rgb(239, 183, 202)',
                opacity: 0.5,
                border: { color: 'transparent' },
            },
            {
                dataSource: [
                    { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.7 },
                    { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
                    { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
                    { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.8 },
                    { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
                ],
                border: { color: 'transparent' },
                name: 'Feb', xName: 'x', yName: 'y', type: 'SplineArea',
                opacity: 0.5,
                fill: 'rgb(0, 189, 174)',
            }
        ],
        width: '99%',
        height: '100%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    chart.appendTo('#chart');
    let dialogObj: Dialog = new Dialog({
        width: '500px',
        header: 'Add a widget',
        showCloseIcon: true,
        animationSettings: { effect: 'Zoom' },
        content: document.getElementById('dialogcontent'),
        target: document.getElementById('target'),
        isModal: true,
        height: '260px',
        visible: false
    });
    dialogObj.appendTo('#modalDialog');
    dialogObj.hide();

    let count: number = 3;
    // tslint:disable-next-line:max-func-body-length
    document.getElementById('dialogBtn').onclick = () => {
        dialogObj.show();
        document.getElementById('linetemplate').onclick = () => {
            let countValue: string = count.toString();
            let panel: PanelModel[] = [{
                'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                header: '<div>Line Chart</div>', content: '<div id=_line' + countValue + ' style="height:100%; width:100%"></div>'
            }];
            count = count + 1;
            dashboardObject.addPanel(panel[0]);

            let linechartObj: Chart = new Chart({
                //Initializing Primary X Axis
                primaryXAxis: {
                    valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
                },
                chartArea: { border: { width: 0 } },
                width: '99%',
                height: '100%',
                //Initializing Primary X Axis
                primaryYAxis: {
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                },
                //Initializing Chart Series
                series: [
                    {
                        dataSource: [{ x: 'Jan', y: 46 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 26 }],
                        type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Jan', fill: '#00bdae',
                        marker: {
                            dataLabel: {
                                visible: false, position: 'Top', font: {
                                    fontWeight: '600', color: '#ffffff'
                                }
                            }
                        }
                    },
                    {
                        dataSource: [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 23 }, { x: 'Mar', y: 18 }],
                        type: 'Column', xName: 'x', width: 2, fill: '#e56691', yName: 'y', name: 'Feb',
                        marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                    },
                    {
                        dataSource: [{ x: 'Jan', y: 37 }, { x: 'Feb', y: 18 }, { x: 'Mar', y: 25 }],
                        type: 'Column', xName: 'x', name: 'Mar', fill: '#357cd2', width: 2, yName: 'y',
                        marker: { dataLabel: { visible: false, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                    }
                ],
                load: (args: any) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.chart.theme = <any>(selectedTheme.charAt(0).toUpperCase() +
                        selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
                    if (selectedTheme === 'highcontrast') {
                        args.chart.series[0].marker.dataLabel.font.color = '#000000';
                        args.chart.series[1].marker.dataLabel.font.color = '#000000';
                        args.chart.series[2].marker.dataLabel.font.color = '#000000';
                    }
                }
            });
            linechartObj.appendTo('#' + '_line' + countValue);
            linechartObj.refresh();
            dialogObj.hide();
        };
        document.getElementById('pietemplate').onclick = () => {
            let countValue: string = count.toString();
            let panel: PanelModel[] = [{
                'id': '_layout' + countValue, 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                header: '<div>Pie Chart</div>', content: '<div id=_pie' + countValue + ' style="height:100%; width:100%"></div>'
            }];
            count = count + 1;
            dashboardObject.addPanel(panel[0]);
            let pie: AccumulationChart = new AccumulationChart({
                series: [
                    {
                        dataSource: [
                            { 'x': 'Jan', y: 12.5, text: 'January' },
                            { 'x': 'Feb', y: 25, text: 'February' },
                            { 'x': 'Mar', y: 50, text: 'March' },
                        ],
                        palettes: ['#00bdae', '#357cd2', '#e56691'],
                        radius: '100%', xName: 'x', yName: 'y', startAngle: 0, endAngle: 360, innerRadius: '40%', name: 'Earnings',
                        dataLabel: {
                            visible: true,
                            name: 'value',
                            position: 'Inside'
                        }
                    }

                ],
                tooltip: {
                    enable: true,
                    header: '<b>${point.x}</b>',
                    format: 'Composition : <b>${point.y}%</b>'
                },

                legendSettings: {
                    visible: false, toggleVisibility: false
                },
                width: '99%',
                height: '100%',
                load: (args: IAccLoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                        selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
                }
            });
            pie.appendTo('#' + '_pie' + countValue);
            pie.refresh();
            dialogObj.hide();

        };
        document.getElementById('splinetemplate').onclick = () => {
            let countValue: string = count.toString();
            let panel: PanelModel[] = [{
                'id': '_layout' + countValue, 'sizeX': 2, 'sizeY': 1, 'row': 0, 'col': 0,
                header: '<div>Spline Chart</div>', content: '<div id=_spline' + countValue + ' style="height:100%; width:100%"></div>'
            }];
            count = count + 1;
            dashboardObject.addPanel(panel[0]);
            let chart: Chart = new Chart({
                //Initializing Primary X Axis
                primaryXAxis: {
                    valueType: 'DateTime',
                    majorGridLines: { width: 0 },
                    intervalType: 'Months',
                    labelFormat: 'MMM',
                    edgeLabelPlacement: 'Shift'
                },
                //Initializing Primary Y Axis
                primaryYAxis: {
                    maximum: 4, interval: 1,
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 },
                    labelFormat: '{value}',
                    lineStyle: { width: 0 },
                },
                chartArea: {
                    border: {
                        width: 0
                    }
                },
                series: [
                    {
                        dataSource: [
                            { x: new Date(2002, 0, 1), y: 2.2 }, { x: new Date(2003, 0, 1), y: 3.5 },
                            { x: new Date(2004, 0, 1), y: 2.8 }, { x: new Date(2005, 0, 1), y: 1.4 },
                            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 2.7 },
                            { x: new Date(2008, 0, 1), y: 2.9 }, { x: new Date(2009, 0, 1), y: 3.9 },
                            { x: new Date(2010, 0, 1), y: 1.4 }, { x: new Date(2011, 0, 1), y: 3.1 }
                        ],
                        name: 'Jan', xName: 'x', yName: 'y', type: 'SplineArea',
                        border: { color: 'transparent' },
                        fill: 'rgb(239, 183, 202)',
                        opacity: 0.5
                    },
                    {
                        dataSource: [
                            { x: new Date(2002, 0, 1), y: 2 }, { x: new Date(2003, 0, 1), y: 1.8 },
                            { x: new Date(2004, 0, 1), y: 1.8 }, { x: new Date(2005, 0, 1), y: 2.1 },
                            { x: new Date(2006, 0, 1), y: 2.3 }, { x: new Date(2007, 0, 1), y: 1.7 },
                            { x: new Date(2008, 0, 1), y: 1.5 }, { x: new Date(2009, 0, 1), y: 2.9 },
                            { x: new Date(2010, 0, 1), y: 1.5 }, { x: new Date(2011, 0, 1), y: 2.3 }
                        ],
                        name: 'Feb', xName: 'x', yName: 'y', type: 'SplineArea',
                        border: { color: 'transparent' },
                        fill: 'rgb(0, 189, 174)',
                        opacity: 0.5
                    }
                ],
                width: '99%',
                height: '100%',
                load: (args: ILoadedEventArgs) => {
                    let selectedTheme: string = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
                    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
                }
            });
            chart.appendTo('#' + '_spline' + countValue);
            chart.refresh();
            dialogObj.hide();

        };
    };
};
