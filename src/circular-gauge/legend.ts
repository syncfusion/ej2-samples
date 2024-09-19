import { CircularGauge, Annotations, Legend, Alignment, GaugeShape, LegendPosition, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
CircularGauge.Inject(Annotations, Legend);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        title: 'Measure of wind speed in Km/h',
        background:'transparent',
        titleStyle: {
            fontFamily: 'inherit'
        },
        legendSettings: {
            visible: true,
            position: 'Bottom',
            textStyle: {
                fontFamily: 'inherit',
                size: '12px'
            }
        },
        axes: [{
            lineStyle: { width: 2 },
            labelStyle: {
                position: 'Inside', useRangeColor: false,
                font: { fontFamily: 'inherit' }
            }, majorTicks: { height: 16, color: '#9E9E9E', interval: 20 }, minorTicks: { height: 8, interval: 10 },
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 120, radius: '80%',
            ranges: [
                { start: 0, end: 5, color: '#ccffff', radius: '110%', legendText: 'Light air' },
                { start: 5, end: 11, color: '#99ffff', radius: '110%', legendText: 'Light breeze' },
                { start: 11, end: 19, color: '#99ff99', radius: '110%', legendText: 'Gentle breeze' },
                { start: 19, end: 28, color: '#79ff4d', radius: '110%', legendText: 'Moderate breeze' },
                { start: 28, end: 49, color: '#c6ff1a', radius: '110%', legendText: 'Strong breeze' },
                { start: 49, end: 74, color: '#e6ac00', radius: '110%', legendText: 'Gale' },
                { start: 74, end: 102, color: '#ff6600', radius: '110%', legendText: 'Storm' },
                { start: 102, end: 120, color: '#ff0000', radius: '110%', legendText: 'Hurricane force' },
            ],
            pointers: [{
                animation: { enable: true },
                value: 70, radius: '60%', pointerWidth: 8,
                cap: { radius: 7 }, needleTail: { length: '18%' }
            }]
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    circulargauge.appendTo('#legend-container');

    let showLegendVisible: EmitType<CheckBoxChangeEvents>;
    let showLegendVisibleCheckBox: CheckBox = new CheckBox(
        {
            change: showLegendVisible,
            checked: true
        },
        '#enable');

        showLegendVisibleCheckBox.change = showLegendVisible = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        circulargauge.legendSettings.visible = boolean;
        circulargauge.refresh();
    }
    document.getElementById('alignment').onchange = (e: Event) => {
        let alignment: string = (e.target as HTMLSelectElement).value;
        circulargauge.legendSettings.alignment = alignment as Alignment;
    };
    document.getElementById('shape').onchange = (e: Event) => {
        let shape: string = (e.target as HTMLSelectElement).value;
        circulargauge.legendSettings.shape = shape as GaugeShape;
    };
    document.getElementById('position').onchange = (e: Event) => {
        let position: string = (e.target as HTMLSelectElement).value;
        circulargauge.legendSettings.position = position as LegendPosition;
    };

    let toggelLegend: EmitType<CheckBoxChangeEvents>;
    let toggelLegendCheckBox: CheckBox = new CheckBox(
        {
            change: toggelLegend,
            checked: true
        },
        '#toggle');

        toggelLegendCheckBox.change = toggelLegend = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        circulargauge.legendSettings.toggleVisibility = boolean;
        circulargauge.refresh();
    }

    let labelPosition = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            circulargauge.legendSettings.alignment = <Alignment>labelPosition.value.toString();
            circulargauge.refresh();
        }
    });
    labelPosition.appendTo('#alignment');

    let labelPosition1 = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            circulargauge.legendSettings.shape = <GaugeShape>labelPosition1.value.toString();
            circulargauge.refresh();
        }
    });
    labelPosition1.appendTo('#shape');

    let labelPosition2 = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            circulargauge.legendSettings.position = <LegendPosition>labelPosition2.value.toString();
            circulargauge.refresh();
        }
    });
    labelPosition2.appendTo('#position');
}