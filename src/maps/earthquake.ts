// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Earth quake map sample
 */
import { Maps, Zoom, Marker, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Zoom, Marker);
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
        centerPosition: {
            latitude: 1.5053645409602877,
            longitude: 105.14038085937499
        },
        zoomSettings: {
            enable: false,
            zoomFactor: 7,
            mouseWheelZoom: false,
            toolbars: []
        },
        mapsArea: {
            background: '#AEE2FA'
        },
        titleSettings: {
            text: '7.6 Magnitude earthquake strikes Sumatra - 2009',
            textStyle: {
                size: '18px'
            }
        },
        layers: [
            {
                animationDuration: 1000,
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                shapeData: new MapAjax('./src/maps/map-data/asia.json'),
                markerSettings: [{
                    visible: true,
                    height: 100,
                    width: 100,
                    template: '#template',
                    animationDuration: 0,
                    dataSource: [{
                        latitude: 1.625758360412755, longitude: 98.5693359375
                    }]
                }],
                shapeSettings: {
                    fill: '#FFFDCF',
                    border: {
                        color: '#3497C3 ',
                        width: 0.5
                    }
                },
                dataLabelSettings: {
                    visible: true,
                    labelPath: 'name',
                    smartLabelMode: 'Hide'
                }
            }
        ]
    });
    maps.appendTo('#maps');
};