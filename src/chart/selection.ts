import { Chart, Selection, SelectionMode, ColumnSeries } from '@syncfusion/ej2-charts';
import { Legend, Category, ScatterSeries, Marker, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(Selection, Legend, ColumnSeries, Category, ScatterSeries, Marker);

/**
 * Selection Sample
 */
this.default = (): void => {
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Countries',
            valueType: 'Category',
             interval: 1,
            labelIntersectAction : 'Rotate90'
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Percentage (%)',
            labelFormat: '{value}%',
            minimum: 0,
            maximum: 80

        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'CHN', y: 17 }, { x: 'USA', y: 19 },
                    { x: 'IDN', y: 29 }, { x: 'JAP', y: 13 },
                    { x: 'BRZ', y: 24 }, { x: 'RUS', y: 16 },
                    { x: 'GER', y: 13 }, { x: 'NGR', y: 44 },
                    { x: 'GBR', y: 18 }, { x: 'FRA', y: 19 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Age 0-14',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'CHN', y: 54 }, { x: 'USA', y: 67 },
                    { x: 'IDN', y: 65 }, { x: 'JAP', y: 61 },
                    { x: 'BRZ', y: 68 }, { x: 'RUS', y: 70 },
                    { x: 'GER', y: 66 }, { x: 'NGR', y: 53 },
                    { x: 'GBR', y: 65 }, { x: 'FRA', y: 63 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Age 15-64',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'CHN', y: 9 }, { x: 'USA', y: 14 },
                    { x: 'IDN', y: 6 }, { x: 'JAP', y: 26 },
                    { x: 'BRZ', y: 8 }, { x: 'RUS', y: 14 },
                    { x: 'GER', y: 21 }, { x: 'NGR', y: 3 },
                    { x: 'GBR', y: 17 }, { x: 'FRA', y: 18 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Age 65 & Above',
            }
        ],
        //Initializing Chart title
        title: 'Age Distribution by Country', legendSettings: { visible: true, toggleVisibility: false },
        selectionMode: 'Point',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            args.chart.theme = selectedTheme.indexOf('fabric') > -1 ? 'Fabric' : 'Material';
        }
    });
    chart.appendTo('#container');
    let previousType: SelectionMode = 'Point';
    document.getElementById('selmode').onchange = () => {
        let element: HTMLSelectElement = <HTMLSelectElement>(document.getElementById('selmode'));
        let selectionElement: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
        chart.selectionMode = <SelectionMode>element.value;
        selectionElement.disabled = (chart.selectionMode.indexOf('Drag') !== -1);
        if ((chart.selectionMode).indexOf('Drag') !== -1 && previousType.indexOf('Drag') === -1) {
            chart.series[0].type = 'Scatter'; chart.series[1].type = 'Scatter';
            chart.series[2].type = 'Scatter';
            chart.series[0].marker = { visible: true, height: 10, width: 10 };
            chart.series[1].marker = { visible: true, height: 10, width: 10 };
            chart.series[2].marker = { visible: true, height: 10, width: 10 };
            chart.refresh();
        } else if (previousType.indexOf('Drag') !== -1 && (chart.selectionMode).indexOf('Drag') === -1) {
            chart.series[0].type = 'Column'; chart.series[1].type = 'Column'; chart.series[2].type = 'Column';
            chart.refresh();
        } else if (previousType === 'None' || chart.selectionMode === 'None') {
            chart.refresh();
        } else {
            chart.dataBind();
        }
        previousType = <SelectionMode>element.value;
    };
    document.getElementById('select').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
        chart.isMultiSelect = element.checked;
        chart.dataBind();
    };

};