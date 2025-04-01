import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Category, Legend, DataLabel, Tooltip, ILoadedEventArgs, ITooltipRenderEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Column Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        chartArea: { border: { width: 0 }, margin: { bottom: 12 } },
        primaryYAxis:
        {
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            title: 'Number of Medals Won',
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'USA Total Medals', groupName: 'USA', columnWidth: 0.7,
                dataSource: [{ x: '2016', y: 104 }, { x: '2020', y: 121 }, { x: '2024', y: 113 }], columnSpacing: 0.1,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'USA Gold Medals', groupName: 'USA', columnWidth: 0.5,
                dataSource: [{ x: '2016', y: 46 }, { x: '2020', y: 46 }, { x: '2024', y: 39 }], columnSpacing: 0.1,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'UK Total Medals', groupName: 'UK', columnWidth: 0.7, 
                dataSource: [{ x: '2016', y: 65 }, { x: '2020', y: 67 },{ x: '2024', y: 65 }], columnSpacing: 0.1,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'UK Gold Medals', groupName: 'UK', columnWidth: 0.5,
                dataSource: [{ x: '2016', y: 29 }, { x: '2020', y: 27 },{ x: '2024', y: 22 }], columnSpacing: 0.1,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'China Total Medals', groupName: 'China', columnWidth: 0.7, 
                dataSource: [{ x: '2016', y: 91 }, { x: '2020', y: 70 },{ x: '2024', y: 88 }], columnSpacing: 0.1,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
            {
                type: 'Column', xName: 'x', yName: 'y', name: 'China Gold Medals', groupName: 'China', columnWidth: 0.5,
                dataSource: [{ x: '2016', y: 38 }, { x: '2020', y: 26 },{ x: '2024', y: 38 }], columnSpacing: 0.1,
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } },
                cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle'
            },
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Olympic Medal Trends by Country and Year', 
        subTitle: 'A Historical Overview of Medal Counts Across Nations',
        tooltip: { enable: true, enableHighlight: true, header: '<b>${point.x}</b>', format: '${series.groupName} : <b>${point.y} Gold</b>' },
        legendSettings: { visible: true, shapeWidth: 9, shapeHeight: 9 },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            const seriesName: string = args.series.name;
            const groupName: string = (args.series as { groupName?: string }).groupName ?? '';
            const value: number = args.point.y as number;
            args.text = seriesName.includes('Gold') ? `${groupName}: <b>${value} Gold</b>` : `${groupName}: <b>${value} Total</b>`;
        }
    });
    chart.appendTo('#container');
};