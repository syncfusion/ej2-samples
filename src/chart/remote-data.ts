import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, IPointRenderEventArgs, DataLabel,
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
    url: 'https://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
});
import { fabricColors, materialColors, bootstrapColors, highContrastColors } from './theme-color';
let query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.orientation === 'Horizontal') {
        args.text = args.text.split(' ')[0];
    }
};
let loaded: number = 1;
let loadedChart: EmitType<Object> = (args: ILoadedEventArgs): void => {
    let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
    div.style.display = 'none';
    if (loaded) {
        args.chart.refresh();
    }
    loaded = 0;
};
let pointRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            rangePadding: 'Additional',
            valueType: 'Category',
            title: 'Assignee',
            majorGridLines: { width: 0 },
        },

        //Initializing Primary Y Axis
        primaryYAxis:
            {
                majorGridLines: { width: 0 },
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
                labelStyle: {
                    color: 'transparent'
                }
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
                xName: 'Assignee', yName: 'Estimate', query: query,
                name: 'Story Point',
                animation: { enable: false },
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        font: {
                            fontWeight: '600', color: '#ffffff'
                        }
                    }
                }
            }
        ],
        pointRender: pointRender,
        axisLabelRender: labelRender,
        loaded: loadedChart,
        width: Browser.isDevice ? '100%' : '60%',
        load: (args: ILoadedEventArgs): void => {
            let div: HTMLElement = document.getElementById('waitingpopup');
            div.style.display = 'block';
            let width: number = args.chart.element.offsetWidth;
            let height: number = args.chart.element.offsetHeight;
            div.style.top = (height ? height : 300 / 2 - 25) + 'px';
            div.style.left = (width / 2 - 25) + 'px';
            div.style.display = '';
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        },
        //Initializing Chart title
        title: 'Sprint Task Analysis', legendSettings: { visible: false },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true
        }

    });
    chart.appendTo('#container');
};