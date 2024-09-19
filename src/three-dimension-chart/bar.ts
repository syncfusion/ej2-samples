import { loadCultureFiles } from '../common/culture-loader';
import { Chart3D, BarSeries3D, Category3D, Legend3D, Tooltip3D, Chart3DLoadedEventArgs, Highlight3D, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart3D.Inject(BarSeries3D, Category3D, Legend3D, Tooltip3D, Highlight3D);

/**
 * Sample for bar series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart3D = new Chart3D({

        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'BetweenTicks'
        },
        primaryYAxis:
        {
            labelFormat: '{value}%',
            maximum: Browser.isDevice ? 8 : 7, interval: Browser.isDevice ? 2 : 1,
            edgeLabelPlacement: 'Shift'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Japan', y: 1.71 }, { x: 'France', y: 1.82 },
                    { x: 'India', y: 6.68 }, { x: 'Germany', y: 2.22 }, { x: 'Italy', y: 1.50 }, { x: 'Canada', y: 3.05 }
                ],
                xName: 'x',
                yName: 'y', name: 'GDP', columnSpacing: 0.1,
            },
            {
                type: 'Bar',
                dataSource: [
                    { x: 'Japan', y: 6.02 }, { x: 'France', y: 3.19 },
                    { x: 'India', y: 3.28 }, { x: 'Germany', y: 4.56 }, { x: 'Italy', y: 2.40 }, { x: 'Canada', y: 2.04 }
                ],
                xName: 'x',
                yName: 'y', name: "Share in World's GDP", columnSpacing: 0.1,
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true
        },
        rotation: 22,
        depth: 100,
        height: '400',
        enableRotation: true,
        width: Browser.isDevice ? '100%' : '70%',
        legendSettings: { enableHighlight: true },
        //Initializing Chart title
        title: 'GDP Percentage by Country in 2017',
        load: (args: Chart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};