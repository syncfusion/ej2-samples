import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Category, DataLabel, Tooltip, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Tooltip );
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Cylindrical Column Series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, labelIntersectAction: Browser.isDevice ? 'None' : 'Trim', labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }
        },
        chartArea: { border: { width: 0 }},
        primaryYAxis:
        {
            title: 'Medal Count', majorTickLines: { width: 0 }, lineStyle: { width: 0 }, maximum: 50, interval: 10
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', columnFacet: 'Cylinder', xName: 'x', width: 2, yName: 'y', columnSpacing: 0.1, tooltipMappingName:'tooltipMappingName',
                dataSource: [{ x: 'China', y: 26 , tooltipMappingName:'China' }, { x: 'Australia', y: 8, tooltipMappingName:'Australia'}, { x: 'Germany', y: 17, tooltipMappingName:'Germany' }, { x: 'Spain', y: 7, tooltipMappingName:'Spain' }, { x: 'Japan', y: 12, tooltipMappingName:'Japan' }, { x: 'USA', y: 46, tooltipMappingName:'United States' }]
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Olympic Gold Medal Counts - RIO', tooltip: { enable: true, header:"<b>${point.tooltip}</b>", format:"Gold Medal: <b>${point.y}</b>" },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};