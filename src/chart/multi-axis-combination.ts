import { loadCultureFiles } from '../common/culture-loader';
import { Chart, LineSeries, SplineSeries, AreaSeries, DateTimeCategory, Legend, Tooltip,
    Crosshair, ChartAnnotation, Highlight, ILoadedEventArgs, ILegendRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

Chart.Inject(LineSeries, SplineSeries, AreaSeries, DateTimeCategory, Legend, Tooltip, Crosshair, ChartAnnotation, Highlight );

interface ClimateDataPoint {
    Month: Date;
    TemperatureAnomaly: number;
    AtmosphericCO2: number;
    SeaIceExtent: number;
}

const climateData: ClimateDataPoint[] = [
    { Month: new Date(2025, 0, 1), TemperatureAnomaly: 1.75, AtmosphericCO2: 426.65, SeaIceExtent: 13.11 },
    { Month: new Date(2025, 1, 1), TemperatureAnomaly: 1.59, AtmosphericCO2: 427.09, SeaIceExtent: 14.26 },
    { Month: new Date(2025, 2, 1), TemperatureAnomaly: 1.60, AtmosphericCO2: 428.15, SeaIceExtent: 14.33 },
    { Month: new Date(2025, 3, 1), TemperatureAnomaly: 1.51, AtmosphericCO2: 429.35, SeaIceExtent: 13.73 },
    { Month: new Date(2025, 4, 1), TemperatureAnomaly: 1.40, AtmosphericCO2: 430.51, SeaIceExtent: 12.68 },
    { Month: new Date(2025, 5, 1), TemperatureAnomaly: 1.42, AtmosphericCO2: 429.95, SeaIceExtent: 10.82 },
    { Month: new Date(2025, 6, 1), TemperatureAnomaly: 1.37, AtmosphericCO2: 427.87, SeaIceExtent: 8.02 },
    { Month: new Date(2025, 7, 1), TemperatureAnomaly: 1.39, AtmosphericCO2: 425.71, SeaIceExtent: 5.92 },
    { Month: new Date(2025, 8, 1), TemperatureAnomaly: 1.44, AtmosphericCO2: 424.82, SeaIceExtent: 4.68 },
    { Month: new Date(2025, 9, 1), TemperatureAnomaly: 1.48, AtmosphericCO2: 425.46, SeaIceExtent: 6.08 },
    { Month: new Date(2025, 10, 1), TemperatureAnomaly: 1.53, AtmosphericCO2: 426.98, SeaIceExtent: 9.04 },
    { Month: new Date(2025, 11, 1), TemperatureAnomaly: 1.55, AtmosphericCO2: 428.12, SeaIceExtent: 11.83 }
];

const co2Annotation: string = `
    <div class="climate-insight climate-insight-blue climate-insight-anchor-down">
        <div class="climate-insight-marker climate-insight-marker-diamond"></div>
        <div class="climate-insight-leader"></div>
        <div class="climate-insight-pill">
            <span class="climate-insight-pin climate-insight-pin-diamond"></span>
            <span class="climate-insight-label">CO₂ seasonal peak</span>
            <span class="climate-insight-value">430.5 ppm</span>
        </div>
    </div>
`;

const seaIceAnnotation: string = `
    <div class="climate-insight climate-insight-green climate-insight-anchor-up">
        <div class="climate-insight-marker climate-insight-marker-rectangle"></div>
        <div class="climate-insight-leader"></div>
        <div class="climate-insight-pill">
            <span class="climate-insight-pin climate-insight-pin-rectangle"></span>
            <span class="climate-insight-label">Sea ice annual low</span>
            <span class="climate-insight-value">4.68 M km²</span>
        </div>
    </div>
`;

const temperatureAnnotation: string = `
    <div class="climate-insight climate-insight-orange climate-insight-anchor-right">
        <div class="climate-insight-marker climate-insight-marker-circle"></div>
        <div class="climate-insight-leader"></div>
        <div class="climate-insight-pill">
            <span class="climate-insight-pin climate-insight-pin-circle"></span>
            <span class="climate-insight-label">Hottest anomaly</span>
            <span class="climate-insight-value">+1.75°C</span>
        </div>
    </div>
`;

/**
 * Global Climate Pulse multi-axis combination chart.
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const chart: Chart = new Chart({
        title: 'Global Climate Pulse',
        subTitle: 'Monthly global climate signals during 2025 • Copernicus C3S • NOAA GML • NSIDC',
        titleStyle: {
            textAlignment: 'Near',
            fontFamily: 'Segoe UI',
            fontWeight: '700',
            size: '24px',
            textOverflow: 'Wrap'
        },
        subTitleStyle: {
            textAlignment: 'Near',
            fontFamily: 'Segoe UI',
            fontWeight: '500',
            size: '13px',
            textOverflow: 'Wrap'
        },
        primaryXAxis: {
            valueType: 'DateTimeCategory',
            intervalType: 'Months',
            interval: 1,
            labelFormat: 'MMM',
            edgeLabelPlacement: 'Shift',
            plotOffsetLeft: 10,
            plotOffsetRight: 10,
            majorGridLines: { width: 0 },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px'
            }
        },
        primaryYAxis: {
            title: 'Temperature Anomaly (°C)',
            minimum: 1.2,
            maximum: 1.8,
            interval: 0.1,
            labelFormat: '{value}°C',
            edgeLabelPlacement: 'Shift',
            majorGridLines: {
                width: 1,
                dashArray: '3,4'
            },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: {
                width: 1.5,
                color: '#F97316'
            },
            labelStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#EA580C'
            },
            titleStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '700',
                size: '13px',
                color: '#EA580C',
                textAlignment: 'Center'
            }
        },
        axes: [
            {
                name: 'CO2Axis',
                title: 'Atmospheric CO₂ (ppm)',
                opposedPosition: true,
                minimum: 422,
                maximum: 432,
                interval: 2,
                labelFormat: '{value} ppm',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 },
                minorGridLines: { width: 0 },
                majorTickLines: { width: 0 },
                lineStyle: {
                    width: 1.5,
                    color: '#2563EB'
                },
                labelStyle: {
                    fontFamily: 'Segoe UI',
                    fontWeight: '600',
                    size: '12px',
                    color: '#2563EB'
                },
                titleStyle: {
                    fontFamily: 'Segoe UI',
                    fontWeight: '700',
                    size: '13px',
                    color: '#2563EB',
                    textAlignment: 'Center'
                }
            },
            {
                name: 'SeaIceAxis',
                title: 'Arctic Sea Ice (million km²)',
                opposedPosition: true,
                minimum: 4,
                maximum: 16,
                interval: 2,
                labelFormat: '{value}M',
                edgeLabelPlacement: 'Shift',
                majorGridLines: { width: 0 },
                minorGridLines: { width: 0 },
                majorTickLines: { width: 0 },
                lineStyle: {
                    width: 1.5,
                    color: '#059669'
                },
                labelStyle: {
                    fontFamily: 'Segoe UI',
                    fontWeight: '600',
                    size: '12px',
                    color: '#059669'
                },
                titleStyle: {
                    fontFamily: 'Segoe UI',
                    fontWeight: '700',
                    size: '13px',
                    color: '#059669',
                    textAlignment: 'Center'
                }
            }
        ],
        series: [
            {
                type: 'Area',
                dataSource: climateData,
                name: 'Arctic Sea Ice (million km²)',
                xName: 'Month',
                yName: 'SeaIceExtent',
                yAxisName: 'SeaIceAxis',
                fill: '#10B981',
                opacity: 1,
                width: 2.5,
                border: {
                    width: 2.5,
                    color: '#059669'
                },
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                    gradientColorStop: [
                        { offset: 0, color: '#10B981', opacity: 0.30 },
                        { offset: 45, color: '#34D399', opacity: 0.15 },
                        { offset: 100, color: '#ECFDF5', opacity: 0.02 }
                    ]
                },
                marker: {
                    visible: true,
                    shape: 'Rectangle',
                    width: 8,
                    height: 8,
                    isFilled: true,
                    fill: '#10B981'
                },
                animation: {
                    enable: true,
                    duration: 1200,
                    delay: 0
                }
            },
            {
                type: 'Line',
                dataSource: climateData,
                name: 'Temperature Anomaly (°C)',
                xName: 'Month',
                yName: 'TemperatureAnomaly',
                fill: '#F97316',
                width: 4,
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 0,
                    gradientColorStop: [
                        { offset: 0, color: '#FB923C', opacity: 1 },
                        { offset: 55, color: '#F97316', opacity: 1 },
                        { offset: 100, color: '#C2410C', opacity: 1 }
                    ]
                },
                marker: {
                    visible: true,
                    shape: 'Circle',
                    width: 8,
                    height: 8,
                    isFilled: true,
                    fill: '#F97316'
                },
                animation: {
                    enable: true,
                    duration: 1400,
                    delay: 450
                }
            },
            {
                type: 'Spline',
                dataSource: climateData,
                name: 'Atmospheric CO₂ (ppm)',
                xName: 'Month',
                yName: 'AtmosphericCO2',
                yAxisName: 'CO2Axis',
                splineType: 'Natural',
                fill: '#2563EB',
                width: 3.5,
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 0,
                    gradientColorStop: [
                        { offset: 0, color: '#60A5FA', opacity: 1 },
                        { offset: 50, color: '#2563EB', opacity: 1 },
                        { offset: 100, color: '#1E40AF', opacity: 1 }
                    ]
                },
                marker: {
                    visible: true,
                    shape: 'Diamond',
                    width: 8,
                    height: 8,
                    isFilled: true,
                    fill: '#2563EB'
                },
                animation: {
                    enable: true,
                    duration: 1400,
                    delay: 950
                }
            }
        ],
        annotations: [
            {
                content: co2Annotation,
                x: new Date(2025, 4, 1),
                y: 430.51,
                coordinateUnits: 'Point',
                region: 'Chart',
                yAxisName: 'CO2Axis'
            },
            {
                content: seaIceAnnotation,
                x: new Date(2025, 8, 1),
                y: 4.68,
                coordinateUnits: 'Point',
                region: 'Chart',
                yAxisName: 'SeaIceAxis'
            },
            {
                content: temperatureAnnotation,
                x: new Date(2025, 0, 1),
                y: 1.75,
                coordinateUnits: 'Point',
                region: 'Chart'
            }
        ],
        tooltip: {
            enable: true,
            shared: true,
            enableMarker: true,
            opacity: 0.97,
            header: '<b>${point.x}</b>',
            format: '${series.name} : <b>${point.y}</b>'
        },
        crosshair: {
            enable: true,
            lineType: 'Vertical',
            dashArray: '4,4',
            line: {
                width: 1
            }
        },
        legendSettings: {
            visible: true,
            position: 'Bottom',
            alignment: 'Center',
            shapeWidth: 10,
            shapeHeight: 10,
            shapePadding: 8,
            padding: 24,
            enableHighlight: true,
            toggleVisibility: false,
            textStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px'
            }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        width: Browser.isDevice ? '100%' : '90%',
        legendRender: (args: ILegendRenderEventArgs): void => {
            if (args.text === 'Temperature Anomaly (°C)') {
                args.shape = 'Circle';
                args.fill = '#F97316';
            } else if (args.text === 'Atmospheric CO₂ (ppm)') {
                args.shape = 'Diamond';
                args.fill = '#2563EB';
            } else if (args.text === 'Arctic Sea Ice (million km²)') {
                args.shape = 'Rectangle';
                args.fill = '#10B981';
            }
        },
        load: (args: ILoadedEventArgs): void => {
            loadChartTheme(args);
            const chartElement: HTMLElement =
                args.chart.element as HTMLElement;

            if (args.chart.enableRtl) {
                chartElement.classList.add('climate-chart-rtl');
            } else {
                chartElement.classList.remove('climate-chart-rtl');
            }
        }
    });

    chart.appendTo('#container');
};
