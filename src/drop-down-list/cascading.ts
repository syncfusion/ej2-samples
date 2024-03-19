import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownList Cascading Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize DropDownList component
    let countryObj: DropDownList = new DropDownList({
        // set the country data to dataSource property
        dataSource: (data as any).country,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { value: 'CountryId', text: 'CountryName' },
        // bind the change event
        change: () => {
            // disable the state DropDownList
            stateObj.enabled = true;
            // frame the query based on selected value in country DropDownList.
            let tempQuery: Query = new Query().where('CountryId', 'equal', countryObj.value as string);
            // set the framed query based on selected value in country DropDownList.
            stateObj.query = tempQuery;
            // set null value to state DropDownList text property
            stateObj.text = null;
            // bind the property changes to state DropDownList
            stateObj.dataBind();
            // set null value to city DropDownList text property
            cityObj.text = null;
            // disable the city DropDownList
            cityObj.enabled = false;
            // bind the property changes to City DropDownList
            cityObj.dataBind();
        },
         // set the placeholder to DropDownList input element
        placeholder: 'Select a country'
    });
    countryObj.appendTo('#country');

    //initiates the state DropDownList
    let stateObj: DropDownList = new DropDownList({
        // set the state data to dataSource property
        dataSource: (data as any).state,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { value: 'StateId', text: 'StateName' },
        // set disable state by default to prevent user interact.
        enabled: false,
        // bind the change event
        change: () => {
            // enable the city DropDownList
            cityObj.enabled = true;
            // Query the data source based on state DropDownList selected value
            let tempQuery1: Query = new Query().where('StateId', 'equal', stateObj.value as string);
            // set the framed query based on selected value in city DropDownList.
            cityObj.query = tempQuery1;
            //clear the existing selection
            cityObj.text = null;
            // bind the property change to city DropDownList
            cityObj.dataBind();
        },
         // set the placeholder to DropDownList input element
        placeholder: 'Select a state'
    });
    stateObj.appendTo('#state');

    let cityObj: DropDownList = new DropDownList({
        // set the city data to dataSource property
        dataSource: (data as any).cities,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { text: 'CityName', value: 'CityId' },
        // disable the DropDownList by default to prevent the user interact.
        enabled: false,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a city'
    });
    cityObj.appendTo('#city');
};