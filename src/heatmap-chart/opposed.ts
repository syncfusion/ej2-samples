import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { CheckBox } from '@syncfusion/ej2-buttons';
import * as data from './opposed-axis-data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Monthly Flight Traffic at JFK Airport',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['2007', '2008', '2009', '2010', '2011',
                '2012', '2013', '2014', '2015', '2016', '2017'],
            opposedPosition: true,
            labelRotation: 45,
            labelIntersectAction: 'None',
        },
        yAxis: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            opposedPosition: true
        },
        legendSettings: {
            visible: false,
        },
        cellSettings: {
            showLabel: false,
            border: {
                width: 0,
            },
            format: '{value} flights'
        },
        dataSource: (data as any).opposedAxisData,
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');

    let xlistObj: CheckBox = new CheckBox({ label: 'Change X-Axis Position', checked: true, change: valueXChange });
    xlistObj.appendTo('#XOpposedPosition');

    function valueXChange(): void {
        heatmap.xAxis.opposedPosition = xlistObj.checked;
    }

    let ylistObj: CheckBox = new CheckBox({ label: 'Change Y-Axis Position', checked: true, change: valueYChange });
    ylistObj.appendTo('#YOpposedPosition');

    function valueYChange(): void {
        heatmap.yAxis.opposedPosition = ylistObj.checked;
    }
};