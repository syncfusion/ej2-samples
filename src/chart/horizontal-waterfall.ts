import { ChartTheme, ILoadedEventArgs, IPointRenderEventArgs, ITooltipRenderEventArgs } from '@syncfusion/ej2/charts';
import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic,
    Crosshair, Legend, DataLabel
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2/base';
import { ILegendRenderEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, DataLabel, Legend);

/**
 * Sample for Waterfall series
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chartData: any[] = [
        { x: 'JAN', y: 55 },
        { x: 'MAR', y: 42 },
        { x: 'JUNE', y: -12 },
        { x: 'AUG', y: 40 },
        { x: 'OCT', y: -26 },
        { x: 'DEC', y: 45 },
        { x: '2023' }
    ]
    let chart: Chart = new Chart({
        primaryXAxis: {
            valueType: 'Category',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 1 },
            majorTickLines: { width: 0 },
            isInversed: true
        },
        primaryYAxis: {
            minimum: 0, maximum: 150, interval: 25,
            labelFormat: '{value}K',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 1 },            
        }, isTransposed: true,
        series: [{
            border: { width: 0.2, color: 'Black' }, columnWidth: 0.5, negativeFillColor: '#e56590',
            dataSource: chartData, width: 2,
            xName: 'x', yName: 'y',
            name: 'Increases',
            sumIndexes: [6],
            type: 'Waterfall', animation: { enable: true }, connector: { width: 0.8, dashArray: '1,2', color: '#5F6A6A' }, cornerRadius: { topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 },
            marker: {
                dataLabel: { visible: true, position: 'Middle' }
            }

        }],
        width: Browser.isDevice ? '100%' : '70%',
        tooltip: {
            enable: true, header: '', format: "<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>"
        },
        title: 'Revenue Variation',
        legendSettings: { mode: 'Point', toggleVisibility: false },
        legendRender: (args:ILegendRenderEventArgs) => {
            if (args.text === 'JAN') {
                args.text = 'Increase';
            }
            else if (args.text === 'OCT') {
                args.text = 'Decrease';
                args.fill = '#e56590'
            }
            else if (args.text === '2023') {
                args.text = 'Total';
                args.fill = '#4E81BC'
            }
            else {
                args.cancel = true;
            }
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }

    }, '#container');
};
