import {
    ChartTheme, Chart, getSaturationColor, Category, ILoadedEventArgs,
    IPointRenderEventArgs, BoxAndWhiskerSeries, Tooltip, getElement, BoxPlotMode
} from '@syncfusion/ej2-charts';
Chart.Inject(Category, BoxAndWhiskerSeries, Tooltip);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Sample for Box and Whisker series
 */
this.default = (): void => {
    let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
        '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
    let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
        args.border.color = getSaturationColor(args.fill, -0.6);
    };
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            edgeLabelPlacement: 'Shift',
            labelIntersectAction: 'Trim'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        primaryYAxis:
        {
            minimum: 10, maximum: 60,
            interval: 10, title: 'Age',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        pointRender: labelRender,
        //Initializing Chart Series
        series: [
            {
                type: 'BoxAndWhisker',
                dataSource: [
                    { x: 'Development', y: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                    { x: 'Testing', y: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                    { x: 'HR', y: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
                    { x: 'Finance', y: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                    { x: 'R&D', y: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                    { x: 'Sales', y: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                    { x: 'Inventory', y: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                    { x: 'Graphics', y: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                    { x: 'Training', y: [28, 29, 30, 31, 32, 34, 35, 36] }
                ],
                xName: 'x',
                yName: 'y',
                marker: {
                    visible: true,
                    width: 10,
                    height: 10
                },
                name: 'Department'
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true
        },
        //Initializing Chart title
        title: 'Employee Age Group in Various Department',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');

    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].boxPlotMode = <BoxPlotMode>mode.value;
            chart.series[0].animation.enable = false;
            chart.refresh();
        }
    });
    mode.appendTo('#mode');
    document.getElementById('mean').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>getElement('mean');
        chart.series[0].showMean = element.checked;
        chart.series[0].animation.enable = false;
        chart.refresh();
    };
};