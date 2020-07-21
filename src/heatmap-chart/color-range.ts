import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { RadioButton } from '@syncfusion/ej2-buttons';
import * as data from './palatte-sample-data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            },
            text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
        },
        dataSource: (data as any).palatteSampleData,
        xAxis: {
            labels: ['2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015'],
            labelIntersectAction: 'None',
            labelRotation: 45,
        },
        yAxis: {
            labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
                'Justice', 'NASA', 'Transportation']
        },
        paletteSettings: {
            palette: [{ startValue: 5, endValue: 15, minColor: '#FFFFDA', maxColor: '#EDF8B6' },
            { startValue: 15, endValue: 20, minColor: '#CAE8B4', maxColor: '#78D1BD' },
            { startValue: 20, endValue: 31.7, minColor: '#36BCC6', maxColor: '#208FC6' },
            ],
            type: 'Gradient'
        },
        cellSettings: {
            border: { width: 0 },
            showLabel: false,
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');
    let gradientradioButton: RadioButton = new RadioButton({
        label: 'Gradient', name: 'paletteType',
        change: () => { valueXChange(); }, value: 'Gradient', checked: true
    });

    let fixedRadioButton: RadioButton = new RadioButton({
        label: 'Fixed', name: 'paletteType',
        change: () => { valueXChange(); }, value: 'Fixed'
    });
    fixedRadioButton.appendTo('#fixed');

    gradientradioButton.appendTo('#gradient');

    function valueXChange(): void {
        heatmap.paletteSettings.type = fixedRadioButton.checked ? 'Fixed' : 'Gradient';
    }

};