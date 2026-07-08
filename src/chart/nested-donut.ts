import { loadCultureFiles } from '../common/culture-loader';
import {
    AccumulationTheme, AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs,
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);


/**
 * Sample for Nested Donut chart (multiple pie series)
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let regionColors = {
        "South Asia": "#1f4e8c",
        "Middle East": "#7a3b8f",
        "S.E. Asia": "#e91e63",
        "Africa": "#f4c20d",
        "Others": "#66a99c"
    };

    let regionData = [
        { x: 'South Asia', y: 55.85, color: regionColors["South Asia"], text: Browser.isDevice ? 'SA' : 'South Asia' },
        { x: 'Middle East', y: 16.15, color: regionColors["Middle East"], text: Browser.isDevice ? 'ME' : 'Middle East' },
        { x: 'S.E. Asia', y: 7.36, color: regionColors["S.E. Asia"], text: Browser.isDevice ? 'SEA' : 'S.E. Asia' },
        { x: 'Africa', y: 11.25, color: regionColors["Africa"], text: Browser.isDevice ? 'AF' : 'Africa' },
        { x: 'Others', y: 9.39, color: regionColors["Others"], text: Browser.isDevice ? 'Others' : 'Others' }
    ];
    let countryData = [
        { x: "India", y: 21.8, color: regionColors["South Asia"], text: Browser.isDevice ? 'IND' : 'India' },
        { x: "Bangladesh", y: 12.5, color: regionColors["South Asia"], text: Browser.isDevice ? 'BGD' : 'Bangladesh' },
        { x: "Nepal", y: 12.5, color: regionColors["South Asia"], text: Browser.isDevice ? 'NPL' : 'Nepal' },
        { x: "Pakistan", y: 4.7, color: regionColors["South Asia"], text: Browser.isDevice ? 'PAK' : 'Pakistan' },
        { x: "Sri Lanka", y: 4.35, color: regionColors["South Asia"], text: Browser.isDevice ? 'LKA' : 'Sri Lanka' },
        { x: "Qatar", y: 10.5, color: regionColors["Middle East"], text: Browser.isDevice ? 'QAT' : 'Qatar' },
        { x: "Iran", y: 1.0, color: regionColors["Middle East"], text: Browser.isDevice ? 'IRN' : 'Iran' },
        { x: "Jordan", y: 1.6, color: regionColors["Middle East"], text: Browser.isDevice ? 'JOR' : 'Jordan' },
        { x: "Syria", y: 1.8, color: regionColors["Middle East"], text: Browser.isDevice ? 'SYR' : 'Syria' },
        { x: "Lebanon", y: 1.25, color: regionColors["Middle East"], text: Browser.isDevice ? 'LBN' : 'Lebanon' },
        { x: "Philippines", y: 7.36, color: regionColors["S.E. Asia"], text: Browser.isDevice ? 'PHL' : 'Philippines' },
        { x: "Sudan", y: 1.9, color: regionColors["Africa"], text: Browser.isDevice ? 'SDN' : 'Sudan' },
        { x: "Egypt", y: 9.35, color: regionColors["Africa"], text: Browser.isDevice ? 'EGY' : 'Egypt' },
        { x: 'Others', y: 9.39, color: regionColors["Others"], text: Browser.isDevice ? 'Others' : 'Others' }
    ];

    let pie: AccumulationChart = new AccumulationChart({
        series: [
            {
                dataSource: countryData,
                type: 'Pie',
                xName: 'x',
                yName: 'y',
                pointColorMapping: 'color',
                radius: '90%',
                innerRadius: '75%',
                border: { color: '#fff', width: 2 },
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Outside'
                },
                animation: {
                    enable: false
                }
            },
            {
                dataSource: regionData,
                type: 'Pie',
                xName: 'x',
                yName: 'y',
                pointColorMapping: 'color',
                radius: '67%',
                innerRadius: '35%',
                border: { color: '#fff', width: 2 },
                dataLabel: {
                    visible: true,
                    name: 'text',
                    position: 'Inside'
                },
                animation: {
                    enable: false
                }
            }
        ],
        enableBorderOnMouseMove: false,
        centerLabel: {
            text: 'Qatar Population<br><b>3.1 Million</b>',
            textStyle: {
                size: '12px',
                fontWeight: 'bold'
            }
        },
        title: 'The Population of Qatar by Nationality',
        tooltip: {
            enable: true,
            format: '<b>${point.x}</b><br/>Population: <b>${point.y}%</b>',
            textStyle: { fontWeight: 'bold' }
        },
        legendSettings: {
            visible: true,
            mappingKey: 'x'
        },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    pie.appendTo('#container');
};
