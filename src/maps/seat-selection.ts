// custom code start
import { loadCultureFiles } from '../common/culture-loader';
// custom code end
/**
 * Seat Selection sample
 */
import { Maps, ISelectionEventArgs, Selection, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
(window as any).default = (): void => {
    // custom code start
    loadCultureFiles();
    // custom code end
    let seatInfo: HTMLDivElement = <HTMLDivElement>document.getElementById('selectedseats');
    Maps.Inject(Selection);
    interface SeatInfo {
        seatno?: number;
        fill?: string;
    }
    let maps: Maps = new Maps({
        // custom code start
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        // custom code end
        projectionType: 'Equirectangular',
        itemSelection: (args: ISelectionEventArgs) => {
            if ((args.shapeData as SeatInfo).fill === 'Orange') {
                args.fill = 'Orange !important';
                document.getElementById(args.target).setAttribute('class', 'ShapeselectionMapStyle');
                return;
            }
            args.fill = 'green';
            let seat: number = (args.shapeData as SeatInfo).seatno;
            let connector: string = ' ';
            if (seatInfo.innerHTML === '') {
                seatInfo.innerHTML = '<span id="seat-info">Seats Selected -</span>';
            } else {
                connector = ', ';
            }
            let seatString: string = '<span class="seats">' + connector + seat + '</span>';
            let seatString1: string = ' ' + seat + '</span><span class="seats">,';
            let lastString: string = '<span id="seat-info">Seats Selected -</span><span class="seats"> ' + seat + '</span>';
            if (seatInfo.innerHTML.indexOf(seatString) === -1 && seatInfo.innerHTML.indexOf(seatString1) === -1 &&
                seatInfo.innerHTML.indexOf(lastString) === -1) {
                seatInfo.innerHTML += '<span class="seats">' + connector + seat + '</span>';
            } else {
                seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString, '');
                seatInfo.innerHTML = seatInfo.innerHTML.replace(seatString1, '');
                if (seatInfo.innerHTML === lastString) {
                    seatInfo.innerHTML = '';
                }
            }
        },
        height: '400',
        zoomSettings: {
            enable: false
        },
        layers: [
            {
                geometryType: 'Normal',
                shapeData: new MapAjax('./src/maps/map-data/seat.json'),
                shapeSettings: {
                    colorValuePath: 'fill'
                },
                selectionSettings: {
                    enable: true,
                    opacity: 1,
                    enableMultiSelect: true
                }
            }
        ]
    });
    maps.appendTo('#maps');
    document.getElementById('clear-btn').onclick = () => {
        seatInfo.innerHTML = '';
        let selected: HTMLCollection = document.getElementsByClassName('ShapeselectionMapStyle');
        for (let i: number = 0, length: number = selected.length; i < length; i++) {
            selected[0].setAttribute('class', '');
        }
    };
};