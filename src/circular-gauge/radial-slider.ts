import { CircularGauge, ILoadedEventArgs, GaugeTheme, IPointerDragEventArgs, Annotations } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        enablePointerDrag: true,
        background:'transparent',
        axes: [{
            radius: '80%',
            startAngle: 0,
            endAngle: 0,
            majorTicks: {
                height: 0
            },
            lineStyle: { width: 0 },
            minorTicks: {
                height: 0
            },
            labelStyle: {
                font: {
                    size: '0px'
                },
                offset: -1
            },
            pointers: [{
                value: 30,
                type: 'Marker',
                markerShape: 'Circle',
                radius: '97%',
                markerHeight: 25,
                markerWidth: 25,
                color: '#2C75DC',
                animation: {
                    enable: false,
                },
            }],
            ranges: [
                {
                    start: 0, end: 30, color: '#2C75DC', startWidth: 12, endWidth: 12, radius: '100%'
                },
                {
                    start: 30, end: 100, color: '#BFD6F5', startWidth: 12, endWidth: 12, radius: '100%'
                },

            ],
            annotations: [{
                content: '<div style="font-style: oblique; margin-left: 8px;font-size: 20px;"><span>30%</span></div>',
                angle: 180,
                radius: '0%',
                zIndex: '1'
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
        dragMove(args: IPointerDragEventArgs): void {
            let pointerValue = args.currentValue;
            if (pointerValue != null) {
                circulargauge.setPointerValue(0, 0, pointerValue);
                circulargauge.setRangeValue(0, 0, 0, pointerValue);
                circulargauge.setRangeValue(0, 1, pointerValue, 100);
                circulargauge.setAnnotationValue(0, 0, '<div style="font-style: oblique; margin-left: 8px;font-size: 20px;"><span>' + Math.ceil(pointerValue) + '%</span></div>');
            }
        }
    });
    circulargauge.appendTo('#gauge');
};