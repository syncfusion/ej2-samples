// custom code start
//tslint:disable
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Maps Annotation
 */
import { Maps, Annotations, Marker, MapsTheme, ILoadEventArgs, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Annotations, Marker);
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
        annotations: [
            {
                content: '#maps-annotation',
                x: '0%', y: '70%'
            }, {
                content: '#compass-maps',
                x: '80%', y: '5%'
            }
        ],
        layers: [
            {
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                shapeData: new MapAjax('./src/maps/map-data/africa-continent.json'),
                shapeSettings: {
                    fill: 'url(#grad1)'
                },
                markerSettings: [
                    {
                        visible: true,
                        template: '<h3 style="color:white">{{:name}}</h3>',
                        animationDuration: 1,
                        dataSource: [{
                            name: 'Africa', latitude: 13.97274101999902, longitude: 20.390625
                        }]
                    }
                ]
            }
        ]
    });
    maps.appendTo('#maps');
};