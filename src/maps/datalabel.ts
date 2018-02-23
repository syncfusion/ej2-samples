/**
 * Maps datalabel sample
 */
import { Maps, MapsTooltip, DataLabel, ILoadEventArgs, MapsTheme, SmartLabelMode, IntersectAction } from '@syncfusion/ej2-maps';
import { usMap } from './MapData/USA';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Maps.Inject(MapsTooltip, DataLabel);
this.default = (): void => {
    let maps: Maps = new Maps({
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
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
                shapeData: usMap,
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