/**
 * gradient sample
 */
import { loadCultureFiles } from '../common/culture-loader';
import { CircularGauge, ILoadedEventArgs, GaugeTheme, Gradient } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
CircularGauge.Inject(Gradient);

let rangeLinearGradient : Object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
        { color: '#9E40DC', offset: '0%', opacity: 0.9 },
        { color: '#E63B86', offset: '70%', opacity: 0.9 },
]
};
let pointerLinearGradient : Object = {
    startValue: '0%',
    endValue: '100%',
    colorStop: [
        { color: '#FEF3F9', offset: '0%', opacity: 0.9 },
        { color: '#E63B86', offset: '70%', opacity: 0.9 }]
};
let rangeRadialGradient: Object = {
    radius: '50%',
    innerPosition: { x: '50%', y: '50%' },
    outerPosition: { x: '50%', y: '50%' },
    colorStop: [
        { color: '#9E40DC', offset: '90%', opacity: 0.9 },
        { color: '#E63B86', offset: '160%', opacity: 0.9 }]
};
let pointerRadialGradient: Object = {
    radius: '50%',
    innerPosition: { x: '50%', y: '50%' },
    outerPosition: { x: '50%', y: '50%' },
    colorStop: [
        { color: '#FEF3F9', offset: '0%', opacity: 0.9 },
        { color: '#E63B86', offset: '60%', opacity: 0.9 }]
};
(window as any).default = (): void => {
    loadCultureFiles();
    let circulargauge: CircularGauge = new CircularGauge({
         // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        axes: [{
            lineStyle: { width: 0, color: 'transparent' },
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 100, radius: '80%',
            labelStyle: { font: { fontFamily: 'Roboto',
            size: '12px',
            fontWeight: 'Regular' }, offset: 10 },
            majorTicks: { width: 0, interval: 10 },
            minorTicks: { width: 0 },
            ranges: [
                {
                start: 0, end: 120, startWidth: 18, endWidth: 18, color: '#E63B86',
                linearGradient: rangeLinearGradient,
                roundedCornerRadius: 10
                }],
            pointers: [{
                animation: { enable: false }, value: 65, radius: '85%', color: '#E63B86',
                pointerWidth: 12,
                cap: { radius: 12 , border: {color: '#E63B86', width: 2.5}, color: 'white' },
                needleTail: { length: '0%'},
                needleStartWidth: 2
            }]
        }]
    });
    circulargauge.appendTo('#gauge');

    let gradientType: DropDownList = new DropDownList({
        index: 0,
        width: '145px',
        change: () => {
            if (gradientType.value === '1' && element.value === '0') {
                circulargauge.axes[0].ranges[0].linearGradient = null;
                circulargauge.axes[0].ranges[0].radialGradient = rangeRadialGradient;
                circulargauge.refresh();
            }
            if (element.value === '0' && gradientType.value === '0') {
                circulargauge.axes[0].ranges[0].linearGradient = rangeLinearGradient;
                circulargauge.axes[0].ranges[0].radialGradient = null;
                circulargauge.refresh();
            }
            if (gradientType.value === '1' && element.value === '1') {
                circulargauge.axes[0].pointers[0].radialGradient = pointerRadialGradient;
                circulargauge.axes[0].pointers[0].linearGradient = null;
                circulargauge.refresh();
            }
            if (gradientType.value === '0' && element.value === '1') {
                circulargauge.axes[0].pointers[0].linearGradient = pointerLinearGradient;
                circulargauge.axes[0].pointers[0].radialGradient = null;
                circulargauge.refresh();
            }
        }
    });
    gradientType.appendTo('#gradient');
    let element: DropDownList = new DropDownList({
        index: 0,
        width: '145px',
        change: () => {
            if (gradientType.value === '1' && element.value === '0') {
                circulargauge.axes[0].ranges[0].linearGradient = null;
                circulargauge.axes[0].ranges[0].radialGradient = rangeRadialGradient;
                circulargauge.axes[0].pointers[0].linearGradient = null;
                circulargauge.axes[0].pointers[0].radialGradient = null;
                circulargauge.refresh();
            }
            if (element.value === '0' && gradientType.value === '0') {
                circulargauge.axes[0].ranges[0].linearGradient = rangeLinearGradient;
                circulargauge.axes[0].ranges[0].radialGradient = null;
                circulargauge.axes[0].pointers[0].linearGradient = null;
                circulargauge.axes[0].pointers[0].radialGradient = null;
                circulargauge.refresh();
            }
            if (gradientType.value === '1' && element.value === '1') {
                circulargauge.axes[0].pointers[0].radialGradient = pointerRadialGradient;
                circulargauge.axes[0].pointers[0].linearGradient = null;
                circulargauge.axes[0].ranges[0].linearGradient = null;
                circulargauge.axes[0].ranges[0].radialGradient = null;
                circulargauge.refresh();
            }
            if (gradientType.value === '0' && element.value === '1') {
                circulargauge.axes[0].pointers[0].linearGradient = pointerLinearGradient;
                circulargauge.axes[0].pointers[0].radialGradient = null;
                circulargauge.axes[0].ranges[0].linearGradient = null;
                circulargauge.axes[0].ranges[0].radialGradient = null;
                circulargauge.refresh();
            }
        }
    });
    element.appendTo('#element');
};