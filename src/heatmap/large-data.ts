import { HeatMap, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, ITooltipEventArgs } from '@syncfusion/ej2-heatmap';
import { Internationalization } from '@syncfusion/ej2-base';
import { SampleDataSource } from './data';
HeatMap.Inject(Tooltip, Legend);

/**
 * Sample for Large data
 */
this.default = (): void => {
    let newDataSource: SampleDataSource = new SampleDataSource();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Annual Flight Traffic Report',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            minimum: new Date(2017, 0, 1),
            maximum: new Date(2017, 11, 31),
            intervalType: 'Days',
            valueType: 'DateTime',
            labelFormat: 'MMM',
            showLabelOn: 'Months'
        },
        yAxis: {
            labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
                '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
                '22:00', '23:00', '24:00']
        },
        renderingMode: 'Canvas',
        dataSource: newDataSource.largeData,
        paletteSettings: {
            palette: [
                { value: 150, color: '#A6DC7E' },
                { value: 250, color: '#DCD57E' },
                { value: 300, color: '#DC8D7E' },
            ],
            type: 'Gradient'
        },
        legendSettings: {
            visible: false
        },
        cellSettings: {
            border: {
                width: 0
            },
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            let intl: Internationalization = new Internationalization();
            let format: Function = intl.getDateFormat({ format: 'MMM dd, yyyy' });
            let value: string = format(args.xValue);
            args.content = [value + ' ' + args.yLabel + ' : ' + args.value + ' flight arrivals'];
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');
};