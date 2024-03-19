import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, Tooltip, Legend, PolarSeries, Category,
    RadarSeries, ChartDrawType, ILoadedEventArgs, ChartTheme, Highlight, ColumnSeries
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Chart.Inject(Tooltip, Legend, PolarSeries, Category, RadarSeries, Highlight, ColumnSeries);

/**
 * Sample for Polar Series with DrawType Column
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = [
        //{text: 'China', 	  x: 'CHN', 	  	y: 1246.3, y1: 1341, y2: 448.3},
        //{text: 'India', 		x: 'IND', 		y: 893.3, y1: 1237, y2: 41.95},
        { text: 'Japan', x: 'JPN', y: 137.9, y1: 127.6, y2: 108.8 },
        //{text: 'USA', 			x: 'USA', 			y: 345.2, y1: 313.9, y2: 287.4},
        { text: 'Indonesia', x: 'IDN', y: 85.0, y1: 246.9, y2: 45.5 },
        //{text: 'Brazil', 		x: 'IDN', 		y: 272.6, y1: 137.2, y2: 110.2 },
        { text: 'Russia', x: 'RUS', y: 237.1, y1: 143.5, y2: 41.2 },
        { text: 'Vietnam', x: 'VNM', y: 127.7, y1: 88.8, y2: 18.0 },
        { text: 'Pakistan', x: 'PAK', y: 126.1, y1: 179.2, y2: null },
        { text: 'Nigeria', x: 'NGA', y: 175.0, y1: 168.8, y2: 12.7 },
        { text: 'Germany', x: 'DEU', y: 113.6, y1: 81.9, y2: 46.0 },
        { text: 'Bangladesh', x: 'BGS', y: 116.0, y1: 154.7, y2: 34.6 },
        { text: 'Philippines', x: 'PHL', y: 109.5, y1: 96.7, y2: 16.6 },
        { text: 'Mexico', x: 'MEX', y: 102.7, y1: 120.8, y2: 19.8 }
    ];
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'OnTicks', interval: 1,
            coefficient: Browser.isDevice ? 80 : 100,
            labelIntersectAction: Browser.isDevice ? 'Trim' : 'None',
        },

        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}M'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Polar', drawType: 'Column', dataSource: data,
                animation: { enable: true }, border: { width: 1, color: 'white' },
                xName: 'text', yName: 'y', name: 'Mobile Subscriptions',
                marker: { dataLabel: { name: 'text' } }
            },
            {
                type: 'Polar', drawType: 'Column', dataSource: data,
                animation: { enable: true }, border: { width: 1, color: 'white' },
                xName: 'text', yName: 'y1', name: 'Population in Millions',
                marker: { dataLabel: { name: 'text' } }
            },
            {
                type: 'Polar', drawType: 'Column', dataSource: data,
                animation: { enable: true }, border: { width: 1, color: 'white' },
                xName: 'text', yName: 'y2', name: '3G/4G Subscriptions',
                marker: { dataLabel: { name: 'text' } }
            },
        ],
        //Initializing Chart title
        title: 'Top 10 Mobile Markets by Number of Subscriptions',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true, header: '',
            format: '<b>${point.text}</b> <br> ${series.name} : <b>${point.y}</b>'
        },
        legendSettings: { enableHighlight: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
    let polarType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartDrawType>polarType.value;
            chart.series[1].type = <ChartDrawType>polarType.value;
            chart.series[2].type = <ChartDrawType>polarType.value;
            chart.series[0].animation.enable = false;
            chart.series[1].animation.enable = false;
            chart.series[2].animation.enable = false;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
};