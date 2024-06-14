import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, DataLabel, Tooltip, ILoadedEventArgs, ChartTheme, IMouseEventArgs, IAxisRangeCalculatedEventArgs, Series } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DataLabel, Tooltip);
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for click to add a point.
 */
let chartData: Object[] = [
    { x: 20, y: 20 }, { x: 80, y: 80 }
];
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            edgeLabelPlacement: 'Shift',
            rangePadding: 'Additional',
            majorGridLines: { width: 0 }
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
        {
            title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: chartData, xName: 'x', yName: 'y', type: 'Line', width: 3,
                marker: { visible: true, isFilled: true, border: { width: 2, color: 'White' }, width: 13, height: 13 }
            }
        ],
        width: Browser.isDevice ? '100%' : '70%',
        title: 'User supplied data',
        tooltip: { enable: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
        chartMouseClick: (args: IMouseEventArgs) => {
            let isRemoved: boolean = false;
            if (args.axisData) {
                for (let i: number = 0; i < (chart.series[0] as Series).points.length; i++) {
                    let markerWidth: number = (chart.series[0] as Series).marker.width / 2;
                    let roundedX: number = Math.round(args.axisData['primaryXAxis']) + markerWidth;
                    let roundedY: number = Math.round(args.axisData['primaryYAxis']) + markerWidth;
                    let pointX: number = Math.round((chart.series[0] as Series).points[i].x as number) + markerWidth;
                    let pointY: number = Math.round((chart.series[0] as Series).points[i].y as number) + markerWidth;
                    if ((roundedX === pointX || roundedX + 1 === pointX || roundedX - 1 === pointX) &&
                        (roundedY === pointY || roundedY + 1 === pointY || roundedY - 1 === pointY)) {
                        if ((chart.series[0] as Series).points.length > 1) {
                            const points = (chart.series[0] as Series).points;
                            const duration: number = i === 0 || i === points[points.length - 1].index ? 500 : 0;
                            chart.series[0].removePoint(i, duration);
                        }
                        isRemoved = true;
                    }
                }
                if (!isRemoved) {
                    chart.series[0].addPoint({x: Math.round(args.axisData['primaryXAxis']), y: Math.round(args.axisData['primaryYAxis'])});
                }
            }
        },
        axisRangeCalculated: (args: IAxisRangeCalculatedEventArgs)  => {
            if (args.axis.name === 'primaryXAxis') {
                if (args.interval < 10) {
                    args.maximum = args.maximum + 10;
                    args.minimum = args.minimum - 10;
                    args.interval = 10;
                }
            }
            if (args.axis.name === 'primaryYAxis') {
                if (args.maximum <= 60) {
                    args.interval = 10;
                }
            }
        }
    });
    chart.appendTo('#AddPoint');
};
