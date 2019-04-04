// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Maps datalabel sample
 */
import { Maps, MapsTooltip, DataLabel, ILoadEventArgs, MapsTheme, SmartLabelMode, IntersectAction, MapAjax } from '@syncfusion/ej2-maps';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Maps.Inject(MapsTooltip, DataLabel);
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
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                dataLabelSettings: {
                    visible: true,
                    labelPath: 'name',
                    smartLabelMode: 'Trim'
                },
                shapeData: new MapAjax('./src/maps/map-data/usa.json'),
                shapeSettings: {
                    autofill: true
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name'
                },
            }
        ]
    });
    maps.appendTo('#datalabel');
// code for property panel
    let intersectaction: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select intersect action',
        width: 120,
        change: () => {
            maps.layers[0].dataLabelSettings.intersectionAction = <IntersectAction>intersectaction.value;
            maps.refresh();
        }
    });
    intersectaction.appendTo('#intersectaction');
    let smartlabelmode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select smartlabel mode',
        width: 120,
        change: () => {
            maps.layers[0].dataLabelSettings.smartLabelMode = <SmartLabelMode>smartlabelmode.value;
            maps.refresh();
        }
    });
    smartlabelmode.appendTo('#smartlabelmode');
    document.getElementById('select').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('select'));
        maps.layers[0].dataLabelSettings.visible = element.checked;
        maps.refresh();
    };
};