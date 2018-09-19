/**
 * Changing exporting sample.
 */

import { TreeMap, ExportType, TreeMapTooltip } from '@syncfusion/ej2-treemap';
import { Button } from '@syncfusion/ej2-buttons';
import { ProductSale } from '../treemap/treemap-data/product';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
TreeMap.Inject(TreeMapTooltip);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
export let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.treemap.theme = <TreeMapTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
};
this.default = (): void => {
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        titleSettings: {
            text: 'Top 10 best selling smartphone brands - 2017',
            textStyle: { size: '15px'}
        },
        //enableDrillDown: true,
        dataSource: ProductSale,
        layoutType: 'SliceAndDiceVertical',
        weightValuePath: 'Percentage',
        rangeColorValuePath: 'Percentage',
        tooltipSettings: {
            visible: true,
            format: '${Product} (+${Percentage}) %'
        },
        leafItemSettings: {
            labelPath: 'Product',
            fill: '#6699cc',
            border: { color: 'black', width: 0.5 },
            labelPosition: 'Center',
            interSectAction: 'Hide',
            labelFormat: '${Product} (+${Percentage}) %',
            colorMapping: [
                {
                    from: 1.3,
                    to: 22,
                    color: '#FAB665',
                    minOpacity: 0.5,
                    maxOpacity: 1
                }
            ]
        },
    });
    treemap.appendTo('#container');
    let togglebtn: Button = new Button({
        iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true,
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        treemap.print();
    };
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: 70
    });
    mode.appendTo('#mode');
    let togglebtn1: Button = new Button({
        iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true,
    });
    togglebtn1.appendTo('#togglebtn1');
    document.getElementById('togglebtn1').onclick = () => {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        treemap.export(<ExportType>mode.value, fileName);
    };
};