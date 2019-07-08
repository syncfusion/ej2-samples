/**
 * Changing projection sample
 */
import { Maps, Zoom, Legend, ProjectionType, MapsTooltip, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
Maps.Inject(Zoom, Legend, MapsTooltip);
// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * code for maps
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
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        // custom code end
        titleSettings: {
            text: 'Members of the UN Security Council',
            textStyle: {
                size: '16px'
            },
            subtitleSettings: {
                text: '- In 2017',
                alignment: 'Far'
            }
        },
        legendSettings: {
            visible: true
        },
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/world-map.json'),
                shapeDataPath: 'Country',
                shapePropertyPath: 'name',
                dataSource: new MapAjax('./src/maps/map-data/projection-datasource.json'),
                tooltipSettings: {
                    visible: true,
                    valuePath: 'Country',
                },
                shapeSettings: {
                    fill: '#E5E5E5',
                    colorMapping: [
                        {
                            value: 'Permanent',
                            color: '#EDB46F'
                        },
                        {
                            color: '#F1931B',
                            value: 'Non-Permanent'
                        }
                    ],
                    colorValuePath: 'Membership'
                }
            }
        ]
    });
    maps.appendTo('#container');
    // code for property panel 
    let projection: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select projection type',
        width: 120,
        change: () => {
            maps.projectionType = <ProjectionType>projection.value;
            maps.refresh();
        }
    });
    projection.appendTo('#projectiontype');
};