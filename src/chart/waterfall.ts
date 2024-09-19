import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, WaterfallSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic,
    Crosshair, Legend, DataLabel, IAxisLabelRenderEventArgs, ITextRenderEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(WaterfallSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, Legend, DataLabel);

/**
 * Sample for Waterfall series
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chartData: object[] = [
        { x: 'Income', y: 971  }, { x: 'Sales', y: -101  },
        { x: 'Development', y: -268  },
        { x: 'Revenue', y: 403  }, { x: 'Balance' },
        { x: 'Expense', y: -136  }, { x: 'Tax', y: -365  },
        { x: 'Net Profit' }
    ];
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            labelRotation: Browser.isDevice ? -90 : 0,
            interval: 1,
            labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            minimum: 0, maximum: 1250, interval: 250,
            majorGridLines: { width: 1 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            title: 'USD',
            labelFormat: "{value}K"
        },
        //Initializing Chart Series
        series: [{
            dataSource: chartData, width: 2, negativeFillColor: '#e56590',name: 'USA',
            xName: 'x', yName: 'y', intermediateSumIndexes: [4], sumIndexes: [7],
            border:{color:'black' , width: 0.2},columnWidth: 0.5,cornerRadius:{ topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 },
            type: 'Waterfall', animation: { enable: true },
            marker: {
                dataLabel: { visible: true }
            },  connector: { width: 0.8, color: '#5F6A6A', dashArray: '1,2', }
        }],
        chartArea: { border: { width: 0 } },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true, header:'', format: "<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>"
        },
        //Initializing Chart Title
        title: 'Company Revenue and Profit',
        legendSettings: { visible: false },
        width: Browser.isDevice ? '100%' : '75%',
        textRender: (args: ITextRenderEventArgs) => {
            args.series.marker.dataLabel.font.size = Browser.isDevice ? '8px' : '12px';
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }

    });
    chart.appendTo('#container');
};
