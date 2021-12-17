import { loadCultureFiles } from '../common/culture-loader';
/**
 * Tooltip default sample
 */

import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

(window as any).default = (): void => {
    loadCultureFiles();

    //Initialize Button component
    let button: Button = new Button();

    //Render initialized Button component
    button.appendTo('#Tooltip');

    //Initialize Tooltip component
    let tooltip: Tooltip = new Tooltip({

        //Set tooltip content
        content: "Let's go green to save the planet!!"

    });

    //Render initialized Tooltip component
    tooltip.appendTo('#Tooltip');

    //Handle tooltip position based on drop-down value change
    document.querySelector('#positions').addEventListener('change', function (): void {
        tooltip.position = this.value;
    });
};
