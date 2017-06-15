import {NumericTextBox} from '@syncfusion/ej2-inputs';
import {loadCldr, L10n} from '@syncfusion/ej2-base';
/**
 * Internationalization NumericTextBox sample
 */

this.default = (): void => {

    L10n.load({
      'en': {
        'numerictextbox': { incrementTitle: 'Increment value', decrementTitle: 'Decrement value',
        placeholder: 'Enter the value' }
      },
      'de': {
        'numerictextbox': { incrementTitle: 'Wert erhöhen', decrementTitle: 'Dekrementwert',
        placeholder: 'Geben Sie den Wert ein' }
      },
      'zh': {
        'numerictextbox': { incrementTitle: '增值', decrementTitle: '遞減值',
        placeholder: '輸入值' }
      }
    });

    loadCldr(
        require('../common/cldr-data/main/de/numbers.json'),
        require('../common/cldr-data/main/de/currencies.json'),
        require('../common/cldr-data/main/zh/numbers.json'),
        require('../common/cldr-data/main/zh/currencies.json'),
        require('../common/cldr-data/supplemental/numberingSystems.json'),
        require('../common/cldr-data/supplemental/currencyData.json')
    );

    let numeric: NumericTextBox = new NumericTextBox({
        locale: 'de',
        value: 10
    });
    numeric.appendTo('#numeric');

    let percent: NumericTextBox = new NumericTextBox({
        format: 'p2',
        locale: 'de',
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01
    });
    percent.appendTo('#percent');

    let currency: NumericTextBox = new NumericTextBox({
        format: 'c2',
        locale: 'de',
        value: 100,
        currency: 'EUR'
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
        } else if (culture === 'de') {
            currency.currency = 'EUR';
        } else {
            currency.currency = 'USD';
        }
    }
};
