import { loadCultureFiles } from '../common/culture-loader';

import { BlockEditor } from "@syncfusion/ej2-blockeditor"
import { blockDataOverview } from './blockData';

/**
 * Overview sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let overviewBlockEditor: BlockEditor = new BlockEditor({
        blocks: blockDataOverview,
    });    
    overviewBlockEditor.appendTo('#block-editor');
};
