import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { Ajax } from '@syncfusion/ej2-base';
import { ListView } from '@syncfusion/ej2-lists';

/**
 * loading ajax content sample
 */

this.default = () => {
    let listObj: ListView = new ListView({
        dataSource: [
            { id: 1, text: 'Australia' },
            { id: 2, text: 'Bhutan' },
            { id: 3, text: 'China' },
            { id: 4, text: 'Cuba' },
            { id: 5, text: 'India' },
            { id: 6, text: 'Switzerland' },
            { id: 7, text: 'United States' }
        ],
        fields: { text: 'text', tooltip: 'id' }
    });
    listObj.appendTo('#countrylist');
    let tooltip: Tooltip = new Tooltip({
        content: 'Loading...',
        target: '#countrylist [title]',
        position: 'right center',
        beforeRender: onBeforeRender
    });
    tooltip.appendTo('#Tooltip');
};
function onBeforeRender(args: TooltipEventArgs): void {
    this.content = 'Loading...';
    this.dataBind();
    let ajax: Ajax = new Ajax('./src/tooltip/tooltipdata.json', 'GET', true);
    ajax.send().then(
        (result: any) => {
            result = JSON.parse(result);
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