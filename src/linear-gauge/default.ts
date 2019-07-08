/**
 * Default sample
 */
import { loadCultureFiles } from '../common/culture-loader';
import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme} from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
(window as any).default = (): void => {
    loadCultureFiles();
    let gauge: LinearGauge = new LinearGauge({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        // custom code end
        orientation: 'Horizontal',
        axes: [{
            pointers: [{
                value: 10,
                height: 15,
                width: 15,
                placement: 'Near',
                offset: -50,
                markerType: 'Triangle'
            }],
            majorTicks: {
                interval: 10
            },
            minorTicks: {
                interval: 2
            },
            labelStyle: {
                offset: 48
            }
        }],
        annotations: [{
            content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px;">10 MPH</h1></div>',
            axisIndex: 0,
            axisValue: 10,
            x: 10, zIndex: '1',
            y: -70
        }]
    });
    gauge.appendTo('#defaultContainer');
};
