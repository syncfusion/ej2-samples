import { loadCultureFiles } from '../common/culture-loader';
import {
    PieSeries, AccumulationChart, AccumulationDataLabel, AccumulationTooltip, EmptyPointMode, IAccLoadedEventArgs,
    AccumulationTheme
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
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
                type: 'Pie', xName: 'x', yName: 'y', 
                dataSource: [
                    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
                    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
                    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
                    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
                ],
                dataLabel: {
                    visible: true, position: 'Inside', enableRotation: true, font: {
                        fontWeight: '600',
                    }
                },
                emptyPointSettings: {
                    fill: '#e6e6e6',
                }
            },
        ],
        //Initializing title
        title: 'Annual Product-Wise Profit Analysis',
        legendSettings: { visible: false },
        tooltip: { enable: true, format: '<b>${point.x}</b><br> Profit: <b>$${point.y}K</b>' , header:""},
        enableBorderOnMouseMove:false,
        //Initializing User Interaction Tooltip
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
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