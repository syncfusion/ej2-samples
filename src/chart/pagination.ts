import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, AreaSeries, Category, SplineAreaSeries, Tooltip, Zoom, DataLabel, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { ChartAnnotation, IAxisLabelRenderEventArgs, IAnnotationRenderEventArgs } from '@syncfusion/ej2/charts';

Chart.Inject(AreaSeries, ChartAnnotation, Category, SplineAreaSeries, Tooltip, Zoom, DataLabel);
/**
 * Sample for Column Series
 */

let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
let theme: ChartTheme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');

(window as any).default = (): void => {
    loadCultureFiles();
    let image: string = 'sunny_image';
    let count: number = 25;
    let day: string = 'Friday';
    const chartData: any[] = [
        { x: 1, xValue: '1 am', y: 20 }, { x: 2, xValue: '4 am', y: 20 }, { x: 3, xValue: '7 am', y: 20 },
        { x: 4, xValue: '10 am', y: 21 }, { x: 5, xValue: '1 pm', y: 21 }, { x: 6, xValue: '4 pm', y: 24 },
        { x: 7, xValue: '1 am', y: 19 }, { x: 8, xValue: '4 am', y: 20 }, { x: 9, xValue: '7 am', y: 20 },
        { x: 10, xValue: '10 am', y: 21 }, { x: 11, xValue: '1 pm', y: 24 }, { x: 12, xValue: '4 pm', y: 24 },
        { x: 13, xValue: '1 am', y: 21 }, { x: 14, xValue: '4 am', y: 21 }, { x: 15, xValue: '7 am', y: 21 },
        { x: 16, xValue: '10 am', y: 22 }, { x: 17, xValue: '1 pm', y: 23 }, { x: 18, xValue: '4 pm', y: 24 },
        { x: 19, xValue: '1 am', y: 20 }, { x: 20, xValue: '4 am', y: 19 }, { x: 21, xValue: '7 am', y: 19 },
        { x: 22, xValue: '10 am', y: 18 }, { x: 23, xValue: '1 pm', y: 19 }, { x: 24, xValue: '4 pm', y: 19 },
        { x: 25, xValue: '1 am', y: 16 }, { x: 26, xValue: '4 am', y: 15 }, { x: 27, xValue: '7 am', y: 14 },
        { x: 28, xValue: '10 am', y: 15 }, { x: 29, xValue: '1 pm', y: 16 }, { x: 30, xValue: '4 pm', y: 18 }
    ];
    let chart: Chart = new Chart({
        primaryXAxis: {
            interval: 1,
            zoomFactor: 0.175,
            zoomPosition: 0,
            majorGridLines: { width: 0 },
            enableAutoIntervalOnZooming: false,
            labelPlacement: 'OnTicks',
            labelRotation: Browser.isDevice ? -90 : 0,
            valueType: 'Category',
            edgeLabelPlacement: 'Shift',
            isIndexed: true
        },
        primaryYAxis: {
            majorGridLines: { width: 0 },
            visible: false,
            maximum: 32
        },
        annotations: [
            {
                content: '<div id="chart_image"><img src="src/chart/images/cloudy.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: Browser.isDevice ? '6%' : '3%',
                y: '9%'
            },
            {
                content: '<div id="days" style="font-size: 11px;">Friday, 01:00 am</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: Browser.isDevice ? '87%' : '94%',
                y: Browser.isDevice ? '10%' : '11%',
            },
            {
                content: '<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>',
                coordinateUnits: 'Pixel',
                region: 'Chart',
                x: Browser.isDevice ? '88%' : '93%',
                y: Browser.isDevice ? '4%' : '3%'
            }

        ],
        annotationRender: (args: IAnnotationRenderEventArgs) => {
            if (args.content.id === 'container_Annotation_0') {
                args.content.innerHTML = '<div id="chart_cloud" align="center"><img src="src/chart/images/' + image + '.png" alt="Cloud Picture" style="width: 41px; height: 41px; margin-right: 10px;"/><b align="center" style="font-size: 23px">' + count + '<span style="font-size: 12px; vertical-align: super;">°C | °F</span>' + '</b></div>';
            } else if (args.content.id === 'container_Annotation_1') {
                args.content.innerHTML = Browser.isDevice ? '<div id="days" style="font-size: 9px;">' + day + ', 01:00 am</div>' : '<div id="days" style="font-size: 11px;">' + day + ', 01:00 am</div>';
                if (day === 'Saturday' || day === 'Tuesday') {
                    Browser.isDevice ? args.location.x -= 8 : args.location.x -= 12;
                } else if (day === 'Sunday') {
                    Browser.isDevice ? args.location.x -= 5 : args.location.x -= 8;
                } else if (day === 'Monday') {
                    args.location.x -= 10
                }
            } else {
                args.content.innerHTML = Browser.isDevice ? `<div id="title" style="font-size: 16px; font-weight: 600">USA, Texas</div>` : `<div id="title" style="font-size: 20px; font-weight: 600">USA, Texas</div>`;
            }
        },
        zoomSettings: {
            enableSelectionZooming: true,
            enablePan: true,
            toolbarItems: [],
            mode: 'X'
        },
        height: '70%',
        width: Browser.isDevice ? '100%' : '75%',
        chartArea: { border: { width: 0 } },
        series: [{
            dataSource: chartData,
            xName: 'xValue', yName: 'y',
            opacity: 0.5, width: 2,
            border: { width: 2 },
            type: 'SplineArea',
            marker: { visible: false, dataLabel: { visible: true, format:'{value}°C', position:'Top' } }
        }],

        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            const isDarkTheme = /dark/i.test(selectedTheme) || /contrast/i.test(selectedTheme);
            const buttons = document.querySelectorAll('.custom-button');
            const buttonContainer = document.getElementById('button-container');
            buttons.forEach(button => {
                if (isDarkTheme) {
                    button.classList.add('dark-theme-bg');
                    button.classList.remove('light-theme-bg');
                    buttonContainer.style.backgroundColor = '#333';
                } else {
                    button.classList.add('light-theme-bg');
                    button.classList.remove('dark-theme-bg');
                    buttonContainer.style.backgroundColor = 'rgb(237, 236, 236)';
                }
            });
            if (Browser.isDevice) {
                buttonContainer.style.width = '97%';
            } else {
                buttonContainer.style.width = '75%';
            }
        },
    });
    chart.appendTo('#container');
    function updateChart(buttonId: string, img: string, tempCount: number, chartDay: string, zoomPos: number, zoomFactor: number) {
        image = img;
        count = tempCount;
        day = chartDay;
        chart.primaryXAxis.zoomPosition = zoomPos;
        chart.primaryXAxis.zoomFactor = zoomFactor;
        chart.duration = 600;
        const buttons = document.querySelectorAll('.custom-button');
        buttons.forEach(button => button.classList.remove('active'));
        const selectedButton = document.getElementById(buttonId) as HTMLElement;
        selectedButton.classList.add('active');
    }
    document.getElementById('friday').onclick = () => {
        updateChart('friday', 'sunny_image', 25, 'Friday', 0, 0.175);
    };
    document.getElementById('saturday').onclick = () => {
        updateChart('saturday', 'sunny_image', 25, 'Saturday', 0.206, 0.175);
    };
    document.getElementById('sunday').onclick = () => {
        updateChart('sunday', 'cloudy', 24, 'Sunday', 0.413, 0.175);
    };
    document.getElementById('monday').onclick = () => {
        updateChart('monday', 'cloudy', 19, 'Monday', 0.620, 0.175);
    };
    document.getElementById('tuesday').onclick = () => {
        updateChart('tuesday', 'rainy', 18, 'Tuesday', 0.827, 0.175);
    };
};