/**
 * Loading ajax content sample
 */

import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { Fetch } from '@syncfusion/ej2-base';
import { ListView } from '@syncfusion/ej2-lists';

(window as any).default = () => {

    //Initialize ListView component
    let listObj: ListView = new ListView({

        //Set data to datasource property
        dataSource: [
            { id: '1', text: 'Australia' },
            { id: '2', text: 'Bhutan' },
            { id: '3', text: 'China' },
            { id: '4', text: 'Cuba' },
            { id: '5', text: 'India' },
            { id: '6', text: 'Switzerland' },
            { id: '7', text: 'United States' }
        ],

        //Map appropriate columns to fields property
        fields: { text: 'text', tooltip: 'id' }
    });

    //Render initialized ListView component
    listObj.appendTo('#countrylist');

    //Initialize Tooltip component
    let tooltip: Tooltip = new Tooltip({

        //Set tooltip content
        content: 'Loading...',
        cssClass: 'e-ajax-content',
        //Set tooltip target
        target: '#countrylist [title]',

        //Set tooltip position
        position: 'RightCenter',

        //Raise beforeRender event
        beforeRender: onBeforeRender
    });

    //Render initialized Tooltip component
    tooltip.appendTo('#Tooltip');
};

/**
 * Process tooltip ajax content.
 */

function onBeforeRender(args: TooltipEventArgs): void {
    this.content = 'Loading...';
    this.dataBind();
    let fetchApi: Fetch = new Fetch('./src/tooltip/tooltipdata.json', 'GET');
    fetchApi.send().then(
        (result: any) => {
            for (let i: number = 0; i < result.length; i++) {
                if (result[i].Id === args.target.getAttribute('data-content')) {
                    /* tslint:disable */
                    this.content = "<div class='contentWrap'><span class=" + result[i].Class + "></span><div class='def'>" + result[i].Sports + "</div></div>";
                    /* tslint:enable */
                }
            }
            this.dataBind();
        },
        (reason: any) => {
            this.content = reason.message;
            this.dataBind();
        });
}
