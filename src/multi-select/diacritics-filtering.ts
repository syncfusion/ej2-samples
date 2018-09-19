

/**
 * MultiSelect Diacritics functionality Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

this.default = () => {
    // create local data
    let data: string[] = [
        'Águilas',
        'Ajedrez',
        'Ala Delta',
        'Álbumes de Música',
        'Alusivos',
        'Análisis de Escritura a Mano',
        'Dyarbakır',
        'Derepazarı ',
        'Gülümsemek ',
        'Teşekkürler',
        'Güle güle.',
        'Gülhatmi',
        'Gülünç'
    ];
    // initialize MultiSelect component
    let multiObj: MultiSelect = new MultiSelect({
        //set the local data to dataSource property
        dataSource: data,
        // set the placeholder to MultiSelect input element
        placeholder: 'e.g: gul',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true,
        // set true for enable the filtering support.
        allowFiltering: true
    });
    multiObj.appendTo('#list');
};