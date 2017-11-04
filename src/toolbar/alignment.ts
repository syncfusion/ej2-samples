/**
 *  Toolbar sample to demonstrate default functionalities.
 */
import { Toolbar } from '@syncfusion/ej2-navigations';

this.default = () => {
    let ele: string = '<div class= "e-folder"><div class = "e-folder-name">Inbox(33)</div>';
    ele = ele +  '<div class ="e-mail-id">user@example.com</div></div> ';
    //Initialize Toolbar component
    let toolbarObj: Toolbar = new Toolbar({
        items: [
            {
              prefixIcon: 'e-tbar-menu-icon tb-icons', tooltipText: 'Menu' },
            {
              template: ele,
              align: 'center' },
            {
              prefixIcon: 'e-tbar-search-icon tb-icons', tooltipText: 'Search', align: 'right' },
            {
              prefixIcon: 'e-tbar-settings-icon tb-icons', tooltipText: 'Popup', align: 'right' } ]
    });
    //Render initialized Toolbar component
    toolbarObj.appendTo('#toolbar_align');
};
