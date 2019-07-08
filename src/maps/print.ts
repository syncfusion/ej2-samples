// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Changing exporting sample.
 */
import { Maps, ILoadEventArgs, MapsTheme, ITooltipRenderEventArgs, MapsTooltip, Legend, MapAjax } from '@syncfusion/ej2-maps';
import { Button } from '@syncfusion/ej2-buttons';
Maps.Inject(Legend, MapsTooltip);
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
            if (args.options.toString().indexOf('population') > -1) {
                args.cancel = true;
            }
        },
        format: 'n',
        useGroupingSeparator: true,
        titleSettings: {
            text: 'State-wise US population - 2010',
            textStyle: {
                size: '16px'
            },
        },
        legendSettings: {
            visible: true,
            mode: 'Interactive',
            position: 'Bottom',
            height: '10',
            width: '350',
            labelDisplayMode: 'Trim',
            alignment: 'Center'
        },
        layers: [
            {
                shapeData: new MapAjax('./src/maps/map-data/usa.json'),
                shapeDataPath: 'name',
                shapePropertyPath: 'name',
                dataSource: new MapAjax('./src/maps/map-data/print-datasource.json'),
                shapeSettings: {
                    border: {
                        width: 0.5,
                        color: 'gray'
                    },
                    colorValuePath: 'population',
                    colorMapping: [
                        {
                            from: 580000, to: 2800000, color: '#dae8f1', label: '<3M'
                        },
                        {
                            from: 2800000, to: 5280000, color: '#b0cde1', label: '3-6M'
                        },
                        {
                            from: 5280000, to: 8260000, color: '#90bad8', label: '6-9M'
                        },
                        {
                            from: 8260000, to: 11660000, color: '#6ea7d2', label: '9-12M'
                        },
                        {
                            from: 11660000, to: 19600000, color: '#4c96cb', label: '12-20M'
                        },
                        {
                            from: 19600000, to: 26500000, color: '#3182bd', label: '20-25M'
                        },
                        {
                            from: 26500000, to: 38400000, color: '#004374', label: '>25M'
                        }
                    ]
                },
                tooltipSettings: {
                    visible: true,
                    valuePath: 'population',
                    format: 'State: ${name} <br> Population: ${population}'
                }
            }
        ]
    });
    maps.appendTo('#container');
    // onclick event
    let togglebtn: Button = new Button({
        cssClass: 'e-info', isPrimary: true
    });
    togglebtn.appendTo('#togglebtn');
    document.getElementById('togglebtn').onclick = () => {
        maps.print();
    };
};