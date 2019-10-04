// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Legend Sample
 */
import { Maps, Legend, LegendMode, MapsTooltip, ITooltipRenderEventArgs,
    ILoadEventArgs, MapsTheme, MapAjax, LegendPosition } from '@syncfusion/ej2-maps';
import { CheckBox, ChangeEventArgs as CheckBoxChangeEvents } from '@syncfusion/ej2-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Maps.Inject(Legend, MapsTooltip);
// custom code start
/* tslint:disable:no-string-literal */
//tslint:disable:max-func-body-length
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
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        // custom code end
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (!args.options['data']) {
                args.cancel = true;
            }
        },
        zoomSettings: {
            enable: false
        },
        titleSettings: {
            text: 'Population density (per square kilometer) - 2015',
            textStyle: {
                size: '16px'
            }
        },
        legendSettings: {
            visible: true,
            position: 'Top',
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                dataSource: new MapAjax('./src/maps/map-data/legend-datasource.json'),
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    format: '${name} : ${density}'
                },
                shapeSettings: {
                    colorValuePath: 'density',
                    fill: '#E5E5E5',
                    colorMapping: [
                        {
                            from: 0.00001, to: 100, color: 'rgb(153,174,214)', label: '<100'
                        },
                        {
                            from: 100, to: 200, color: 'rgb(115,143,199)', label: '100 - 200'
                        },
                        {
                            from: 200, to: 300, color: 'rgb(77,112,184)', label: '200 - 300'
                        },
                        {
                            from: 300, to: 500, color: 'rgb(38,82,168)', label: '300 - 500'
                        },
                        {
                            from: 500, to: 19000, color: 'rgb(0,51,153)', label: '>500'
                        },
                        {
                            color: null, label: null
                        }
                    ]
                }
            }
        ]
    });
    maps.appendTo('#container');
    //code for property panel
    let legendPosition: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Legend Position',
        width: 100,
        change: () => {
            maps.legendSettings.position = <LegendPosition>legendPosition.value;
            if (legendPosition.value === 'Left' || legendPosition.value === 'Right') {
                maps.legendSettings.orientation = 'Vertical';
                if (maps.legendSettings.mode === 'Interactive') {
                    maps.legendSettings.height = '70%';
                    maps.legendSettings.width = '10';
                } else {
                    maps.legendSettings.height = '';
                    maps.legendSettings.width = '';
                }
            } else {
                maps.legendSettings.orientation = 'Horizontal';
                if (maps.legendSettings.mode === 'Interactive') {
                    maps.legendSettings.height = '10';
                    maps.legendSettings.width = '';
                }
            }
            maps.refresh();
        }
    });
    legendPosition.appendTo('#legendPosition');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select layoutMode type',
        width: 100,
        change: () => {
            maps.legendSettings.mode = <LegendMode>mode.value;
            if (mode.value === 'Interactive') {
                if (maps.legendSettings.orientation === 'Horizontal' || maps.legendSettings.orientation === 'None') {
                    maps.legendSettings.height = '10';
                    maps.legendSettings.width = '';
                } else {
                    maps.legendSettings.height = '70%';
                    maps.legendSettings.width = '10';
                }
            } else {
                maps.legendSettings.height = '';
                maps.legendSettings.width = '';
            }
            maps.refresh();
        }
    });
    mode.appendTo('#legendMode');
    let opacity: EmitType<CheckBoxChangeEvents>;
    let highlightCheckBox: CheckBox = new CheckBox(
    {
        change: opacity, checked: false
    },
    '#opacity');
    highlightCheckBox.change = opacity = (e: CheckBoxChangeEvents) => {
        if (e.checked) {
            maps.layers[0].shapeSettings.colorMapping[5].color = 'lightgrey';
            maps.layers[0].shapeSettings.colorMapping[5].label = 'No Data';
        } else {
            maps.layers[0].shapeSettings.colorMapping[5].color = null;
            maps.layers[0].shapeSettings.colorMapping[5].label = null;
        }
        maps.refresh();
    };
    let toggleLegend: EmitType<CheckBoxChangeEvents>;
    let legendCheckBox: CheckBox = new CheckBox(
    {
        change: toggleLegend, checked: false
    },
    '#toggleLegend');
    legendCheckBox.change = toggleLegend = (e: CheckBoxChangeEvents) => {
        maps.legendSettings.toggleLegendSettings.enable = e.checked;
        maps.refresh();
    };
};