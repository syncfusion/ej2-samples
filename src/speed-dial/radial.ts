import { loadCultureFiles } from '../common/culture-loader';
import { RadialSettings, RadialSettingsModel, SpeedDial, SpeedDialItemModel } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();

    let items: SpeedDialItemModel[] = [
        {
            title: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            title: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            title: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            title: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            title: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ]

    let radialSetting: RadialSettingsModel = { offset: '70px' };
    let radialSetting1: RadialSettingsModel = { offset: '110px' };

    let topLeft: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            cssClass:"e-success",
            radialSettings:radialSetting1,
            position: 'TopLeft',
            mode: 'Radial'
        });
    topLeft.appendTo('#btn1');



    let topCenter: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            radialSettings:radialSetting,
            cssClass:"e-warning",
            position: 'TopCenter',
            mode: 'Radial'
        });
    topCenter.appendTo('#btn2');

    let topRight: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            cssClass:"e-success",
            radialSettings:radialSetting1,
            position: 'TopRight',
            mode: 'Radial'
        });
    topRight.appendTo('#btn3');

    let middleLeft: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            radialSettings:radialSetting,
            cssClass:"e-warning",
            position: 'MiddleLeft',
            mode: 'Radial'
        });
    middleLeft.appendTo('#btn4');

    let middleCenter: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            radialSettings:radialSetting,
            position: 'MiddleCenter',
            mode: 'Radial'
        });
    middleCenter.appendTo('#btn5');

    let middleRight: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            radialSettings:radialSetting,
            cssClass:"e-warning",
            position: 'MiddleRight',
            mode: 'Radial'
        });
    middleRight.appendTo('#btn6');

    let bottomLeft: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            cssClass:"e-success",
            radialSettings:radialSetting1,
            position: 'BottomLeft',
            mode: 'Radial'
        });
    bottomLeft.appendTo('#btn7');

    let bottomCenter: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            radialSettings:radialSetting,
            cssClass:"e-warning",
            position: 'BottomCenter',
            mode: 'Radial'
        });
    bottomCenter.appendTo('#btn8');

    let bottomRight: SpeedDial = new SpeedDial(
        {
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            cssClass:"e-success",
            radialSettings:radialSetting1,
            position: 'BottomRight',
            mode: 'Radial'
        });
    bottomRight.appendTo('#btn9');
};
