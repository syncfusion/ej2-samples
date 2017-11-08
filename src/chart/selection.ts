import { Chart, Selection, SelectionMode, ColumnSeries, ChartTheme } from '@syncfusion/ej2-charts';
import { Legend, Category, ScatterSeries, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(Selection, Legend, ColumnSeries, Category, ScatterSeries);
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Sample for Selection.
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
            title: 'Distribution',
            labelFormat: '{value}%',
            interval: 20
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column',
                dataSource: [
                    { x: 'CHN', y: 17 }, { x: 'USA', y: 19 },
                    { x: 'IDN', y: 29 }, { x: 'JAP', y: 13 },
                    { x: 'BRZ', y: 24 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Age 0-14',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'CHN', y: 54 }, { x: 'USA', y: 67 },
                    { x: 'IDN', y: 65 }, { x: 'JAP', y: 61 },
                    { x: 'BRZ', y: 68 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Age 15-64',
            },
            {
                type: 'Column',
                dataSource: [
                    { x: 'CHN', y: 9 }, { x: 'USA', y: 14 },
                    { x: 'IDN', y: 6 }, { x: 'JAP', y: 26 },
                    { x: 'BRZ', y: 8 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Age 65 & Above',
            }
        ],
        //Initializing Chart title
        title: 'Age Distribution by Country', legendSettings: { visible: true, toggleVisibility: false },
        //Initializing Selection Mode
        selectionMode: 'Point',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.selectionMode = <SelectionMode>mode.value;
            chart.dataBind();
        }
    });
    mode.appendTo('#selmode');
    document.getElementById('select').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
        chart.isMultiSelect = element.checked;
        chart.dataBind();
    };

};