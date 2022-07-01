/**
 * tooltip sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { TreeMap, TreeMapTooltip, TreeMapLegend, TreeMapAjax } from '@syncfusion/ej2-treemap';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        tooltipSettings: {
            visible: true,
            template: '#Tooltip'
        },
        titleSettings: {
            text: 'Country wise International Airport count in South America',
            textStyle: {
                size: '15px',
                fontFamily: 'Segoe UI'
            }
        },
        dataSource: new TreeMapAjax('./src/treemap/treemap-data/airport-count.json'),
        weightValuePath: 'Count',
        equalColorValuePath: 'Count',
        legendSettings: {
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        leafItemSettings: {
            showLabels: true,
            labelPath: 'State',
            labelPosition: 'Center',
            labelStyle: {
                size: '13px',
                fontFamily: 'Segoe UI'
            },
            fill: '#6699cc',
            border: { width: 1, color: 'white' },
            colorMapping: [
                {
                    value: 25,
                    color: '#634D6F'
                },
                {
                    value: 12,
                    color: '#B34D6D'
                },
                {
                    value: 9,
                    color: '#557C5C'
                },
                {
                    value: 7,
                    color: '#44537F'
                },
                {
                    value: 6,
                    color: '#637392'
                },
                {
                    value: 3,
                    color: '#7C754D'
                },
                {
                    value: 2,
                    color: '#2E7A64'
                },
                {
                    value: 1,
                    color: '#95659A'
                },
            ]
        },
    });
    treemap.appendTo('#container');
};


