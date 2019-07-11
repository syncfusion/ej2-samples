/**
 * Customization sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { TreeMap, TreeMapTooltip, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { Browser } from '@syncfusion/ej2-base';
TreeMap.Inject(TreeMapTooltip);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
// custom code start
// Treemap theme changes
export let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
};
// custom code end
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        // To config Title for treemap 
        titleSettings: {
            text: 'US Gold medal categories in Summer Olympics - 2016',
            textStyle: {size: '15px'}
        },
        //enableDrillDown: true,
        dataSource: new TreeMapAjax('./src/treemap/treemap-data/metal.json'),
        weightValuePath: 'Gold',
        // To config tooltip for treemap 
        tooltipSettings: {
            visible: true,
            format: '${Sport} : ${Gold}'
        },
        // To config leaf items for treemap
        leafItemSettings: {
            showLabels: !Browser.isDevice,
            labelPath: 'Sport',
            fill: '#993399',
            templatePosition: 'Center',
            border: { color: 'black', width: 0.5 },
            labelFormat: ' ${Sport} - ${Gold}',
            labelTemplate: '<div style="pointer-events: none;"><img src="src/treemap/image/{{:GameImage}}"' +
            ' style="height:{{:ItemHeight}};width:{{:ItemWidth}};"></img></div>'
        }
    });
    treemap.appendTo('#container');
};


