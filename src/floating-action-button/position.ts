import { loadCultureFiles } from '../common/culture-loader';
import { Fab } from "@syncfusion/ej2-buttons";

 (window as any).default = (): void => {
    loadCultureFiles();

    let fabObj1: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-success",
        position: 'TopLeft',
        target: '#target'
    });
    fabObj1.appendTo('#fab1');

    let fabObj2: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-warning",
        position: 'TopCenter',
        target: '#target'
    });
    fabObj2.appendTo('#fab2');

    let fabObj3: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-success",
        position: 'TopRight',
        target: '#target'
    });
    fabObj3.appendTo('#fab3');

    let fabObj4: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-warning",
        position: 'MiddleLeft',
        target: '#target'
    });
    fabObj4.appendTo('#fab4');

    let fabObj5: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        position: 'MiddleCenter',
        target: '#target'
    });
    fabObj5.appendTo('#fab5');

    let fabObj6: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-warning",
        position: 'MiddleRight',
        target: '#target'
    });
    fabObj6.appendTo('#fab6');

    let fabObj7: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-success",
        position: 'BottomLeft',
        target: '#target'
    });
    fabObj7.appendTo('#fab7');

    let fabObj8: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-warning",
        position: 'BottomCenter',
        target: '#target'
    });
    fabObj8.appendTo('#fab8');

    let fabObj9: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-people',
        cssClass:"e-success",
        position: 'BottomRight',
        target: '#target'
    });
    fabObj9.appendTo('#fab9');

};