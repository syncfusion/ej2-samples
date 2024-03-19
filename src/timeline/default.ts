import { loadCultureFiles } from '../common/culture-loader';
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

/**
 *  Sample for default functionalities
 */
(window as any).default = (): void => {
    loadCultureFiles();
    
    const defaultTimeline = new Timeline({
        items: [
            { content: 'Ordered \n 9:15 AM, January 1, 2024', dotCss: 'state-success', cssClass: 'completed' },
            { content: 'Shipped \n 12:20 PM, January 4, 2024', dotCss: 'state-success', cssClass: 'completed' },
            { content: 'Out for delivery \n 07:00 AM, January 8, 2024', dotCss: 'state-progress', cssClass: 'intermediate' },
            { content: 'Delivered \n Estimated delivery by 09:20 AM' }
        ]
    });
    defaultTimeline.appendTo('#default');
};
