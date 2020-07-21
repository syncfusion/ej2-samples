import { loadCultureFiles } from '../common/culture-loader';

import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import * as data from './default-table-data-source.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Crude Oil Production of Non-OPEC Countries (in Million barrels per day)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA'],
            labelRotation: 45,
            labelIntersectAction: 'None',
        },
        yAxis: {
            labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'],
        },
        dataSource: (data as any).defaultTableDataSource,
        cellSettings: {
            border: {
                width: 0
            },
            format: '{value} M'
        },
        legendSettings: {
            visible: false,
        },
        tooltipSettings: {
            fill: '#265259',
            textStyle: {
                color: '#FFFFFF',
                size: '12px'
            },
            border: {
                width: 1,
                color: '#98BABF'
            }
        },
        paletteSettings: {
            palette: [{ value: 0, color: '#C2E7EC' },
            { value: 0.6, color: '#AEDFE6' },
            { value: 0.75, color: '#9AD7E0' },
            { value: 1, color: '#86CFDA' },
            { value: 1.5, color: '#72C7D4' },
            { value: 2, color: '#5EBFCE' },
            { value: 2.5, color: '#4AB7C8' },
            { value: 3, color: '#36AFC2' },
            { value: 3.5, color: '#309DAE' },
            { value: 5, color: '#2B8C9B' },
            { value: 5.5, color: '#257A87' },
            { value: 6, color: '#206974' },
            { value: 8, color: '#1B5761' },
            { value: 9, color: '#15464D' },
            { value: 9.5, color: '#000000' },
            ],
            type: 'Fixed'
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = ['In ' + args.yLabel + ', the ' + args.xLabel + ' produced ' + args.value + ' million barrels per day'];
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');
};