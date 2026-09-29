import { loadCultureFiles } from '../common/culture-loader';
import { Tab } from '@syncfusion/ej2-navigations';
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

(window as any).default = (): void => {
    loadCultureFiles();
    const tabObj: Tab = new Tab({
        items: [
            {
                header: {
                    text: 'Summary',
                    iconCss: 'e-icons e-description'
                },
                content: '<div id="rte-container"></div>'
            },
            {
                header: {
                    text: 'Remedies',
                    iconCss: 'e-icons e-description'
                },
                content: '<div style="padding:16px">Remedies Content</div>'
            },
            {
                header: {
                    text: 'Notes',
                    iconCss: 'e-icons e-description'
                },
                content: '<div style="padding:16px">Notes Content</div>'
            }
        ],

        created: (): void => {
            initializeRTE();
        }
    });

    function initializeRTE(): void {

        const editor = new RichTextEditorUI({
            placeholder: 'Type something'
        });
        editor.appendTo('#rte-container');
    }

    tabObj.appendTo('#tab-default');
};