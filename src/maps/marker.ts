/**
 * Marker sample
 */
import { Maps, Marker, MapsTooltip, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
import * as dataSource from './map-data/top-location.json';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
let data: any  = dataSource as any;
Maps.Inject(Marker, MapsTooltip);
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
            enable: false
        },
        titleSettings: {
            text: 'Top 25 populated cities in the world',
            textStyle: {
                size: '16px'
            }
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapeSettings: {
                    fill: '#C3E6ED'
                },
                markerSettings: [
                    {
                        dataSource: data.topPopulation,
                        visible: true,
                        animationDuration: 0,
                        shape: 'Circle',
                        fill: 'white',
                        width: 10,
                        border: { width: 2, color: '#285255' },
                        tooltipSettings: {
                            template: '#template',
                            visible: true,
                            valuePath: 'population',
                        }
                    },
                ]
            }
        ]
    });
    maps.appendTo('#container');

    let markerShape: EmitType<CheckBoxChangeEvents>;
    let markerShapeCheckBox: CheckBox = new CheckBox(
    {
        change: markerShape, checked: false
    },
    '#shape');
    markerShapeCheckBox.change = markerShape = (e: CheckBoxChangeEvents) => {
        if (e.checked) {
            maps.layers[0].markerSettings[0].shapeValuePath = 'shape';
        } else {
            maps.layers[0].markerSettings[0].shapeValuePath = null;
        }
    };
    let markerColor: EmitType<CheckBoxChangeEvents>;
    let markerColorCheckBox: CheckBox = new CheckBox(
    {
        change: markerColor, checked: false
    },
    '#color');
    markerColorCheckBox.change = markerColor = (e: CheckBoxChangeEvents) => {
        if (e.checked) {
            maps.layers[0].markerSettings[0].colorValuePath = 'color';
        } else {
            maps.layers[0].markerSettings[0].colorValuePath = null;
        }
    };
};