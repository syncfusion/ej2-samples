import { loadCultureFiles } from '../common/culture-loader';
/**
 * Bubble sample
 */

import { Maps, Bubble, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Bubble, MapsTooltip, Zoom);
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
            text: 'Location of Africa continent in the World map',
            textStyle: {
                size: '16px'
            }
        },
        zoomSettings: {
            enable: true
        },
        annotations: [{
            content: '<div style="height:18px;width:170px;background:white;text-align:center">' +
                '<a href="https://www.openstreetmap.org/copyright"  target = "_blank" > © OpenStreetMap contributors </a></div > ',
            verticalAlignment: 'Far',
            zIndex: '1',
            x: '-40',
            y: '-20',
            horizontalAlignment: 'Far'
        }],
        layers: [{
            layerType: 'OSM',
        },
        {
            type: 'SubLayer',
            animationDuration: 0,
            shapeData: new MapAjax('./src/maps/map-data/africa.json'),
            shapeSettings: {
                fill: '#5100a3',
                opacity: 0.4
            }
        }]
    });
    maps.appendTo('#container');
};