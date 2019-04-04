import { loadCultureFiles } from '../common/culture-loader';
import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import * as data from './data.json';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015'],
            labelRotation: 45,
            labelIntersectAction: 'None',
        },
        yAxis: {
            labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
                'Justice', 'NASA', 'Transportation']
        },
        dataSource: (data as any).palatteSampleData,
        paletteSettings: {
            palette: [
                { value: 4.3, color: '#FFFFDA' },
                { value: 7, color: '#EDF8B6' },
                { value: 9, color: '#CAE8B4' },
                { value: 15, color: '#78D1BD' },
                { value: 18, color: '#36BCC6' },
                { value: 25, color: '#208FC6' },
                { value: 30, color: '#253494' },
                { value: 32, color: '#081D58' }
            ],
            type: 'Fixed'
        },
        cellSettings: {
            border: { width: 0 },
            showLabel: false,
        },
        legendSettings: {
            position: 'Bottom',
            width: '400px',
            enableSmartLegend: true
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');

    let fixedRadioButton: RadioButton = new RadioButton({
        label: 'Fixed', name: 'paletteType',
        change: () => { valueXChange(); }, value: 'Fixed', checked: true
    });
    fixedRadioButton.appendTo('#fixed');

    let gradientradioButton: RadioButton = new RadioButton({
        label: 'Gradient', name: 'paletteType',
        change: () => { valueXChange(); }, value: 'Gradient'
    });
    gradientradioButton.appendTo('#gradient');

    let smartLegend: CheckBox = new CheckBox({
        name: 'enableSmartLegend',
        change: () => { valueChange(); }, checked: true, disabled: false
    });
    smartLegend.appendTo('#smartLegend');

    function valueXChange(): void {
        smartLegend.disabled = fixedRadioButton.checked ? false : true;
        heatmap.paletteSettings.type = fixedRadioButton.checked ? 'Fixed' : 'Gradient';
    }

    function valueChange(): void {
        heatmap.legendSettings.enableSmartLegend = smartLegend.checked;
    }
};