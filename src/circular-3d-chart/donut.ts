import { loadCultureFiles } from '../common/culture-loader';
import { CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2/base';
CircularChart3D.Inject( PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D );
/**
 * Sample for Doughnut chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let pie: CircularChart3D = new CircularChart3D({
        // Initialize the chart series
        series: [
            {
                dataSource: [{ x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }],
                dataLabel: {
                    visible: true,
                    name: 'x',
                    position: 'Outside',
                    font: {
                        fontWeight: '600',
                    },
                    connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
                },
                xName: 'x',
                yName: 'y',
                radius: Browser.isDevice ? '45%' : '75%',
                innerRadius: '65%',
            }
        ],
        title: 'Top Selling Electric Cars in China',
        legendSettings: {
            visible: false,
        },
        tooltip: { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' },
        enableRotation: true,
        tilt: -30,
        load: (args: CircularChart3DLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <CircularChart3DTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    pie.appendTo('#container');
};
