// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Osm sample
 */
import { Maps, Bubble, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom, Marker } from '@syncfusion/ej2-maps';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
Maps.Inject(Bubble, MapsTooltip, Zoom, Marker);
// custom code start
//tslint:disable
// custom code end
export interface Data {
    value?: number;
}
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
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i,  'Contrast').replace(/5.3/i, '5');
        },
        // custom code end
        titleSettings: {
            text: 'Headquarters of the United Nations',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        centerPosition: {
            latitude: 40.7209,
            longitude: -73.9680
        },
        zoomSettings: {
            zoomFactor: 10,
            enable: false
        },
        layers: [{
            urlTemplate:'https://tile.openstreetmap.org/level/tileX/tileY.png',
            animationDuration: 0,
            markerSettings: [
                {
                    visible: true,
                    template: '<div><img alt="Balloon image" src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>',
                    dataSource: [{
                        name: 'Manhattan, New York, USA',
                        latitude: 40.7488758,
                        longitude: -73.9730091
                    }],
                    tooltipSettings: {
                        visible: true,
                        valuePath: 'name',
                        textStyle: {
                            fontFamily: 'Segoe UI'
                        }
                    }
                }
            ]
        }]
    });
    maps.appendTo('#container');
};
