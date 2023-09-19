import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { RadioButton } from '@syncfusion/ej2-buttons';
import * as data from './palatte-sample-data.json';
import { Browser } from '@syncfusion/ej2-base';
HeatMap.Inject(Tooltip, Legend, Adaptor);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            },
            text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
        },
        dataSource: (data as any).palatteSampleData,
        xAxis: {
            labels: ['2005', '2006', '2007', '2008', '2009', '2010',
                '2011', '2012', '2013', '2014', '2015'],
            labelIntersectAction: 'None',
            labelRotation: 45,
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
                'Justice', 'NASA', 'Transportation'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        paletteSettings: {
            palette: [{ startValue:5, endValue:10, minColor:"#F0C27B", maxColor:"#BE8D6C"},
            { startValue:10, endValue:15, minColor:"#A26E63", maxColor:"#4B1248"},
            { startValue:15, endValue:20, minColor:"#694b77", maxColor:"#d27d85"},
            { startValue:20, endValue:31.7, minColor:"#ed9485", maxColor:"#e44841"},
            ],
            type: 'Gradient'
        },
        legendSettings:{
            textStyle: {
                 fontFamily: 'inherit'
             }
         },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        cellSettings: {
            border: { width: 0 },
            showLabel: false,
        },
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
            // custom code end
            if (args.heatmap.element.offsetWidth < 500) {
                args.heatmap.xAxis.labelRotation = 0;
                args.heatmap.xAxis.labelIntersectAction = 'Trim';
            } else {
                args.heatmap.xAxis.labelRotation = 45;
                args.heatmap.xAxis.labelIntersectAction = 'None';
            }
        }
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