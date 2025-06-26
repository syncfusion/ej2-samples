import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DateTime, DataLabel, Tooltip, Highlight, Crosshair, ILoadedEventArgs, Zoom, ZoomSettings, IZoomCompleteEventArgs, Legend, Selection, ISelectionCompleteEventArgs, IMouseEventArgs, ITooltipRenderEventArgs, ILegendClickEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, SplineAreaSeries, LineSeries, SplineSeries, DataLabel, DateTime, Tooltip, Zoom, Highlight, Legend, Selection, Crosshair);
import { Browser } from '@syncfusion/ej2-base';
import { synchronizedData } from './financial-data';
import { Axis } from '@syncfusion/ej2/charts';
import { loadChartTheme, keyBootstrap4Colors, pointBootstrap5Colors, pointBootstrap5DarkColors, pointBootstrapColors, pointFabricColors, pointFluent2Colors, pointFluent2DarkColors, pointFluentColors, pointFluentDarkColors, pointHighContrastColors, pointMaterial3Colors, pointMaterial3DarkColors, pointMaterialColors, pointMaterialDarkColors, pointTailwind3Colors, pointTailwind3DarkColors, pointTailwindColors, pointTailwindDarkColors } from './theme-color';

let charts: Chart[] = [];
let zoomFactor: number = 0;
let zoomPosition: number = 0;

