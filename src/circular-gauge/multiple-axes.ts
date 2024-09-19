import { CircularGauge, isCompleteAngle, GaugeDirection, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
loadCultureFiles();
// custom code end
(window as any).default = (): void => {
    let circulargauge: CircularGauge = new CircularGauge({ 
        background:'transparent',
        axes: [{
            lineStyle: { width: 1.5 },
            background:'transparent',
            radius: '95%',
            labelStyle: {
                position: 'Inside', autoAngle: true,
                hiddenLabel: 'None',
                font: { fontFamily: 'inherit' }
            }, majorTicks: {
                position: 'Inside',
                width: 2, height: 10
            }, minorTicks: {
                position: 'Inside', width: 2,
                height: 5
            },
            minimum: 0, maximum: 160, startAngle: 220, endAngle: 140,
            pointers: [{
                value: 80, radius: '100%',
                markerHeight: 15, markerWidth: 15, type: 'Marker',
                markerShape: 'Triangle',
            }]
        }, {
            lineStyle: { width: 1.5, color: '#E84011' }, radius: '95%',
            labelStyle: {
                position: 'Outside', autoAngle: true,
                hiddenLabel: 'None', font: { fontFamily: 'inherit' }
            }, majorTicks: {
                position: 'Outside', width: 2, height: 10,
                color: '#E84011'
            }, minorTicks: {
                position: 'Outside', width: 2,
                height: 5, color: '#E84011'
            },
            minimum: 0, maximum: 240, startAngle: 220, endAngle: 140,
            pointers: [{
                value: 120, radius: '100%', color: '#E84011',
                markerHeight: 15, markerWidth: 15, type: 'Marker',
                markerShape: 'InvertedTriangle',
            }]
        }],
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    circulargauge.appendTo('#axis-container');
    let axisIndex: number = 0;
    let axis = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            axisIndex = +axis.value;
            direction.value = circulargauge.axes[axisIndex].direction;
            let startAngle: number = circulargauge.axes[axisIndex].startAngle;
            let endAngle: number = circulargauge.axes[axisIndex].endAngle;
            document.getElementById('start').innerHTML = startAngle.toString();
            document.getElementById('end').innerHTML = endAngle.toString();
            (<HTMLInputElement>document.getElementById('startAngle')).value = startAngle.toString();
            (<HTMLInputElement>document.getElementById('endAngle')).value = endAngle.toString();
        }
    });
    axis.appendTo('#axisIndex');

    let direction = new DropDownList({
        index: 0, width: '100%',
        change: () => {
            circulargauge.axes[axisIndex].direction = <GaugeDirection>direction.value.toString();
            circulargauge.axes[0].pointers[0].animation.enable = false;
            circulargauge.axes[1].pointers[0].animation.enable = false;
            circulargauge.refresh();
        }
    });
    direction.appendTo('#axisDirection');

    document.getElementById('startAngle').onpointermove = document.getElementById('startAngle').ontouchmove =
        document.getElementById('startAngle').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('startAngle')).value, 10);
            circulargauge.axes[0].pointers[0].animation.enable = false;
            circulargauge.axes[1].pointers[0].animation.enable = false;
            circulargauge.axes[axisIndex].startAngle = value;
            document.getElementById('start').innerHTML = value.toString();
            circulargauge.axes[axisIndex].labelStyle.hiddenLabel =
                isCompleteAngle(circulargauge.axes[axisIndex].startAngle, circulargauge.axes[axisIndex].endAngle) ?
                    'First' : 'None';
            circulargauge.refresh();
        };

    document.getElementById('endAngle').onpointermove = document.getElementById('endAngle').ontouchmove =
        document.getElementById('endAngle').onchange = () => {
            let value: number = parseInt((<HTMLInputElement>document.getElementById('endAngle')).value, 10);
            circulargauge.axes[0].pointers[0].animation.enable = false;
            circulargauge.axes[1].pointers[0].animation.enable = false;
            circulargauge.axes[axisIndex].endAngle = value;
            document.getElementById('end').innerHTML = value.toString();
            circulargauge.axes[axisIndex].labelStyle.hiddenLabel =
                isCompleteAngle(circulargauge.axes[axisIndex].startAngle, circulargauge.axes[axisIndex].endAngle) ?
                    'First' : 'None';
            circulargauge.refresh();
        };
};
