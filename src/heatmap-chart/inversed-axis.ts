import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { CheckBox } from '@syncfusion/ej2-buttons';
import * as data from './invered-axis-data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Population Growth Rate of the most Populous Countries',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        xAxis: {
            labels: ['China', 'India', 'USA', 'Indonesia', 'Brazil', 'Pakistan',
                'Nigeria', 'Bangladesh', 'Russia', 'Mexico'],
            labelRotation: 45,
            labelIntersectAction: 'None',
            isInversed: true,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
            isInversed: true,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        dataSource: (data as any).inveredAxisData,
        cellSettings: {
            border: {
                width: 0
            },
            showLabel: false,
            format: '{value} %'
        },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        paletteSettings: {
            palette: [{ value: 0, color: '#4b7287' },
            { value: 0.5, color: '#b5b29f' },
            { value: 1, color: '#F0D6AD' },
            { value: 1.5, color: '#9da49a' },
            { value: 2, color: '#466f86' },
            { value: 2.5, color: '#d7c7a7' },
            { value: 3, color: '#6e888f' },
            ],
        },
        legendSettings: {
            visible: false
        },
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

    let xlistObj: CheckBox = new CheckBox({ label: 'Reverse X-Axis Origin', checked: true, change: valueXChange });
    xlistObj.appendTo('#XOpposedPosition');

    function valueXChange(): void {
        heatmap.xAxis.isInversed = xlistObj.checked;
    }

    let ylistObj: CheckBox = new CheckBox({ label: 'Reverse Y-Axis Origin', checked: true, change: valueYChange });
    ylistObj.appendTo('#YOpposedPosition');
    function valueYChange(): void {
        heatmap.yAxis.isInversed = ylistObj.checked;
    }
};