import { Spreadsheet, getFormatFromType } from '@syncfusion/ej2-spreadsheet';

/**
 * Used to perform culture-based format changes in the Spreadsheet when the culture or currency code is changed in the samples.
 * 
 * @param spreadsheet - Specifies the spreadsheet instance.
 * @returns - Returns void.
 */
export const cultureSwitchActions: (spreadsheet: Spreadsheet) => void = (spreadsheet: Spreadsheet): void => {
    // Method to apply number formats based on different loaded cultures.
    const updateNumberFormats: () => void = (): void => {
        // Apply format to the specified range in the active sheet.
        // The 'getFormatFromType' method will return the format code with a culture-based currency symbol.
        // For 'en-US' (English) culture, the format code will be '$#,##0.00'.
        // For 'de' (German) culture, the format code will be '#,##0.00 "€"'.
        spreadsheet.numberFormat(getFormatFromType('Currency'), 'F2:F31');
    };
    // This event will be triggered when the spreadsheet component is destroyed.
    const spreadsheetDestroyed: Function = () => {
        // Remove the events when the spreadsheet is destroyed.
        spreadsheet.off('spreadsheetDestroyed', spreadsheetDestroyed);
        cultureDropdown.onchange = undefined;
        currencyDropdown.oninput = undefined;
    };
    const cultureDropdown: HTMLInputElement = document.getElementById('sb-setting-culture') as HTMLInputElement;
    cultureDropdown.onchange = updateNumberFormats;
    const currencyDropdown: HTMLInputElement = document.getElementById('currencyID') as HTMLInputElement;
    currencyDropdown.oninput = updateNumberFormats;
    spreadsheet.on('spreadsheetDestroyed', spreadsheetDestroyed, spreadsheet);
    if (spreadsheet.locale !== 'en-US') {
        setTimeout((): void => {
            updateNumberFormats();
        });
    }
};
