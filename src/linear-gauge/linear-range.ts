/**
 * Linear Gauge Range Sample
 */
import { LinearGauge, Annotations, ILoadEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
LinearGauge.Inject(Annotations);
export function linear(): LinearGauge {
    let gauge: LinearGauge = new LinearGauge({
        load: (args: ILoadEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
        // custom code end
        orientation: 'Horizontal',
        axes: [{
            labelStyle: {
                format: '{value}%',
                offset: 30
            },
            line: {
                width: 0
            },
            pointers: [
                {
                    value: 35,
                    height: 10,
                    width: 10,
                    markerType: 'Triangle',
                    placement: 'Near',
                    offset: -40,
                }
            ],
            majorTicks: {
                height: 0
            },
            minorTicks: {
                height: 0
            },
            ranges: [{
                start: 0,
                end: 32,
                color: '#30B32D',
                startWidth: 15,
                endWidth: 15
            },
            {
                start: 32,
                end: 68,
                startWidth: 15,
                endWidth: 15,
                color: '#FFDF00'
            },
            {
                start: 68,
                end: 100,
                startWidth: 15,
                endWidth: 15,
                color: '#F03E3E'
            }]
        }],
        annotations: [{
            content: '<div id="pointer" style="width:20px"><h1 style="font-size:18px;">35</h1></div>',
            axisIndex: 0, zIndex: '1',
            axisValue: 35,
            y: -50
        }]
    });
    return gauge;
}