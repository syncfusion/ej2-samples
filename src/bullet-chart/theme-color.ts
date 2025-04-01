import { ChartTheme, IBulletLoadedEventArgs } from "@syncfusion/ej2/charts";

export function loadBulletChartTheme(args: IBulletLoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
    args.bulletChart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
}