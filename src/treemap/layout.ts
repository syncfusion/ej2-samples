/**
 * layout sample.
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
//tslint:disable
// custom code end
import { TreeMap, TreeMapTooltip, LayoutMode, TreeMapAjax, RenderingMode } from '@syncfusion/ej2-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
TreeMap.Inject(TreeMapTooltip);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
// Treemap theme changes
export let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
    theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
};
//tslint:disable
// custom code end
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        // To config title for treemap 
        titleSettings: {
            text: 'Top 10 countries by GDP Nominal - 2015',
            textStyle: {size: '15px', fontFamily: 'Segoe UI'}
        },
        dataSource: new TreeMapAjax('./src/treemap/treemap-data/econmics.json'),
        weightValuePath: 'GDP',
        // To config tooltip for treemap 
        tooltipSettings: {
            visible: true,
            format: '${State}<br>Rank : ${Rank}',
            textStyle: {
                fontFamily: 'Segoe UI'
            }

        },
        rangeColorValuePath: 'GDP',
        // To config leafitem customization for treemap
        leafItemSettings: {
            labelPath: 'State',
            labelFormat: '${State}<br>$${GDP} Trillion<br>(${percentage} %)',
            labelStyle: {
                color: '#000000',
                fontFamily: 'Segoe UI'
            },
            border: {
                color: '#000000',
                width: 0.5
            },
            colorMapping: [
                {
                    from: 1550,
                    to: 17946,
                    color: '#9cbb59',
                    minOpacity: 0.7,
                    maxOpacity: 1,
                }
            ]
        },
    });
    treemap.appendTo('#layout-container');
    // Treemap layout types
    let layoutMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select layoutMode type',
        width: '100%',
        change: () => {
            treemap.layoutType = <LayoutMode>layoutMode.value;
            treemap.refresh();
        }
    });
    layoutMode.appendTo('#layoutMode');
    // Selection type (TopLeftBottomRight, TopRightBottomLeft, BottomLeftTopRight, BottomRightTopLeft)
    let highlightMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Rendering Direction',
        width: '100%',
        change: () => {
            treemap.renderDirection = <RenderingMode>highlightMode.value;
            treemap.refresh();
        }
    });
    highlightMode.appendTo('#highlightMode');

};