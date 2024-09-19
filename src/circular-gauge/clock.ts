let needlePointer: number = 0.2;
let needleStartWidth: number = 1;
let needleStartWidthOne: number = 2;
let pointerInterval: any;
import { CircularGauge, ILoadedEventArgs, GaugeTheme, Annotations, IResizeEventArgs } from '@syncfusion/ej2-circulargauge';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        background: 'transparent',
        axes: [{
            radius: '90%',
            startAngle: 0,
            endAngle: 0,
            minimum: 0,
            maximum: 12,
            majorTicks: {
                width: 2, height: 15, interval: 1, offset: 5
            },
            lineStyle: { width: 2 },
            minorTicks: {
                width: 1, height: 10, interval: 0.2, offset: 5
            },
            labelStyle: {
                font: {
                    fontFamily: 'inherit'
                },
                offset: 10,
                hiddenLabel: 'First'
            },
            pointers: [{
                value: 10.2,
                radius: '70%',
                pointerWidth: 3,
                needleStartWidth: needleStartWidthOne,
                needleEndWidth: 1,
                cap: {
                    radius: 5,
                    color: 'white',
                    border: { width: 1, color: '#00A885' }

                },
                needleTail: {
                    length: "0%",
                },
                animation: {
                    enable: false,
                },
            },
            {
                value: 2,
                radius: '100%',
                pointerWidth: 3,
                needleStartWidth: needleStartWidth,
                needleEndWidth: 1,
                cap: {
                    radius: 5,
                    color: 'white',
                    border: { width: 1, color: '#00A885' }

                },
                needleTail: {
                    length: "0%",
                },
                animation: {
                    enable: false,
                },
            },
            {
                value: 12,
                radius: '90%',
                pointerWidth: 3,
                needleStartWidth: needleStartWidth,
                needleEndWidth: 1,
                color: '#00A8B5',
                cap: {
                    radius: 5,
                    color: 'white',
                    border: { width: 1, color: '#00A885' }

                },
                needleTail: {
                    length: "25%",
                    color: '#00A8B5'
                },
                animation: {
                    enable: false,
                },
            }],
            annotations: [{
                description:'Sub gauge one',
                content: '<div id="subGaugeOne" style="margin-left: -50%"></div>',
                angle: 290,
                radius: '0%',
                zIndex: '1'
            }, {
                description:'Sub gauge two',
                content: '<div id="subGaugeTwo" style="margin-left: -110%;margin-top: -50%;"></div>',
                angle: 90,
                radius: '0%',
                zIndex: '1'

            }],
            
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        },
        resized: (args: IResizeEventArgs) => {
            let timeoutId: any = setInterval((): void => {
                if (document.getElementById('clockgauge')) {
                    renderGauges();
                } else {
                    clearInterval(+timeoutId);
                }
            }, 1000)
        },
        loaded: (args: ILoadedEventArgs) => {
            renderGauges();
            if (isNullOrUndefined(pointerInterval)) {
                pointerInterval = setInterval(
                    (): void => {
                        if (document.getElementById('clockgauge')) {
                            if (needlePointer <= 12) {
                            if (needlePointer == 0.2) {
                                needlePointer = 0.2;
                            }
                            circulargauge.setPointerValue(0, 2, needlePointer);
                            needlePointer += 0.2;
                            } else {
                                needlePointer = 0.2;
                            }
                        } else {
                            clearInterval(+pointerInterval);
                        }
                    }, 1000)
            }
        }
    });
    circulargauge.appendTo('#clockgauge');
    function renderGauges() {
        let annotationGaugeTwo: CircularGauge = new CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                majorTicks: { offset: 2, interval: 2 },
                minorTicks: { offset: 2, interval: 0.4 }, minimum: 0, maximum: 12,
                pointers: [{
                    value: 8,
                    radius: '50%', pointerWidth: 2, color: '#00A8B5',
                    animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
            }],
            load: (args: ILoadedEventArgs) => {
                // custom code start
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
                // custom code end
            }
        });
        annotationGaugeTwo.appendTo('#subGaugeTwo');

        let annotationGaugeOne: CircularGauge = new CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                majorTicks: { interval: 2, offset: 2 },
                minorTicks: { interval: 0.4, offset: 2 }, minimum: 0, maximum: 12,
                pointers: [{
                    value: 5,
                    radius: '50%', pointerWidth: 2, color: '#00A8B5',
                    animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
            }],
            load: (args: ILoadedEventArgs) => {
                // custom code start
                let selectedTheme: string = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
                // custom code end
            }
        });
        annotationGaugeOne.appendTo('#subGaugeOne');
    }
};