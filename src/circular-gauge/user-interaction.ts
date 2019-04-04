// custom code start
import { loadCultureFiles } from '../common/culture-loader';
//tslint:disable:max-func-body-length
// custom code end
/**
 * User Interaction sample
 */
import { CircularGauge, IPointerDragEventArgs, Annotations, getRangeColor, Range } from '@syncfusion/ej2-circulargauge';
import { ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let content: string = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';
    let pointerValue: number;
    let circulargauge: CircularGauge = new CircularGauge({
        // custom code start
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        // custom code end
        enablePointerDrag: true,
        dragMove: (args: IPointerDragEventArgs) => {
            pointerValue = Math.round(args.currentValue);
            document.getElementById('pointerValue').innerHTML = 'Pointer Value <span> &nbsp;&nbsp;&nbsp;' + pointerValue;
            (<HTMLInputElement>document.getElementById('value')).value = pointerValue.toString();
            circulargauge.setAnnotationValue(0, 0, content + pointerValue + ' MPH</span></div>');
        },
        dragEnd: (args: IPointerDragEventArgs) => {
            pointerValue = Math.round(args.currentValue);
            setPointersValue(circulargauge, pointerValue);
        },
        axes: [{
            annotations: [{
                content: content + '70 MPH</span></div>',
                angle: 180, zIndex: '1',
                radius: '45%'
            }],
            endAngle: 140,
            startAngle: 220,
            lineStyle: { width: 0, color: '#9E9E9E' },
            radius: '80%', minimum: 0,
            maximum: 120,
            majorTicks: { useRangeColor: true },
            minorTicks: { useRangeColor: true },
            labelStyle: { useRangeColor: true },
            ranges: [{
                start: 0,
                end: 40,
                startWidth: 8, endWidth: 8,
                radius: '108%',
                color: '#30B32D'
            }, {
                start: 40,
                end: 100,
                startWidth: 8, endWidth: 8,
                radius: '108%',
                color: '#E5C31C'
            }, {
                start: 100, end: 120,
                startWidth: 8, endWidth: 8,
                radius: '108%',
                color: '#F03E3E'
            }],
            pointers: [{
                type: 'Marker', value: 70,
                markerShape: 'InvertedTriangle',
                radius: '110%',
                markerHeight: 20,
                color: '#E5C31C',
                markerWidth: 20
            }, {
                value: 70,
                radius: '60%',
                cap: { radius: 10, border: { width: 5, color: '#E5C31C' } },
                needleTail: { length: '0%', color: '#E5C31C' },
                color: '#E5C31C',
                markerWidth: 5
            }]
        }]
    });
    circulargauge.appendTo('#user-container');
    // code for property panel
    function setPointersValue(circulargauge: CircularGauge, pointerValue: number): void {
        let color: string = getRangeColor(pointerValue, <Range[]>(circulargauge.axes[0].ranges), circulargauge.axes[0].pointers[0].color);
        circulargauge.axes[0].pointers[0].color = color;
        circulargauge.axes[0].pointers[1].color = color;
        circulargauge.axes[0].pointers[0].animation.enable = true;
        circulargauge.axes[0].pointers[1].animation.enable = true;
        circulargauge.axes[0].pointers[0].needleTail.color = color;
        circulargauge.axes[0].pointers[1].needleTail.color = color;
        circulargauge.axes[0].pointers[0].cap.border.color = color;
        circulargauge.axes[0].pointers[1].cap.border.color = color;
        circulargauge.setPointerValue(0, 1, pointerValue);
        circulargauge.setPointerValue(0, 0, pointerValue);
        content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, content + pointerValue + ' MPH</span></div>');
    }
    document.getElementById('value').ontouchmove = document.getElementById('value').onpointermove =
        document.getElementById('value').onchange = () => {
            let pointerValue: number = parseInt((<HTMLInputElement>document.getElementById('value')).value, 10);
            setPointersValue(circulargauge, pointerValue);
            document.getElementById('pointerValue').innerHTML = 'Pointer Value <span> &nbsp;&nbsp;&nbsp;' + pointerValue;
        };

    document.getElementById('enable').onchange = () => {
        let value: boolean = (<HTMLInputElement>document.getElementById('enable')).checked;
        circulargauge.enablePointerDrag = value;
    };
};
