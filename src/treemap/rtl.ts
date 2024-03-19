import { loadCultureFiles } from '../common/culture-loader';

/**
 * Drilldown sample
 */
import { TreeMap, TreeMapTooltip, TreeMapLegend, TreeMapAjax } from '@syncfusion/ej2-treemap';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { rtlData } from './treemap-data/rtl-data';
import { EmitType } from '@syncfusion/ej2-base';

let prevTime: Date; let curTime: Date;
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
    };
    // custom code end
    let treemap: TreeMap = new TreeMap({
        // custom code start
        load: treemapload,
        // custom code end
        palette: ['#5B244D', '#6F3953', ' #87525A', '#A26F63', '#BA896B', '#D5A574', '#F1C37D'],
        titleSettings: {
            text: 'List of Countries by Unemployment Rate',
            textStyle: { size: '15px', fontFamily: 'Segoe UI' }
        },
        enableDrillDown: true,
        renderDirection: 'TopRightBottomLeft',
        enableRtl: true,
        format: 'n',
        useGroupingSeparator: true,
        dataSource: rtlData,
        weightValuePath: 'Size',
        tooltipSettings: {
            visible: true,
            format: '${Size} : ${Name}',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        leafItemSettings: {
            labelPath: 'Name',
            showLabels: true,
            labelStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        levels: [
            { groupPath: 'Continent', border: { color: 'black', width: 0.5 }, headerAlignment: 'Far' },
            { groupPath: 'Country', border: { color: 'black', width: 0.5 }, headerAlignment: 'Far' },
        ]
    });
    treemap.appendTo('#container');
};


