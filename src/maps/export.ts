// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Changing exporting sample.
 */
import { Maps, Marker, MapsTooltip, ILoadEventArgs, MapsTheme, ExportType, MapAjax } from '@syncfusion/ej2-maps';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';

Maps.Inject(Marker, MapsTooltip);
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
        titleSettings: {
            text: 'Location of the Wonders in the World',
            textStyle: {
                size: '16px'
            },
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapeSettings: { fill: 'lightgrey', border: { color: 'black', width: 0.1 } },
                markerSettings: [
                    {
                        animationDuration: 0,
                        visible: true,
                        dataSource: [
                            { longitude: 116.5703749, latitude: 40.4319077, name: 'The Great Wall of China, China ' },
                            { longitude: 35.4443622, latitude: 30.3284544, name: 'Petra, Jorden' },
                            { longitude: 78.0421552, latitude: 27.1750151, name: 'Taj Mahal, Agra, India' },
                            { longitude: 12.4922309, latitude: 41.8902102, name: 'The Roman Colosseum, Rome, Italy' },
                            { longitude: -88.5677826, latitude: 20.6842849, name: 'The Chichen Itza, Mexico' },
                            { longitude: -72.5449629, latitude: -13.1631412, name: 'Machu Picchu, Peru' },
                            { longitude: -43.2104872, latitude: -22.951916, name: 'Christ Redeemer, Rio de janeiro, Brazil' },
                        ],
                        shape: 'Balloon',
                        fill: '#E13E40',
                        height: 20,
                        width: 15,
                        tooltipSettings: {
                            visible: true,
                            valuePath: 'name'
                        },
                    }
                ],
            }
        ]
    });
    maps.appendTo('#container');
    // code for property panel
    let mode: DropDownList = new DropDownList({
        index: 0,
        width: '100px'
    });
    mode.appendTo('#mode');
    let togglebtn: Button = new Button({
         cssClass: 'e-info', isPrimary: true
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        let fileName: string = (<HTMLInputElement>(document.getElementById('fileName'))).value;
        maps.export(<ExportType>mode.value, fileName);
    };
};