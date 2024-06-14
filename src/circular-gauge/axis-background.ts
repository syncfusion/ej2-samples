import { CircularGauge, ILoadedEventArgs, GaugeTheme, Annotations, IResizeEventArgs } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        centerY: '65%',
        background: 'transparent',
        axes: [{
            radius: '80%',
            startAngle: 0,
            endAngle: 0,
            majorTicks: {
                width: 0,
            },
            lineStyle: { width: 0 },
            minorTicks: {
                width: 0,
            },
            labelStyle: {
                format:'{value} %',
                font: {
                    size: '0px'
                },
            },
            annotations: [{
                description:'Axis background',
                angle: 0,
                radius: '0%',
                zIndex: '1',
                content: '<div alt="Axis background image" style="margin-top: -37%;display: flex;justify-content: center;"><img src="./src/circular-gauge/images/axis-background.png" height="400" width="400" /></div>'
            },
            {
                description:'Sub gauge',
                angle: 0,
                radius: '0%',
                zIndex: '1',
                content: '<div id="subGauge" style="margin-left: -50%; margin-top: -46%;"></div>'
            }, {
                description:'Annotation value : 90',
                angle: 10,
                radius: '0%',
                zIndex: '1',
                content: '<div style="color:orange;margin-top: -84px;margin-left: 0px;font-size: 18px;"> 90</div>'
            }],
            pointers: [{
                description:'Marker pointer value : 90',
                cap: {
                    radius: 8,
                    border: { width: 0 }
                },
                needleTail: {
                    length: '25%',
                },
            }]
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end     
        },
        resized: (args: IResizeEventArgs) => {
            window.location.reload();
        },
        loaded: (args: ILoadedEventArgs) => {
            updateGauge();
        }
    });
    circulargauge.appendTo('#gauge');
    
};
function updateGauge() {
    let annotationGauge: CircularGauge = new CircularGauge({
        centerY: '45%',
        titleStyle: { color: 'black', size: '16px' },
        width: '600px',
        height: '450px',
        background: 'transparent',
        axes: [{
            labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', color: 'White' } },
            majorTicks: { height: 15, interval: 30 },
            minorTicks: { height: 10, interval: 6 }, minimum: 0, maximum: 360,
            pointers: [{
                value: 90,
                radius: '45%', markerWidth: 12, markerHeight: 12,
                type: 'Marker', markerShape: 'Triangle', color: 'Orange',
                animation: { enable: true, duration: 500 }
            }], startAngle: 0, endAngle: 0, radius: '60%', lineStyle: { width: 0 }
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end     
        },
        resized: (args: object) => {
            window.location.reload();
        }
    });
    annotationGauge.appendTo('#subGauge');   
}