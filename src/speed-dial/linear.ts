import { loadCultureFiles } from '../common/culture-loader';
import { SpeedDial,SpeedDialItemModel } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();

    let items:SpeedDialItemModel[] = [
        {
            title:'Image',
            iconCss:'speeddial-icons speeddial-icon-image'
        },
        {
            title:'Audio',
            iconCss:'speeddial-icons speeddial-icon-audio'
        },
        {
            title:'Video',
            iconCss:'speeddial-icons speeddial-icon-video'
        }
    ]

    let topLeft : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-success",
        position:'TopLeft'
        });
    topLeft.appendTo('#btn1');

    let topCenter : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-warning",
        position:'TopCenter'
        });
    topCenter.appendTo('#btn2');

    let topRight : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-success",
        position:'TopRight'
        });
    topRight.appendTo('#btn3');

    let middleLeft : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-warning",
        position:'MiddleLeft',
        direction:'Right'
        });
    middleLeft.appendTo('#btn4');

    let middleCenter : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        position:'MiddleCenter'
        });
    middleCenter.appendTo('#btn5');

    let middleRight : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-warning",
        position:'MiddleRight',
        direction:'Left'
        });
    middleRight.appendTo('#btn6');

    let bottomLeft : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-success",
        position:'BottomLeft'
        });
    bottomLeft.appendTo('#btn7');

    let bottomCenter : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-warning",
        position:'BottomCenter'
        });
    bottomCenter.appendTo('#btn8');

    let bottomRight : SpeedDial = new SpeedDial(
        {
        openIconCss:'speeddial-icons speeddial-icon-upload',
        items:items,
        target: '#target',
        cssClass:"e-success",
        position:'BottomRight'
        });
    bottomRight.appendTo('#btn9');
};
