import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS tab intergration
 */
import { Toolbar } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    let toolbarObj: Toolbar = new Toolbar();
    //Render initialized Toolbar component
    toolbarObj.appendTo('#toolbar');
};