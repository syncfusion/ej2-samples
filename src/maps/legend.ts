/**
 * Legend Sample
 */
import { Maps, Legend, MapsTooltip, ITooltipRenderEventArgs, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(Legend, MapsTooltip);
/* tslint:disable:no-string-literal */
this.default = (): void => {
    let maps: Maps = new Maps({
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (!args.options['data']) {
                args.cancel = true;
            }
        },
        zoomSettings: {
            enable: false
        },
        titleSettings: {
            text: 'Population density (per square kilometers) - 2015',
            textStyle: {
                size: '16px'
            }
        },
        legendSettings: {
            visible: true,
            position: 'Top'
        },
        layers: [
            {
                shapeData: new MapAjax(location.origin + location.pathname + 'src/maps/map-data/world-map.json'),
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                dataSource: new MapAjax(location.origin + location.pathname + 'src/maps/map-data/legend-datasource.json'),
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    format: '${name} : ${density} per square kms'
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
                        }
                    ]
                }
            }
        ]
    });
    maps.appendTo('#container');
};