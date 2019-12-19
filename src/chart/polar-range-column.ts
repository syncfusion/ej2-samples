import { loadCultureFiles } from '../common/culture-loader';
import { Chart, PolarSeries, Category, ILoadedEventArgs, RadarSeries, ChartDrawType  } from '@syncfusion/ej2-charts';
import { RangeColumnSeries, DataLabel, ITextRenderEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(PolarSeries, Category, RadarSeries, RangeColumnSeries, DataLabel);
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Polar Series with DrawType RangeColumn
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let chart: Chart = new Chart({


        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Months', interval: 1,
            labelPlacement: 'OnTicks',
            startAngle: 90,
            coefficient: Browser.isDevice ? 80 : 100
        },

        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}˚C',
            minimum: 0, maximum: 15, interval: 5
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Polar', drawType: 'RangeColumn', name: 'Germany', xName: 'x', high: 'high', low: 'low',
                dataSource: [
                    { x: 'Jan', low: 2, high: 7 }, { x: 'Feb', low: 3, high: 7 },
                    { x: 'Mar', low: 3, high: 7 }, { x: 'Apr', low: 4, high: 9 },
                    { x: 'May', low: 6, high: 11 }, { x: 'June', low: 8, high: 14 }
                ],
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Top',
                        font: { color: '#ffffff', fontWeight: '600'},
                        enableRotation: true
                    }
                },
                border: { width: 3, color: 'white' },
            },
        ],
        textRender: (args: ITextRenderEventArgs) => {
            args.text = args.text.replace('˚C', '');
        },
        legendSettings: { visible: false },
        //Initializing Chart Title
        title: 'Maximum and Minimum Temperature',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
        }
    });
    chart.appendTo('#container');
    let polarType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartDrawType>polarType.value;
            chart.series[0].animation.enable = true;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
};
