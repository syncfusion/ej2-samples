import {
    Chart, BarSeries, DataLabel, Category,
    Tooltip, IPointRenderEventArgs
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors } from './theme-color';
Chart.Inject(BarSeries, Category, Tooltip, DataLabel);

/**
 * Sample for Category Axis
 */
let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
this.default = (): void => {
    let chart: Chart = new Chart({
        //Initializing Primary X and YAxis
        primaryXAxis: {
            title: 'Country',
            valueType: 'Category',
            majorGridLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            minimum: 0,
            maximum: 800,
            labelFormat: Browser.isDevice ? '{value}' : '{value}M',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        },
        width: Browser.isDevice ? '100%' : '60%',
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { x: 'GER', y: 72 },
                    { x: 'RUS', y: 103.1 },
                    { x: 'BRZ', y: 139.1 },
                    { x: 'IND', y: 462.1 },
                    { x: 'CHN', y: 721.4 },
                    { x: 'USA', y: 286.9 },
                    { x: 'GBR', y: 115.1 },
                    { x: 'NGR', y: 97.2 },
                ],
                xName: 'x', width: 2,
                yName: 'y', marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top', font: {
                            fontWeight: '600',
                            color: '#ffffff'
                        }
                    }
                },
                name: 'Users'
            }
        ],
        pointRender: labelRender,
        //Initializing Chart title
        title: Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016',
        tooltip: { enable: true },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};