/**
 * Sample for Synchronized Chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    charts =[];
    let chart: Chart = new Chart({
        primaryXAxis: {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1
        },

        primaryYAxis: {
            labelFormat: 'n2',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 0.86,
            maximum: 0.96,
            interval: 0.025
        },
        chartArea: { border: { width: 0 } },

        series: [
            {
                type: 'Line', dataSource: synchronizedData, xName: 'USD', width: 2, yName: 'EUR', emptyPointSettings: { mode: 'Drop' }
            }
        ],
        zoomSettings: {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableScrollbar: false,
            enableDeferredZooming: false,
            enablePan: true,
            mode: 'X',
            toolbarItems: ['Pan', 'Reset']
        },
        zoomComplete: (args: IZoomCompleteEventArgs) => {
            if (args.axis.name === 'primaryXAxis') {
                zoomFactor = args.currentZoomFactor;
                zoomPosition = args.currentZoomPosition;
                zoomCompleteFunction(args);
            }
        },
        chartMouseLeave: (args: IMouseEventArgs) => {
            chartobj.hideCrosshair();
            chart3.hideCrosshair();
            chart4.hideCrosshair();
            chartobj.hideTooltip();
            chart3.hideTooltip();
            chart4.hideTooltip();
        },
        chartMouseMove: (args: IMouseEventArgs) => {
            if ((!Browser.isDevice && !chart.isTouch && !chart.isChartDrag) || chart.startMove) {
                chartobj.startMove = chart3.startMove = chart4.startMove = chart.startMove;
                chartobj.showTooltip(args.x, args.y);
                chart3.showTooltip(args.x, args.y);
                chart4.showTooltip(args.x, args.y);
                chartobj.showCrosshair(args.x, args.y);
                chart3.showCrosshair(args.x, args.y);
                chart4.showCrosshair(args.x, args.y);
            }
        },
        chartMouseUp: function (args: IMouseEventArgs) {
            if (Browser.isDevice && chart.startMove) {
                chartobj.hideCrosshair();
                chart3.hideCrosshair();
                chart4.hideCrosshair();
                chartobj.hideTooltip();
                chart3.hideTooltip();
                chart4.hideTooltip();
            }
        },
        title: 'US to EURO',
        titleStyle: { textAlignment: 'Near' },
        tooltip: { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>€${point.y}</b> <br> ${point.x} 2023', enableMarker: false, enableHighlight: true },
        crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' },
        load: load
    });
    chart.appendTo('#container3');
    charts.push(chart);
    let chartobj: Chart = new Chart({
        primaryXAxis: {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1
        },

        primaryYAxis: {
            labelFormat: '{value}',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 120,
            maximum: 152,
            interval: 8,
            labelPadding: 8
        },
        chartArea: { border: { width: 0 } },
        series: [
            {
                type: 'Line', dataSource: synchronizedData, xName: 'USD', width: 2, yName: 'JPY'
            }
        ],
        zoomSettings: {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableScrollbar: false,
            enableDeferredZooming: false,
            enablePan: true,
            mode: 'X',
            toolbarItems: ['Pan', 'Reset']
        },
        zoomComplete: (args: IZoomCompleteEventArgs) => {
            if (args.axis.name === 'primaryXAxis') {
                zoomFactor = args.currentZoomFactor;
                zoomPosition = args.currentZoomPosition;
                zoomCompleteFunction(args);
            }
        },
        chartMouseMove: (args: IMouseEventArgs) => {
            if ((!Browser.isDevice && !chartobj.isTouch && !chartobj.isChartDrag) || chartobj.startMove) {
                chart.startMove = chart3.startMove = chart4.startMove = chartobj.startMove;
                chart.showTooltip(args.x, args.y);
                chart3.showTooltip(args.x, args.y);
                chart4.showTooltip(args.x, args.y);
                chart.showCrosshair(args.x, args.y);
                chart3.showCrosshair(args.x, args.y);
                chart4.showCrosshair(args.x, args.y);
            }
        },
        chartMouseLeave: (args: IMouseEventArgs) => {
            chart.hideCrosshair();
            chart3.hideCrosshair();
            chart4.hideCrosshair();
            chart.hideTooltip();
            chart3.hideTooltip();
            chart4.hideTooltip();
        },
        chartMouseUp: function (args: IMouseEventArgs) {
            if (Browser.isDevice && chartobj.startMove) {
                chart.hideCrosshair();
                chart3.hideCrosshair();
                chart4.hideCrosshair();
                chart.hideTooltip();
                chart3.hideTooltip();
                chart4.hideTooltip();
            }
        },
        title: 'US to Yen',
        titleStyle: { textAlignment: 'Near' },
        tooltip: { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>¥${point.y}</b> <br> ${point.x} 2023', enableMarker: false, enableHighlight: true },
        crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' },
        load: load
    });
    chartobj.appendTo('#container4');
    charts.push(chartobj);
    let chart3: Chart = new Chart({
        primaryXAxis: {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1
        },
        primaryYAxis: {
            labelFormat: 'n2',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 1.30,
            maximum: 1.37,
            interval: 0.0175
        },
        chartArea: { border: { width: 0 } },
        series: [
            {
                type: 'Area', dataSource: synchronizedData, xName: 'USD', width: 2, yName: 'SGD', opacity: 0.6, border: { width: 2 }
            }
        ],
        zoomSettings: {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableScrollbar: false,
            enableDeferredZooming: false,
            enablePan: true,
            mode: 'X',
            toolbarItems: ['Pan', 'Reset']
        },
        zoomComplete: (args: IZoomCompleteEventArgs) => {
            if (args.axis.name === 'primaryXAxis') {
                zoomFactor = args.currentZoomFactor;
                zoomPosition = args.currentZoomPosition;
                zoomCompleteFunction(args);
            }
        },
        chartMouseMove: (args: IMouseEventArgs) => {
            if ((!Browser.isDevice && !chart3.isTouch && !chart3.isChartDrag) || chart3.startMove) {
                chart.startMove = chartobj.startMove = chart4.startMove = chart3.startMove;
                chart.showTooltip(args.x, args.y);
                chartobj.showTooltip(args.x, args.y);
                chart4.showTooltip(args.x, args.y);
                chart.showCrosshair(args.x, args.y);
                chartobj.showCrosshair(args.x, args.y);
                chart4.showCrosshair(args.x, args.y);
            }
        },
        chartMouseLeave: (args: IMouseEventArgs) => {
            chartobj.hideCrosshair();
            chart.hideCrosshair();
            chart4.hideCrosshair();
            chartobj.hideTooltip();
            chart.hideTooltip();
            chart4.hideTooltip();
        },
        chartMouseUp: function (args: IMouseEventArgs) {
            if (Browser.isDevice && chart3.startMove) {
                chart.hideCrosshair();
                chartobj.hideCrosshair();
                chart4.hideCrosshair();
                chart.hideTooltip();
                chartobj.hideTooltip();
                chart4.hideTooltip();
            }
        },
        title: 'US to SGD',
        titleStyle: { textAlignment: 'Near' },
        tooltip: { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>$${point.y}</b> <br> ${point.x} 2023', enableMarker: false },
        crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' },
        load: load
    });
    chart3.appendTo('#container1');
    charts.push(chart3);
    let chart4: Chart = new Chart({
        primaryXAxis: {
            minimum: new Date(2023, 1, 18),
            maximum: new Date(2023, 7, 18),
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            lineStyle: { width: 0 },
            majorGridLines: { width: 0 },
            edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift',
            labelRotation: Browser.isDevice ? -45 : 0,
            interval: Browser.isDevice ? 2 : 1
        },
        primaryYAxis: {
            labelFormat: 'n1',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            minimum: 79,
            maximum: 85,
            interval: 1.5
        },
        chartArea: { border: { width: 0 } },
        series: [
            {
                type: 'Area', dataSource: synchronizedData, xName: 'USD', width: 2, yName: 'INR', opacity: 0.6, border: { width: 2 }
            }
        ],
        zoomSettings: {
            enableMouseWheelZooming: true,
            enablePinchZooming: true,
            enableScrollbar: false,
            enableDeferredZooming: false,
            enablePan: true,
            mode: 'X',
            toolbarItems: ['Pan', 'Reset']
        },
        zoomComplete: (args: IZoomCompleteEventArgs) => {
            if (args.axis.name === 'primaryXAxis') {
                zoomFactor = args.currentZoomFactor;
                zoomPosition = args.currentZoomPosition;
                zoomCompleteFunction(args);
            }
        },
        chartMouseMove: (args: IMouseEventArgs) => {
           if ((!Browser.isDevice && !chart4.isTouch && !chart4.isChartDrag)|| chart4.startMove) {
                chart.startMove = chartobj.startMove = chart3.startMove = chart4.startMove;
                chart.showTooltip(args.x, args.y);
                chartobj.showTooltip(args.x, args.y);
                chart3.showTooltip(args.x, args.y);
                chart.showCrosshair(args.x, args.y);
                chartobj.showCrosshair(args.x, args.y);
                chart3.showCrosshair(args.x, args.y);
            }
        },
        chartMouseLeave: (args: IMouseEventArgs) => {
            chartobj.hideCrosshair();
            chart3.hideCrosshair();
            chart.hideCrosshair();
            chartobj.hideTooltip();
            chart3.hideTooltip();
            chart.hideTooltip();
        },
        chartMouseUp: function (args: IMouseEventArgs) {
            if (Browser.isDevice && chart4.startMove) {
                chart.hideCrosshair();
                chartobj.hideCrosshair();
                chart3.hideCrosshair();
                chart.hideTooltip();
                chartobj.hideTooltip();
                chart3.hideTooltip();
            }
        },
        title: 'US to INR',
        titleStyle: { textAlignment: 'Near' },
        tooltip: { enable: true, fadeOutDuration: Browser.isDevice ? 2500 : 1000, showNearestTooltip: true, header: '', format: '<b>₹${point.y}</b> <br> ${point.x} 2023', enableMarker: false },
        crosshair: { enable: true, lineType: 'Vertical', dashArray: '2,2' },
        load: load
    });
    chart4.appendTo('#container2');
    charts.push(chart4);
    function zoomCompleteFunction(args: IZoomCompleteEventArgs): void {
        for (let i: number = 0; i < charts.length; i++) {
            if ((args.axis as Axis).series[0].chart.element.id !== charts[i].element.id) {
                charts[i].primaryXAxis.zoomFactor = zoomFactor;
                charts[i].primaryXAxis.zoomPosition = zoomPosition;
                charts[i].zoomModule.isZoomed = (args.axis as Axis).series[0].chart.zoomModule.isZoomed;
                charts[i].zoomModule.isPanning = (args.axis as Axis).series[0].chart.zoomModule.isPanning;
            }
        }
    }
    
    function load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        let themeColor: string[] = [];
        // check the theme
        if (args.chart.theme === 'MaterialDark') {
            themeColor = pointMaterialDarkColors;
        }
        else if (args.chart.theme === 'Material') {
            themeColor = pointMaterialColors;
        }
        else if (args.chart.theme === "Fabric") {
            themeColor = pointFabricColors;
        }
        else if (args.chart.theme === "FabricDark") {
            themeColor = pointFabricColors;
        }
        else if (args.chart.theme === 'Bootstrap5Dark') {
            themeColor = pointBootstrap5DarkColors;
        }
        else if (args.chart.theme === 'Bootstrap5') {
            themeColor = pointBootstrap5Colors;
        }
        else if (args.chart.theme === "Bootstrap4") {
            themeColor = keyBootstrap4Colors;
        }
        else if (args.chart.theme === 'TailwindDark') {
            themeColor = pointTailwindDarkColors;
        }
        else if (args.chart.theme === 'Tailwind') {
            themeColor = pointTailwindColors;
        }
        else if (args.chart.theme === 'Tailwind3Dark') {
            themeColor = pointTailwind3DarkColors;
        }
        else if (args.chart.theme === 'Tailwind3') {
            themeColor = pointTailwind3Colors;
        }
        else if (args.chart.theme === "HighContrast") {
            themeColor = pointHighContrastColors;
        }
        else if (args.chart.theme === 'FluentDark') {
            themeColor = pointFluentDarkColors;
        }
        else if (args.chart.theme === 'Bootstrap') {
            themeColor = pointBootstrapColors;
        }
        else if (args.chart.theme === 'BootstrapDark') {
            themeColor = pointBootstrapColors;
        }
        else if (args.chart.theme === 'Material3') {
            themeColor = pointMaterial3Colors;
        }
        else if (args.chart.theme === 'Material3Dark') {
            themeColor = pointMaterial3DarkColors;
        }
        else if (args.chart.theme === 'Fluent2') {
            themeColor = pointFluent2Colors;
        }
        else if (args.chart.theme === 'Fluent2HighContrast' || args.chart.theme === 'Fluent2Dark') {
            themeColor = pointFluent2DarkColors;
        }
        else {
            themeColor = pointFluentColors;
        }
        // check the container
        if (args.chart.element.id === 'container3') {
            args.chart.series[0].fill = themeColor[0];
        }
        else if (args.chart.element.id === 'container4') {
            args.chart.series[0].fill = themeColor[1];
        }
        else if (args.chart.element.id === 'container1') {
            args.chart.series[0].fill = themeColor[2];
        }
        else if (args.chart.element.id === 'container2') {
            args.chart.series[0].fill = themeColor[3];
        }
    }
};