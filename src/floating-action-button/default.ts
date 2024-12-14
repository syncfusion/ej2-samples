import { loadCultureFiles } from '../common/culture-loader';
import { Fab } from "@syncfusion/ej2-buttons";

 (window as any).default = (): void => {
    loadCultureFiles();

    //Icon and isPrimary is false
    let fabObj1: Fab = new Fab({
        iconCss: 'e-icons e-people',
        position:'MiddleCenter',
        isPrimary: false,
        target: '#target1'
    })
    fabObj1.appendTo('#fab1');

    //Icon with Label
    let fabObj3: Fab = new Fab({
        iconCss: 'e-icons e-people',
        position:'MiddleCenter',
        content:"Contact",
        target: '#target2'
    })
    fabObj3.appendTo('#fab2');

    //Icon with Disabled true
    let fabObj2: Fab = new Fab({
        content: 'Disabled',
        disabled: true,
        position:'MiddleCenter',
        iconCss: 'e-icons e-people',
        target: '#target3',
    })
    fabObj2.appendTo('#fab3');

    //Label only
    let fabObj4: Fab = new Fab({
        content: 'Text Content',
        position:'MiddleCenter',
        cssClass: 'e-warning',
        target: '#target4'
    })
    fabObj4.appendTo('#fab4');

};