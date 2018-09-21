/**
 *  Sample for CSS tab intergration
 */
import { Toolbar } from '@syncfusion/ej2-navigations';

this.default = () => {
    let toolbarObj: Toolbar = new Toolbar();
    //Render initialized Toolbar component
    toolbarObj.appendTo('#toolbar');
};