/**
 *  Sample for CSS Accordion Integration
 */
import { Accordion } from '@syncfusion/ej2-navigations';
import { createElement } from '@syncfusion/ej2-base';

this.default = () => {
    // Assigning badge data
    let badgeContent: string[] = ['7 New', '27 New', '2 New', '14 New'];

    let template: string = '<div style="display:none"><li class="msg"><span class="e-acrdn-icons e-content-icon people">' +
        '</span>Message Thread</li><li class="msg"><span class="e-acrdn-icons e-content-icon people"></span>Message Thread</li></div>';
    //Initialize Accordion component
    let acrdnObj: Accordion = new Accordion({
        // Assigning accordion data 
        items: [
            { header: 'Robert', iconCss: 'e-people e-acrdn-icons', content: template, expanded: true },
            { header: 'Kevin', iconCss: 'e-people e-acrdn-icons', content: template },
            { header: 'Eric', iconCss: 'e-people e-acrdn-icons', content: template },
            { header: 'Peter', iconCss: 'e-people e-acrdn-icons', content: template }
        ],
        created: () => {
            // Appending Badge component after the accordion rendered in created event
            let element: HTMLElement = document.getElementById('accordion');
            let iconElement: HTMLElement[] = Array.prototype.slice.call((element as HTMLElement).querySelectorAll('.e-toggle-icon'));
            for (let i: number = 0; i < iconElement.length; i++) {
                // Success Badge Element
                let badge: HTMLSpanElement = createElement('span', { className: 'e-badge e-badge-success' });
                badge.textContent = badgeContent[i];
                iconElement[i].appendChild(badge);
            }
        }
    });
    //Render initialized Accordion component
    acrdnObj.appendTo('#accordion');
};