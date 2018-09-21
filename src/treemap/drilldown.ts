
import { TreeMap, TreeMapTooltip, IDrillStartEventArgs, ITreeMapTooltipRenderEventArgs } from '@syncfusion/ej2-treemap';
import { DrillDown } from '../treemap/treemap-data/drilldown-sample';
TreeMap.Inject(TreeMapTooltip);
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

let prevTime: Date; let curTime: Date;
this.default = (): void => {
    let treemap: TreeMap = new TreeMap({
        drillStart: (args: IDrillStartEventArgs) => {
            if (args.item[Object.keys(args.item)[0]].length === 1) {
                args.treemap.levels[2].showHeader = true;
            } else {
                args.treemap.levels[2].showHeader = false;
            }
        },
        tooltipRendering: (args: ITreeMapTooltipRenderEventArgs) => {
            //tslint:disable-next-line
            if (args.item['groupIndex'] !== 2 ) {
                args.cancel = true;
            }
        },
        load: treemapload,
        palette: ['#9999ff', '#CCFF99', '#FFFF99', '#FF9999', '#FF99FF', '#FFCC66'],
        titleSettings: {
            text: 'List of countries by population',
            textStyle: { size: '15px' }
        },
        enableDrillDown: true,
        format: 'n',
        useGroupingSeparator: true,
        dataSource: DrillDown,
        weightValuePath: 'Population',
        tooltipSettings: {
            visible: true,
            format: '${Name} : ${Population}'
        },
        leafItemSettings: {
            labelPath: 'Name',
            showLabels: false,
            labelStyle: { size: '0px' },
            border: { color: 'black', width: 0.5 }
        },
        levels: [
            { groupPath: 'Continent', fill: '#336699', border: { color: 'black', width: 0.5 } },
            { groupPath: 'States', fill: '#336699', border: { color: 'black', width: 0.5 } },
            { groupPath: 'Region', showHeader: false, fill: '#336699', border: { color: 'black', width: 0.5 } },
        ]
    });
    treemap.appendTo('#container');
};


