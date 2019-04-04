import { loadCultureFiles } from '../common/culture-loader';
/**
 * Accordion Ajax Sample
 */
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';
import { Ajax } from '@syncfusion/ej2-base';

let acrdnObj: Accordion;
let nestAcrdn: Accordion;
(window as any).default = (): void => {
    loadCultureFiles();

    let ajax: Ajax = new Ajax('./src/accordion/ajax-content.html', 'GET', true);
    ajax.send().then();
    ajax.onSuccess = (data: string): void => {
        //Initialize Accordion component
        acrdnObj = new Accordion({
            expandMode: 'Single',
            expanding: expand,
            items: [
                { header: 'Network & Connectivity', content: data, expanded: true },
                { header: 'Feature', content: '<div id="nested_Acc"></div>' },
                { header: 'Hardware & Software', content: '#Hard_Soft_features' }
            ]
        });
        //Render initialized Accordion component
        acrdnObj.appendTo('#Accordion_Nested');
    };
};
//Expanding Event function for Accordion component.
function expand(e: ExpandEventArgs): void {
    if (e.isExpanded && [].indexOf.call(this.items, e.item) === 1) {
        if (e.element.querySelectorAll('.e-accordion').length > 0) {
            return;
        }
        //Initialize Nested Accordion component
        nestAcrdn = new Accordion({
            expandMode: 'Single',
            items: [
                { header: 'Sensor', content: '#Sensor_features' },
                { header: 'Camera', content: '#Camera_features' },
                { header: 'Video Recording', content: '#Video_Rec_features' },
            ]
        });
        //Render initialized Nested Accordion component
        nestAcrdn.appendTo('#nested_Acc');
    }
}
