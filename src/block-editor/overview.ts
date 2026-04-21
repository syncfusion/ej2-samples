import { loadCultureFiles } from '../common/culture-loader';

import { BlockEditor } from "@syncfusion/ej2-blockeditor"
import * as data from './blockData.json';

/**
 * Overview sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    const blocksFromJson = (data as any)["blockDataOverview"];
    const blockForUser = (data as any)["users"];

    let overviewBlockEditor: BlockEditor = new BlockEditor({
        blocks: blocksFromJson,
        users:blockForUser,
        imageBlockSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/RichTextEditor/SaveFile',
            path: 'https://services.syncfusion.com/js/production/RichTextEditor/'
        },
        inlineToolbarSettings: {
            items: [ 'Transform' ,'Bold', 'Italic', 'Underline', 'Strikethrough', 'Uppercase', 'Lowercase', 'Subscript', 'Superscript', 'InlineCode', 'Link', 'Color', 'Backgroundcolor' ]
        }
    });    
    overviewBlockEditor.appendTo('#block-editor');
};
