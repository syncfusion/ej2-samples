// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Patterns sample
 */
import { CircularGauge, Annotations, Gradient } from '@syncfusion/ej2-circulargauge';
import { gauge1, gauge2, gauge3, gauge4, gauge5, gauge6 } from './pointer-gauge';
CircularGauge.Inject(Annotations, Gradient);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let firstgauge: CircularGauge = new CircularGauge(gauge1());
    firstgauge.appendTo('#container1');
    let secondgauge: CircularGauge = new CircularGauge(gauge2());
    secondgauge.appendTo('#container2');
    let thirdgauge: CircularGauge = new CircularGauge(gauge3());
    thirdgauge.appendTo('#container3');
    let fourthgauge: CircularGauge = new CircularGauge(gauge4());
    fourthgauge.appendTo('#container4');
    let fifthGauge: CircularGauge = new CircularGauge(gauge5());
    fifthGauge.appendTo('#container5');
    let sixthGauge: CircularGauge = new CircularGauge(gauge6());
    sixthGauge.appendTo('#container6');

};
