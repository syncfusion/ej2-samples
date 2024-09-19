/**
 * Treemap legend sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { TreeMap, TreeMapTooltip, TreeMapLegend, LegendMode, LegendPosition, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { electionData } from './treemap-data/election-data';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs, IResizeEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';

let prevTime: Date; let curTime: Date;
/* tslint:disable-next-line:max-func-body-length */
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        resize: (args: IResizeEventArgs) => {
            if (args.currentSize.width > args.currentSize.height && args.treemap.legendSettings.position === 'Auto') {
                treemap.legendSettings.orientation = 'Vertical';
                if (treemap.legendSettings.mode === 'Interactive') {
                    treemap.legendSettings.height = '70%';
                    treemap.legendSettings.width = '10';
                } else {
                    treemap.legendSettings.height = '';
                    treemap.legendSettings.width = '';
                }
            } else {
                treemap.legendSettings.orientation = 'Horizontal';
                if (treemap.legendSettings.mode === 'Interactive') {
                    treemap.legendSettings.height = '10';
                    treemap.legendSettings.width = '';
                } else {
                    treemap.legendSettings.height = '';
                    treemap.legendSettings.width = '';
                }
            }
        },
        titleSettings: {
            text: 'US Presidential election result - 2016',
            textStyle: { size: '15px',  fontFamily: 'Segoe UI' }
        },
        dataSource: electionData,
        weightValuePath: 'Population',
        tooltipSettings: {
            visible: true,
            format: '<b>${Winner}</b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        legendSettings: {
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        format: 'n',
        useGroupingSeparator: true,
        rangeColorValuePath: 'WinPercentage',
        equalColorValuePath: 'Winner',
        leafItemSettings: {
            labelPath: 'State',
            fill: '#6699cc',
            labelStyle: {
                fontFamily: 'Segoe UI'
            },
            border: { color: 'white', width: 0.5 },
            colorMapping: [
                {
                    value: 'Trump', color: '#D84444'
                },
                {
                    value: 'Clinton', color: '#316DB5'
                }
            ]
        },
    });
    treemap.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select legend type',
        width: '100%',
        change: () => {
            treemap.legendSettings.mode = <LegendMode>mode.value;
            if (mode.value === 'Interactive') {
                if (treemap.legendSettings.orientation === 'Horizontal' || treemap.legendSettings.orientation === 'None') {
                    treemap.legendSettings.height = '10';
                    treemap.legendSettings.width = '';
                } else {
                    treemap.legendSettings.height = '70%';
                    treemap.legendSettings.width = '10';
                }
            } else {
                treemap.legendSettings.height = '';
                treemap.legendSettings.width = '';
            }
            treemap.refresh();
        }
    });
    mode.appendTo('#layoutMode');
    // code for property panel
    let legendPosition: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Legend Position',
        width: '100%',
        change: () => {
            treemap.legendSettings.position = <LegendPosition>legendPosition.value;
            if (legendPosition.value === 'Left' || legendPosition.value === 'Right') {
                treemap.legendSettings.orientation = 'Vertical';
                if (treemap.legendSettings.mode === 'Interactive') {
                    treemap.legendSettings.height = '70%';
                    treemap.legendSettings.width = '10';
                } else {
                    treemap.legendSettings.height = '';
                    treemap.legendSettings.width = '';
                }
            } else if (legendPosition.value === 'Auto') {
                if (treemap.availableSize.width > treemap.availableSize.height) {
                    treemap.legendSettings.orientation = 'Vertical';
                    if (treemap.legendSettings.mode === 'Interactive') {
                        treemap.legendSettings.height = '70%';
                        treemap.legendSettings.width = '10';
                    } else {
                        treemap.legendSettings.height = '';
                        treemap.legendSettings.width = '';
                    }
                } else {
                    treemap.legendSettings.orientation = 'Horizontal';
                    if (treemap.legendSettings.mode === 'Interactive') {
                        treemap.legendSettings.height = '10';
                        treemap.legendSettings.width = '';
                    } else {
                        treemap.legendSettings.height = '';
                        treemap.legendSettings.width = '';
                    }
                }
            } else {
                treemap.legendSettings.orientation = 'Horizontal';
                if (treemap.legendSettings.mode === 'Interactive') {
                    treemap.legendSettings.height = '10';
                    treemap.legendSettings.width = '';
                }
            }
            treemap.refresh();
        }
    });
    legendPosition.appendTo('#legendPosition');
};
