/**
 * Marker Cluster sample
 */
import { Maps, Marker, Zoom, MapsTooltip, ILoadEventArgs, MapsTheme } from '@syncfusion/ej2-maps';
import { worldMap } from './map-data/world-map';
import { salesData } from './map-data/sales-map';
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
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i,  'Contrast').replace(/5.3/i, '5');
        },
        // custom code end
        useGroupingSeparator: true,
        format: 'n',
        zoomSettings: {
            enable: true,
            mouseWheelZoom: false,
            pinchZooming: false
        },
        titleSettings: {
            text: 'Sales details of products in various countries',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        tooltipDisplayMode: 'Click',
        layers: [
            {
                shapeData: worldMap,
                shapeSettings: {
                    fill: '#C1DFF5'
                },
                markerClusterSettings: {
                    allowClustering: true,
                    allowClusterExpand: true,
                    shape: 'Image',
                    height: 40,
                    width: 40,
                    labelStyle : { color: 'white'},
                    imageUrl: 'src/maps/images/cluster.svg'
                },
                markerSettings: [
                    {
                        visible: true,
                        dataSource: salesData,
                        shape: 'Image',
                        imageUrl: 'src/maps/images/ballon.png',
                        tooltipSettings: {
                            format: '<b>Name</b> : ${name}<br><b>Product</b> : ${product}<br><b>Total value</b> : ${worth}',
                            visible: true,
                            valuePath: 'area',
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }            
                        },
                        height: 15,
                        width: 15,
                        animationDuration: 0
                    },

                ]
            }
        ]
    });
    maps.appendTo('#container');
};