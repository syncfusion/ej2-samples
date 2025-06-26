import { loadCultureFiles } from '../common/culture-loader';
import {
    PieSeries, AccumulationChart, AccumulationDataLabel, AccumulationTooltip, EmptyPointMode, IAccLoadedEventArgs,
    AccumulationTheme
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2/base';
import { loadAccumulationChartTheme } from './theme-color';
AccumulationChart.Inject(PieSeries, AccumulationDataLabel, AccumulationTooltip);

/**
 * Sample for Empty Points in Pie chart
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: AccumulationChart = new AccumulationChart({

        //Initializing Series
        series: [
            {
                type: 'Pie', xName: 'x', yName: 'y', radius: '80%', borderRadius: 3, border: { width: 1, color: 'white' },
                dataSource: [
                    { x: 'Action', y: 35,}, { x: 'Drama', y: 25 }, { x: 'Comedy', y: null },
                    { x: 'Romance', y: 20 }, { x: 'Horror', y: 10 }, { x: 'Sci-Fi', y: null }
                ],
                dataLabel: {
                    visible: true, position: 'Inside', enableRotation: true, font: {
                        fontWeight: '600',  size: Browser.isDevice ? '8px' : '12px', 
                    }
                },
                emptyPointSettings: {
                    fill: '#e6e6e6',
                }
            },
        ],
        //Initializing title
        title: 'Movie Genre Revenue Share',
        legendSettings: { visible: false },
        tooltip: { enable: true, format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>' , header:"", enableHighlight: true},
        enableBorderOnMouseMove:false,
        //Initializing User Interaction Tooltip
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = loadAccumulationChartTheme(args);
            if(selectedTheme === 'bootstrap5-dark'){
                args.chart.series[0].emptyPointSettings.fill = '#FF7F7F';
            }
        },
        textRender(args: { text: string; point: { x: string; y: string; }; })
        {
            args.text = args.point.x + ": $" + args.point.y + "K";
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].emptyPointSettings.mode = <EmptyPointMode>mode.value;
            chart.series[0].animation.enable = false;
            chart.refresh();
        }
    });
    mode.appendTo('#emptypointmode');
};