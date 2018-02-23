

/**
 * DropDownList Diacritics functionality Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';

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
    // initialize DropDownList component
    let ddlObj: DropDownList = new DropDownList({
        //set the local data to dataSource property
        dataSource: data,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a value',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true,
        // set true for enable the filtering support.
        allowFiltering: true,
        filterBarPlaceholder: 'e.g: aero'
    });
    ddlObj.appendTo('#list');
};