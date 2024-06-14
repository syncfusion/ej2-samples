/**
 * Dynamic Marker sample
 */
import { loadCultureFiles } from '../common/culture-loader';
import {
    Maps, Marker, Zoom, ILoadEventArgs, MapsTheme, IMouseEventArgs,
    NavigationLine, MarkerSettingsModel, MarkerSettings, MarkerType
} from '@syncfusion/ej2-maps';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
Maps.Inject(Marker, NavigationLine, Zoom);
// custom code start
//tslint:disable:max-func-body-length
//tslint:disable;
/* tslint:disable:no-string-literal */
// custom code end
let markerCheck: boolean = true;
let lineCheck: boolean;
let connectLineCheck: boolean;
let navigationLines: Object[] = [];
let latitude: number[] = [];
let longitude: number[] = [];
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let maps: Maps = new Maps({
        zoomSettings: {
            enable: true
        },
        layers: [
            {
                urlTemplate:'https://tile.openstreetmap.org/level/tileX/tileY.png'
            },
        ],
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        },
        // custom code end
        click: (args: IMouseEventArgs) => {
            if (markerCheck) {
                addMarker(args);
            }
            if (lineCheck && !connectLineCheck) {
                addLine(args, widthCheck['value']);
            }
            if (connectLineCheck) {
                addLine(args, widthCheck['value'], true);
            }
            if (markerCheck || lineCheck || connectLineCheck ) {
                maps.refresh();
                if (togglebtn.disabled && (maps.layers[0].markerSettings['length'] ||
                    maps.layers[0].navigationLineSettings['length'])) {
                    togglebtn.disabled = false;
                }
            }
        }
    });
    maps.appendTo('#container');

    let markerCheckBox: CheckBox = new CheckBox(
        {
            change: (e: CheckBoxChangeEvents) => {
                markerCheck = e.checked;
                markerShape.enabled = e.checked;
            }, checked: true
        },
        '#marker');

    let lineCheckBox: CheckBox = new CheckBox(
        {
            change: (e: CheckBoxChangeEvents) => {
                lineCheck = e.checked;
                if (e.checked) {
                    connectlineCheckBox.disabled = false;
                    connectlineCheckBox.checked = false;
                    widthCheck['disabled'] = false;
                } else {
                    connectLineCheck = e.checked;
                    emptySavedLinePositions();
                    connectlineCheckBox.disabled = true;
                    connectlineCheckBox.checked = false;
                    widthCheck['disabled'] = true;
                }
            }
        },
        '#line');


    let connectlineCheckBox: CheckBox = new CheckBox(
        {
            disabled: true,
            change: (e: CheckBoxChangeEvents) => {
                connectLineCheck = e.checked;
                if (!e.checked) {
                    emptySavedLinePositions();
                }
            }
        },
        '#connect');

    let markerShape: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select marker shape',
        width: '100%'
    });
    markerShape.appendTo('#type');

    let widthCheck: Element = document.getElementById('width');

    let togglebtn: Button = new Button({
        cssClass: 'e-info',
        isPrimary: true,
        disabled: true
    });
    togglebtn.appendTo('#togglebtn');

    document.getElementById('togglebtn').onclick = () => {
        maps.layers[0].markerSettings = [];
        maps.layers[0].navigationLineSettings = [];
        navigationLines = [];
        emptySavedLinePositions();
        togglebtn.disabled = true;
    };
    let emptySavedLinePositions: any = () => {
        latitude = [];
        longitude = [];
    };
    let addMarker: any = (args: any) => {
        if (args['latitude'] !== null && args['longitude'] !== null) {
            let layerIndex: number = (args.target.indexOf('_LayerIndex_') !== -1) ?
                parseFloat(args.target.split('_LayerIndex_')[1].split('_')[0]) : 0;
            let marker: MarkerSettingsModel[];
            let dynamicMarker: MarkerSettingsModel[] = maps.layersCollection[layerIndex].markerSettings;
            dynamicMarker.push(new MarkerSettings(maps, 'markerSettings', marker));
            let markerIndex: number = dynamicMarker.length - 1;
            dynamicMarker[markerIndex].visible = true;
            dynamicMarker[markerIndex].dataSource = [
                { latitude: args['latitude'], longitude: args['longitude'], name: 'dynamicmarker' }
            ];
            dynamicMarker[markerIndex].animationDuration = 0;
            dynamicMarker[markerIndex].fill = '#DB4537';
            dynamicMarker[markerIndex].shape = (markerShape.value !== 'Image') ? markerShape.value as MarkerType : 'Image';
            dynamicMarker[markerIndex].height = (markerShape.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].width = (markerShape.value !== 'Image') ? 12 : 20;
            dynamicMarker[markerIndex].imageUrl = (markerShape.value !== 'Image') ? '' : 'src/maps/images/ballon.png';
        }
    };

    let addLine: any = (lineArgs: any, lineWidth: number, connectiveLine?: boolean) => {
        if (lineArgs.latitude != null && lineArgs.longitude != null) {
            latitude.push(lineArgs.latitude);
            longitude.push(lineArgs.longitude);
        }
        if (latitude.length >= 2) {
            navigationLines.push({
                'visible': true,
                'latitude': [latitude[(latitude.length - 2)], latitude[(latitude.length - 1)]],
                'longitude': [longitude[(longitude.length - 2)], longitude[(longitude.length - 1)]],
                'angle': 0,
                'color': 'blue',
                'width': (lineWidth > 5) ? 5 : (((5 >= lineWidth) && (lineWidth >= 1)) ? lineWidth : 1)
            });
            maps.layers[0].navigationLineSettings = navigationLines;
            if (!connectiveLine) {
                emptySavedLinePositions();
            }
        }
    };
};
