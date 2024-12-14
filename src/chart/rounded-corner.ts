
import { loadCultureFiles } from '../common/culture-loader';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import {
    AccumulationChart, PieSeries, AccumulationTooltip, AccumulationAnnotation,
    AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, IAccPointRenderEventArgs
} from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2/base';
AccumulationChart.Inject(PieSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationAnnotation);

// Real data for smartphone market share in 2023
let chartData: Object[] = [
    { x: 'Operations', y: 30.0, text: '30.0%' },
    { x: 'Miscellaneous', y: 10.0, text: '10.0%' },
    { x: 'Human Resources', y: 15.0, text: '15.0%' },
    { x: 'Research and Development', y: 20.0, text: '20.0%' },
    { x: 'Marketing', y: 25.0, text: '25.0%' },
];
let onPointRender: EmitType<IAccPointRenderEventArgs> = (args: IAccPointRenderEventArgs): void => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme.indexOf('dark') > -1) {
        if (selectedTheme.indexOf('material') > -1) {
            args.border.color = '#303030';
        }
        else if (selectedTheme.indexOf('bootstrap5') > -1) {
            args.border.color = '#212529';
        }
        else if (selectedTheme.indexOf('bootstrap') > -1) {
            args.border.color = '#1A1A1A';

        }
        else if (selectedTheme.indexOf('fabric') > -1) {
            args.border.color = '#201f1f';

        }
        else if (selectedTheme.indexOf('fluent') > -1) {
            args.border.color = '#252423';

        }
        else if (selectedTheme.indexOf('bootstrap') > -1) {
            args.border.color = '#1A1A1A';

        }
        else if (selectedTheme.indexOf('tailwind') > -1) {
            args.border.color = '#1F2937';

        }
        else {
            args.border.color = '#222222';

        }
    }
    else if (selectedTheme.indexOf('highcontrast') > -1) {
        args.border.color = '#000000';
    }
    else {
        args.border.color = '#FFFFFF';
    }
}

(window as any).default = (): void => {
    loadCultureFiles();
    let chart = new AccumulationChart({
        series: [{
            type: 'Pie',
            dataSource: chartData,
            animation: { enable: true },
            xName: 'x',
            yName: 'y',
            innerRadius: '50%',
            dataLabel: {
                visible: true,
                position: 'Outside',
                name: 'x',
                connectorStyle: { width: 0 },
            },
            borderRadius: 8,
            border: { width: 3 }
        }],
        tooltip: {
            enable: true,
            header: '<b>Budget</b>', format: '${point.x}: <b>${point.y}%</b>',
            enableHighlight: true
        },
        title: 'Company Budget Distribution',
        width: Browser.isDevice ? '100%' : '75%',
        enableSmartLabels: true,
        enableBorderOnMouseMove: false,
        pointRender: onPointRender,
        legendSettings: { visible: false },
        annotations: [
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}">30%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Operations',
                y: 30.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}" >10%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Miscellaneous',
                y: 10.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}">15%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Human Resources',
                y: 15.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}">20%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Research and Development',
                y: 20.0
            },
            {
                content: `<div style=" padding: 5px 5px 5px 5px; font-size: ${Browser.isDevice ? '10px' : '14px'}">25%</div>`,
                region: 'Series',
                coordinateUnits: 'Point',
                x: 'Marketing',
                y: 25.0
            }
        ],
        load: (args: IAccLoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
            args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        }
    });

    // Append the chart to the target element
    chart.appendTo('#pie-border-container');
};