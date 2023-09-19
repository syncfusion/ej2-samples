import { CircularGauge, Annotations, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2, gauge3, gauge4, gauge5 } from './pointer-gauge';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let firstgauge: CircularGauge = gauge1();
    let gauge5Interval1: any;
    let gauge6Interval1: any;
    firstgauge.appendTo('#container2');
    let secondgauge: CircularGauge = gauge2();
    secondgauge.appendTo('#container1');
    let thirdgauge: CircularGauge = gauge4();
    thirdgauge.appendTo('#container4');
    let fourthgauge: CircularGauge = new CircularGauge({
        centerY: '40%',
        background:'transparent',
        axes: [{
            startAngle: 270,
            endAngle: 90,
            lineStyle: { width: 3, color: '#e3a21a' },
            labelStyle: {
                position: 'Outside',
                font: { size: '0px', color: '#e3a21a' }
            }, majorTicks: {
                width: 1,
                height: 0,
                interval: 100
            }, minorTicks: {
                height: 0,
                width: 0,
            },
            radius: '90%',
            minimum: 0,
            maximum: 100,
            pointers: [{
                radius: '60%',
                value: 80,
                markerWidth: 5,
                markerHeight: 5,
                animation: { enable: true, duration: 1000 },
                color: '#e3a21a',
                pointerWidth: 10,
                cap: {
                    radius: 8,
                    color: 'white',
                    border: {
                        color: '#e3a21a',
                        width: 1
                    }
                },
                needleTail: {
                    length: '20%',
                    color: '#e3a21a'
                }
            }, {
                radius: '60%', value: 40,
                markerWidth: 5, markerHeight: 5,
                animation: { enable: true, duration: 1000 },
                color: '#ffb133',
                pointerWidth: 10,
                cap: {
                    radius: 8, color: 'white',
                    border: { color: '#ffb133', width: 1 }
                },
                needleTail: { length: '20%', color: '#e3a21a' }
            }],
            annotations: [
                {
                    angle: 180, zIndex: '1',
                    radius: '25%',
                    content: '<div style="font-size:14px; padding-top:20px">Multiple pointers</div>'
                }
            ]
        }],
        load: function (args) {
            // custom code start
            var selectTheme = location.hash.split('/')[1];
            selectTheme = selectTheme ? selectTheme : 'Material';
            args.gauge.theme = (selectTheme.charAt(0).toUpperCase() +
                selectTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    fourthgauge.appendTo('#container5');
    let fifthGauge: CircularGauge = gauge3();
    fifthGauge.appendTo('#container3');
    let sixthGauge: CircularGauge = gauge5();
    sixthGauge.appendTo('#container6');

    gauge5Interval1 = setInterval((): void => {
            let newVal: number = Math.random() * (90 - 20) + 20;
            if (document.getElementById('container3')) {
                fifthGauge.setPointerValue(0, 0, newVal);
            } else {
                clearInterval(gauge5Interval1);
            }
        },
        1000
    );
    gauge6Interval1 = setInterval((): void => {
            let newVal: number = Math.random() * (80 - 30) + 30;
            if (document.getElementById('container6')) {
                sixthGauge.setPointerValue(0, 0, newVal);
                sixthGauge.setPointerValue(0, 1, newVal);
            } else {
                clearInterval(gauge6Interval1);
            }
        },
        1000
    );
};