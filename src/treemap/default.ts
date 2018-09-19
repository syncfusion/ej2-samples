
import { TreeMap, TreeMapTooltip, TreeMapLegend, IItemMoveEventArgs } from '@syncfusion/ej2-treemap';
import { CarSales } from '../treemap/treemap-data/car-sale';
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
/* tslint:disable:no-string-literal */
let prevTime: Date; let curTime: Date;
this.default = (): void => {
    let tooltipRender: EmitType<IItemMoveEventArgs> = (args: IItemMoveEventArgs) => {
        args.item['data'].Sales = args.item['weight'];
        args.treemap.tooltipSettings.format = args.item['groupIndex'] === 0 ? 'Country: ${Continent}<br>Sales: ${Sales}' :
            'Country: ${Continent}<br>Company: ${Company}<br>Sales: ${Sales}';
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        titleSettings: {
            text: 'Car Sales by Country - 2017',
            textStyle: { size: '15px' }
        },
        itemMove: tooltipRender,
        itemClick: tooltipRender,
        rangeColorValuePath: 'Sales',
        format: 'n',
        useGroupingSeparator: true,
        dataSource: CarSales,
        legendSettings: {
            visible: true,
            position: 'Top',
            shape: 'Rectangle',
        },
        palette: ['#C33764', '#AB3566', '#993367', '#853169', '#742F6A', '#632D6C', '#532C6D', '#412A6F', '#312870', '#1D2671'],
        tooltipSettings: {
            visible: true
        },
        weightValuePath: 'Sales',
        leafItemSettings: {
            labelPath: 'Company',
            border: { color: 'white', width: 0.5 }
        },
        levels: [
            {
                groupPath: 'Continent', border: { color: 'white', width: 0.5 },
            }
        ]
    });
    treemap.appendTo('#default-container');
};


