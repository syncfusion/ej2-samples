import { LinearGauge, ILoadEventArgs, LinearGaugeTheme, GaugeTooltip, IPointerDragEventArgs } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(GaugeTooltip);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let gauge1: LinearGauge = new LinearGauge({     
        title: 'Enabled',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',
        format: 'N0',
        orientation: 'Horizontal',
        tooltip: {
            enable: true,
            showAtMousePosition: true,
            textStyle: { fontFamily: "inherit" },
        },
        axes: [{
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            line: {
                width: 5,
                color: '#C2DEF8'
            },
            pointers: [{
                    value: 50,
                    height: 5,
                    width: 5,
                    placement: 'Center',
                    color: '#0074E3',
                    type: 'Bar',
                    offset: 12
                },
                {
                value: 50,
                height: 15,
                width: 15,
                placement: 'Center',
                color: '#0074E3',
                offset: -10,
                markerType: 'Circle',
                enableDrag: true
            }],
            majorTicks: {
                interval: 20, height: 0
            },
            minorTicks: {
                interval: 10, height: 0
            },
            labelStyle: {
                offset: 10,
                font: { fontFamily: 'inherit' }
            }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        },
        dragMove(args: IPointerDragEventArgs): void {
            gauge1.setPointerValue(0, 0, args.currentValue);
        }
    });
    gauge1.appendTo('#containerEnable');

    let gauge2: LinearGauge = new LinearGauge({
        title: 'Disabled',
        titleStyle: {
            fontFamily: "inherit",
            fontWeight: '499'
        },
        background:'transparent',  
        orientation: 'Horizontal',
        axes: [{
            minimum: 0,
            maximum: 100,
            opposedPosition: true,
            line: {
                width: 5,
                color: '#E0E0E0'
            },
            pointers: [
                {
                    value: 50,
                    height: 5,
                    width: 5,
                    placement: 'Center',
                    color: '#ADADAD',
                    type: 'Bar',
                    offset: 12,
                    enableDrag: false
                },
                {
                    value: 50,
                    height: 15,
                    width: 15,
                    placement: 'Center',
                    color: '#ADADAD',
                    offset: -10,
                    markerType: 'Circle',
                    enableDrag: false
                },
            ],
            majorTicks: {
                interval: 20, height: 0
            },
            minorTicks: {
                interval: 10, height: 0
            },
            labelStyle: {
                offset: 10,
                font: { fontFamily: 'inherit' }
            }
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    gauge2.appendTo('#containerDisable');
};