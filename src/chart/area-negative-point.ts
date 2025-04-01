import { loadCultureFiles } from '../common/culture-loader';

import { Chart, DateTime, AreaSeries, Legend, ILoadedEventArgs, ChartTheme, Tooltip, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, DateTime, Legend, Tooltip, Highlight);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Area Series with Empty Point
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
    //Initializing Primary Axes
    primaryXAxis: {
        valueType: 'DateTime',
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
        minimum:new Date(2017, 0, 1), maximum: new Date(2021, 0, 1), intervalType: 'Years'
    },
    primaryYAxis: {
        labelFormat: '${value}', interval: 2000, maximum: 8000, minimum: -4000,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
    },
    chartArea: {
        border: {
            width: 0,
        },
    },
    //Initializing Chart Series
    series: [
        {
            type: 'Area',
            dataSource: [
                { x: new Date(2017, 0, 1), y: 3000 }, { x: new Date(2018, 0, 1), y: 4000 },
                { x: new Date(2019, 0, 1), y: -4000 }, { x: new Date(2020, 0, 1), y: -2000 },
                { x: new Date(2021, 0, 1), y: 5000 }
            ],
            xName: 'x',
            width: 2,
            yName: 'y',marker: { visible : true, isFilled : true , width : 7 , height : 7 , shape : "Circle"},
            name: 'Company A',border: { width: 2 },
            opacity: 0.75,
        },
        {
            type: 'Area',
            dataSource: [
                { x: new Date(2017, 0, 1), y: 2000 }, { x: new Date(2018, 0, 1), y: 3000 },
                { x: new Date(2019, 0, 1), y: 4000 }, { x: new Date(2020, 0, 1), y: 2000 },
                { x: new Date(2021, 0, 1), y: 3000 }
            ],
            xName: 'x',
            width: 2,
            yName: 'y',marker: {visible:true, isFilled : true , width : 7 , height : 7 , shape : "Diamond"},
            name: 'Company B',border: { width: 2 },
            opacity: 0.75,
        },
        {
            type: 'Area',
            dataSource: [
                { x: new Date(2017, 0, 1), y: 2000 }, { x: new Date(2018, 0, 1), y: -1000 },
                { x: new Date(2019, 0, 1), y: -3000 }, { x: new Date(2020, 0, 1), y: 4000 },
                { x: new Date(2021, 0, 1), y: 1000 }
            ],
            xName: 'x', border: { width: 2 },
            width: 2,
            yName: 'y',
            name: 'Company C',marker: { visible:true, isFilled : true , width : 5 , height : 5 , shape : "Rectangle"},
            opacity: 0.75,
        },
    ],
    //Initializing Chart title
    title: 'Profit and Loss',
    tooltip:{ enable: true, enableHighlight: true, showNearestTooltip: true },
    width: Browser.isDevice ? '100%' : '75%',
    legendSettings: {enableHighlight:true},
    load: (args: ILoadedEventArgs) => {
        loadChartTheme(args);
    },
});
chart.appendTo('#container');
};
