import { loadCultureFiles } from '../common/culture-loader';
import { Splitter } from '@syncfusion/ej2-layouts';
/**
 *  Sample for default functionalities
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let splitObj1: Splitter = new Splitter({
        height: '110px',
        paneSettings: [
            { size: '25%', min: '60px' },
            { size: '50%', min: '60px' },
            { size: '25%', min: '60px' }
        ],
        width: '100%',
        separatorSize: 4
    });
    splitObj1.appendTo('#horizontal');
    let splitObj2: Splitter = new Splitter({
        height: '240px',
        paneSettings: [
            { size: '30%', min: '60px' },
            { size: '40%', min: '60px' },
            { size: '30%', min: '60px' }
        ],
        width: '100%',
        orientation: 'Vertical',
        separatorSize: 4
    });
    splitObj2.appendTo('#vertical');
};
