import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, BarSeries, DataLabel, Category,
    Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, pointRender } from './theme-color';
Chart.Inject(BarSeries, Category, Tooltip, DataLabel);

/**
 * Sample for Category Axis
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and YAxis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            enableTrim: false, majorTickLines: {width : 0},
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0,
            maximum: 800,
            labelFormat: Browser.isDevice ? '{value}' : '{value}M',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        },
        width: Browser.isDevice ? '100%' : '75%',
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar', tooltipMappingName: 'country',
                dataSource: [
                    { x: "Germany", y: 72, country: "GER: 72" },
                    { x: "Russia", y: 103.1, country: "RUS: 103.1" },
                    { x: "Brazil", y: 139.1, country: "BRZ: 139.1" },
                    { x: "India", y: 462.1, country: "IND: 462.1" },
                    { x: "China", y: 721.4, country: "CHN: 721.4" },
                    { x: "United States<br>Of America", y: 286.9, country: "USA: 286.9" },
                    { x: "Great Britain", y: 115.1, country: "GBR: 115.1" },
                    { x: "Nigeria", y: 97.2, country: "NGR: 97.2" }
                ],
                xName: 'x', width: 2,
                yName: 'y', marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top', font: {
                            fontWeight: '600',
                            color: '#ffffff',
                            size: "11px"
                        }
                    }
                },
                name: 'Users'
            }
        ],
        pointRender: pointRender,
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        //Initializing Chart title
        title: Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016',
        tooltip: { enable: false, format: '${point.tooltip}' },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};