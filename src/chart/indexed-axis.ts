import {
    Chart, ColumnSeries, LineSeries, Category,
    Legend, Crosshair, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, LineSeries, Category, Legend, Crosshair, Tooltip);

/**
 * Sample for Indexed Category Axis
 */
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            interval: 1,
            edgeLabelPlacement: 'Shift',
            crosshairTooltip: { enable: true },
            isIndexed: true
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0, interval: 2, maximum: 8,
            title: 'GDP Growth Rate',
            labelFormat: '{value}%'
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
                dataSource: [
                    { x: 'Myanmar', y: 7.3 },
                    { x: 'India', y: 7.9 },
                    { x: 'Bangladesh', y: 6.8 },
                    { x: 'Cambodia', y: 7.0 },
                    { x: 'China', y: 6.9 }
                ],
                xName: 'x', width: 2, marker: { visible: true, height: 10, width: 10 },
                yName: 'y', name: '2015',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'Poland', y: 2.7 },
                    { x: 'Australia', y: 2.5 },
                    { x: 'Singapore', y: 2.0 },
                    { x: 'Canada', y: 1.4 },
                    { x: 'Germany', y: 1.8 }
                ],
                xName: 'x', width: 2, marker: { visible: true, height: 10, width: 10 },
                yName: 'y', name: '2016',
            },
        ],

        //Initializing Chart title
        title: 'Real GDP Growth',
        //Initializing User Interaction Tooltip and Crosshair
        tooltip: { enable: true, shared: true },
        crosshair: { enable: true, lineType: 'Vertical' },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
    document.getElementById('isIndexed').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('isIndexed'));
        chart.primaryXAxis.isIndexed = element.checked;
        if (chart.primaryXAxis.isIndexed) {
            chart.series[0].type = 'Column';
            chart.series[1].type = 'Column';
            chart.primaryXAxis.labelRotation = 0;
            chart.crosshair.line.width = 1;
        } else {
            chart.series[0].type = 'Line';
            chart.series[1].type = 'Line';
            chart.primaryXAxis.labelRotation = 90;
            chart.crosshair.line.width = 0;
        }
        chart.refresh();
    };
};