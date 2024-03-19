// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Osm with sublayer sample
 */
import { Maps, Bubble, MapsTooltip, MapsTheme, ILoadEventArgs, Zoom } from '@syncfusion/ej2-maps';
import { africa } from './map-data/africa';
Maps.Inject(Bubble, MapsTooltip, Zoom);
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
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        titleSettings: {
            text: 'Location of Africa continent in the World map',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        zoomSettings: {
            enable: true
        },
        layers: [{
            layerType: 'OSM',
        },
        {
            type: 'SubLayer',
            animationDuration: 0,
            shapeData: africa,
            shapeSettings: {
                fill: '#5100a3',
                opacity: 0.4
            }
        }]
    });
    maps.appendTo('#container');
};