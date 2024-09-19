import { HeatMap, Legend, Tooltip, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { Internationalization } from '@syncfusion/ej2-base';
import * as data from './calendar-data-source.json';
HeatMap.Inject(Tooltip, Legend);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Annual Summary of User Activities in GitLab',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        height: '300px',
        xAxis: {
            opposedPosition: true,
            valueType: 'DateTime',
            minimum: new Date(2017, 6, 23),
            maximum: new Date(2018, 6, 30),
            intervalType: 'Days',
            showLabelOn: 'Months',
            labelFormat: 'MMM',
            increment: 7,
            labelIntersectAction: 'Rotate45',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            isInversed: true,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        cellSettings: {
            showLabel: false,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        paletteSettings: {
            palette: [
                { value: 0, color: 'rgb(238,238,238)', label: 'no contributions' },
                { value: 1, color: 'rgb(172, 213, 242)', label: '1-15 contributions' },
                { value: 16, color: 'rgb(127, 168, 201)', label: '16-31 contributions' },
                { value: 32, color: 'rgb(82, 123, 160)', label: '31-49 contributions' },
                { value: 50, color: 'rgb(37, 78, 119)', label: '50+ contributions' },
            ],
            type: 'Fixed',
            emptyPointColor: 'white'
        },
        legendSettings: {
            position: 'Bottom',
            width: '20%',
            alignment: 'Near',
            showLabel: true,
            labelDisplayType: 'None',
            enableSmartLegend: true,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            let intl: Internationalization = new Internationalization();
            let format: Function = intl.getDateFormat({ format: 'EEE MMM dd, yyyy' });
            let newDate : Date = <Date>args.xValue;
            let date: Date = new Date(newDate.getTime());
            let axisLabel: string[] = args.heatmap.axisCollections[1].axisLabels;
            let index: number = axisLabel.indexOf(args.yLabel);
            (date).setDate((date).getDate() + index);
            let value: string = format(date);
            args.content = [(args.value === 0 ? 'No' : args.value) + ' ' + 'contributions' + '<br>' + value];
        },
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            args.heatmap.cellSettings.border.color = selectedTheme.indexOf('dark') > -1 || selectedTheme.indexOf('highcontrast') > -1 ? '#000' : '#fff';
            // custom code end
        },
        dataSource: (data as any).calendarDataSource,
    });
    heatmap.appendTo('#container');
};