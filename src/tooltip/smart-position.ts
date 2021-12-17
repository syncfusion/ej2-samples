/**
 * Tooltip smart position sample
 */

import { Tooltip } from '@syncfusion/ej2-popups';
import { Draggable } from '@syncfusion/ej2-base';

(window as any).default = () => {

    //Initialize Tooltip component
    let tooltip: Tooltip = new Tooltip({

        //Set tooltip content
        content: 'Drag me anywhere, to start walking with me !!!',

        //Set tooltip offsetX
        offsetX: -15,

        //Set tooltip target
        target: '#demoSmart',

        //Set tooltip animation
        animation: { open: { effect: 'None' }, close: { effect: 'None' } }
    });

    //Render initialized Tooltip component
    tooltip.appendTo('#targetContainer');

    //Handle tooltip smart positioning.
    let ele: HTMLElement = document.getElementById('demoSmart');
    let drag: Draggable = new Draggable(ele, { //Initialize Draggable for tooltip element
        clone: false,
        dragArea: '#targetContainer',
        drag: (args: any) => {
            if (args.element.getAttribute('data-tooltip-id') === null) {
                tooltip.open(args.element);
            } else {
                tooltip.refresh(args.element);
            }
        },
        dragStart: (args: any) => {
            if (args.element.getAttribute('data-tooltip-id') !== null) { return; }
            tooltip.open(args.element);
        },
        dragStop: (args: any) => {
            tooltip.close();
        }
    });
};
