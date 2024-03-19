import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Cascading Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    let countryList: ComboBox = new ComboBox({
        // set the country data to dataSource property
        dataSource: (data as any).country,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { value: 'CountryId', text: 'CountryName' },
        // set false for disable the behavior of custom value rendering
        allowCustom: false,
        // bind change event
        change: () => {
            if (countryList.value === null) {
                // disable the state ComboBox
                stateList.enabled = false;
                // disable the city ComboBox
                cityList.enabled = false;
                // set null value to state Combobox text property
                stateList.value = null;
                // set null value to city ComboBox text property
                cityList.value = null;
            } else {
                stateList.enabled = true;
                // frame the query based on selected value in country ComboBox.
                let tempQuery: Query = new Query().where('CountryId', 'equal', countryList.value as string);
                // set the framed query based on selected value in country Combobox.
                stateList.query = tempQuery;
                 // set null value to state Combobox text property
                stateList.value = null;
                 // set null value to city ComboBox text property
                cityList.value = null;
                // disable the city ComboBox
                cityList.enabled = false;
            }
            // bind the property changes to state ComboBox
            stateList.dataBind();
             // bind the property changes to City ComboBox
            cityList.dataBind();
        },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a country'
    });
    countryList.appendTo('#country');

    let stateList: ComboBox = new ComboBox({
        // set the state data to dataSource property
        dataSource: (data as any).state,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { value: 'StateId', text: 'StateName' },
        // set disable state by default to prevent user interact.
        enabled: false,
        // set false for disable the behavior of custom value rendering
        allowCustom: false,
        // bind change event
        change: () => {
            if (stateList.value === null) {
                cityList.enabled = false;
                cityList.value = null;
            } else {
                cityList.enabled = true;
                // frame the query based on selected value in state ComboBox.
                let tempQuery: Query = new Query().where('StateId', 'equal', stateList.value as string);
                // set the framed query based on selected value in state ComboBox.
                cityList.query = tempQuery;
                cityList.value = null;
            }
            cityList.dataBind();
        },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a state'
    });
    stateList.appendTo('#state');

    let cityList: ComboBox = new ComboBox({
        // set the city data to dataSource property
        dataSource: (data as any).cities,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { text: 'CityName', value: 'CityId' },
        // set disable state by default to prevent user interact.
        enabled: false,
        // set false for disable the behavior of custom value rendering
        allowCustom: false,
        // set the placeholder to ComboBox input element
        placeholder: 'Select a city'
    });
    cityList.appendTo('#city');
};