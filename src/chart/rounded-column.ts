import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, Category, DataLabel,
    Tooltip, IPointRenderEventArgs,
    ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';
Chart.Inject(ColumnSeries, DataLabel, Category, Tooltip);
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Sample for Column series with rounded corner
 */
let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric-dark') > -1) {
        if (args.series.yName == "Rate")
            args.fill = "f9fafb";
    } else if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'material-dark') {
        if (args.series.yName == "Rate")
            args.fill = "f9fafb";
    } else if (selectedTheme === 'material') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'bootstrap5-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'bootstrap5') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'bootstrap-dark') {
        if (args.series.yName == "Rate")
            args.fill = "f9fafb";
    } else if (selectedTheme === 'bootstrap') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'highcontrast') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'fluent-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'fluent') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else if (selectedTheme === 'tailwind-dark') {
        if (args.series.yName == "Rate")
            args.fill = "#f9fafb";
    } else if (selectedTheme === 'tailwind') {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    } else {
        if (args.series.yName == "Rate")
            args.fill = "grey";
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let count: number = 0;
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }, labelPosition: 'Outside', labelRotation: Browser.isDevice ? -45 : 0, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45',
        },
        chartArea: { border: { width: 0 } },
        enableSideBySidePlacement:false,
        //Initializing Primary Y Axis
        primaryYAxis:
            {
                minimum: 0, maximum: 100,title:'Literacy Rate In Percentage',labelFormat: '{value}%', interval: 25, majorTickLines: { width: 0 }, lineStyle: { width: 0 }
            },

        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'Rate',
                dataSource: [
                    { x: 'Niger', y: 19.1, Rate: 100, text: "19.1%" },
                    { x: 'Sierra Leone', y: 48.1, Rate: 100, text: "48.1%" },
                    { x: 'South Sudan', y: 26.8, Rate: 100, text: "26.8%" },
                    { x: 'Nepal', y: 64.7, Rate: 100, text: "64.7%" },
                    { x: 'Gambia', y: 55.5, Rate: 100, text: "55.5%" },
                    { x: 'Gyana', y: 88.5, Rate: 100, text: "88.5%" },
                    { x: 'Kenya', y: 78.0, Rate: 100, text: "78.0%" },
                    { x: 'Singapore', y: 96.8, Rate: 100, text: "96.8%" }
                ], name: 'Tiger',enableTooltip:false, columnWidth:0.8 ,opacity:0.5,
                cornerRadius:{ bottomLeft: Browser.isDevice ? 12 : 35, bottomRight: Browser.isDevice ? 12 : 35, topLeft: Browser.isDevice ? 12 : 35, topRight: Browser.isDevice ? 12 : 35},
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y',
                dataSource: [
                    { x: 'Niger', y: 19.1, Rate: 100, text: "19.1%" },
                    { x: 'Sierra Leone', y: 48.1, Rate: 100, text: "48.1%" },
                    { x: 'South Sudan', y: 26.8, Rate: 100, text: "26.8%" },
                    { x: 'Nepal', y: 64.7, Rate: 100, text: "64.7%" },
                    { x: 'Gambia', y: 55.5, Rate: 100, text: "55.5%" },
                    { x: 'Gyana', y: 88.5, Rate: 100, text: "88.5%" },
                    { x: 'Kenya', y: 78.0, Rate: 100, text: "78.0%" },
                    { x: 'Singapore', y: 96.8, Rate: 100, text: "96.8%" }
                ], name: 'Tiger',
                cornerRadius:{ bottomLeft: Browser.isDevice ? 12 : 35, bottomRight: Browser.isDevice ? 12 : 35, topLeft: Browser.isDevice ? 12 : 35, topRight: Browser.isDevice ? 12 : 35},columnWidth:0.8 ,
                marker:{ dataLabel: { visible: true, name: 'text', position:  'Top', font: {fontWeight: '600', color: '#ffffff' , size: Browser.isDevice ? '9px' : '11px'} } }
            }
        ],
        pointRender: pointRender,
        legendSettings: { visible: false },
        //Initializing Chart title
        title: 'Literacy rate by Country in 2015', tooltip: { enable: true, header:"<b>${point.x}</b>", format: "Rate : <b>${point.text}</b>"  },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        width: Browser.isDevice ? '100%' : '75%',
    });
    chart.appendTo('#column-container');
};