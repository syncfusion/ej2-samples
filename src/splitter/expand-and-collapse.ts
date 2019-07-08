import { loadCultureFiles } from '../common/culture-loader';
import { Splitter } from '@syncfusion/ej2-layouts';
/**
 *  Sample for expand-collapse in splitter
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let splitObj: Splitter = new Splitter({
        height: '385px',
        paneSettings: [
            { size: '48%', collapsible: true },
            { collapsible: true }
        ],
        separatorSize: 3,
        width: '100%'
    });
    splitObj.appendTo('#splitter');
    let splitObj1: Splitter = new Splitter({
        paneSettings: [
            { size: '50%', collapsible: true },
            { collapsible: true }
        ],
        separatorSize: 3,
        orientation: 'Vertical'
    });
    splitObj1.appendTo('#verticalSplitter');
};