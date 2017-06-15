import { Chart, ColumnSeries, Category, Legend, Tooltip, IAxisLabelRenderEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip);

/**
 * Remote Data Sample
 */
let dataManager: DataManager = new DataManager({
    url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
});
let query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.orientation === 'Horizontal') {
        args.text = args.text.split(' ')[0];
    }
};
let loadedChart: EmitType<Object> = (args: Chart): void => {
    let div: HTMLElement = document.getElementById('waitingpopup') as HTMLElement;
    div.style.display = 'none';
};
this.default = (): void => {
    let chart: Chart = new Chart({

        // Initializing Chart Area
        chartArea:
        {
            border: { width: 1 }
        },

        //Initializing Primary X Axis
        primaryXAxis: {
            rangePadding: 'Additional',
            valueType: 'Category',
            title: 'Assignee'
        },

        //Initializing Primary Y Axis	
        primaryYAxis:
        {
            title: 'Estimate',
            minimum: 0,
            maximum: 3,
            interval: 1
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: dataManager,
                xName: 'Assignee', yName: 'Estimate', query: query,
                name: 'Inprogress'
            }
        ],
        axisLabelRender: labelRender,
        loaded: loadedChart,
        load: (args: ILoadedEventArgs): void => {
            let div: HTMLElement = document.getElementById('waitingpopup');
            div.style.display = 'block';
            let width: number = args.chart.element.offsetWidth;
            let height: number = args.chart.element.offsetHeight;
            div.style.top = (height ? height : 300 / 2 - 25) + 'px';
            div.style.left = (width / 2 - 25) + 'px';
            div.style.display = '';
        },
        //Initializing Chart title
        title: 'Sprint Task Analysis', legendSettings: { visible: false },
        tooltip: { enable: true, format: 'Name: ${point.x} <br>Story Point: ${point.y}' }
    });
    chart.appendTo('#container');
};