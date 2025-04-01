import { loadCultureFiles } from '../common/culture-loader';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Presets sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let start: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    let daterangepicker: DateRangePicker = new DateRangePicker({
        placeholder: "Select a range",
        presets: [
            {
                label: 'This Week',
                start: start,
                end: new Date(new Date(new Date().setDate(start.getDate() + 6)).toDateString())
            },
            {
                label: 'This Month',
                start: new Date(new Date(new Date().setDate(1)).toDateString()),
                end: new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString())
            },
            {
                label: 'Last Month',
                start: new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString()),
                end: new Date(new Date(new Date().setDate(0)).toDateString())
            },
            {
                label: 'Last Year',
                start: new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString()),
                end: new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString())
            }
        ]
    });
    daterangepicker.appendTo('#daterangepicker');
    var labelsByLanguage:any = {
        en: ['This Week', 'This Month', 'Last Month', 'Last Year'],
        de: ['Diese Woche', 'Dieser Monat', 'Letzter Monat', 'Letztes Jahr'],
        'fr-CH': ['Cette semaine', 'Ce mois-ci', 'Le mois dernier', 'L\'année dernière'],
        ar: ['هذا الأسبوع', 'هذا الشهر', 'الشهر الماضي', 'السنة الماضية'],
        zh: ['本周', '本月', '上个月', '去年'],
    };
    const cultureElement = document.getElementById("sb-setting-culture_hidden") || null;

    if (cultureElement) {
        cultureElement.addEventListener('change', function(event) {
            var selectedLanguage = (event.target as HTMLSelectElement).value;
            updatePresetLabels(selectedLanguage);
        });
    }

    function updatePresetLabels(languageCode: string): void {
        const newLabels = labelsByLanguage[languageCode] || labelsByLanguage['en'];
    
        for (let index = 0; index < daterangepicker.presets.length; index++) {
            if (index >= newLabels.length) break; // Prevent out-of-bounds
            daterangepicker.presets[index].label = newLabels[index];
        }
    
        daterangepicker.refresh();
    }
};
