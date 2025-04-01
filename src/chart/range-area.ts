import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, RangeAreaSeries, ILoadedEventArgs, DateTime,
    ChartTheme, ISeriesRenderEventArgs, DataLabel, LineSeries, Tooltip
} from '@syncfusion/ej2-charts';
Chart.Inject(RangeAreaSeries, DateTime, DataLabel, LineSeries, Tooltip);
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';
import { loadChartTheme } from './theme-color';

/**
 * Sample for RangeArea series
 */
(window as any).default = (): void => {
    loadCultureFiles();


    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime', labelFormat: 'dd MMM', 
            majorGridLines: { width: 0 },edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            labelFormat: '{value}˚C',minimum: -10,maximum: 25,interval: 5,lineStyle: { width: 0 }, majorTickLines: { width: 0 }
        },
      
        //Initializing Chart Series
        series: [
            {
                type: 'RangeArea',
                dataSource: chartDataValues,
                xName: 'x', high: 'high', low: 'low', opacity: 0.4,
                border: {
                    width: 2
                },
                marker:{
                    visible: false,
                    height: 7,
                    width: 7,
                    opacity: 1,
                    dataLabel: { visible: false, position: 'Outer' },
                  }
            },
           
        ],
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart Title
        title: 'Temperature Variation by Month',
        tooltip: { enableMarker:true, enable: true, showNearestTooltip: true, format: 'Temperature : <b>${point.low} - ${point.high}</b>',  header :'<b>${point.x}</b>'},
        seriesRender: (args: ISeriesRenderEventArgs) => {
            let areathemes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
            let borderColor: string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
            args.series.border.color = borderColor[areathemes.indexOf(args.series.chart.theme.toLowerCase())];
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};
