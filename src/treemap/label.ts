import { TreeMap, LabelAlignment, TreeMapTooltip, TreeMapLegend } from '@syncfusion/ej2-treemap';
import { Country_Population } from '../treemap/treemap-data/country-population';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
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
        titleSettings: {
            text: 'Countries ordered based on Population - 2017',
            textStyle: { size: '15px' }
        },
        dataSource: Country_Population,
        tooltipSettings: {
            visible: true,
            format: '${Country} : ${Population}'
        },
        legendSettings: {
            visible: true,
            mode: 'Interactive',
            width: '300px',
            height: '10',
            position: 'Top'
        },
        format: 'n',
        useGroupingSeparator: true,
        rangeColorValuePath: 'Population',
        weightValuePath: 'Population',
        leafItemSettings: {
            showLabels: true,
            labelPath: 'Country',
            fill: 'red',
            colorMapping: [
                {
                    to: 10000000000,
                    from: 100000000,
                    label: '200M - 1.3M',
                    color: '#4B134F'
                }, { to: 100000000, from: 20000000, label: '20M - 200M', color: '#8C304D' },
                { to: 20000000, from: 100000, label: '0.1M - 20M', color: '#C84B4B' }
            ]
        },
    });
    treemap.appendTo('#container');
    let labelMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Label Action',
        width: 100,
        change: () => {
            treemap.leafItemSettings.interSectAction = <LabelAlignment>labelMode.value;
            treemap.refresh();
        }
    });
    labelMode.appendTo('#labels');
};


