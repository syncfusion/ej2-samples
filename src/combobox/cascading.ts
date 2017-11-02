/**
 * ComboBox Cascading Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
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
        { CityName: 'Aberdeen', StateId: '103', CityId: 207 },
        { CityName: 'Alexandria', StateId: '102', CityId: 204 },
        { CityName: 'Albany', StateId: '101', CityId: 201 },
        { CityName: 'Beacon ', StateId: '101', CityId: 202 },
        { CityName: 'Brisbane ', StateId: '104', CityId: 211 },
        { CityName: 'Cairns', StateId: '104', CityId: 212 },
        { CityName: 'Colville ', StateId: '103', CityId: 208 },
        { CityName: 'Devonport', StateId: '105', CityId: 215 },
        { CityName: 'Emporia', StateId: '102', CityId: 206 },
        { CityName: 'Geelong', StateId: '106', CityId: 218 },
        { CityName: 'Hampton ', StateId: '102', CityId: 205 },
        { CityName: 'Healesville ', StateId: '106', CityId: 217 },
        { CityName: 'Hobart', StateId: '105', CityId: 213 },
        { CityName: 'Launceston ', StateId: '105', CityId: 214 },
        { CityName: 'Lockport', StateId: '101', CityId: 203 },
        { CityName: 'Melbourne', StateId: '106', CityId: 216 },
        { CityName: 'Pasco', StateId: '103', CityId: 209 },
        { CityName: 'Townsville', StateId: '104', CityId: 210 },
    ];
    let countryList: ComboBox = new ComboBox({
        dataSource: country,
        popupHeight: 'auto',
        fields: { value: 'CountryId', text: 'CountryName' },
        allowCustom: false,
        change: () => {
            if (countryList.value === null) {
                stateList.enabled = false;
                cityList.enabled = false;
                stateList.value = null;
                cityList.value = null;
            } else {
                stateList.enabled = true;
                let tempQuery: Query = new Query().where('CountryId', 'equal', countryList.value);
                stateList.query = tempQuery;
                stateList.value = null;
                cityList.value = null;
                cityList.enabled = false;
            }
            stateList.dataBind();
            cityList.dataBind();
        },
        placeholder: 'Select a country'
    });
    countryList.appendTo('#country');

    let stateList: ComboBox = new ComboBox({
        dataSource: state,
        popupHeight: 'auto',
        fields: { value: 'StateId', text: 'StateName' },
        enabled: false,
        allowCustom: false,
        change: () => {
            if (stateList.value === null) {
                cityList.enabled = false;
                cityList.value = null;
            } else {
                cityList.enabled = true;
                let tempQuery: Query = new Query().where('StateId', 'equal', stateList.value);
                cityList.query = tempQuery;
                cityList.value = null;
            }
            cityList.dataBind();
        },
        placeholder: 'Select a state'
    });
    stateList.appendTo('#state');


    let cityList: ComboBox = new ComboBox({
        dataSource: cities,
        popupHeight: 'auto',
        fields: { text: 'CityName', value: 'CityId' },
        enabled: false,
        allowCustom: false,
        placeholder: 'Select a city'
    });
    cityList.appendTo('#city');
};