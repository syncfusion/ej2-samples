import { HeatMap, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import * as data from './default-data.json';
HeatMap.Inject(Tooltip, Legend);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Sales Revenue per Employee (in 1000 US$)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        xAxis: {
            labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        legendSettings:{
            textStyle: {
                 fontFamily: 'inherit'
             }
         },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        cellSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        dataSource: (data as any).defaultData,
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    heatmap.appendTo('#container');
};