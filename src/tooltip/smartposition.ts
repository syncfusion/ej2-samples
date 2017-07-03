import { Tooltip } from '@syncfusion/ej2-popups';
import { Draggable } from '@syncfusion/ej2-base';
/**
 * tooltip sample
 */

this.default = () => {
    let tooltip: Tooltip = new Tooltip({
        content: 'Drag me anywhere, to start walking with me !!!',
        offsetX: -15,
        target: '#demoSmart',
        animation: { open: { effect: 'None' }, close: { effect: 'None' } }
    });
    tooltip.appendTo('#targetContainer');
    let ele: HTMLElement = document.getElementById('demoSmart');
    let drag: Draggable = new Draggable(ele, {
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
