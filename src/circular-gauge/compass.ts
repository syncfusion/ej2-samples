// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Compass sample
 */
import { CircularGauge, IAxisLabelRenderEventArgs, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let value: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''];
    let pointerColor: DropDownList; let labelColor: DropDownList;
    let circulargauge: CircularGauge = new CircularGauge({
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            args.text = value[args.value];
        },
        // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        // custom code end
        axes: [{
            radius: '70%',
            lineStyle: { width: 10 },
            labelStyle: {
                font: {
                    size: '12px', fontFamily: 'Roboto'
                },
                autoAngle: true,
                hiddenLabel: 'Last'
            }, majorTicks: {
                height: 15,
                interval: 1
            }, minorTicks: {
                height: 10,
                interval: 0.5
            },
            startAngle: 0,
            endAngle: 360,
            minimum: 0,
            maximum: 8,
            ranges: [{
                start: 7,
                end: 7
            }],
            pointers: [{
                value: 7,
                radius: '50%',
                color: '#f03e3e',
                pointerWidth: 20,
                cap: {
                    radius: 0
                },
                animation: { enable: false }
            }, {
                value: 3,
                radius: '50%',
                color: '#9E9E9E',
                pointerWidth: 20,
                cap: {
                    radius: 0
                },
                animation: { enable: false }
            }]
        }]
    });
    circulargauge.appendTo('#direction-container');
    // code for property panel
    pointerColor = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            let rangeColor: string = pointerColor.value.toString();
            circulargauge.axes[0].pointers[0].color = rangeColor;
            circulargauge.setPointerValue(0, 0, circulargauge.axes[0].pointers[0].value);
        }
    });
    pointerColor.appendTo('#poiterColor');

    labelColor = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            let rangeColor: string = labelColor.value.toString();
            circulargauge.axes[0].labelStyle.font.color = rangeColor;
            circulargauge.refresh();
        }
    });
    labelColor.appendTo('#labelColor');
};
