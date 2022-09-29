import { loadCultureFiles } from '../common/culture-loader';
import { Fab } from "@syncfusion/ej2-buttons";

(window as any).default = (): void => {
    loadCultureFiles();

    //Primary
    let fabObj1: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        position: 'BottomCenter',
        target: '#target1',
    })
    fabObj1.appendTo('#fab1')

    //Normal
    let fabObj2: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        isPrimary: false,
        position: 'BottomCenter',
        target: '#target2',
    })
    fabObj2.appendTo('#fab2')

    //Outline
    let fabObj3: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        cssClass: 'e-outline',
        position: 'BottomCenter',
        target: '#target3',
    })
    fabObj3.appendTo('#fab3')

    //Success
    let fabObj4: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        cssClass: 'e-success',
        position: 'BottomCenter',
        target: '#target4',
    })
    fabObj4.appendTo('#fab4')

    //Warning
    let fabObj5: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        cssClass: 'e-warning',
        position: 'BottomCenter',
        target: '#target5',
    })
    fabObj5.appendTo('#fab5')

    //Danger
    let fabObj6: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        cssClass: 'e-danger',
        position: 'BottomCenter',
        target: '#target6',
    })
    fabObj6.appendTo('#fab6')

    //Info
    let fabObj7: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        cssClass: 'e-info',
        position: 'BottomCenter',
        target: '#target7',
    })
    fabObj7.appendTo('#fab7')

    //On hover
    let fabObj8: Fab = new Fab({
        iconCss: 'fab-icons fab-icon-shopping',
        position: 'BottomCenter',
        content:'<span class="text-container"><span class="textEle">Shopping</span></span>',
        cssClass: 'fab-hover',
        target: '#target8',
    })
    fabObj8.appendTo('#fab8')

};