/**
 * Marker Cluster sample
 */
import { Maps, Marker, Zoom, MapsTooltip, ILoadEventArgs, MapsTheme } from '@syncfusion/ej2-maps';
import { worldMap } from './map-data/world-map';
import { cluster } from './map-data/marker-cluster';
Maps.Inject(Marker, MapsTooltip, Zoom);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
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
        useGroupingSeparator: true,
        format: 'n',
        zoomSettings: {
            enable: true
        },
        titleSettings: {
            text: 'Top 50 largest cities in the World',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        layers: [
            {
                shapeData: worldMap,
                shapeSettings: {
                    fill: '#C1DFF5'
                },
                markerClusterSettings: {
                    allowClustering: true,
                    shape: 'Image',
                    height: 40,
                    width: 40,
                    labelStyle : { color: 'white'},
                    imageUrl: 'src/maps/images/cluster.svg'
                },
                markerSettings: [
                    {
                        visible: true,
                        dataSource: cluster,
                        shape: 'Image',
                        imageUrl: 'src/maps/images/ballon.png',
                        tooltipSettings: {
                            template: '#template',
                            visible: true,
                            valuePath: 'area',
                        },
                        height: 20,
                        width: 20,
                        animationDuration: 0
                    },

                ]
            }
        ]
    });
    maps.appendTo('#container');
};