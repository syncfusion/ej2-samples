/**
 * Marker Cluster sample
 */
import { Maps, Marker, Zoom, MapsTooltip, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
import * as dataSource from './map-data/sales-map.json';
let data: any = dataSource as any;
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
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
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
                        dataSource: data.salesmap,
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