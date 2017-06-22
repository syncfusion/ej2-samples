import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * tooltip position sample
 */

this.default = () => {
    let button: Button = new Button();
    button.appendTo('#Tooltip');
    let tooltip: Tooltip = new Tooltip({
        content: 'Lets go green & Save Earth !!!'
    });
    tooltip.appendTo('#Tooltip');
    document.querySelector('#positions').addEventListener('change', function (): void {
        tooltip.position = this.value;
    });
};
