
import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import {
    AccumulationChart, PieSeries, AccumulationTooltip, AccumulationAnnotation,
    AccumulationDataLabel, IAccLoadedEventArgs} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme, roundedCornnerPointRender } from './theme-color';
AccumulationChart.Inject(PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationAnnotation);

// Real data for smartphone market share in 2023
let chartData: Object[] = [
    { x: 'Operations', y: 30.0, text: '30.0%' },
    { x: 'Miscellaneous', y: 10.0, text: '10.0%' },
    { x: 'Human Resources', y: 15.0, text: '15.0%' },
    { x: 'Research and Development', y: 20.0, text: '20.0%' },
    { x: 'Marketing', y: 25.0, text: '25.0%' },
];


(window as any).default = (): void => {
    loadCultureFiles();
    let chart = new AccumulationChart({
        series: [{
            type: 'Pie',
            dataSource: chartData,
            animation: { enable: true },
            xName: 'x',
            yName: 'y',
            innerRadius: '50%',
            dataLabel: {
                visible: true,
                position: 'Outside',
                name: 'x',
                connectorStyle: { width: 0 },
            },
            borderRadius: 8,
            border: { width: 3 }
        }],
        tooltip: {
            enable: true,
            header: '<b>Budget</b>', format: '${point.x}: <b>${point.y}%</b>',
            enableHighlight: true
        },
        title: 'Company Budget Distribution',
        width: Browser.isDevice ? '100%' : '75%',
        enableSmartLabels: true,
        enableBorderOnMouseMove: false,
        pointRender: roundedCornnerPointRender,
        legendSettings: { visible: false },
        annotations: [
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">30%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Operations',
                y: 30.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;" >10%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Miscellaneous',
                y: 10.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">15%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Human Resources',
                y: 15.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">20%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Research and Development',
                y: 20.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}; color: #FFFFFF;">25%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Marketing',
                y: 25.0
            }
        ],
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });

    // Append the chart to the target element
    chart.appendTo('#pie-border-container');
};