/**
 * ListView RTL Sample
 */
import { ListView } from '@syncfusion/ej2-lists';

this.default = () => {

    //Define an array of JSON data
    let data: { [key: string]: Object }[] = [
        { text: 'الجیریا', id: 'list-01' },
        { text: 'ارمینیا', id: 'list-02' },
        { text: 'بنگلا دیش', id: 'list-03' },
        { text: 'کیوبا', id: 'list-04' },
        { text: 'فن لینڈ', id: 'list-05' },
        { text: 'بھارت', id: 'list-06' },
        { text: 'مصر', id: 'list-07' },
        { text: 'ڈنمارک', id: 'list-08' },
        { text: 'ملائیشیا', id: 'list-09' },
        { text: 'نیوزی لینڈ', id: 'list-10' },
        { text: 'ناروے', id: 'list-11' }
    ];

    //Initialize ListView component
    let rtlListObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: data,

        //Enable RTL
        enableRtl: true,

        //Set header title
        headerTitle: 'اسم الدولة',

        //Set true to show header title
        showHeader: true,

        //Pre-defined ListView height
        height: '400px'
    });

    //Render initialized ListView component
    rtlListObj.appendTo('#listview');

};