import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, Legend, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
Chart.Inject(LineSeries, Legend);
/**
 * Sample for Chart Performance
 */
let chart: Chart;
let loaded: EmitType<ILoadedEventArgs>;
let dt1: number;
let dt2: number;
(window as any).default = (): void => {
    loadCultureFiles();
    chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis:
        {
            majorGridLines: { color: 'transparent' }
        },

        //Initializing Chart Series
        series: [
            {
                name: 'Series1',
                type: 'Line',
                animation: { enable: false }
            }
        ],
        legendSettings: { visible: false },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
    let button: Button = new Button({ cssClass: 'e-info', isPrimary: true });
    button.appendTo('#load');

    document.getElementById('load').onclick = () => {
        let series1: Object[] = [];
        let point1: Object;
        let value: number = 0;
        let i: number;
        for (i = 0; i < 100000; i++) {

            value += (Math.random() * 10 - 5);
            point1 = { x: i, y: value };
            series1.push(point1);
        }
        dt1 = new Date().getTime();
        chart.series[0].dataSource = series1;
        chart.series[0].xName = 'x';
        chart.series[0].yName = 'y';
        chart.legendSettings.visible = false;
        chart.loaded = loaded;
        chart.refresh();
    };

    loaded = (args: Object): void => {
        dt2 = new Date().getTime();
        document.getElementById('performanceTime').innerHTML = (dt2 - dt1) + 'ms';
    };

};