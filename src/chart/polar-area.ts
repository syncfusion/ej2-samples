import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, Tooltip, Legend, PolarSeries, RadarSeries, Category, AreaSeries, ChartDrawType, ILoadedEventArgs, ChartTheme, Highlight
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(Tooltip, Legend, PolarSeries, Category, AreaSeries, RadarSeries, Highlight);

/**
 * Sample for Polar Series with DrawType Area
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'OnTicks',
            interval: 1,
            coefficient: Browser.isDevice ? 80 : 100
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Revenue in Millions',
            labelFormat: '{value}M'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Polar', drawType: 'Area',
                dataSource: [{ x: '2000', y: 4 }, { x: '2001', y: 3.0 },
                { x: '2002', y: 3.8 }, { x: '2003', y: 3.4 },
                { x: '2004', y: 3.2 }, { x: '2005', y: 3.9 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Product A',
                border: { color: 'transparent' },
                opacity: 0.5,
            },
            {
                type: 'Polar', drawType: 'Area',
                dataSource: [{ x: '2000', y: 2.6 }, { x: '2001', y: 2.8 },
                { x: '2002', y: 2.6 }, { x: '2003', y: 3 },
                { x: '2004', y: 3.6 }, { x: '2005', y: 3 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Product B',
                opacity: 0.5,
                border: { color: 'transparent' },
            },
            {
                type: 'Polar', drawType: 'Area',
                dataSource: [{ x: '2000', y: 2.8 }, { x: '2001', y: 2.5 },
                { x: '2002', y: 2.8 }, { x: '2003', y: 3.2 },
                { x: '2004', y: 2.9 }, { x: '2005', y: 2 }],
                xName: 'x', width: 2,
                yName: 'y', name: 'Product C',
                opacity: 0.5,
                border: { color: 'transparent' },

            }
        ],
        //Initializing Chart title
        title: 'Average Sales Comparison',
        tooltip: { enable: true },
        legendSettings: { enableHighlight: true },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        }
    });
    chart.appendTo('#container');
    let polarType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartDrawType>polarType.value;
            chart.series[1].type = <ChartDrawType>polarType.value;
            chart.series[2].type = <ChartDrawType>polarType.value;
            chart.series[0].animation.enable = false;
            chart.series[1].animation.enable = false;
            chart.series[2].animation.enable = false;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
};