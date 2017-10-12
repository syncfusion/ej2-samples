/**
 * DropDownList Grouping & Icons Samples
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';


this.default = () => {

    let vegetables: { [key: string]: Object }[] = [
        { vegetable: 'Cabbage', category: 'Leafy and Salad', id: 'item1' },
        { vegetable: 'Chickpea', category: 'Beans', id: 'item2' },
        { vegetable: 'Garlic', category: 'Bulb and Stem', id: 'item3' },
        { vegetable: 'Green bean', category: 'Beans', id: 'item4' },
        { vegetable: 'Horse gram', category: 'Beans', id: 'item5' },
        { vegetable: 'Nopal', category: 'Bulb and Stem', id: 'item6' },
        { vegetable: 'Onion', category: 'Bulb and Stem', id: 'item7' },
        { vegetable: 'Pumpkins', category: 'Leafy and Salad', id: 'item8' },
        { vegetable: 'Spinach', category: 'Leafy and Salad', id: 'item9' },
        { vegetable: 'Wheat grass', category: 'Leafy and Salad', id: 'item10' },
        { vegetable: 'Yarrow', category: 'Leafy and Salad', id: 'item11' }
    ];

    let socialMedia: { [key: string]: Object }[] = [
        { class: 'facebook', socialMedia: 'Facebook', id: 'media1' },
        { class: 'google-plus', socialMedia: 'Google Plus', id: 'media2' },
        { class: 'instagram', socialMedia: 'Instagram', id: 'media3' },
        { class: 'linkedin', socialMedia: 'LinkedIn', id: 'media4' },
        { class: 'skype', socialMedia: 'Skype', id: 'media5' },
        { class: 'tumblr', socialMedia: 'Tumblr', id: 'media6' },
        { class: 'twitter', socialMedia: 'Twitter', id: 'media7' },
        { class: 'vimeo', socialMedia: 'Vimeo', id: 'media8' },
        { class: 'whatsapp', socialMedia: 'WhatsApp', id: 'media9' },
        { class: 'youtube', socialMedia: 'YouTube', id: 'media10' }
    ];

    let groupList: DropDownList = new DropDownList({
        dataSource: vegetables,
        fields: { groupBy: 'category', text: 'vegetable', value: 'id' },
        placeholder: 'Select a vegetable',
        popupHeight: '200px'
    });
    groupList.appendTo('#vegetables');

    let iconList: DropDownList = new DropDownList({
        dataSource: socialMedia,
        fields: { text: 'socialMedia', iconCss: 'class', value: 'id' },
        placeholder: 'Select a social media',
        popupHeight: '200px'
    });
    iconList.appendTo('#icons');
};