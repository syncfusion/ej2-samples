import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ProgressAnnotation, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { loadProgressBarTheme } from './theme-colors';
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
            args.progressBar.progressColor = '#FFFFFF';
            let theme: string = loadProgressBarTheme(args);
            // tslint:disable-next-line:align
            switch (theme) {
                case 'material':
                    args.progressBar.trackColor = '#f8c2d4';
                    args.progressBar.progressColor = '#e91e63';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'fabric':
                    args.progressBar.progressColor = '#0078D6';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'bootstrap':
                    args.progressBar.progressColor = '#317ab9';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'tailwind':
                case 'tailwind3':
                    args.progressBar.progressColor = '#4F46E5';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;    
                case 'highcontrast':
                    args.progressBar.progressColor = '#FFD939';
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:20px;font-weight:bold;color:#FFD939;"><span>60%</span></div>';
                    break;
                case 'bootstrap-dark':
                case 'fabric-dark':
                case 'material-dark':
                    args.progressBar.progressColor = '#9A9A9A';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'tailwind-dark':
                    args.progressBar.progressColor = '#22D3EE';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'tailwind3-dark':
                    args.progressBar.progressColor = '#6366F1';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                    break;
                case 'bootstrap4':
                    args.progressBar.progressColor = '#007bff';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'bootstrap5':
                case 'bootstrap5-dark':
                case 'fluent':
                case 'fluent-dark':
                    args.progressBar.progressColor = '#0D6EFD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'material3':
                    args.progressBar.progressColor = '#6750A4';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'material3-dark':
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;  
                case 'fluent2':
                    args.progressBar.progressColor = '#0F6CBD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                    break;
                case 'fluent2-highcontrast':
                    args.progressBar.progressColor = '#1AEBFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                    break;
                case "fluent2-dark":
                    args.progressBar.progressColor = '#115EA3';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                break; 
                default:
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
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
            loadProgressBarTheme(args);
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
            loadProgressBarTheme(args);
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
            loadProgressBarTheme(args);
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
            loadProgressBarTheme(args);
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