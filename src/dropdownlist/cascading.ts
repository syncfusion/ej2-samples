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
        { CityName: 'Townsville', StateId: '104', CityId: 210 }
    ];
    let countryObj: DropDownList = new DropDownList({
        dataSource: country,
        popupHeight: 'auto',
        fields: { value: 'CountryId', text: 'CountryName' },
        change: () => {
            stateObj.enabled = true;
            let tempQuery: Query = new Query().where('CountryId', 'equal', countryObj.value);
            stateObj.query = tempQuery;
            stateObj.text = null;
            stateObj.dataBind();
            cityObj.text = null;
            cityObj.enabled = false;
            cityObj.dataBind();
        },
        placeholder: 'Select a country'
    });
    countryObj.appendTo('#country');


    let stateObj: DropDownList = new DropDownList({
        dataSource: state,
        popupHeight: 'auto',
        fields: { value: 'StateId', text: 'StateName' },
        enabled: false,
        change: () => {
            cityObj.enabled = true;
            let tempQuery1: Query = new Query().where('StateId', 'equal', stateObj.value);
            cityObj.query = tempQuery1;
            cityObj.text = null;
            cityObj.dataBind();
        },
        placeholder: 'Select a state'
    });
    stateObj.appendTo('#state');

    let cityObj: DropDownList = new DropDownList({
        dataSource: cities,
        popupHeight: 'auto',
        fields: { text: 'CityName', value: 'CityId' },
        enabled: false,
        placeholder: 'Select a city'
    });
    cityObj.appendTo('#city');
};