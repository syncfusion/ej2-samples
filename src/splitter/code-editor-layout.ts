import { loadCultureFiles } from '../common/culture-loader';
import { Splitter } from '@syncfusion/ej2-layouts';
/**
 *  Sample for code editor layout
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let splitObj1: Splitter = new Splitter({
        height: '220px',
        paneSettings: [
            { size: '29%', min: '23%' },
            { size: '20%', min: '15%' },
            { size: '35%', min: '35%' }
        ],
        width: '100%'
    });
    splitObj1.appendTo('#splitter1');
    let splitObj2: Splitter = new Splitter({
        height: '400px',
        paneSettings: [
            { size: '53%', min: '30%' },
        ],
        orientation: 'Vertical'
    });
    splitObj2.appendTo('#splitter2');
};
