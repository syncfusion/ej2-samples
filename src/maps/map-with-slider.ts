// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Map with slider sample
 */
import { Maps, MapsTooltip, ILoadEventArgs, MapsTheme, MapAjax, ILoadedEventArgs, Annotations } from '@syncfusion/ej2-maps';
import { Slider, SliderChangeEventArgs  } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
Maps.Inject(MapsTooltip, Annotations);
// custom code start
//tslint:disable:max-func-body-length
// custom code end
let sliderVal: number | number[] = [-2 , 4];
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let colorCodes: string[] = ['#7E9CDC', '#DCD57E', '#7EDCA2', '#6EB5D0', '#A6DC7E', '#DCA87E', '#d075c6'];
    let maps: Maps = new Maps({
        margin: {
            bottom: 20
        },
        titleSettings: {
            text: 'Average annual population growth in North American countries',
            textStyle: {
                size: '16px'
            }
        },
        loaded: (args: ILoadedEventArgs) => {
            if (!isNullOrUndefined(document.getElementById('mapslider_Annotation_0'))) {
                annotationRender(sliderVal);
            }
        },
        zoomSettings: {
            enable: false
        },
        annotations: [
            {
                content: '#mapslider-annotation',
                horizontalAlignment: 'Center',
                y: '93%'
            }
        ],
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/north-america.json'),
                shapePropertyPath: 'name',
                shapeDataPath: 'name',
                dataSource: new MapAjax('./src/maps/map-data/population-growth.json'),
                shapeSettings: {
                    colorValuePath: 'population',
                    colorMapping: [
                        {
                            from: -1.5, to: -0.75, color: '#7E9CDC'
                        },
                        {
                            from: -0.75, to: 0, color: '#DCD57E'
                        },
                        {
                            from: 0.1, to: 0.75, color: '#7EDCA2'
                        },
                        {
                            from: 0.76, to: 1.5, color: '#6EB5D0'
                        },
                        {
                            from: 1.5, to: 2.25, color: '#A6DC7E'
                        },
                        {
                            from: 2.25, to: 3, color: '#DCA87E'
                        },
                        {
                            from: 3, to: 3.75, color: '#d075c6'
                        }
                    ]
                },
                tooltipSettings: {
                    visible: true,
                    format: '${name} : ${population}%'
                }
            }
        ],
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
            theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i,  'Contrast');
        }
    });
    maps.appendTo('#mapslider');
    // code for annotation
    function annotationRender(val: number | number[]): void {
        let slider: Slider = new Slider({
            min: -1.5, max: 3.75,
            value: val,
            step: 0.75,
            type: 'Range',
            ticks: { placement: 'After', largeStep: 0.75 },
            changed: (args: SliderChangeEventArgs) => {
                if (!isNaN(args.value[0]) && !isNaN(args.value[1])) {
                    for (let i: number = 0; i < maps.layers[0].shapeSettings.colorMapping.length; i++) {
                        if (maps.layers[0].shapeSettings.colorMapping[i].from < args.value[0] ||
                            maps.layers[0].shapeSettings.colorMapping[i].to > args.value[1]) {
                                maps.layers[0].shapeSettings.colorMapping[i].color = '#E5E5E5';
                        } else {
                            maps.layers[0].shapeSettings.colorMapping[i].color = colorCodes[i];
                        }
                    }
                    sliderVal = args.value;
                    maps.refresh();
                }
            }
        });
        slider.appendTo('#mapannotation');
    }
};