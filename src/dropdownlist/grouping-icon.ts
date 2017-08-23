/**
 * DropDownList Grouping & Icons Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    let vegetables: { [key: string]: Object }[] = [
        { vegetable: 'Cabbage', category: 'Leafy and Salad', id: 'item1' },
        { vegetable: 'Spinach', category: 'Leafy and Salad', id: 'item2' },
        { vegetable: 'Wheat grass', category: 'Leafy and Salad', id: 'item3' },
        { vegetable: 'Yarrow', category: 'Leafy and Salad', id: 'item4' },
        { vegetable: 'Pumpkins', category: 'Leafy and Salad', id: 'item5' },
        { vegetable: 'Chickpea', category: 'Beans', id: 'item6' },
        { vegetable: 'Green bean', category: 'Beans', id: 'item7' },
        { vegetable: 'Horse gram', category: 'Beans', id: 'item8' },
        { vegetable: 'Garlic', category: 'Bulb and Stem', id: 'item9' },
        { vegetable: 'Nopal', category: 'Bulb and Stem', id: 'item10' },
        { vegetable: 'Onion', category: 'Bulb and Stem', id: 'item11' }
    ];

    let socialMedia: { [key: string]: Object }[] = [
        { class: 'facebook', socialMedia: 'Facebook', id: 'media1' },
        { class: 'twitter', socialMedia: 'Twitter', id: 'media2' },
        { class: 'whatsapp', socialMedia: 'WhatsApp', id: 'media3' },
        { class: 'tumblr', socialMedia: 'Tumblr', id: 'media4' },
        { class: 'google-plus', socialMedia: 'Google Plus', id: 'media5' },
        { class: 'skype', socialMedia: 'Skype', id: 'media6' },
        { class: 'vimeo', socialMedia: 'Vimeo', id: 'media7' },
        { class: 'instagram', socialMedia: 'Instagram', id: 'media8' },
        { class: 'youtube', socialMedia: 'YouTube', id: 'media9' },
        { class: 'reddit', socialMedia: 'Reddit', id: 'media10' }
    ];

    let groupList: DropDownList = new DropDownList({
        dataSource: vegetables,
        fields: { groupBy: 'category', text: 'vegetable', value: 'id' },
        placeholder: 'Select a vegetable',
        popupHeight: '200px'
    });
    groupList.appendTo('#group');

    let iconList: DropDownList = new DropDownList({
        dataSource: socialMedia,
        fields: { text: 'socialMedia', iconCss: 'class', value: 'id' },
        placeholder: 'Select a social media',
        popupHeight: '200px'
    });
    iconList.appendTo('#icon');
};