import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, ILoadedEventArgs, Series, ChartTheme, getElement } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries);
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for vertical chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let interval: number;
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: { title: 'Time (s)', majorGridLines: { width: 0 } },
        //Initializing Primary Y Axis
        primaryYAxis: { title: 'Velocity (m/s)', majorGridLines: { width: 0 }, minimum: -15, maximum: 15, interval: 5 },
        series: [
            {
                type: 'Line', xName: 'x', yName: 'y', dataSource: [{ x: 0, y: 0 }],
                animation: { enable: false }, width: 2
            }
        ],
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Vertical Mode
        isTransposed: true,
        //Initializing Chart Title
        title: 'Indonesia - Seismograph Analysis',
        //Initializing User Interaction Tooltip
        tooltip: { enable: false },
        width: Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        loaded: (args: ILoadedEventArgs) => {
            chart.loaded = null;
            interval =
                setInterval(
                    () => {
                        chart.series[0].dataSource = liveData(chart.series[0].dataSource as any[], <Series>chart.series[0]);
                        chart.refresh();
                    },
                    10
                );
        }
    });
    chart.appendTo('#container-vertical');
    let count: number = 0;
    function liveData(data: any[], series: Series): any[] {
        count = count + 1;
        let newData: any[] = data;
        if (count > 350 || getElement('container-vertical') === null) {
            clearInterval(interval);
        } else if (count > 300) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(0, 0) });
        } else if (count > 250) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-2, 1) });
        } else if (count > 180) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-3, 2) });
        } else if (count > 100) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-7, 6) });
        } else if (count < 50) {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-3, 3) });
        } else {
            newData.push({ x: getXValue(data), y: getRandomArbitrary(-9, 9) });
        }
        return newData;
    }
    function getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    function getXValue(data: any[]): number {
        return data.length;
    }
};