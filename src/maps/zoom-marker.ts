/**
 * Marker sample
 */
import { Maps, Marker, MapsTooltip, ILoadEventArgs, MapsTheme, MapAjax, Zoom } from '@syncfusion/ej2-maps';
import * as dataSource from './map-data/southamerica-country-capitals.json';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
let data: any  = dataSource as any;
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
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
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
            text: 'Capitals of South American countries',
            textStyle: {
                size: '16px'
            }
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapeSettings: {
                    fill: '#C3E6ED',
                    border: {
                        width: 0.3,
                        color: 'black'
                    }
                },

                markerSettings: [
                    {
                        dataSource: data.southAmericaCountryCapitals,
                        visible: true,
                        animationDuration: 0,
                        height: 20,
                        width: 20,
                        shape: 'Image',
                        imageUrl: 'src/maps/images/ballon.png',
                        tooltipSettings: {
                            format:  '<b>Capital</b> : ${name}<br><b>Country</b> : ${Country}',
                            visible: true,
                            valuePath: 'name',
                        }
                    },
                ]
            }
        ]
    });
    maps.appendTo('#container');

    let zoomIntiatally: EmitType<CheckBoxChangeEvents>;
    let zoomIntiatallyCheckBox: CheckBox = new CheckBox(
    {
        change: zoomIntiatally, checked: false
    },
    '#zoom');
    zoomIntiatallyCheckBox.change = zoomIntiatally = (e: CheckBoxChangeEvents) => {
             maps.zoomSettings.shouldZoomInitially = e.checked;
    };
};