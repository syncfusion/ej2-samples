import {NumericTextBox} from '@syncfusion/ej2-inputs';
import {loadCldr, L10n} from '@syncfusion/ej2-base';
import * as numbers from '../common/cldr-data/main/de/numbers.json';
import * as currencies from '../common/cldr-data/main/de/currencies.json';
import * as zhNumbers from '../common/cldr-data/main/zh/numbers.json';
import * as zhCurrencies from '../common/cldr-data/main/zh/currencies.json';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as currencyData from '../common/cldr-data/supplemental/currencyData.json';
/**
 * Internationalization NumericTextBox sample
 */

this.default = (): void => {

    L10n.load({
      'en': {
        'numerictextbox': { incrementTitle: 'Increment value', decrementTitle: 'Decrement value'}
      },
      'de': {
        'numerictextbox': { incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert'}
      },
      'zh': {
        'numerictextbox': { incrementTitle: '增值', decrementTitle: '遞減值'}
      }
    });

    loadCldr(numbers, currencies, zhNumbers, zhCurrencies, numberingSystems, currencyData);

    let numeric: NumericTextBox = new NumericTextBox({
        locale: 'de',
        value: 10,
        placeholder: 'Geben Sie den Wert ein'
    });
    numeric.appendTo('#numeric');

    let percent: NumericTextBox = new NumericTextBox({
        format: 'p2',
        locale: 'de',
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        placeholder: 'Geben Sie den Prozentsatz ein'
    });
    percent.appendTo('#percent');

    let currency: NumericTextBox = new NumericTextBox({
        format: 'c2',
        locale: 'de',
        value: 100,
        currency: 'EUR',
        placeholder: 'Geben Sie die Währung ein'
    });
    currency.appendTo('#currency');

    document.getElementById('cultures').addEventListener('change', changeLocale);

    function changeLocale(): void {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        numeric.locale = culture;
        percent.locale = culture;
        currency.locale = culture;
        if (culture === 'zh') {
            currency.currency = 'CNY';
            numeric.placeholder = '输入值';
            currency.placeholder = '输入货币';
            percent.placeholder = '输入百分比';
        } else if (culture === 'de') {
            currency.currency = 'EUR';
            numeric.placeholder = 'Geben Sie den Wert ein';
            currency.placeholder = 'Geben Sie die Währung ein';
            percent.placeholder = 'Geben Sie den Prozentsatz ein';
        } else {
            currency.currency = 'USD';
            numeric.placeholder = 'Enter the value';
            currency.placeholder = 'Enter the currency';
            percent.placeholder = 'Enter the percentage';
        }
    }
};
