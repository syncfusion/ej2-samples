/**
 * ListView Default Sample
 */
import {ListView} from '@syncfusion/ej2-lists';

this.default = () => {
    let listObj: ListView = new ListView();
    listObj.appendTo('#listview-def');
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

    let grpListObj: ListView = new ListView({
        dataSource: dataSource,
        fields: { groupBy: 'category' }
    });

    grpListObj.appendTo('#listview-grp');
};