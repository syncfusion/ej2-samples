/**
 * Maps zooming sample
 */
import { Maps, Zoom, ILoadEventArgs, MapsTheme } from '@syncfusion/ej2-maps';
import { World_Map } from './MapData/WorldMap';
import { randomcountriesData } from './MapData/salesCountry';

Maps.Inject(Zoom);

let worldMap: object = World_Map;
this.default = (): void => {
    let maps: Maps = new Maps({
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
    zoomSettings: {
        enable: true,
        toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
        pinchZooming: true
    },
    layers: [
        {
            shapeData: worldMap,
            shapePropertyPath: 'continent',
            shapeDataPath: 'continent',
            shapeSettings: {
            autofill: true,
            colorValuePath: 'color'
        },
        dataSource: randomcountriesData
    }
    ]
    });
    maps.appendTo('#mapszooming');
    document.getElementById('mousewheel').onchange = () => {
    let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('mousewheel'));
    maps.zoomSettings.mouseWheelZoom = element.checked;
    maps.refresh();
};
    document.getElementById('pinch').onchange = () => {
    let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('pinch'));
    maps.zoomSettings.pinchZooming = element.checked;
    maps.refresh();
};
    document.getElementById('zoom').onchange = () => {
    let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('zoom'));
    maps.zoomSettings.enable = element.checked;
    maps.refresh();
};
    document.getElementById('doubletap').onchange = () => {
    let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('doubletap'));
    maps.zoomSettings.doubleClickZoom = element.checked;
    maps.zoomSettings.zoomOnClick = (!element.checked);
    let ele1: HTMLInputElement = <HTMLInputElement> document.getElementById('singletap');
    if (element.checked) {
        ele1.disabled = true;
    }else {
        ele1.disabled = false;
    }
};
    document.getElementById('singletap').onchange = () => {
    let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('singletap'));
    let ele1: HTMLInputElement = <HTMLInputElement> document.getElementById('doubletap');
    maps.zoomSettings.zoomOnClick = element.checked;
    maps.zoomSettings.doubleClickZoom = (!element.checked);
    if (element.checked) {
        ele1.disabled = true;
    }else {
        ele1.disabled = false;
    }
};
};