import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import * as data from './default-data.json';
HeatMap.Inject(Tooltip, Legend);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Sales Revenue per Employee (in 1000 US$)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
        },
        yAxis: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        dataSource: (data as any).defaultData,
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');
};