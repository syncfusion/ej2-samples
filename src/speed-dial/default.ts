import { loadCultureFiles } from '../common/culture-loader';
import { SpeedDial,SpeedDialItemModel } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();

    let items:SpeedDialItemModel[] = [
        {
            title:'Home',
            iconCss:'speeddial-icons speeddial-icon-house'
        },
        {
            title:'People',
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

    let speedDial:SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-menu',
        closeIconCss:'speeddial-icons speeddial-icon-close',
        items:items,
        target: '#target',
        position:'BottomCenter',
        });
    speedDial.appendTo('#btn1');
};
