/**
 * AutoComplete Default functionality Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

this.default = () => {
    let sportsData: string[] = ['Badminton', 'Basketball', 'Cricket',
        'Football', 'Golf', 'Gymnastics',
        'Hockey', 'Rugby', 'Snooker', 'Tennis'];
    let atcObj: AutoComplete = new AutoComplete({
        dataSource: sportsData,
        value: 'Basketball',
        placeholder: 'e.g. Basketball'
    });
    atcObj.appendTo('#games');
};