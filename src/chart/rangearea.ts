import {
    Chart, RangeAreaSeries, Category, ILoadedEventArgs, DateTime, Zoom,
    ChartTheme, ISeriesRenderEventArgs,
} from '@syncfusion/ej2-charts';
Chart.Inject(RangeAreaSeries, Category, DateTime, Zoom);
import { Browser } from '@syncfusion/ej2-base';

/**
 * RangeArea series
 */
this.default = (): void => {

    let series1: Object[] = [];
    let value: number = 35;
    let point1: Object;

    for (let i: number = 1; i < 360; i++) {
        if (Math.random() > .5) {
            value += Math.random();
        } else {
            value -= Math.random();
        }
        point1 = {
            x: new Date(2015, 0, i),
            high: value, low: value - 10
        };
        series1.push(point1);
    }

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            skeleton: 'MMM'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            labelFormat: '{value}˚C',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }
        },
        zoomSettings:
        {
            enableSelectionZooming: true,
            mode: 'X'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'RangeArea',
                name: 'India',
                dataSource: series1,
                xName: 'x', high: 'high', low: 'low', opacity: 0.4,
                border: {
                    width: 2
                }
            }
        ],
        width: Browser.isDevice ? '100%' : '80%',
        //Initializing Chart Title
        title: 'Maximum and Minimum Temperature',
        seriesRender: (args: ISeriesRenderEventArgs) => {
            let theme: ChartTheme = args.series.chart.theme;
            let color: string;
            if (theme === 'Material') {
                color = '#008E83';
            } else if (theme === 'Bootstrap') {
                color = '#7953AC';
            } else {
                color = '#335693';
            }
            args.series.border.color = color;
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};
