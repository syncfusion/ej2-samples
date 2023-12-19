import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { Annotations } from '@syncfusion/ej2-circulargauge';
import { Browser } from '@syncfusion/ej2-base';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        title: 'Shot Put Distance',
        background:'transparent',
        titleStyle: {
            fontFamily: 'inherit'
        },
        centerY: '57%',
        axes: [{
            annotations: [{
                content: '12 M', radius: '108%', angle: 98, zIndex: '1',
                textStyle: {
                    fontFamily: 'inherit', size: '14px', color: '#9E9E9E'
                }
            }, {
                content: '11 M', radius: '80%', angle: 81, zIndex: '1',
                textStyle: {
                    fontFamily: 'inherit', size: '14px', color: '#9E9E9E'
                }
            }, {
                content: '10 M', radius: '50%', angle: 69, zIndex: '1',
                textStyle: {
                    fontFamily: 'inherit', size: '14px', color: '#9E9E9E'
                }
            }, {
                content: 'Doe', radius: '106%', angle: Browser.isDevice ? 190 : 192, zIndex: '1',
                textStyle: {
                    fontFamily: 'inherit', size: '14px', color: '#9E9E9E'
                }
            }, {
                content: 'Almaida', radius: '78%', angle: Browser.isDevice ? 178 : 184, zIndex: '1',
                textStyle: {
                    fontFamily: 'inherit', size: '14px', color: '#9E9E9E'
                }
            }, {
                content: 'John', radius: Browser.isDevice ? '50%' : '48%', angle: Browser.isDevice ? 174 : 179, zIndex: '1',
                textStyle: {
                    fontFamily: 'inherit', size: '14px', color: '#9E9E9E'
                }
            }],
            lineStyle: {
                width: 0, color: '#1d1d1d'
            },
            radius: '80%',
            labelStyle: {
                font: {
                    size: '0px'
                }
            }, majorTicks: {
                interval: 20, width: 0,
            }, minorTicks: {
                width: 0,
            },
            startAngle: 200, endAngle: 130,
            minimum: 0, maximum: 14,
            ranges: [{
                start: 0, end: 12, radius: '115%',
                color: '#01aebe', startWidth: 25, endWidth: 25
            }, {
                start: 0, end: 11, radius: '85%',
                color: '#3bceac', startWidth: 25, endWidth: 25
            }, {
                start: 0, end: 10, radius: '55%',
                color: '#ee4266', startWidth: 25, endWidth: 25
            }],
            pointers: [{
                type: 'Marker', value: 12, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/football.png',
                radius: '108%', markerWidth: 28, markerHeight: 28,
                animation: { duration: 1500 }
            }, {
                type: 'Marker', value: 11, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/basketball.png',
                radius: '78%', markerWidth: 28, markerHeight: 28,
                animation: { duration: 1200 }
            }, {
                type: 'Marker', value: 10, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/golfball.png',
                radius: '48%', markerWidth: 28, markerHeight: 28,
                animation: { duration: 900 }
            }, {
                type: 'Marker', value: 12, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/athletics.png',
                radius: '0%', markerWidth: 90, markerHeight: 90,
                animation: { duration: 0 }
            }, {
                type: 'Marker', value: 0.1, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/girl1.png',
                radius: '108%', markerWidth: 28, markerHeight: 28,
                animation: { duration: 1500 }
            }, {
                type: 'Marker', value: 0.1, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/man1.png',
                radius: '78%', markerWidth: 28, markerHeight: 28,
                animation: { duration: 1500 }
            }, {
                type: 'Marker', value: 0.1, markerShape: 'Image',
                imageUrl: 'src/circular-gauge/images/man2.png',
                radius: '48%', markerWidth: 28, markerHeight: 28,
                animation: { duration: 1500 }
            }]
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    circulargauge.appendTo('#pointer-container');
};
