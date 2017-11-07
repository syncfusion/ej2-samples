import {
    Chart, ColumnSeries, Category, DataLabel,
    Tooltip, IPointRenderEventArgs, ITooltipRenderEventArgs
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors } from './theme-color';
Chart.Inject(ColumnSeries, DataLabel, Category, Tooltip);
import { EmitType } from '@syncfusion/ej2-base';

/**
 * Rounded Column Series
 */
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
};
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
        },
        chartArea: { border: { width: 0 } },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0, maximum: 300, interval: 50, majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y',
                dataSource: [
                    { x: 'BGD', y: 106, text: 'Bangaladesh' },
                    { x: 'BTN', y: 103, text: 'Bhutn' },
                    { x: 'NPL', y: 198, text: 'Nepal' },
                    { x: 'THA', y: 189, text: 'Thiland' },
                    { x: 'MYS', y: 250, text: 'Malaysia' }
                ], name: 'Tiger',
                cornerRadius: {
                    bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10
                },
                marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
            }
        ],
        legendSettings: { visible: false },
        //Initializing Chart title
        title: 'Tiger Population - 2016', tooltip: { enable: true },
        pointRender: labelRender,
        width: Browser.isDevice ? '100%' : '60%',
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            let tooltip: string = args.textCollections;
            if (tooltip.indexOf('BGD') > -1) {
                tooltip = tooltip.replace('BGD', 'Bangladesh');
            } else if (tooltip.indexOf('BTN') > -1) {
                tooltip = tooltip.replace('BTN', 'Bhutan');
            } else if (tooltip.indexOf('NPL') > -1) {
                tooltip = tooltip.replace('NPL', 'Nepal');
            } else if (tooltip.indexOf('THA') > -1) {
                tooltip = tooltip.replace('THA', 'Thailand');
            } else {
                tooltip = tooltip.replace('MYS', 'Malaysia');
            }
            args.textCollections = tooltip;
        }
    });
    chart.appendTo('#container');
};