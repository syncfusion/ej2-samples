/**
 * AutoComplete Grouping & Icon Samples
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

this.default = () => {
    let vegetableData: { [key: string]: Object }[] = [
        { Vegetable: 'Cabbage', Category: 'Leafy and Salad', Id: 'item1' },
        { Vegetable: 'Chickpea', Category: 'Beans', Id: 'item2' },
        { Vegetable: 'Garlic', Category: 'Bulb and Stem', Id: 'item3' },
        { Vegetable: 'Green bean', Category: 'Beans', Id: 'item4' },
        { Vegetable: 'Horse gram', Category: 'Beans', Id: 'item5' },
        { Vegetable: 'Nopal', Category: 'Bulb and Stem', Id: 'item6' },
        { Vegetable: 'Onion', Category: 'Bulb and Stem', Id: 'item7' },
        { Vegetable: 'Pumpkins', Category: 'Leafy and Salad', Id: 'item8' },
        { Vegetable: 'Spinach', Category: 'Leafy and Salad', Id: 'item9' },
        { Vegetable: 'Wheat grass', Category: 'Leafy and Salad', Id: 'item10' },
        { Vegetable: 'Yarrow', Category: 'Leafy and Salad', Id: 'item11' }
    ];
    let socialMedia: { [key: string]: Object }[] = [
        { Class: 'facebook', SocialMedia: 'Facebook', Id: 'media1' },
        { Class: 'google-plus', SocialMedia: 'Google Plus', Id: 'media2' },
        { Class: 'instagram', SocialMedia: 'Instagram', Id: 'media3' },
        { Class: 'linkedin', SocialMedia: 'LinkedIn', Id: 'media4' },
        { Class: 'skype', SocialMedia: 'Skype', Id: 'media5' },
        { Class: 'tumblr', SocialMedia: 'Tumblr', Id: 'media6' },
        { Class: 'twitter', SocialMedia: 'Twitter', Id: 'media7' },
        { Class: 'vimeo', SocialMedia: 'Vimeo', Id: 'media8' },
        { Class: 'whatsapp', SocialMedia: 'WhatsApp', Id: 'media9' },
        { Class: 'youtube', SocialMedia: 'YouTube', Id: 'media10' }
    ];

    // initialize AutoComplete component
    let groupObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: vegetableData,
        // map the appropriate columns to fields property
        fields: { groupBy: 'Category', value: 'Vegetable' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Cabbage',
        // enabled the popup button to AutoComplete
        showPopupButton: true
    });
    groupObj.appendTo('#vegetables');

    // initialize AutoComplete component
    let iconObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: socialMedia,
        // map the appropriate columns to fields property
        fields: { iconCss: 'Class', value: 'SocialMedia' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Facebook',
        // enabled the popup button to AutoComplete
        showPopupButton: true
    });
    iconObj.appendTo('#icons');
};