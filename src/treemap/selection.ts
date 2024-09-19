/**
 * Selection sample
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { TreeMap, TreeMapHighlight, TreeMapSelection, HighLightMode, SelectionMode, TreeMapAjax } from '@syncfusion/ej2-treemap';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { importData } from './treemap-data/import';
TreeMap.Inject(TreeMapHighlight, TreeMapSelection);
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { EmitType } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
    };
    // custom code end
    let treemap: TreeMap = new TreeMap({
        // custom code start
        load: treemapload,
        // custom code end
        titleSettings: {
            text: 'Import and Export details of US',
            textStyle: { fontFamily: 'Segoe UI' }
        },
        dataSource: importData,
        weightValuePath: 'sales',
        levels: [
            { groupPath: 'dataType', fill: '#c5e2f7', headerStyle: { size: '16px' }, headerAlignment: 'Center', groupGap: 5 },
            { groupPath: 'product', fill: '#a4d1f2', headerAlignment: 'Center' , groupGap: 2 }
        ],
        leafItemSettings: {
            labelPath: 'type',
            fill: '#8ebfe2',
            labelPosition: 'Center',
            gap: 10,
            labelStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        selectionSettings: {
            enable: true,
            fill: '#58a0d3',
            border: { width: 0.3, color: 'black' },
            opacity: '1'
        },
        highlightSettings: {
            enable: true,
            fill: '#71b0dd',
            border: { width: 0.3, color: 'black' },
            opacity: '1'
        }
    });
    treemap.appendTo('#import-container');
    // Visiblity for highlight mode
    let highlightChange: EmitType<CheckBoxChangeEvents>;
    let highlightCheckBox: CheckBox = new CheckBox(
    {
        change: highlightChange, checked: true
    },
    '#highlightEnable');
    // Visiblity for Selection mode
    let selectionChange: EmitType<CheckBoxChangeEvents>;
    let selectionCheckBox: CheckBox = new CheckBox(
    {
        change: selectionChange, checked: true
    },
    '#SelectionEnable');
    highlightCheckBox.change = highlightChange = (e: CheckBoxChangeEvents) => {
        treemap.highlightSettings.enable = e.checked;
        treemap.refresh();
    };
    selectionCheckBox.change = selectionChange = (e: CheckBoxChangeEvents) => {
        treemap.selectionSettings.enable = e.checked;
        treemap.refresh();
    };
    // highlight type (Item, child, parent, All)
    let highlightMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select highlight type',
        width: '100%',
        change: () => {
            treemap.highlightSettings.mode = <HighLightMode>highlightMode.value;
            treemap.refresh();
        }
    });
    highlightMode.appendTo('#highlightMode');
    // Selection type (Item, child, parent, All)
    let selectionMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Selection selection type',
        width: '100%',
        change: () => {
            treemap.selectionSettings.mode = <SelectionMode>selectionMode.value;
            treemap.refresh();
        }
    });
    selectionMode.appendTo('#selectionMode');
};