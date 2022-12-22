import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DataLabel, BarSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme, Highlight} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(BarSeries, DataLabel, Category, Legend, Tooltip, Highlight);

/**
 * Sample for bar series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 }
        },
        primaryYAxis:
        {
            labelFormat: '{value}%',
            title: 'GDP (In Percentage)',
            edgeLabelPlacement: 'Shift',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
                    { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'GDP', columnSpacing: 0.1,
            },
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
                    { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: "Share in World's GDP" , columnSpacing: 0.1,
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true
        },
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: { enableHighlight :true },
        //Initializing Chart title
        title: 'GDP by Country in 2017',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    chart.appendTo('#container');
};