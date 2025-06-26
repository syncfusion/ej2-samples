
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
    { x: 'Android', y: 45.49, text: 'Android: 45.49%' },
    { x: 'Windows', y: 25.35, text: 'Windows: 25.35%' },
    { x: 'iOS', y: 18.26, text: 'iOS: 18.26%' },
    { x: 'macOS', y: 5.06, text: 'macOS: 5.06%' },
    { x: 'Linux', y: 1.48, text: 'Linux: 1.48%' },
    { x: 'Others', y: 4.36, text: 'Others: 4.36%' }
];


(window as any).default = (): void => {
    loadCultureFiles();
    let chart = new AccumulationChart({
        series: [{
            type: 'Pie',
            dataSource: chartData,
            animation: { enable: true },
            xName: 'x',
            yName: 'y', name: 'Project', startAngle: 120,
            innerRadius: '50%', radius: Browser.isDevice ? '25%' : '70%', explode: false,
            dataLabel: {
                visible: true,
                position: 'Outside',
                name: 'text',
                font: { size: '12px', fontWeight: '600' },
                connectorStyle: { length: '20px', type: 'Curve' }
            },
            borderRadius: 8,
            border: { width: 0.5, color: 'white' }
        }],
        tooltip: {
            enable: true, header: '', format: '<b>${point.x}</b><br>Operating System Usage: <b>${point.y}%</b>', enableHighlight: true
        },
        title: 'Global Operating System Usage Share - 2024', subTitle: 'Source: wikipedia.org',
        width: Browser.isDevice ? '100%' : '75%',
        enableBorderOnMouseMove: false,
        enableAnimation: true,
        pointRender: roundedCornnerPointRender,
        legendSettings: { visible: false },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });

    // Append the chart to the target element
    chart.appendTo('#pie-border-container');
};