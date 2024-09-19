// custom code start
import { loadCultureFiles } from '../common/culture-loader';
//tslint:disable
// custom code end
/**
 * Customization sample for smith chart
 */
import { Smithchart, SmithchartLegend, TooltipRender, ISmithchartLoadEventArgs, SmithchartTheme } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { EmitType } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents} from '@syncfusion/ej2-buttons';
Smithchart.Inject(SmithchartLegend, TooltipRender);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let smithchart: Smithchart = new Smithchart({
        // custom code start
        load: (args: ISmithchartLoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Fluent2';
            args.smithchart.theme = <SmithchartTheme>(theme.charAt(0).toUpperCase() + theme.slice(1).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast'));
        },
        // custom code end
        horizontalAxis: {
            minorGridLines: {
                visible: true
            }
        },
        radialAxis: {
            minorGridLines: {
                visible: true
            }
        },
        series: [
            {
                points: [
                    { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                    { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 4 },
                    { resistance: 3.5, reactance: 3 }, { resistance: 2.5, reactance: 2 },
                    { resistance: 2, reactance: 1.5 }, { resistance: 1.5, reactance: 1.25 },
                    { resistance: 1, reactance: 0.9 }, { resistance: 0.5, reactance: 0.6 },
                    { resistance: 0.3, reactance: 0.4 }, { resistance: 0, reactance: 0.15 },
                ],
                name: 'Transmission1',
                enableAnimation: false,
                width: 2,
                tooltip: { visible: true },
                enableSmartLabels: false,
                marker: {
                    shape: 'rectangle',
                    visible: true,
                    border: {
                        width: 2,
                    }
                }
            }, {
                points: [
                    { resistance: 20, reactance: -50 }, { resistance: 10, reactance: -10 },
                    { resistance: 9, reactance: -4.5 }, { resistance: 8, reactance: -3.5 },
                    { resistance: 7, reactance: -2.5 }, { resistance: 6, reactance: -1.5 },
                    { resistance: 5, reactance: -1 }, { resistance: 4.5, reactance: -0.8 },
                    { resistance: 3.5, reactance: -0.8 }, { resistance: 2.5, reactance: -0.4 },
                    { resistance: 2, reactance: -0.2 }, { resistance: 1.5, reactance: 0 },
                    { resistance: 1, reactance: 0.1 }, { resistance: 0.5, reactance: 0.2 },
                    { resistance: 0.3, reactance: 0.15 }, { resistance: 0, reactance: 0.05 },
                ],
                name: 'Transmission2',
                enableAnimation: false,
                width: 2,
                tooltip: { visible: true },
                enableSmartLabels: false,
                fill: '#EE0C88',
                marker: {
                    shape: 'rectangle',
                    visible: true,
                    border: {
                        width: 2,
                    }
                }
            },
        ],
        radius: 1,
        legendSettings: {
            visible: true,
            position: 'Top',
            border: { color: 'transparent' },
            shape: 'Circle'
        },
        title: {
            text: 'Impedance Transmission', enableTrim: true, maximumWidth: 200,
            visible: true, font: { size: '16px' }
        }
    });
    smithchart.appendTo('#container');
    // code for property panel
    let sliderChange: EmitType<SliderChangeEventArgs>;
    let slider: Slider = new Slider({
        value: 0, type: 'MinRange',
        change: sliderChange,
        max: 1, min: 0, step: 0.1
    }, '#radius');
    setTimeout(function() {
        slider.value = 1;
        slider.dataBind();
    }, 100);
    document.getElementById('radius1').innerHTML = 'Radius <span> ' + 1;
    slider.change = sliderChange = (e: SliderChangeEventArgs) => {
        smithchart.radius = e.value as number;
        document.getElementById('radius1').innerHTML = 'Radius <span> ' + (e.value as number);
        smithchart.refresh();
    };
    let markerChange: EmitType<CheckBoxChangeEvents>
    let markerCheckBox: CheckBox = new CheckBox({
        change: markerChange, checked: true
    }, '#marker');
    let datalabelChange: EmitType<CheckBoxChangeEvents>
    let datalabelCheckBox: CheckBox = new CheckBox({
        change: markerChange
    }, '#datalabel');
    let animateChange: EmitType<CheckBoxChangeEvents>
    let animateCheckBox: CheckBox = new CheckBox({
        change: markerChange
    }, '#animate');
    let tooltipChange: EmitType<CheckBoxChangeEvents>
    let tooltipCheckBox: CheckBox = new CheckBox({
        change: markerChange, checked: true
    }, '#tooltip');
    let legendChange: EmitType<CheckBoxChangeEvents>
    let legendCheckBox: CheckBox = new CheckBox({
        change: markerChange, checked: true
    }, '#legend');
    markerCheckBox.change = markerChange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        if (boolean) {
            smithchart.series[0].marker.visible = true;
            smithchart.series[1].marker.visible = true;
        } else {
            smithchart.series[0].marker.visible = false;
            smithchart.series[1].marker.visible = false;
        }
        smithchart.refresh();
    };
    datalabelCheckBox.change = datalabelChange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        if (boolean) {
            smithchart.series[0].marker.dataLabel.visible = true;
            smithchart.series[1].marker.dataLabel.visible = true;
        } else {
            smithchart.series[0].marker.dataLabel.visible = false;
            smithchart.series[1].marker.dataLabel.visible = false;
        }
        smithchart.refresh();
    };
    animateCheckBox.change = animateChange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        if (boolean) {
            smithchart.series[0].enableAnimation = true;
            smithchart.series[1].enableAnimation = true;
        } else {
            smithchart.series[0].enableAnimation = false;
            smithchart.series[1].enableAnimation = false;
        }
        smithchart.refresh();
    };
    tooltipCheckBox.change = tooltipChange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        if (boolean) {
            smithchart.series[0].tooltip.visible = true;
            smithchart.series[1].tooltip.visible = true;
        } else {
            smithchart.series[0].tooltip.visible = false;
            smithchart.series[1].tooltip.visible = false;
        }
        smithchart.refresh();
    };
    legendCheckBox.change = legendChange = (e: CheckBoxChangeEvents) => {
        let boolean: boolean = e.checked;
        if (boolean) {
            smithchart.legendSettings.visible = true;
            mode.enabled = true;
        } else {
            smithchart.legendSettings.visible = false;
            mode.enabled = false;
        }
        smithchart.refresh();
    };
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: 90,
        change: () => {
            let element: string = mode.value.toString();
            smithchart.legendSettings.position = element;
            smithchart.refresh();
        }
    });
    mode.appendTo('#legend1');
};