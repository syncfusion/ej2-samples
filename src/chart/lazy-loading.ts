import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, ScrollBar, Zoom, IScrollEventArgs, LineSeries, Tooltip } from '@syncfusion/ej2-charts';
import { Chart, DateTime, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { Internationalization, DateFormatOptions } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DatePicker, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { NumericTextBox, ChangeEventArgs as NumericChange } from '@syncfusion/ej2-inputs';
Chart.Inject(DateTime, ScrollBar, Zoom, LineSeries, Tooltip);

/**
 * Sample for Lazy Loading
 */
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let intl: Internationalization = new Internationalization();
    let chart: Chart = new Chart({
        primaryXAxis: {
            title: 'Day',
            valueType: 'DateTime',
            edgeLabelPlacement: 'Shift',
            skeleton: 'yMMM',
            skeletonType: 'Date',
            scrollbarSettings: {
                range: {
                    minimum: new Date(2009, 0, 1),
                    maximum: new Date(2014, 0, 1)
                },
                enable: true,
                pointsLength: 1000
            }
        },
        primaryYAxis: {
            title: 'Server Load',
            labelFormat: '{value}MB'
        },
        series: [{
            dataSource: GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1)),
            xName: 'x', yName: 'y',
            type: 'Line', animation: { enable: false },
        }],
        height: '450',
        title: 'Network Load',
        tooltip: { enable: true, shared: true , header : '<b>${point.x}</b>', format : 'Server load : <b>${point.y}</b>'},
        legendSettings: { visible: true },
        scrollEnd: (args: IScrollEventArgs) => {
            if (lazymode.value === 'Range') {
                chart.series[0].dataSource = GetDateTimeData(args.currentRange.minimum as Date, args.currentRange.maximum as Date);
            } else {
                chart.series[0].dataSource = GetNumericData(args.currentRange.minimum as number, args.currentRange.maximum as number);
            }
            chart.dataBind();
        },
        width: '100%',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    chart.appendTo('#container');
    function GetDateTimeData(start: Date, end: Date): {x: Date, y: number}[] {
        let series1: {x: Date, y: number}[] = [];
        let date: number;
        let value: number = 30;
        let option: DateFormatOptions = {
            skeleton: 'full',
            type: 'dateTime'
        };

        let dateParser: Function = intl.getDateParser(option);
        let dateFormatter: Function = intl.getDateFormat(option);
        for (let i: number = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            let point1: {x: Date, y: number} = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    }

    function GetNumericData(start: number, end: number): {x: number, y: number}[] {
        let series1: {x: number, y: number}[] = [];
        let value: number = 30;
        for (let i: number = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            let point: {x: number, y: number} = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let lazymode: DropDownList = new DropDownList({
        index: 0,
         width: 120,
         change: (arg: ChangeEventArgs) => {
            let min: number | Date;
            let max: number | Date;
            if (arg.value === 'Range') {
                chart.primaryXAxis.valueType = 'DateTime';
                min = chart.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
                max = chart.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
                chart.series[0].dataSource = GetDateTimeData(min, max);
                chart.refresh();
                minDate.enabled = true;
                maxDate.enabled = true;
                pointslength.enabled = false;
            } else {
                chart.primaryXAxis.valueType = 'Double';
                chart.primaryXAxis.scrollbarSettings.range.minimum = null;
                chart.primaryXAxis.scrollbarSettings.range.maximum = null;
                chart.primaryXAxis.scrollbarSettings.pointsLength = 1000;
                chart.series[0].dataSource = GetNumericData(1, 200);
                chart.refresh();
                minDate.enabled = false;
                maxDate.enabled = false;
                pointslength.enabled = true;
            }
         }
    });
    lazymode.appendTo('#lazymode');
    let minDate: DatePicker = new DatePicker({
        value: new Date(2009, 0, 1),
        width: 120,
        change: (args: ChangedEventArgs) => {
            chart.primaryXAxis.scrollbarSettings.range.minimum = args.value;
            chart.refresh();
        }
    });
    minDate.appendTo('#datepickermin');
    let maxDate: DatePicker = new DatePicker({
        value: new Date(2014, 0, 1),
        width: 120,
        change: (args: ChangedEventArgs) => {
            chart.primaryXAxis.scrollbarSettings.range.maximum = args.value;
            chart.refresh();
        }
    });
    maxDate.appendTo('#datepickermax');
    let pointslength: NumericTextBox = new NumericTextBox({
        min: 1000,
        max: 10000,
        value: 1000,
        step: 100,
        enabled: false,
        format: 'n',
        width: 120,
        change: (args: NumericChange) => {
            chart.primaryXAxis.scrollbarSettings.pointsLength = args.value;
            chart.refresh();
        }
    });
    pointslength.appendTo('#pointslength');
};