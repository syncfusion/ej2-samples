import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { RadioButton } from '@syncfusion/ej2-buttons';
import * as data from './render-mode-data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        xAxis: {
            labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland',
                'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
            labelRotation: -90,
            labelIntersectAction: 'None',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        dataSource: (data as any).renderModeData,
        paletteSettings: {
            palette: [{ color: '#C06C84' },
            { color: '#355C7D' }
            ],
        },
        renderingMode: 'SVG',
        cellSettings: {
            border: {
                width: 0
            },
            showLabel: false,
            format: '{value} %'
        },
        legendSettings: {
            position: 'Bottom',
            width: '200px',
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        },
    });
    heatmap.appendTo('#container');

    let svgRadioButton: RadioButton = new RadioButton({
        label: 'SVG', name: 'renderingmode',
        change: () => { valueXChange(); }, value: 'SVG', checked: true
    });
    svgRadioButton.appendTo('#svg');

    let canvasradioButton: RadioButton = new RadioButton({
        label: 'Canvas', name: 'renderingmode',
        change: () => { valueXChange(); }, value: 'Canvas'
    });
    canvasradioButton.appendTo('#canvas');

    function valueXChange(): void {
        heatmap.renderingMode = svgRadioButton.checked ? 'SVG' : 'Canvas';
        if (heatmap.renderingMode === 'Canvas') {
            heatmap.titleSettings.textStyle.fontFamily = 'Segoe UI';
            heatmap.xAxis.textStyle.fontFamily = 'Segoe UI';
            heatmap.yAxis.textStyle.fontFamily = 'Segoe UI';
            heatmap.legendSettings.textStyle.fontFamily = 'Segoe UI';
            heatmap.cellSettings.textStyle.fontFamily = 'Segoe UI';
        } else {
            heatmap.titleSettings.textStyle.fontFamily = 'inherit';
            heatmap.xAxis.textStyle.fontFamily = 'inherit';
            heatmap.yAxis.textStyle.fontFamily = 'inherit';
            heatmap.legendSettings.textStyle.fontFamily = 'inherit';
            heatmap.cellSettings.textStyle.fontFamily = 'inherit';
        }
    }
};