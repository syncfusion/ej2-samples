/**
 * Multi-layer map sample
 */
import { Maps, Marker, ILoadEventArgs, MapsTheme, MapsTooltip, DataLabel, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Marker, MapsTooltip, DataLabel);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
//tslint:disable:max-func-body-length
// custom code end
/**
 * Code for Maps
 */
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        zoomSettings: {
            enable: true,
            pinchZooming: true
        },
        titleSettings: {
            text: 'Samsung Semiconductor office locations in USA',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/usa.json'),
                shapeSettings: {
                    fill: '#E5E5E5',
                    border: {
                        color: 'black',
                        width: 0.1
                    }
                },
                dataLabelSettings: {
                    visible: true,
                    labelPath: 'iso_3166_2',
                    smartLabelMode: 'Hide',
                    textStyle: {
                        fontFamily: 'Segoe UI',
                        color: 'black'
                    }
                }
            },
            {
                shapeData: new MapAjax('./src/maps/map-data/texas.json'),
                type: 'SubLayer',
                shapeSettings: {
                    fill: 'rgba(141, 206, 255, 0.6)',
                    border: {
                        color: '#1a9cff',
                        width: 0.25
                    }
                },
                markerSettings: [
                    {
                        visible: true,
                        width: 20,
                        height: 20,
                        template: '#markercircle',
                        dataSource: [
                            {
                                latitude: 30.267153,
                                longitude: -97.7430608,
                                name: 'Austin'
                            }
                        ],
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name',
                            format: '<b>${name}</b><br>Manufacturing Center,<br>Research and Development Center',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }
                        }
                    },
                    {
                        visible: true,
                        dataSource: [
                            {
                                latitude: 31.80289258670676,
                                longitude: -98.96484375
                            }
                        ],
                        template: '<div style="color:black; font-family: Segoe UI;">TX</div>'
                    }
                ]
            },
            {
                shapeData: new MapAjax('./src/maps/map-data/california.json'),
                type: 'SubLayer',
                shapeSettings: {
                    fill: 'rgba(141, 206, 255, 0.6)',
                    border: {
                        color: '#1a9cff',
                        width: 0.25
                    }
                },
                markerSettings: [
                    {
                        visible: true,
                        width: 20,
                        height: 20,
                        dataSource: [
                            {
                                latitude: 37.3382082,
                                longitude: -121.8863286,
                                name: 'San Jose'
                            }
                        ],
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name',
                            format: '<b>${name}</b><br>Regional Office,<br>Research and Development Center',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }
                        },
                        template: '#markercircle'
                    },
                    {
                        visible: true,
                        dataSource: [
                            {
                                latitude: 37.09023980307208,
                                longitude: -119.35546875000001
                            }
                        ],
                        template: '<div style="color:black; font-family: Segoe UI;">CA</div>'
                    }
                ]
            }
        ]
    });
    maps.appendTo('#container');
};