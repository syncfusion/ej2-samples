/**
 * Default sample
 */
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
import { gauge, gauge1, gauge2, gauge3 } from './dynamic-gauge';
CircularGauge.Inject(Annotations);

this.default = (): void => {
    let toolTipInterval: Function;
    let toolTipInterval1: Function;
    let GEARS: number[] = [0.14, 0.06, 0.035, 0.027, 0.019];
    let speed: number = 0;
    let skip: number = 0;
    let gear: number = 0;
    let count: number = 0;
    let start: boolean = true;
    let circulargauge1: CircularGauge = new CircularGauge(gauge());
    circulargauge1.appendTo('#dynamic-container');
    let circulargauge2: CircularGauge = new CircularGauge(gauge1());
    circulargauge2.appendTo('#rpm');
    let circulargauge3: CircularGauge = new CircularGauge(gauge2());
    circulargauge3.appendTo('#fuel');
    let circulargauge4: CircularGauge = new CircularGauge(gauge3());
    circulargauge4.appendTo('#battery');
    this.toolTipInterval1 = setInterval(
        (): void => {
            if (document.getElementById('dynamic-container')) {
                if (speed < 200 && start) {
                    count = 0;
                    circulargauge1.axes[0].pointers[0].animation.duration = 30;
                    circulargauge2.axes[0].pointers[0].animation.duration = 30;
                    if (GEARS[gear] * speed > 4 && gear < GEARS.length) {
                        gear++;
                        skip = 400 / 50;
                    }
                    if (skip-- < 0) {
                        speed += 0.6 - (0.0017 * speed);
                    }
                    circulargauge1.setPointerValue(0, 0, speed);
                    circulargauge1.setAnnotationValue(1, 3, Math.round(speed) + ' KM/H');
                    circulargauge2.setPointerValue(0, 0, GEARS[gear] * speed + 0.9);
                } else {
                    count = count + 1;
                    if (start) {
                        if (count < 200) {
                            circulargauge1.setAnnotationValue(1, 3, Math.round((Math.random() * (200 - 202) + 202)) + ' KM');
                            circulargauge1.setPointerValue(0, 0, Math.random() * (200 - 202) + 202);
                        } else {
                            speed = 0;
                            gear = 0;
                            circulargauge1.axes[0].pointers[0].animation.duration = 2000;
                            circulargauge2.axes[0].pointers[0].animation.duration = 2000;
                            circulargauge1.setPointerValue(0, 0, speed);
                            circulargauge1.setAnnotationValue(1, 3, Math.round(speed) + ' KM/H');
                            circulargauge2.setPointerValue(0, 0, 0);
                            start = false;
                        }
                    } else {
                        start = count > 350;
                    }
                }
            } else {
                clearInterval(this.toolTipInterval1);
            }
        },
        50
    );
};
