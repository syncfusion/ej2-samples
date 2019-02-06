import { loadCultureFiles } from '../common/culture-loader';
/**
 * Bubble sample
 */
import { Maps, Bubble, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom, Marker } from '@syncfusion/ej2-maps';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
Maps.Inject(Bubble, MapsTooltip, Zoom, Marker);
//tslint:disable
export interface Data {
    value?: number;
}
(window as any).default = (): void => {
    loadCultureFiles();
    let maps: Maps = new Maps({
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        titleSettings: {
            text: 'Headquarters of the United Nations',
            textStyle: {
                size: '16px'
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
            layerType: 'OSM',
            animationDuration: 0,
            markerSettings: [
                {
                    visible: true,
                    template: '<div><img src="src/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>',
                    dataSource: [{
                        name: 'Manhattan, New York, USA',
                        latitude: 40.7488758,
                        longitude: -73.9730091
                    }],
                    tooltipSettings: {
                        visible: true,
                        valuePath: 'name'
                    }
                }
            ]
        }]
    });
    maps.appendTo('#container');
};