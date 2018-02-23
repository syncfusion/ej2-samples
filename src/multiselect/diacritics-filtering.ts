

/**
 * MultiSelect Diacritics functionality Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

this.default = () => {
    // create local data
    let data: string[] = [
        'Aeróbics',
        'Aeróbics en Agua',
        'Aerografía',
        'Aeromodelaje',
        'Águilas',
        'Ajedrez',
        'Ala Delta',
        'Álbumes de Música',
        'Alusivos',
        'Análisis de Escritura a Mano'];
    // initialize MultiSelect component
    let multiObj: MultiSelect = new MultiSelect({
        //set the local data to dataSource property
        dataSource: data,
        // set the placeholder to MultiSelect input element
        placeholder: 'e.g: aero',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true,
        // set true for enable the filtering support.
        allowFiltering: true
    });
    multiObj.appendTo('#list');
};