import { TreeMap, TreeMapTooltip, TreeMapLegend } from '@syncfusion/ej2-treemap';
import { Airport_Count } from '../treemap/treemap-data/airport-count';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
export let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
};
/**
 * Default sample
 */
this.default = (): void => {
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        tooltipSettings: {
            visible: true,
            template: '#Tooltip'
        },
        titleSettings: {
            text: 'Country wise International Airport count in South America',
            textStyle: {
                size: '15px'
            }
        },
        dataSource: Airport_Count,
        weightValuePath: 'Count',
        equalColorValuePath: 'Count',
        legendSettings: {
            visible: true,
            position: 'Top',
            shape: 'Rectangle'
        },
        leafItemSettings: {
            showLabels: true,
            labelPath: 'State',
            labelPosition: 'Center',
            labelStyle: {
                size: '13px'
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


