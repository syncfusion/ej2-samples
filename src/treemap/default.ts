/**
 * Default sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
/* tslint:disable:no-string-literal */
// custom code end
import { TreeMap, TreeMapTooltip, TreeMapLegend, IItemMoveEventArgs, TreeMapAjax } from '@syncfusion/ej2-treemap';
TreeMap.Inject(TreeMapTooltip, TreeMapLegend);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
// Treemap theme changes in load Event
export let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
    theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
};
// custom code end
let prevTime: Date; let curTime: Date;
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    //Treemap tooltip changes in levels and leaf Items
    let tooltipRender: EmitType<IItemMoveEventArgs> = (args: IItemMoveEventArgs) => {
        args.item['data'].Sales = args.item['weight'];
        args.treemap.tooltipSettings.format = args.item['groupIndex'] === 0 ? 'Country: ${Continent}<br>Sales: ${Sales}' :
            'Country: ${Continent}<br>Company: ${Company}<br>Sales: ${Sales}';
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        titleSettings: {
            text: 'Car Sales by Country - 2017',
            textStyle: { size: '15px',  fontFamily: 'Segoe UI' }
        },
        itemMove: tooltipRender,
        itemClick: tooltipRender,
        rangeColorValuePath: 'Sales',
        format: 'n',
        useGroupingSeparator: true,
        dataSource: new TreeMapAjax('./src/treemap/treemap-data/car-sales.json'),
        legendSettings: {
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        palette: ['#C33764', '#AB3566', '#993367', '#853169', '#742F6A', '#632D6C', '#532C6D', '#412A6F', '#312870', '#1D2671'],
        tooltipSettings: {
            visible: true,
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        weightValuePath: 'Sales',
        leafItemSettings: {
            labelPath: 'Company',
            border: { color: 'white', width: 0.5 },
            labelStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        levels: [
            {
                groupPath: 'Continent', border: { color: 'white', width: 0.5 },
            }
        ]
    });
    treemap.appendTo('#default-container');
};


