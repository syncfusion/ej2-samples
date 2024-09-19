import { loadCultureFiles } from '../common/culture-loader';

import {
    Chart, SplineRangeAreaSeries, DateTime, ILoadedEventArgs,  Zoom,
    ChartTheme, Legend, DataLabel, Tooltip, Selection, Highlight
} from '@syncfusion/ej2-charts';
Chart.Inject(SplineRangeAreaSeries, DateTime, Zoom, Legend, DataLabel, Tooltip, Selection, Highlight);
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
            majorGridLines: { width: 0 },
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
                type: 'SplineRangeArea',
                dataSource: chartDataValues,
                xName: 'x', high: 'high', low: 'low', opacity: 0.7, border: { width: 2 }
            },
        ],
        width: Browser.isDevice ? '100%' : '75%',
        tooltip: {
            enable: true, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>',
            shared: false
        },
        legendSettings:{enableHighlight:true},
        //Initializing Chart Title
        title: 'Temperature Variation by Month',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });
    chart.appendTo('#container');
};
