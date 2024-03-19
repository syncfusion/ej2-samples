/**
 * Marker sample
 */
import { Maps, Marker, MapsTooltip, ILoadEventArgs, MapsTheme, Zoom } from '@syncfusion/ej2-maps';
import { southAmericaCapitals} from './map-data/southamerica-country-capitals';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { worldMap } from './map-data/world-map';
Maps.Inject(Marker, MapsTooltip, Zoom);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
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
            text: 'Capitals of South American countries',
            textStyle: {
                size: '16px',
                fontFamily: 'Segoe UI'
            }
        },
        layers: [
            {
                shapeData: worldMap,
                shapeSettings: {
                    fill: '#C3E6ED',
                    border: {
                        width: 0.3,
                        color: 'black'
                    }
                },

                markerSettings: [
                    {
                        dataSource: southAmericaCapitals,
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
                            textStyle: {
                                fontFamily: 'Segoe UI'
                            }                
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