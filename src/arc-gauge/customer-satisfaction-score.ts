// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * The customer satisfaction score sample
 */
import { CircularGauge, ILoadedEventArgs, Annotations, GaugeTooltip, Legend, GaugeTheme } from '@syncfusion/ej2-circulargauge';
CircularGauge.Inject(Annotations, GaugeTooltip, Legend);
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let circulargauge: CircularGauge = new CircularGauge({
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.gauge.theme = <GaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        },
        height: '400px',
        allowMargin: false,
        title: 'Customer Satisfaction Score',
        titleStyle: {
            size: '18px',
            fontFamily: 'inherit'
        },
        tooltip: {
            enable: true,
            template:
                '<div style="font-size:18px;background:white;width:180px;color:#595959;border:1px solid #e8e8e8">Current Score: ${value} </div>',
        },
        legendSettings: {
            visible: true,
            position: 'Bottom',
            width: "55%",
            textStyle: {
                size: '12px',
                fontFamily: 'inherit'
            }
        },
        axes: [
            {
                annotations: [
                    {
                        content:
                            '<div style="font-size:16px;font-family:inherit;">7.5</div>',
                        angle: 0,
                        zIndex: '1',
                        radius: '-15%',
                    },
                ],
                lineStyle: { width: 0 },
                labelStyle: {
                    font: {
                        size: '12px',
                        fontFamily: 'inherit'
                    },
                    position: 'Outside',
                    offset: -40,
                },
                majorTicks: {
                    height: 12,
                    width: 1.5,
                    interval: 2,
                    offset: 35
                },
                minorTicks: { height: 0 },
                startAngle: 270,
                endAngle: 90,
                minimum: 0,
                maximum: 10,
                radius: '100%',
                pointers: [
                    {
                        radius: '70%',
                        needleEndWidth: 2,
                        pointerWidth: 5,
                        value: 7.5,
                        cap: {
                            radius: 8,
                            border: { width: 2 },
                        },
                    },
                    {
                        type: 'Marker',
                        markerShape: 'Rectangle',
                        markerWidth: 40,
                        markerHeight: 0.5,
                        animation: {
                            enable: false
                        },
                        radius: '68%',
                        value: 6.5,
                        color: '#0477c2',
                    },
                    {
                        type: 'Marker',
                        markerShape: 'Rectangle',
                        markerWidth: 40,
                        markerHeight: 0.5,
                        animation: {
                            enable: false
                        },
                        radius: '68%',
                        value: 9.5,
                        color: '#0477c2',
                    },
                ],
                ranges: [
                    {
                        start: 0,
                        end: 2,
                        startWidth: 40,
                        endWidth: 40,
                        color: '#F03E3E',
                        radius: '80%',
                        legendText: 'Poor'
                    },
                    {
                        start: 6.5,
                        end: 9.5,
                        startWidth: 120,
                        endWidth: 120,
                        color: '#0477c2',
                        radius: '110%',
                        legendText: 'Average Score'
                    },
                    {
                        start: 2,
                        end: 5,
                        startWidth: 40,
                        endWidth: 40,
                        color: '#f6961e',
                        radius: '80%',
                        legendText: 'Satisfied'
                    },
                    {
                        start: 5,
                        end: 8,
                        startWidth: 40,
                        endWidth: 40,
                        color: '#FFDD00',
                        radius: '80%',
                        legendText: 'Good'
                    },
                    {
                        start: 8,
                        end: 10,
                        startWidth: 40,
                        endWidth: 40,
                        color: '#30B32D',
                        radius: '80%',
                        legendText: 'Excellent'
                    },
                ],
            },
        ],
    });
    circulargauge.appendTo('#gauge');
};
