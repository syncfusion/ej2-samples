import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ILoadedEventArgs, DateTime,
    ChartTheme, ISeriesRenderEventArgs, DataLabel, LineSeries, Tooltip, RangeStepAreaSeries
} from '@syncfusion/ej2-charts';
Chart.Inject(RangeStepAreaSeries, DateTime, DataLabel, LineSeries, Tooltip);
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';

/**
 * Sample for RangeArea series
 */
(window as any).default = (): void => {
    loadCultureFiles();


    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
            labelFormat: 'dd MMM',
            edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide',
            majorGridLines: { width: 0 }
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
            minimum: -10,
            maximum: 25,
            interval: 5,
            majorTickLines: { width: 0 }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'RangeStepArea',
                dataSource: chartDataValues,
                xName: 'x', high: 'high', low: 'low', opacity: 0.5, width: 2,
                border: {
                    width: 2
                },
                marker: {
                    visible: false,

                }
            },

        ],
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart Title
        title: 'Temperature Variation by Month',
        tooltip: {
            enable: true,
            format: 'Temperature : <b>${point.low} - ${point.high}</b>',
            shared: false,
            header: '<b>${point.x}</b>'
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
            switch (selectedTheme) {
                case 'bootstrap5':
                    {
                        chart.series[0].fill = '#BDD9F5';
                        chart.series[0].border.color = '#539DE3';
                    }
                    break;
                case 'fluent':
                    {
                        chart.series[0].fill = '#C3A6DB';
                        chart.series[0].border.color = '#9E71C2';
                    }
                    break;
            }
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};
