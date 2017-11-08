/**
 * Tooltip default sample
 */

import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

this.default = () => {

    //Initialize Button component
    let button: Button = new Button();

    //Render initialized Button component
    button.appendTo('#Tooltip');

    //Initialize Tooltip component
    let tooltip: Tooltip = new Tooltip({

        //Set tooltip content
        content: 'Lets go green & Save Earth !!!'

    });

    //Render initialized Tooltip component
    tooltip.appendTo('#Tooltip');

    //Handle tooltip position based on drop-down value change
    document.querySelector('#positions').addEventListener('change', function (): void {
        tooltip.position = this.value;
    });
};
