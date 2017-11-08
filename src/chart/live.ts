import { Chart, LineSeries, Legend, ILoadedEventArgs, getElement } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, Legend);

/**
 * Line Series
 */

let series1: Object[] = [];
let series2: Object[] = [];
let point1: Object;
let point2: Object;
let value: number = 10;
let value1: number = 15;
let i: number;
let intervalId: number;


for (i = 0; i < 100; i++) {

    if (Math.random() > .5) {
        if (value < 45) {
            value += Math.random() * 2.0;
        } else {
            value -= 2.0;
        }

        if (value1 < 40) {
            value1 += Math.random() * 1.8;
        } else {
            value1 -= 2.0;
        }
    } else {
        if (value > 5) {
            value -= Math.random() * 2.0;
        } else {
            value += 2.0;
        }

        if (value1 > 5) {
            value1 -= Math.random() * 1.8;
        } else {
            value1 += 2.0;
        }
    }
    series1[i] = { x: i, y: value };
    series2[i] = { x: i, y: value1 + 10 };
}

this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0,
            maximum: 50,
            interval: 10
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: series1,
                xName: 'x',
                yName: 'y', animation: { enable: false }
            },
            {
                type: 'Line',
                dataSource: series2,
                xName: 'x',
                yName: 'y', animation: { enable: false }
            }
        ],

        width: '800',
        height: '350',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = (selectedTheme && selectedTheme.indexOf('fabric') > -1) ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container-live');



    let setTimeoutValue: number = 100;
    intervalId = setInterval(
        (): void => {
            if (getElement('container-live') === null) {
                clearInterval(intervalId);
            } else {
                if (Math.random() > .5) {
                    if (value < 45) {
                        value += Math.random() * 2.0;
                    } else {
                        value -= 2.0;
                    }
                    if (value1 < 40) {
                        value1 += Math.random() * 1.8;
                    } else {
                        value1 -= 2.0;
                    }
                } else {
                    if (value > 5) {
                        value -= Math.random() * 2.0;
                    } else {
                        value += 2.0;
                    }

                    if (value1 > 5) {
                        value1 -= Math.random() * 1.8;
                    } else {
                        value1 += 2.0;
                    }
                }
                series1.push({ x: i.toString(), y: value });
                series2.push({ x: i.toString(), y: value1 + 10 });
                i++;
                series1.shift();
                series2.shift();
                chart.series[0].dataSource = series1;
                chart.series[1].dataSource = series2;
                chart.refresh();
            }
        },
        setTimeoutValue);
};