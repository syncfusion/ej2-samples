/**
 * ListView RTL Sample
 */
import {ListView} from '@syncfusion/ej2-lists';

this.default = () => {

    let rtlListObj: ListView = new ListView({ enableRtl: true, headerTitle: 'اسم الدولة', showHeader: true, height: '400px' });
    rtlListObj.appendTo('#listview');

};