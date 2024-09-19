import { CircularGauge, ILoadedEventArgs, GaugeTheme, Gradient, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
CircularGauge.Inject(Gradient);
let textValues: string[] = ['0', '2', '5', '10', '20', '50', '100', '150', '200'];
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        background: 'transparent',
        animationDuration: 2000,
        axes: [{
            lineStyle: { width: 0 },
            startAngle: 210, endAngle: 150, minimum: 0, maximum: 8, radius: '80%',
            labelStyle: {
                font: {
                    fontFamily: 'inherit'
                }, offset: 10
            },
            majorTicks: { width: 0, interval: 1 },
            minorTicks: { width: 0 },
            ranges: [
                {
                    start: 0, end: 6.2, startWidth: 22, endWidth: 22, color: '#E63B86',
                    linearGradient: {
                        startValue: '0%',
                        endValue: '100%',
                        colorStop: [
                            { color: '#9E40DC', offset: '0%', opacity: 1 },
                            { color: '#d93c95', offset: '70%', opacity: 1 },]
                    },
                },
                {

                    color: '#E0E0E0',
                    start: 6.2,
                    end: 8,
                    startWidth: 22,
                    endWidth: 22

                }
            ],
            pointers: [{
                animation: { enable: false }, value: 6.2, radius: '85%', color: '#E63B86',
                pointerWidth: 10,
                cap: { radius: 0, border: { width: 0 } },
                needleTail: { length: '0%' },
                needleStartWidth: 10,
                needleEndWidth: 5,
                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',
                    colorStop: [
                        { color: '#9E40DC', offset: '0%', opacity: 0.2 },
                        { color: '#9E40DC', offset: '70%', opacity: 0.5 },]
                },
            }]
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            args.text = textValues[(args.value)];
        }
    });
    circulargauge.appendTo('#gauge');
};