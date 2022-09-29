import { loadCultureFiles } from '../common/culture-loader';
import { SpeedDial,SpeedDialItemModel } from '@syncfusion/ej2-buttons';
import { Tooltip } from '@syncfusion/ej2/popups';

(window as any).default = (): void => {
    loadCultureFiles();

    let items:SpeedDialItemModel[] = [
        {
            text:'Home',
            iconCss:'speeddial-icons speeddial-icon-house'
        },
        {
            text:'Contacts',
            iconCss:'speeddial-icons speeddial-icon-people'
        },
        {
            text:'Search',
            iconCss:'speeddial-icons speeddial-icon-search'
        },
        {
            text:'Message',
            iconCss:'speeddial-icons speeddial-icon-message'
        }
    ]
    let itemLabel:SpeedDialItemModel[] = [
        {
            text:'Home'
        },
        {
            text:'Contacts'
        },
        {
            text:'Search'
        },
        {
            text:'Message'
        }
    ]
    let tooltItem:SpeedDialItemModel[] = [
        {
            title:'Home',
            iconCss:'speeddial-icons speeddial-icon-house'
        },
        {
            title:'Contacts',
            iconCss:'speeddial-icons speeddial-icon-people'
        },
        {
            title:'Search',
            iconCss:'speeddial-icons speeddial-icon-search'
        },
        {
            title:'Message',
            iconCss:'speeddial-icons speeddial-icon-message'
        }
    ]

    let iconLabel:SpeedDial = new SpeedDial(
        {    
        content:'Edit',
        openIconCss:'speeddial-icons speeddial-icon-menu',
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
        openIconCss:'speeddial-icons speeddial-icon-menu',
        closeIconCss:'speeddial-icons speeddial-icon-close',
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
