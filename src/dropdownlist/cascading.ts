/**
 * DropDownList Cascading Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

this.default = () => {
    let country: { [key: string]: Object }[] = [
        { countryName: 'Australia', countryId: '2' },
        { countryName: 'United States', countryId: '1' }
    ];
    let state: { [key: string]: Object }[] = [
        { stateName: 'New York', countryId: '1', stateId: '101' },
        { stateName: 'Queensland', countryId: '2', stateId: '104' },
        { stateName: 'Tasmania ', countryId: '2', stateId: '105' },
        { stateName: 'Victoria', countryId: '2', stateId: '106' },
        { stateName: 'Virginia ', countryId: '1', stateId: '102' },
        { stateName: 'Washington', countryId: '1', stateId: '103' }
    ];
    let cities: { [key: string]: Object }[] = [
        { cityName: 'Aberdeen', stateId: '103', cityId: 207 },
        { cityName: 'Alexandria', stateId: '102', cityId: 204 },
        { cityName: 'Albany', stateId: '101', cityId: 201 },
        { cityName: 'Beacon ', stateId: '101', cityId: 202 },
        { cityName: 'Brisbane ', stateId: '104', cityId: 211 },
        { cityName: 'Cairns', stateId: '104', cityId: 212 },
        { cityName: 'Colville ', stateId: '103', cityId: 208 },
        { cityName: 'Devonport', stateId: '105', cityId: 215 },
        { cityName: 'Emporia', stateId: '102', cityId: 206 },
        { cityName: 'Geelong', stateId: '106', cityId: 218 },
        { cityName: 'Hampton ', stateId: '102', cityId: 205 },
        { cityName: 'Healesville ', stateId: '106', cityId: 217 },
        { cityName: 'Hobart', stateId: '105', cityId: 213 },
        { cityName: 'Launceston ', stateId: '105', cityId: 214 },
        { cityName: 'Lockport', stateId: '101', cityId: 203 },
        { cityName: 'Melbourne', stateId: '106', cityId: 216 },
        { cityName: 'Pasco', stateId: '103', cityId: 209 },
        { cityName: 'Townsville', stateId: '104', cityId: 210 }
    ];
    let countryObj: DropDownList = new DropDownList({
        dataSource: country,
        fields: { value: 'countryId', text: 'countryName' },
        popupHeight: 'auto',
        change: () => {
            stateObj.enabled = true;
            let tempQuery: Query = new Query().where('countryId', 'equal', countryObj.value);
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
        fields: { value: 'stateId', text: 'stateName' },
        popupHeight: 'auto',
        enabled: false,
        change: () => {
            cityObj.enabled = true;
            let tempQuery1: Query = new Query().where('stateId', 'equal', stateObj.value);
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
        fields: { text: 'cityName', value: 'cityId' },
        enabled: false,
        placeholder: 'Select a city'
    });
    cityObj.appendTo('#city');
};