import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS Accordion Integration
 */
import { Accordion } from '@syncfusion/ej2-navigations';
import { createElement } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();
    let template: string = '<div><ul><li class="msg"><span class="e-acrdn-icons e-content-icon people">' +
        '</span>Message Thread</li><li class="msg"><span class="e-acrdn-icons e-content-icon people"></span>Message Thread</li></ul></div>';
    
        let headercontent1: string  = '<span>Robert</span><span class="e-badge e-badge-success">7 New</span>';
    let headercontent2: string  = '<span>Kevin</span><span class="e-badge e-badge-success">27 New</span>';
    let headercontent3: string  = '<span>Eric</span><span class="e-badge e-badge-success">2 New</span>';
    let headercontent4: string  = '<span>Peter</span><span class="e-badge e-badge-success">14 New</span>';
    //Initialize Accordion component
    let acrdnObj: Accordion = new Accordion({
        // Assigning accordion data
        items: [
            { header: headercontent1, iconCss: 'e-people e-acrdn-icons', content: template, expanded: true },
            { header: headercontent2, iconCss: 'e-people e-acrdn-icons', content: template },
            { header: headercontent3, iconCss: 'e-people e-acrdn-icons', content: template },
            { header: headercontent4, iconCss: 'e-people e-acrdn-icons', content: template }
        ]
    });
    //Render initialized Accordion component
    acrdnObj.appendTo('#accordion');
};
