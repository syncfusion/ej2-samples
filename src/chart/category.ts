import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, BarSeries, DataLabel, Category,
    Tooltip, IPointRenderEventArgs, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { fabricColors, materialColors, bootstrapColors, highContrastColors, fluentColors, fluentDarkColors, fluent2Colors, fluent2HighContrastColors } from './theme-color';
Chart.Inject(BarSeries, Category, Tooltip, DataLabel);

/**
 * Sample for Category Axis
 */
let labelRender: EmitType<IPointRenderEventArgs> = (args: IPointRenderEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
        args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
        args.fill = highContrastColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent') {
        args.fill = fluentColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent-dark') {
        args.fill = fluentDarkColors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2') {
        args.fill = fluent2Colors[args.point.index % 10];
    } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
        args.fill = fluent2HighContrastColors[args.point.index % 10];
    } else {
        args.fill = bootstrapColors[args.point.index % 10];
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and YAxis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            enableTrim: false, majorTickLines: {width : 0},
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
        width: Browser.isDevice ? '100%' : '75%',
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar', tooltipMappingName: 'country',
                dataSource: [
                    { x: "Germany", y: 72, country: "GER: 72" },
                    { x: "Russia", y: 103.1, country: "RUS: 103.1" },
                    { x: "Brazil", y: 139.1, country: "BRZ: 139.1" },
                    { x: "India", y: 462.1, country: "IND: 462.1" },
                    { x: "China", y: 721.4, country: "CHN: 721.4" },
                    { x: "United States<br>Of America", y: 286.9, country: "USA: 286.9" },
                    { x: "Great Britain", y: 115.1, country: "GBR: 115.1" },
                    { x: "Nigeria", y: 97.2, country: "NGR: 97.2" }
                ],
                xName: 'x', width: 2,
                yName: 'y', marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top', font: {
                            fontWeight: '600',
                            color: '#ffffff',
                            size: "11px"
                        }
                    }
                },
                name: 'Users'
            }
        ],
        pointRender: labelRender,
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        },
        //Initializing Chart title
        title: Browser.isDevice ? 'Internet Users in Million – 2016' : 'Internet Users – 2016',
        tooltip: { enable: false, format: '${point.tooltip}' },
        legendSettings: {
            visible: false
        }
    });
    chart.appendTo('#container');
};