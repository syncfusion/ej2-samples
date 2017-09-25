/**
 * ComboBox Cascading Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
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
        { cityName: 'Townsville', stateId: '104', cityId: 210 },
    ];
    let countryList: ComboBox = new ComboBox({
        dataSource: country,
        fields: { value: 'countryId', text: 'countryName' },
        allowCustom: false,
        change: () => {
            if (countryList.value === null) {
                stateList.enabled = false;
                cityList.enabled = false;
                stateList.value = null;
                cityList.value = null;
            } else {
                stateList.enabled = true;
                let tempQuery: Query = new Query().where('countryId', 'equal', countryList.value);
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
        fields: { value: 'stateId', text: 'stateName' },
        enabled: false,
        allowCustom: false,
        change: () => {
            if (stateList.value === null) {
                cityList.enabled = false;
                cityList.value = null;
            } else {
                cityList.enabled = true;
                let tempQuery: Query = new Query().where('stateId', 'equal', stateList.value);
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
        fields: { text: 'cityName', value: 'cityId' },
        enabled: false,
        allowCustom: false,
        placeholder: 'Select a city'
    });
    cityList.appendTo('#city');
};