import { loadCultureFiles } from '../common/culture-loader';
import { SpeedDial,SpeedDialItemModel } from '@syncfusion/ej2-buttons';
import { Tooltip } from '@syncfusion/ej2/popups';

(window as any).default = (): void => {
    loadCultureFiles();

    let items:SpeedDialItemModel[] = [
        {
            text:'Cut',
            iconCss:'speeddial-icons speeddial-icon-cut'
        },
        {
            text:'Copy',
            iconCss:'speeddial-icons speeddial-icon-copy'
        },
        {
            text:'Paste',
            iconCss:'speeddial-icons speeddial-icon-paste'
        },
        {
            text:'Delete',
            iconCss:'speeddial-icons speeddial-icon-delete'
        },
        {
            text:'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ]
    let itemLabel:SpeedDialItemModel[] = [
        {
            text:'Cut'
        },
        {
            text:'Copy'
        },
        {
            text:'Paste'
        },
        {
            text:'Delete'
        },
        {
            text:'Save'
        }
    ]
    let tooltItem:SpeedDialItemModel[] = [
        {
            title:'Cut',
            iconCss:'speeddial-icons speeddial-icon-cut'
        },
        {
            title:'Copy',
            iconCss:'speeddial-icons speeddial-icon-copy'
        },
        {
            title:'Paste',
            iconCss:'speeddial-icons speeddial-icon-paste'
        },
        {
            title:'Delete',
            iconCss:'speeddial-icons speeddial-icon-delete'
        },
        {
            title:'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ]

    let iconLabel:SpeedDial = new SpeedDial(
        {    
        content:'Edit',
        openIconCss:'speeddial-icons speeddial-icon-edit',
        iconPosition:'Left',
        items:items,
        target: '#target',
        position:'BottomCenter'
        });
    iconLabel.appendTo('#btn1');

    let label:SpeedDial = new SpeedDial(
        {
        content:'Edit',
        items:itemLabel,
        target: '#target',
        position:'BottomLeft'
        });
    label.appendTo('#btn2');
    
    let labelTooltip:SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-edit',
        items:tooltItem,
        position:'BottomRight',
        target: '#target',
        cssClass:"tooltip-speeddial"
        });
    labelTooltip.appendTo('#btn3');

    let tooltip:Tooltip = new Tooltip({
        target:".tooltip-speeddial .e-speeddial-li",
        position:'LeftCenter'
    });
    tooltip.appendTo("#target");
};
