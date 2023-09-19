import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme, IAxisLabelRenderEventArgs } from '@syncfusion/ej2-lineargauge';
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
            minimum: 5,
            maximum: 20,
            opposedPosition: true,
            line: {
                width: 5
            },
            pointers: [{
                value: 5,
                height: 25,
                width: 25,
                placement: 'Near',
                markerType: 'Image',
                imageUrl: './src/linear-gauge/images/tick-icon.png'
            }, {
                value: 10,
                height: 25,
                width: 25,
                placement: 'Near',
                markerType: 'Image',
                imageUrl: './src/linear-gauge/images/tick-icon.png'
            }, {
                value: 15,
                height: 25,
                width: 25,
                placement: 'Near',
                markerType: 'Image',
                imageUrl: './src/linear-gauge/images/tick-icon.png'
            }, {
                value: 20,
                height: 25,
                width: 15,
                placement: 'Center',
                position: 'Cross',
                color: '#D1D9DD',
                offset: -2,
                markerType: 'Circle'
            }],
            ranges: [
                {
                    start: 5,
                    end: 10,
                    startWidth: 5,
                    endWidth: 5,
                    color: '#1FAC8A'
                }, {
                    start: 10,
                    end: 15,
                    startWidth: 5,
                    endWidth: 5,
                    color: '#1FAC8A'
                }, {
                    start: 15,
                    end: 20,
                    startWidth: 5,
                    endWidth: 5,
                    color: '#D1D9DD'
                }
            ],
            majorTicks: {
                height: 0,
                interval:5
            },
            minorTicks: {
                height: 0
            },
            labelStyle: {
                offset: 20,
                font: { size: '16px', fontFamily: 'inherit' }
            }
        }],
        axisLabelRender(args: IAxisLabelRenderEventArgs): void {
            if (args.text == "5")
                args.text = "Ordered";
            else if (args.text == "10")
                args.text = "Packed";
            else if (args.text == "15")
                args.text = "Shipped";
            else if (args.text == "20")
                args.text = "Delivered";
            else
                args.text = " ";
        },
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // custom code end
        }
    });
    gauge.appendTo('#stepprogressbar');
};