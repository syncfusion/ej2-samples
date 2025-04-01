import { ChartTheme, IStockChartEventArgs } from "@syncfusion/ej2/charts";

export function loadStockChartTheme(args?: IStockChartEventArgs) {
    let selectedTheme: string = location.hash.split('/')[1];
    let theme;
    selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
    if (args) {
        theme = args.stockChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    else {
        theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    return theme.toLowerCase();
}