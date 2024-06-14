/**
 * Printing sample.
 */
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
import { TreeMap, ExportType, TreeMapTooltip, TreeMapAjax, Print, ImageExport, PdfExport } from '@syncfusion/ej2-treemap';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TreeMapTheme, ILoadEventArgs } from '@syncfusion/ej2-treemap';
import { productSales } from './treemap-data/product';
import { EmitType } from '@syncfusion/ej2-base';
import { TextBox } from  '@syncfusion/ej2-inputs';
TreeMap.Inject(TreeMapTooltip, Print, ImageExport, PdfExport);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let treemapload: EmitType<ILoadEventArgs> = (args: ILoadEventArgs) => {
        // custom code start
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = <TreeMapTheme>((theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast'));
        // custom code end
    };
    let treemap: TreeMap = new TreeMap({
        load: treemapload,
        titleSettings: {
            text: 'Top 10 best selling smartphone brands - 2017',
            textStyle: { size: '15px', fontFamily: 'Segoe UI' }
        },
        allowPrint: true,
        allowImageExport: true,
        allowPdfExport: true,
        //enableDrillDown: true,
        dataSource: productSales,
        layoutType: 'SliceAndDiceVertical',
        weightValuePath: 'Percentage',
        rangeColorValuePath: 'Percentage',
        tooltipSettings: {
            visible: true,
            format: '${Product} (+${Percentage}) %',
            textStyle: {
                fontFamily: 'Segoe UI'
            }
        },
        leafItemSettings: {
            labelPath: 'Product',
            fill: '#6699cc',
            border: { color: 'black', width: 0.5 },
            labelPosition: 'Center',
            interSectAction: 'Hide',
            labelStyle: {
                fontFamily: 'Segoe UI'
            },
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
         cssClass: 'e-info', isPrimary: true
    });
    togglebtn.appendTo('#togglebtn');
    // Print the treemap
    document.getElementById('togglebtn').onclick = () => {
        treemap.print();
    };
    // Treemap file format (PNG, JPEG, PDF, SVG)
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: '100%'
    });
    mode.appendTo('#mode');
    let togglebtn1: Button = new Button({
         cssClass: 'e-info', isPrimary: true
    });
    togglebtn1.appendTo('#togglebtn1');
    let fileText: TextBox = new TextBox({
        value: 'TreeMap',
        width: '100%'
    });
    fileText.appendTo('#fileName');
    document.getElementById('togglebtn1').onclick = () => {
        let fileName: string = fileText.value;
        treemap.export(<ExportType>mode.value, fileName);
    };
};