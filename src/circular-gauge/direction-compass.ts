import { CircularGauge, IAxisLabelRenderEventArgs, ILoadedEventArgs, GaugeTheme, Gradient } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Gradient);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let value: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''];
    let circulargauge: CircularGauge = new CircularGauge({
        background:'transparent',
        axes: [{
            radius: '80%',
            lineStyle: { width: 20, color: '#E0E0E0' },
            labelStyle: {
                font: {
                    size: '12px', fontFamily: 'inherit'
                },
                autoAngle: true,
                hiddenLabel: 'Last',
                offset: 10
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
            pointers: [{
                value: 7,
                radius: '50%',
                pointerWidth: 30,
                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',
                    colorStop: [
                        { color: '#ff6b78', offset: '0%', opacity: 0.9 },
                        { color: '#e20a22', offset: '70%', opacity: 0.9 }]
                },
                cap: {
                    radius: 15,
                    color: '#ffffff',
                    border: {
                        width: 0
                    }
                },
                animation: { enable: false }
            }, {
                value: 3,
                radius: '50%',
                color: '#f7f7f7',
                pointerWidth: 30,
                cap: {
                    radius: 15,
                    color: '#ffffff',
                    border: {
                        width: 0
                    }
                },
                animation: { enable: false }
            }]
        }],
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            args.text = value[args.value];
        },
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    circulargauge.appendTo('#direction-container');
};
