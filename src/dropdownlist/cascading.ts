/**
 * DropDownList Cascading Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

this.default = () => {
    let country: { [key: string]: Object }[] = [
        { CountryName: 'Australia', CountryId: '2' },
        { CountryName: 'United States', CountryId: '1' }
    ];
    let state: { [key: string]: Object }[] = [
        { StateName: 'New York', CountryId: '1', StateId: '101' },
        { StateName: 'Queensland', CountryId: '2', StateId: '104' },
        { StateName: 'Tasmania ', CountryId: '2', StateId: '105' },
        { StateName: 'Victoria', CountryId: '2', StateId: '106' },
        { StateName: 'Virginia ', CountryId: '1', StateId: '102' },
        { StateName: 'Washington', CountryId: '1', StateId: '103' }
    ];
    let cities: { [key: string]: Object }[] = [
        { CityName: 'Aberdeen', StateId: '103', CityId: 207 }, { CityName: 'Alexandria', StateId: '102', CityId: 204 },
        { CityName: 'Albany', StateId: '101', CityId: 201 }, { CityName: 'Beacon ', StateId: '101', CityId: 202 },
        { CityName: 'Brisbane ', StateId: '104', CityId: 211 }, { CityName: 'Cairns', StateId: '104', CityId: 212 },
        { CityName: 'Colville ', StateId: '103', CityId: 208 }, { CityName: 'Devonport', StateId: '105', CityId: 215 },
        { CityName: 'Emporia', StateId: '102', CityId: 206 }, { CityName: 'Geelong', StateId: '106', CityId: 218 },
        { CityName: 'Hampton ', StateId: '102', CityId: 205 }, { CityName: 'Healesville ', StateId: '106', CityId: 217 },
        { CityName: 'Hobart', StateId: '105', CityId: 213 }, { CityName: 'Launceston ', StateId: '105', CityId: 214 },
        { CityName: 'Lockport', StateId: '101', CityId: 203 }, { CityName: 'Melbourne', StateId: '106', CityId: 216 },
        { CityName: 'Pasco', StateId: '103', CityId: 209 }, { CityName: 'Townsville', StateId: '104', CityId: 210 }
    ];

    // initialize DropDownList component
    let countryObj: DropDownList = new DropDownList({
        // set the country data to dataSource property
        dataSource: country,
        // set the height of the popup element
        popupHeight: 'auto',
        // map the appropriate columns to fields property
        fields: { value: 'CountryId', text: 'CountryName' },
        // bind the change event
        change: () => {
            // disable the state DropDownList
            stateObj.enabled = true;
            // frame the query based on selected value in country DropDownList.
            let tempQuery: Query = new Query().where('CountryId', 'equal', countryObj.value);
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
        placeholder: 'Select a country'
    });
    countryObj.appendTo('#country');

    //initiates the state DropDownList
    let stateObj: DropDownList = new DropDownList({
        // set the state data to dataSource property
        dataSource: state,
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
            let tempQuery1: Query = new Query().where('StateId', 'equal', stateObj.value);
            // set the framed query based on selected value in city DropDownList.
            cityObj.query = tempQuery1;
            //clear the existing selection
            cityObj.text = null;
            // bind the property change to city DropDownList
            cityObj.dataBind();
        },
        placeholder: 'Select a state'
    });
    stateObj.appendTo('#state');

    let cityObj: DropDownList = new DropDownList({
        // set the city data to dataSource property
        dataSource: cities,
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