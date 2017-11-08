/**
 * AutoComplete Default functionality Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

this.default = () => {
    // create local data
    let sportsData: string[] = ['Badminton', 'Basketball', 'Cricket',
        'Football', 'Golf', 'Gymnastics',
        'Hockey', 'Rugby', 'Snooker', 'Tennis'];

    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: sportsData,
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Basketball'
    });
    atcObj.appendTo('#games');
};