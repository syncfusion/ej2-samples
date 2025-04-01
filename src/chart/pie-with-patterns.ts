import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, Category, Tooltip, DateTime, Zoom, Logarithmic,
    Crosshair, DataLabel, Legend,
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChart, AccumulationTheme, IAccLoadedEventArgs, IAccPointRenderEventArgs } from '@syncfusion/ej2/charts';
import { EmitType } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme, piePatternPointrender } from './theme-color';
Chart.Inject(Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, DataLabel, Legend);

/**
 * Sample for Waterfall series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: object[] = [
        { x: 'Internet Explorer', y: 6.12, text: Browser.isDevice ? 'Internet Explorer:<br> 6.12%' : 'Internet Explorer: 6.12%' },
        { x: 'Chrome', y: 57.28, text: Browser.isDevice ? 'Chrome:<br> 57.282%' : 'Chrome: 57.28%' },
        { x: 'Safari', y: 4.73, text: Browser.isDevice ? 'Safari:<br> 4.73%' : 'Safari: 4.73%' },
        { x: 'QQ', y: 5.96, text: Browser.isDevice ? 'QQ:<br>5.96%' : 'QQ: 5.96%' },
        { x: 'UC Browser', y: 4.37, text: Browser.isDevice ? 'UC Browser:<br>4.37%' : 'UC Browser: 4.37%' },
        { x: 'Edge', y: 7.48, text: Browser.isDevice ? 'Edge:<br> 7.48%' : 'Edge: 7.48%' },
        { x: 'Others', y: 14.06, text: Browser.isDevice ? 'Others:<br> 14.06%' : 'Others: 14.06%' }
    ]

    let chart: AccumulationChart = new AccumulationChart({
        series: [{
            type: 'Pie', dataSource: data, xName: 'x', yName: 'y', animation: { enable: true }, applyPattern: true, dataLabel: {
                name: 'text', visible: true, position: 'Outside', font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' },
            }, border: { width: 2 }
        }],
        enableBorderOnMouseMove: false,
        width: Browser.isDevice ? '100%' : '75%',
        pointRender: piePatternPointrender,
        legendSettings: { visible: false },
        title: 'Browser Market Share',
        tooltip: { enableHighlight: true, enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" },
        load: (args: IAccLoadedEventArgs) => {
            loadAccumulationChartTheme(args);
        }
    });
    chart.appendTo('#container');
};
