import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ProgressAnnotation, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
ProgressBar.Inject(ProgressAnnotation);
/**
 * Sample for Semi circular progress bar
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let fullBackground: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 60,
        width: '160px',
        height: '160px',
        enableRtl: false,
        radius: '100%',
        innerRadius: '190%',
        trackThickness: 80,
        cornerRadius: 'Round',
        progressThickness: 10,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.progressColor = '#FFFFFF';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            // tslint:disable-next-line:align
            switch (selectedTheme) {
                case 'material':
                    args.progressBar.trackColor = '#e91e63';
                    break;
                case 'fabric':
                    args.progressBar.trackColor = '#0078D6';
                    break;
                case 'bootstrap':
                    args.progressBar.trackColor = '#317ab9';
                    break;
                case 'tailwind':
                    args.progressBar.progressColor = '#4F46E5';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;    
                case 'highcontrast':
                    args.progressBar.trackColor = '#FFD939';
                    args.progressBar.progressColor = '#000000';
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:20px;font-weight:bold;color:#000000;fill:#000000"><span>60%</span></div>';
                    break;
                case 'bootstrap-dark':
                case 'fabric-dark':
                case 'material-dark':
                    args.progressBar.progressColor = '#9A9A9A';
                    break;
                case 'tailwind-dark':
                    args.progressBar.progressColor = '#22D3EE';
                    break;
                case 'bootstrap5':
                case 'bootstrap5-dark':
                    args.progressBar.progressColor = '#0D6EFD';
                    break;
                case 'fluent':
                    if (args.progressBar.element.id === "full-background") {
                        args.progressBar.trackColor = '#0D6EFD';
                    } else {
                        args.progressBar.progressColor = '#0D6EFD';
                    }
                    break;
                case 'fluent-dark':
                    args.progressBar.progressColor = '#0D6EFD';
                    break;
                default:
                    args.progressBar.trackColor = '#007bff';
                    break;
            }
        },
        annotations: [
            {
                content: '<div id="point1" style="font-size:20px;font-weight:bold;color:#ffffff"><span>60%</span></div>',
            }
        ],
    });
    fullBackground.appendTo('#full-background');


    let partBackground: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 60,
        width: '160px',
        height: '160px',
        radius: '73%',
        innerRadius: '80%',
        progressThickness: 62,
        trackThickness: 59,
        trackColor: 'lightgray',
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
    });
    partBackground.appendTo('#part-background');

    let outerRadius: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 90,
        width: '160px',
        height: '160px',
        innerRadius: '72',
        progressThickness: 8,
        cornerRadius: 'Round',
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
    });
    outerRadius.appendTo('#outer-radius');

    let onRadius: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 90,
        width: '160px',
        height: '160px',
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        trackThickness: 3,
        progressThickness: 8,
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
    });
    onRadius.appendTo('#on-radius');

    let pie: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 70,
        width: '160px',
        height: '160px',
        enablePieProgress: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        },
    });
    pie.appendTo('#pie');

    let replayBtn: HTMLElement = document.getElementById('reLoad') as HTMLElement;
    replayBtn.onclick = () => {
        fullBackground.refresh();
        outerRadius.refresh();
        onRadius.refresh();
        pie.refresh();
    };
};