import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { Toolbar } from '@syncfusion/ej2-navigations';
/**
 * tooltip template sample
 */
this.default = () => {
    let toolbarObj: Toolbar = new Toolbar({
        items: [
            {
                prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'Cut'
            },
            {
                prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'Copy'
            },
            {
                prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'Paste'
            },
            {
                type: 'Separator'
            },
            {
                prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'Bold'
            },
            {
                prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'Underline'
            },
            {
                prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'Italic'
            }
        ]
    });
    toolbarObj.appendTo('#Toolbar');
    let tooltip: Tooltip = new Tooltip({
        target: '#Toolbar [title]',
        beforeRender: onBeforeRender,
        showTipPointer: false,
        offsetX: 70,
        width: 170
    });
    tooltip.appendTo('#Tooltip');
};

function onBeforeRender(args: TooltipEventArgs): void {
    let data: any = [
        { title: 'Bold', name: 'Bold (Ctrl+B)', description: 'Makes your text bold.' },
        { title: 'Underline', name: 'Underline (Ctrl+U)', description: 'Underline your text.' },
        { title: 'Italic', name: 'Italic (Ctrl+I)', description: 'Italicize your text.' },
        {
            title: 'Cut', name: 'Cut (Ctrl+X)',
            description: 'Remove the selection and put it on the Clipboard so you can paste it somewhere else.'
        },
        {
            title: 'Copy', name: 'Copy (Ctrl+C)',
            description: 'Put a copy of a selection on the Clipboard so you can paste it somewhere else.'
        },
        { title: 'Paste', name: 'Paste (Ctrl+V)', description: 'Add content on the Clipboard to your document.' }
    ];
    for (let i: number = 0; i < data.length; i++) {
        if (data[i].title === args.target.getAttribute('title')) {
            this.content = '<h6>' + data[i].name + '</h6><p>' + data[i].description + '</p>';
        }
    }
}