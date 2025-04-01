import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, DataLabel,
    Category, Legend, Tooltip, IAxisLabelRenderEventArgs, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, DataLabel);

/**
 * Sample for Remote Data bind in chart
 */
let dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/orders'
});
import { loadChartTheme, pointRender } from './theme-color';
let query: Query = new Query().take(5);
let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.name === 'primaryYAxis') {
        args.text =  ''+args.value * 1000;
        }
};

let loaded: number = 1;
let loadedChart: EmitType<Object> = (args: ILoadedEventArgs): void => {
    let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
    div.style.display = 'none';
    if (loaded) {
        loaded = 0;
        args.chart.refresh();
    }    
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            rangePadding: 'Additional',
            labelRotation: Browser.isDevice ? -45 : 0,
            labelIntersectAction: Browser.isDevice ? 'None':'Trim',
            valueType: 'Category',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
            {
                majorGridLines: { width: 1 },
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
                title: 'Freight rate in U.S dollars',
                labelFormat:'{value}00'
            },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: dataManager,
                xName: 'CustomerID', yName: 'Freight', query: query,
                name: 'Story Point',
                animation: { enable: false },
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        format: '{value}K',
                        font: {
                            fontWeight: '600', color: '#ffffff'
                        }
                    }
                }
            }
        ],
        pointRender: pointRender,
        tooltipRender: (args) => {
            args.text = args.data.pointX + ': ' + '<b>$' +args.data.pointY * 1000;
        },
        axisLabelRender: labelRender,
        loaded: loadedChart,
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs): void => {
            let div: HTMLElement = document.getElementById('waitingpopup');
            div.style.display = 'block';
            let width: number = args.chart.element.offsetWidth;
            let height: number = args.chart.element.offsetHeight;
            div.style.top = (height ? height : 300 / 2 - 25) + 'px';
            div.style.left = (width / 2 - 25) + 'px';
            div.style.display = '';
            loadChartTheme(args);
        },
        //Initializing Chart title
        title: "Container freight rate", legendSettings: { visible: false },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
            header: '<b>Freight rate</b>'
        }

    });
    chart.appendTo('#container');
};
