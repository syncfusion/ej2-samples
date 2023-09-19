import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './legend-sample-data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Hourly Weather Forecast (in Celsius)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        xAxis: {
            labels: ['London', 'Berlin', 'Madrid', 'Paris', 'Rome', 'Lisbon', 'Dublin'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM',
                '2PM', '4PM', '6PM', '8PM', '10PM'],
                textStyle: {
                    fontFamily: 'inherit'
                }
        },
        cellSettings: {
            showLabel: false,
            format: '{value} C'
        },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        dataSource: (data as any).legendSampleData,
        paletteSettings: {
            palette: [{ value: 0, color: '#6EB5D0' },
            { value: 10, color: '#7EDCA2' },
            { value: 19, color: '#DCD57E' },
            { value: 22, color: '#DCD57E' }
            ]
        },
        legendSettings: {
            position: 'Bottom',
            labelFormat: '{value}\xB0 C',
            title: {
              text: 'Celsius',
              textStyle: {
                fontFamily: 'inherit'
            }
            },
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + '\xB0 C'];
        },
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
            // custom code end
        }
    });
    heatmap.appendTo('#container');

    let legentListObj: DropDownList = new DropDownList({
        index: 3,
        popupHeight: '200px',
        change: () => { valueXChange(); }
    });
    legentListObj.appendTo('#LegendPosition');

    function valueXChange(): void {
        heatmap.legendSettings.position = legentListObj.value.toString() === 'Right' ?
            'Right' : legentListObj.value.toString() === 'Bottom' ?
                'Bottom' : legentListObj.value.toString() === 'Left' ?
                    'Left' : legentListObj.value.toString() === 'Top' ? 'Top' : null;
    }
};