import { CircularGauge, ITooltipRenderEventArgs, IPointerDragEventArgs, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { GaugeTooltip } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(GaugeTooltip);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({
        background:'transparent',
        axes: [{
            radius: '90%',
            minimum: 0,
            maximum: 120,
            startAngle: 240,
            background:'transparent',
            endAngle: 120,
            lineStyle: { width: 0 },
            majorTicks: { color: 'white', offset: -5, height: 12 },
            minorTicks: { width: 0 },
            labelStyle: { useRangeColor: true, font: { color: '#424242', size: '13px', fontFamily: 'Segoe UI' } },
            pointers: [{
                value: 70,
                radius: '60%',
                color: '#33BCBD',
                cap: { radius: 10, border: { color: '#33BCBD', width: 5 } },
                animation: { enable: true, duration: 1500 }
            }],
            ranges: [{
                start: 0,
                end: 50,
                startWidth: 10, endWidth: 10,
                radius: '102%',
                color: '#3A5DC8',
            }, {
                start: 50,
                end: 120,
                radius: '102%',
                startWidth: 10, endWidth: 10,
                color: '#33BCBD',
            }]
        }],
        tooltip: {
            type: ['Pointer', 'Range'],
            enable: true,
            showAtMousePosition: true,
            format: 'Current Value:  {value}',
            enableAnimation: false,
            textStyle: {
                size: '13px',
                fontFamily: 'inherit'
            },
            rangeSettings: {
                showAtMousePosition: true, format: "Start Value: {start} <br/> End Value: {end}", textStyle: {
                    size: '13px',
                    fontFamily: 'inherit'
                }
            }
        },
        dragEnd: (args: IPointerDragEventArgs) => {
            if (args.currentValue >= 0 && args.currentValue <= 50) {
                args.pointer.color = '#3A5DC8';
                args.pointer.cap.border.color = '#3A5DC8';
                args.pointer.value = args.currentValue;
                args.pointer.animation.enable = false;
            } else {
                args.pointer.color = '#33BCBD';
                args.pointer.cap.border.color = '#33BCBD';
                args.pointer.value = args.currentValue;
                args.pointer.animation.enable = false;
            }
            circulargauge.refresh();
        },
        enablePointerDrag: true,
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    circulargauge.appendTo('#tooltip-container');
};