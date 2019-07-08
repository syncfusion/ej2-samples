// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Maps zooming sample
 */
import { Maps, Zoom, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';
import { EmitType } from '@syncfusion/ej2-base';
Maps.Inject(Zoom);
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
            enable: true,
            toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
            pinchZooming: true
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapePropertyPath: 'continent',
                shapeDataPath: 'continent',
                animationDuration: 500,
                shapeSettings: {
                    autofill: true,
                    colorValuePath: 'color'
                },
                dataSource: new MapAjax('./src/maps/map-data/zooming-datasource.json')
            }
        ]
    });
    maps.appendTo('#mapszooming');
    // code for property panel
    let sliderChange: EmitType<SliderChangeEventArgs>;
    let slider: Slider = new Slider(
        {
            value: 500,
            min: 0, max: 1000, step: 250,
            change: sliderChange
        },
        '#range');
    slider.change = sliderChange = (e: SliderChangeEventArgs) => {
        maps.layers[0].animationDuration = e.value as number;
        maps.refresh();
        document.getElementById('dur').innerHTML = e.value.toString() + ' ms';
    };
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
        let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('singletap');
        if (element.checked) {
            ele1.disabled = true;
        } else {
            ele1.disabled = false;
        }
    };
    document.getElementById('singletap').onchange = () => {
        let element: HTMLInputElement = <HTMLInputElement>(document.getElementById('singletap'));
        let ele1: HTMLInputElement = <HTMLInputElement>document.getElementById('doubletap');
        maps.zoomSettings.zoomOnClick = element.checked;
        maps.zoomSettings.doubleClickZoom = (!element.checked);
        if (element.checked) {
            ele1.disabled = true;
        } else {
            ele1.disabled = false;
        }
    };
};