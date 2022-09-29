import { loadCultureFiles } from '../common/culture-loader';

import { Chart, Category, AreaSeries, Legend, ILoadedEventArgs, ChartTheme, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(AreaSeries, Category, Legend, Tooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Area Series with Empty Point
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
    //Initializing Primary Axes
    primaryXAxis: {
        valueType: 'Category',
        interval: 1,
        majorGridLines: { width: 0 },
        edgeLabelPlacement: 'Shift',
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
                { x: 'Onion', y: 3000 },
                { x: 'Potato', y: 4000 },
                { x: 'Tomato', y: -4000 },
                { x: 'Corn', y: -2000 },
                { x: 'Carrot', y: 5000 },
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
                { x: 'Onion', y: 2000 },
                { x: 'Potato', y: 3000 },
                { x: 'Tomato', y: 4000 },
                { x: 'Corn', y: 2000 },
                { x: 'Carrot', y: 3000 },
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
                { x: 'Onion', y: 2000 },
                { x: 'Potato', y: -1000 },
                { x: 'Tomato', y: -3000 },
                { x: 'Corn', y: 4000 },
                { x: 'Carrot', y: 1000 },
            ],
            xName: 'x', border: { width: 2 },
            width: 2,
            yName: 'y',
            name: 'Company c',marker: { visible:true, isFilled : true , width : 5 , height : 5 , shape : "Rectangle"},
            opacity: 0.75,
        },
    ],
    //Initializing Chart title
    title: 'Profit and Loss',
    tooltip:{ enable:true },
    width: Browser.isDevice ? '100%' : '60%',
    margin : {left : Browser.isDevice ? 2 : 10, right : Browser.isDevice ? 2 : 10, top : Browser.isDevice ? 2 : 10, bottom : Browser.isDevice ? 2 : 10},
    load: (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(
            (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
                .replace(/-dark/i, 'Dark')
                .replace(/contrast/i, 'Contrast')
        );
    },
});
chart.appendTo('#container');
};
