import { loadCultureFiles } from '../common/culture-loader';
/**
 * Range sample changes
 */
import { CircularGauge, Annotations, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { Slider, SliderChangeEventArgs  } from '@syncfusion/ej2-inputs';
CircularGauge.Inject(Annotations);
let sliderValue: number = 60;

(window as any).default = (): void => {
    loadCultureFiles();
    let circulargauge: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        loaded: (args: ILoadedEventArgs) => {
            let annotation: Element = document.getElementById(args.gauge.element.id + '_Annotations_0');
            if (annotation) {
               annotationRender('slider', circulargauge.axes[0].pointers[0].value);
            }
        },
        title: 'Progress Tracker',
            titleStyle: { size: '18px', },
            axes: [{
                annotations: [{
                            content: '<div id="pointervalue" style="font-size:35px;width:120px;text-align:center">' +
                            sliderValue.toString() + '/100</div>',
                            angle: 0,
                            zIndex: '1',
                            radius: '0%'
                        },
                        {
                            content: '<div id="slider" style="height:70px;width:250px;"></div>',
                            angle: 0,
                            zIndex: '1',
                            radius: '-100%'
                        },
                ],
                lineStyle: { width: 0 },
                labelStyle: {
                    position: 'Inside', useRangeColor: true,
                    font: { size: '0px', color: 'white', fontFamily: 'Roboto', fontStyle: 'Regular' }
                }, majorTicks: { height: 0, }, minorTicks: { height: 0 },
                startAngle: 200, endAngle: 160, minimum: 0, maximum: 100, radius: '80%',
                ranges: [
                    {
                        start: 0, end: 100,
                        radius: '90%',
                        startWidth: 30, endWidth: 30,
                        color: '#E0E0E0',
                        roundedCornerRadius: 20
                    },
                ],
                pointers: [{
                    roundedCornerRadius: 20,
                    value: 60,
                    type: 'RangeBar',
                    radius: '90%',
                    color: '#e5ce20',
                    border: {
                        color: 'grey',
                        width: 0
                    },
                    animation: {
                        enable: false
                    },
                    pointerWidth: 30
                }]
            }]
    });
    circulargauge.appendTo('#range-container');
    /* tslint:disable:no-string-literal */
    function annotationRender(id: string, sliderValue: number): void {
        let first: Slider = new Slider({
            // Set the value for slider
            min: 0, max: 100,
            type: 'MinRange',
            limits: { enabled: true, minStart: 0, minEnd: 100 },
            value: sliderValue,
            change: (args: SliderChangeEventArgs) => {
                sliderValue = args.value as number;
                if (!isNaN(sliderValue)) {
                    circulargauge['isProtectedOnChange'] = true;
                    if (sliderValue >= 0 && sliderValue < 20) {
                        circulargauge.axes[0].pointers[0].color = '#ea501a';
                    } else if (sliderValue >= 20 && sliderValue < 40) {
                        circulargauge.axes[0].pointers[0].color = '#f79c02';
                    } else if (sliderValue >= 40 && sliderValue < 60) {
                        circulargauge.axes[0].pointers[0].color = '#e5ce20';
                    } else if (sliderValue >= 60 && sliderValue < 80) {
                        circulargauge.axes[0].pointers[0].color = '#a1cb43';
                    } else if (sliderValue >= 80 && sliderValue < 100) {
                        circulargauge.axes[0].pointers[0].color = '#82b944';
                    }
                    circulargauge.setPointerValue(0, 0, sliderValue);
                    if (document.getElementById('pointervalue')) {
                        document.getElementById('pointervalue').innerHTML = circulargauge.axes[0].pointers[0].value.toString() + '/100';
                    }
                }
            }
        });
        first.appendTo('#' + id);
    }
};
