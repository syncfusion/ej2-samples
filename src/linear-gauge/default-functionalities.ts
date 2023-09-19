import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let gauge: LinearGauge = new LinearGauge({ 
        orientation: 'Horizontal',
        background:'transparent',
        axes: [{
            pointers: [{
                value: 10,
                height: 15,
                width: 15,
                placement: 'Near',
                offset: -40,
                markerType: 'Triangle'
            }],
            majorTicks: {
                interval: 10,
                color: '#9E9E9E',
            },
            minorTicks: {
                interval: 2,
                color: '#9E9E9E',
            },
            labelStyle: {
                offset: 48,
                font: {
                    fontFamily: 'inherit'
                }
            }
        }],
        annotations: [{
            content: '<div id="pointer" style="width:70px;margin-left:-3%;margin-top: 42%;font-size:16px;">10 MPH</div>',
            axisIndex: 0,
            axisValue: 10,
            x: 10,
            zIndex: '1',
            y: -70,
        }],
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge.appendTo('#defaultContainer');
};