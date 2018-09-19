import { HeatMap, Legend, Tooltip, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { SampleDataSource } from './data';
HeatMap.Inject(Tooltip, Legend);

/**
 * Sample for Line serie
 */
this.default = (): void => {
    let newDataSource: SampleDataSource = new SampleDataSource();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Deffective Count per 1000 Products from a Manufacturing Unit',
            textStyle: {
                size: '15px',
                fontWeight: 500,
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['2007', '2008', '2009', '2010', '2011',
                '2012', '2013', '2014', '2015', '2016', '2017'],
        },
        yAxis: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

        }, cellSettings: {
            border: {
                width: '0',
                color: 'white'
            },
            showLabel: true
        },
        paletteSettings: {
            palette: [{ color: 'rgb(172, 213, 242)' },
            { color: 'rgb(127, 168, 201)' },
            { color: 'rgb(82, 123, 160)' },
            { color: 'rgb(37, 78, 119)' },
            ],
            type: 'Gradient'
        },
        legendSettings: {
            position: 'Bottom',
            width: '250px',
            showLabel: true,
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' deffective units'];
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        dataSource: newDataSource.emptyPointDataSource
    });
    heatmap.appendTo('#container');
};