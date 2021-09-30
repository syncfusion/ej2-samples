// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Default sample
 */
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
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
            radius: '80%',
            startAngle: 230,
            endAngle: 130,
            majorTicks: {
                width: 0
            },
            lineStyle: { width: 8 },
            minorTicks: {
                width: 0
            },
            labelStyle: {
                font: {
                    fontFamily: 'Roboto',
                    size: '12px',
                    fontWeight: 'Regular'
                },
                offset: -5
            },
            pointers: [{
                value: 60,
                radius: '60%',
                pointerWidth: 7,
                cap: {
                    radius: 8,
                    border: { width: 0 }
                },
                needleTail: {
                    length: '25%'
                }
            }]
        }]
    });
    circulargauge.appendTo('#gauge');
};
