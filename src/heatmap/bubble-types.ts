import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Legend, ITooltipEventArgs, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Female Participation Rate in Labor Force for the Countries',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
            labelRotation: 45,
            labelIntersectAction: 'None'
        },
        yAxis: {
            labels: ['1995', '2000', '2005', '2010', '2015']
        },
        dataSource: (data as any).tableBubbleData,
        cellSettings: {
            border: {
                width: 1
            },
            showLabel: false,
            tileType: 'Bubble',
            bubbleType: 'Size'
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = [args.yLabel + ' | ' + args.xLabel + ' : ' + args.value + ' %'];
        },
        paletteSettings: {
            palette: [{ value: 35, color: '#50A3B1' },
            { value: 45, color: '#78D1BD' },
            { value: 55, color: '#CAE8B4' },
            { value: 65, color: '#EDF8B6' },
            { value: 78, color: '#FFFFDA' }
            ],
        },
        legendSettings: {
            visible: true
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');

    let bubbleTypeObj: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: () => { bubbleTypeChange(); }
    });
    bubbleTypeObj.appendTo('#bubbleType');

    function bubbleTypeChange(): void {
        heatmap.cellSettings.bubbleType = bubbleTypeObj.value.toString() === 'Size' ?
            'Size' : bubbleTypeObj.value.toString() === 'Color' ?
                'Color' : bubbleTypeObj.value.toString() === 'Sector' ?
                    'Sector' : null;
    }
};