/**
 * ListView Default Sample
 */
import {ListView} from '@syncfusion/ej2-lists';

this.default = () => {

    //Define an array of JSON data
    let data: { [key: string]: Object }[] = [
        { text: 'Hennessey Venom', id: 'list-01' },
        { text: 'Bugatti Chiron', id: 'list-02' },
        { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
        { text: 'SSC Ultimate Aero', id: 'list-04' },
        { text: 'Koenigsegg CCR', id: 'list-05' },
        { text: 'McLaren F1', id: 'list-06' },
        { text: 'Aston Martin One- 77', id: 'list-07' },
        { text: 'Jaguar XJ220', id: 'list-08' },
        { text: 'McLaren P1', id: 'list-09' },
        { text: 'Ferrari LaFerrari', id: 'list-10' },
    ];

    //Initialize ListView component
    let listObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: data

    });

    //Render initialized ListView component
    listObj.appendTo('#listview-def');

    //Define an array of JSON data
    let dataSource: { [key: string]: Object }[] = [
        {
            'text': 'Audi A4',
            'id': '9bdb',
            'category': 'Audi'
        },
        {
            'text': 'Audi A5',
            'id': '4589',
            'category': 'Audi'
        },
        {
            'text': 'Audi A6',
            'id': 'e807',
            'category': 'Audi'
        },
        {
            'text': 'Audi A7',
            'id': 'a0cc',
            'category': 'Audi'
        },
        {
            'text': 'Audi A8',
            'id': '5e26',
            'category': 'Audi'
        },
        {
            'text': 'BMW 501',
            'id': 'f849',
            'category': 'BMW'
        },
        {
            'text': 'BMW 502',
            'id': '7aff',
            'category': 'BMW'
        },
        {
            'text': 'BMW 503',
            'id': 'b1da',
            'category': 'BMW'
        },
        {
            'text': 'BMW 507',
            'id': 'de2f',
            'category': 'BMW'
        },
        {
            'text': 'BMW 3200',
            'id': 'b2b1',
            'category': 'BMW'
        }
    ];

    //Initialize ListView component
    let grpListObj: ListView = new ListView({

        //Set defined data to dataSource property
        dataSource: dataSource,

        //Map the appropriate columns to fields property
        fields: { groupBy: 'category' }
    });

    //Render initialized ListView component
    grpListObj.appendTo('#listview-grp');
};