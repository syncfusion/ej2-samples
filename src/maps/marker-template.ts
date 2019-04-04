/**
 * Marker template sample
 */
import { Maps, Marker, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Marker);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
//tslint:disable:max-func-body-length
// custom code end
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        // custom code end
        zoomSettings: {
            enable: false
        },
        titleSettings: {
            text: ' Australia cities weather detail',
            textStyle: {
                size: '16px'
            }
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/australia.json'),
                shapeDataPath: 'STATE_NAME',
                markerSettings: [
                    {
                        height: 30,
                        width: 30,
                        visible: true,
                        template: '<div id="marker1"><img class="markerTemplate" src="src/maps/images/weather-clear.png"/>' +
                            '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                        dataSource: [
                            { Name: 'Perth', latitude: -31.950527, longitude: 115.860457, Temperature: 31.6 }
                        ]
                    },
                    {
                        height: 30,
                        width: 30,
                        visible: true,
                        template: '<div id="marker1"><img class="markerTemplate" src="src/maps/images/weather-clouds.png"/>' +
                            '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                        dataSource: [
                            { Name: 'Adelaide', latitude: -34.928499, longitude: 138.600746, Temperature: 28.5 }
                        ]
                    },
                    {
                        height: 30,
                        width: 30,
                        visible: true,
                        template: '<div id="marker1"><img class="markerTemplate" src="src/maps/images/weather-clear.png"/>' +
                            '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                        dataSource: [
                            { Name: 'Townsville', latitude: -19.2589635, longitude: 146.8169483, Temperature: 31.3 }
                        ]
                    },
                    {
                        height: 30,
                        width: 30,
                        visible: true,
                        template: '<div id="marker1"><img class="markerTemplate" src="src/maps/images/weather-rain.png"/>' +
                            '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                        dataSource: [
                            { Name: 'Sydney', latitude: -33.868820, longitude: 151.209296, Temperature: 26.4 }
                        ]
                    },
                    {
                        height: 30,
                        width: 30,
                        visible: true,
                        template: '<div id="marker1"><img class="markerTemplate" src="src/maps/images/weather-clear.png"/>' +
                            '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                        dataSource: [
                            { Name: 'Alice Springs', latitude: -23.698042, longitude: 133.880747, Temperature: 36.4 },
                        ]
                    },
                    {
                        height: 30,
                        width: 30,
                        visible: true,
                        template: '<div id="marker1"><img class="markerTemplate" src="src/maps/images/weather-clouds.png"/>'
                            + '<p>{{:Name}}:{{:Temperature}}°C</p></div>',
                        dataSource: [
                            { Name: 'Brisbane', latitude: -27.469771, longitude: 153.025124, Temperature: 29.1 }
                        ]
                    }
                ],
                tooltipSettings: {
                    visible: false
                },
                shapeSettings: {
                    autofill: true,
                    palette: ['#E2B247', '#88DB46', '#42C4E2', '#C08AF8', '#52BACC', '#F4CE2F', '#6986ED'],
                    border: {
                        width: 0.5,
                        color: 'white'
                    },
                }
            }
        ]
    });
    maps.appendTo('#markertemp');
};