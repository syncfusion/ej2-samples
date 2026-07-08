import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule,
    TimelineMonth,
    Resize,
    DragAndDrop,
    type ActionEventArgs
} from '@syncfusion/ej2-schedule';
import {
  Chart,
  ColumnSeries,
  Category,
  Legend,
  Tooltip,
  Highlight,
  type IAxisLabelRenderEventArgs,
  type ITooltipRenderEventArgs,
  type IPointRenderEventArgs,
  ILoadedEventArgs
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './datasource.json';
import { Browser, extend } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

Chart.Inject(ColumnSeries, Category, Legend, Tooltip, Highlight);
Schedule.Inject(TimelineMonth, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
     let currentWeekTruckData: Record<string, any>[] = <Record<string, any>[]>extend([], (dataSource as Record<string, any>).truckData, null, true);
    // Drivers master (used both by Scheduler resources and for lookups)
    const driversMaster = [
        { driver: 'Ben Smith', id: 1, color: '#ea7a57', truck: 'Volvo FH16', capacity: '325 t' },
        { driver: 'Sarah Johnson', id: 2, color: '#7fa900', truck: 'Scania R730', capacity: '310 t' },
        { driver: 'Mike Chen', id: 3, color: '#5978ee', truck: 'Mercedes Actros', capacity: '290 t' },
        { driver: 'Emma Davis', id: 4, color: '#fec200', truck: 'MAN TGX', capacity: '280 t' },
        { driver: 'Carlos Rodriguez', id: 5, color: '#df5286', truck: 'DAF XF', capacity: '300 t' },
        { driver: 'Olivia Wilson', id: 6, color: '#00bdae', truck: 'Kenworth T680', capacity: '315 t' },
        { driver: 'James Taylor', id: 7, color: '#865fcf', truck: 'Peterbilt 579', capacity: '305 t' },
        { driver: 'Sophia Martinez', id: 8, color: '#1aaa55', truck: 'Freightliner Cascadia', capacity: '295 t' },
        { driver: 'Daniel Lee', id: 9, color: '#df5286', truck: 'Mack Anthem', capacity: '285 t' },
        { driver: 'Ava Thompson', id: 10, color: '#710193', truck: 'International LT', capacity: '275 t' }
    ];
    const driversById = new Map<number, string>(driversMaster.map(d => [d.id, d.driver]));

    // Function to generate chart data based on mode
    function generateChartData(mode: string): any[] {
        if (mode === 'capacity') {
            return driversMaster.map(d => ({
                Truck: d.truck,                            
                Driver: d.driver,                         
                Value: parseFloat(d.capacity.replace(' t', '')),
            }));
        } else if (mode === 'tripcount') {
            const countMap: Record<string, number> = {};
            for (let i = 0; i < currentWeekTruckData.length; i++) {
                const driver = currentWeekTruckData[i].Driver || driversById.get(currentWeekTruckData[i].DriverID);
                if (driver) {
                    countMap[driver] = (countMap[driver] || 0) + 1;
                }
            }
            return driversMaster.map(d => ({ Driver: d.driver, Value: countMap[d.driver] || 0 }));
        } else if (mode === 'longest') {
            const maxMap: Record<string, number> = {};
            for (let i = 0; i < currentWeekTruckData.length; i++) {
                const driver = currentWeekTruckData[i].Driver || driversById.get(currentWeekTruckData[i].DriverID);
                if (driver && currentWeekTruckData[i].StartTime && currentWeekTruckData[i].EndTime) {
                    const duration = (new Date(currentWeekTruckData[i].EndTime).getTime() - new Date(currentWeekTruckData[i].StartTime).getTime()) / (1000 * 3600); // hours
                    maxMap[driver] = Math.max(maxMap[driver] || 0, duration);
                }
            }
            return driversMaster.map(d => ({ Driver: d.driver, Value: maxMap[d.driver] || 0 })).filter(d => d.Value > 0);
        }
        return [];
    }

    let currentMode = 'tripcount';
    let chartData = generateChartData(currentMode);

    // Scheduler
    const scheduleObj: Schedule = new Schedule({
        width: 'calc(100% - 360px)',
        height: '650px',
        selectedDate: new Date(2026, 0, 12),
        allowOverlap: false,
        resourceHeaderTemplate: '#resourceTemplate',
        headerIndentTemplate: '#headerIndentTemplate',
        views: ['TimelineMonth'],
        group: {
            resources: ['TruckDetails'],
            headerTooltipTemplate: '#tooltipTemplate'
        },
        resources: [
            {
                field: 'DriverID',
                title: 'Driver',
                name: 'TruckDetails',
                allowMultiple: false,
                dataSource: driversMaster,
                textField: 'driver',
                idField: 'id',
                colorField: 'color'
            }
        ],
        eventSettings: { dataSource: currentWeekTruckData },
        actionComplete: (args: ActionEventArgs) => onScheduleActionComplete(args)
    });
    scheduleObj.appendTo('#scheduler');

    // Chart - Modern styling
    const chart: Chart = new Chart({
        primaryXAxis: {
            valueType: 'Category',
            interval: 1, // Auto
            labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
            labelRotation: Browser.isDevice ? -45 : 315,
            majorTickLines: { width: 0 },
            labelStyle: { 
                size: '12px',
                fontWeight: '500',
            }
        },
        chartArea: { border: { width: 0 }, margin: { bottom: 20, top: 30, left: 50, right: 30 } },
        primaryYAxis: {
            interval: 2, // Auto
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            title: 'Count',
            labelStyle: {
                size: '11px',
            }
        },
        series: [
            {
                type: 'Column',
                xName: 'Driver',
                yName: 'Value',
                columnSpacing: 0.2,
                columnWidth: 0.85,
                legendShape: 'Rectangle',
                dataSource: chartData,
                cornerRadius: { topLeft: 8, topRight: 8 },
                name: 'Value',
                marker: {
                    visible: false
                },
                border: {
                    width: 1,
                    color: 'rgba(255, 255, 255, 0.3)'
                }
            }
        ],
        width: '100%',
        height: '550px',
        title: 'Trip Count',
        tooltip: {
            enable: true,
            header: '<b>${point.x}</b>',
            format: 'Value: <b>${point.y}</b>',
            enableHighlight: true
        },
        legendSettings: {
            visible: false
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            const numeric = Number(String(args.text).replace(/,/g, ''));
            if (!isNaN(numeric) && numeric >= 1000) {
                args.text = (numeric / 1000).toFixed(1) + 'K';
            }
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (args.text) {
                let unit = '';
                if (currentMode === 'capacity') unit = ' t';
                else if (currentMode === 'longest') unit = ' hours';
            }
        },
        pointRender: (args: IPointRenderEventArgs) => {
            if (!args.point) return;
            let resource;
            if (currentMode === 'capacity') {
                const truckName = args.point.x as string;
                resource = driversMaster.find(d => d.truck === truckName);
            }
            else {
                const driverName = args.point.x as string;
                resource = driversMaster.find(d => d.driver === driverName);
            }

            if (resource?.color) {
                args.fill = resource.color;
                args.border = {
                    color: 'rgba(255, 255, 255, 0.4)',
                    width: 1.5
                };
            }
        }
    });
    chart.appendTo('#chart');

    // Dropdown for chart modes
    const ddlData = [
        { text: 'Trip Count', value: 'tripcount' },
        { text: 'Truck Capacity', value: 'capacity' },
        { text: 'Longest Trips', value: 'longest' }
    ];
    const ddl: DropDownList = new DropDownList({
        dataSource: ddlData,
        fields: { text: 'text', value: 'value' },
        value: 'tripcount',
        width: '100%',
        change: (args) => {
            currentMode = args.value as string;
            updateChart();
        }
    });
    ddl.appendTo('#chart-ddl');

    function updateChart() {
        chartData = generateChartData(currentMode);
        chart.series[0].dataSource = chartData;
        chart.series[0].name = ddl.text || 'Value';
        chart.title = ddl.text || '';
        chart.primaryYAxis.title = currentMode === 'capacity' ? 'Capacity (t)' :
                                  currentMode === 'longest' ? 'Duration (hours)' : 'Count';
        
        if (currentMode === 'tripcount') {
            chart.primaryYAxis.interval = 2;
        } else {
            chart.primaryYAxis.interval = null; 
        }
        chart.series[0].xName =
            currentMode === 'capacity' ? 'Truck' : 'Driver';

        chart.refresh();
    }

    // Handle scheduler action events to keep chart in sync
    function onScheduleActionComplete(args: ActionEventArgs) {
        if (args.requestType === 'eventChanged' || args.requestType === 'eventCreated' || args.requestType === 'eventRemoved') {
            updateChart();
        }
    }
};