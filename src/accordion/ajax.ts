/**
 * Accordion Ajax Sample
 */
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';
import { Ajax } from '@syncfusion/ej2-base';

let acrdnObj: Accordion;
let nestAcrdn: Accordion;
this.default = () => {

    let ajax: Ajax = new Ajax('./src/accordion/Ajax_content.html', 'GET', true);
    ajax.send().then();
    ajax.onSuccess = (data: string): void => {
        acrdnObj = new Accordion({
            expandMode: 'Single',
            expanding: expand,
            items: [
                { header: 'Network & Connectivity', content: data, expanded: true },
                { header: 'Feature', content: '<div id="nested_Acc"></div>' },
                { header: 'Hardware & Software', content: '#Hard_Soft_features' }
            ]
        });
        acrdnObj.appendTo('#Accordion_Nested');
    };
};
function expand(e: ExpandEventArgs): void {
    if (e.isExpanded && [].indexOf.call(this.items, e.item) === 1) {
        if (e.element.querySelectorAll('.e-accordion').length > 0) {
            return;
        }
        nestAcrdn = new Accordion({
            expandMode: 'Single',
            items: [
                { header: 'Sensor', content: '#Sensor_features' },
                { header: 'Camera', content: '#Camera_features' },
                { header: 'Video Recording', content: '#Video_Rec_features' },
            ]
        });
        nestAcrdn.appendTo('#nested_Acc');
    }
}
