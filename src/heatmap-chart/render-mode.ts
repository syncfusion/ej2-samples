import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { RadioButton } from '@syncfusion/ej2-buttons';
import * as data from './render-mode-data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Net Migration Rate of Northern Europe From 1965 to 2015',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['Channel Isl', 'Denmark', 'Estonia', 'Finland',
                'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Norway', 'Sweden', 'UK'],
            labelRotation: -90,
            labelIntersectAction: 'None',
        },
        yAxis: {
            labels: ['1965-1970', '1970-1975', '1975-1980', '1980-1985', '1985-1990',
                '1990-1995', '1995-2000', '2000-2005', '2005-2010', '2010-2015']
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
            width: '200px'
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
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
    }
};