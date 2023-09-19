import { LinearGauge, ContainerType, Orientation, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let gauge: LinearGauge = new LinearGauge({
        title: 'Temperature Measure',
        titleStyle: {
            fontFamily: "inherit",
        },
        background:'transparent',  
        container: {
            width: 13,
            roundedCornerRadius: 5,
            type: 'Thermometer'
        },
        axes: [{
            minimum: 0,
            maximum: 180,
            line: {
                width: 0
            },
            majorTicks: {
                interval: 20,
                color: '#9e9e9e'
            },
            minorTicks: {
                color: '#9e9e9e'
            },
            labelStyle: {
                font: {
                    fontFamily: "inherit",
                }
            },
            pointers: [
                {
                    value: 90,
                    height: 13,
                    width: 13,
                    roundedCornerRadius: 5,
                    type: 'Bar',
                    color: '#f02828'
                }
            ]
        },
        {
            minimum: 0,
            maximum: 180,
            line: {
                width: 0
            },
            labelStyle: {
                font: {
                    fontFamily: "inherit",
                }
            },
            majorTicks: {
                interval: 20
            },
            opposedPosition: true,
            pointers: [
                {
                    width: 0
                }
            ]
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge.appendTo('#boxContainer');
    let containerMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: '100%',
        change: () => {
            gauge.container.type = <ContainerType>containerMode.value;
            gauge.refresh();
        }
    });
    containerMode.appendTo('#containerMode');

    let orientationMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: '100%',
        change: () => {
            gauge.orientation = <Orientation>orientationMode.value;
            gauge.refresh();
        }
    });
    orientationMode.appendTo('#orientationMode');
};