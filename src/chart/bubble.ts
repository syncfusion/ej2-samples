import { loadCultureFiles } from '../common/culture-loader';
import { Chart, BubbleSeries, Tooltip, DataLabel } from '@syncfusion/ej2-charts';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { bubblePointRender, loadChartTheme } from './theme-color';
Chart.Inject(BubbleSeries, Tooltip, DataLabel);

/**
 * Sample for Bubble series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        // Initializing the Primary X and Y Axis
        primaryXAxis: {
            minimum: 65,
            maximum: 102,
            interval: 5,
            crossesAt: 5
        },
        primaryYAxis: {
            minimum: 0,
            maximum: 10,
            crossesAt: 85,
            interval: 2.5
        },
        width: Browser.isDevice ? '100%' : '75%',
        // Initializing the chart series
        series: [
            {
                type: 'Bubble',
                dataSource: [
                    { x: 92.2, y: 7.8, size: 1.347, text: 'China', dataLabelName: 'China' },
                    { x: 74, y: 6.5, size: 1.241, text: 'India', dataLabelName: 'India' },
                    { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia', dataLabelName: Browser.isDevice ? 'ID' : 'Indonesia'},
                    { x: 99.4, y: 2.2, size: 0.312, text: 'United States', dataLabelName: 'US' },
                    { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil', dataLabelName: Browser.isDevice ? 'BR' : 'Brazil'},
                    { x: 99, y: 0.7, size: 0.0818, text: 'Germany', dataLabelName: Browser.isDevice ? 'DE' : 'Germany' },
                    { x: 72, y: 2.0, size: 0.0826, text: 'Egypt', dataLabelName: Browser.isDevice ? 'EG' : 'Egypt'},
                    { x: 99.6, y: 3.4, size: 0.143, text: 'Russia', dataLabelName: Browser.isDevice ? 'RUS' : 'Russia'},
                    { x: 96.5, y: 0.2, size: 0.128, text: 'Japan', dataLabelName: Browser.isDevice ? 'JP' : 'Japan'},
                    { x: 86.1, y: 4.0, size: 0.115, text: 'MeLiteracy Ion', dataLabelName: 'MLI' },
                    { x: 92.6, y: 5.2, size: 0.096, text: 'Philippines', dataLabelName: 'PH' },
                    { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria', dataLabelName: 'Nigeria' },
                    { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong', dataLabelName: Browser.isDevice ? 'HK' : 'Hong Kong' },
                    { x: 79.2, y: 4.9, size: 0.162, text: 'Netherland', dataLabelName: 'NL' },
                    { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan', dataLabelName: 'Jordan' },
                    { x: 81, y: 2.5, size: 0.21, text: 'Australia', dataLabelName: Browser.isDevice ? 'AU' : 'Australia'},
                    { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia', dataLabelName: 'MN' },
                    { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan', dataLabelName: Browser.isDevice ? 'TW' : 'Taiwan' }
                ],
                minRadius: 3,
                maxRadius: Browser.isDevice ? 6 : 8,
                xName: 'x', yName: 'y', size: 'size',
                border: { width: 2 }, tooltipMappingName: 'text',
                marker: { dataLabel: { visible: true, name: 'dataLabelName', labelIntersectAction:'None', position: 'Middle', font: { fontWeight: '500', color: '#ffffff' } } }
            },
        ],
        // Initiazlize the point render event
        pointRender: bubblePointRender,
         // custom code start
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
         // custom code end
        title: 'World Countries Details',
        // Initializing the tooltip with format
        tooltip: {
            enableMarker: false,
            enable: true,
            header: "<b>${point.tooltip}</b>",
            format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>"
        },
        legendSettings: { visible: false }
    });
    chart.appendTo('#container');
};