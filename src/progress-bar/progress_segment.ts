import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ILoadedEventArgs, ProgressTheme, ProgressAnnotation } from '@syncfusion/ej2-progressbar';
import { Browser } from '@syncfusion/ej2/base';
import { loadProgressBarTheme } from './theme-colors';
ProgressBar.Inject(ProgressAnnotation);

/**
 * Sample for default bullet chart.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let linearProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '30',
        width: '70%',
        value: 40,
        segmentCount: Browser.isDevice? 25 : 50,
        gapWidth: 5,
        trackThickness: 15,
        progressThickness: 15,
        cornerRadius: 'Square',
        animation: {
            enable: true,
            duration: 2000
        },
        load: (args: ILoadedEventArgs) => {
            let theme: string = loadProgressBarTheme(args);
            if (theme === 'highcontrast') {
                args.progressBar.trackColor = '#969696';
            }
        }
    });
    linearProgress.appendTo('#linearSegment');

    let circularProgress: ProgressBar = new ProgressBar({
        type: 'Circular',
        height: '200px',
        width: '200px',
        trackThickness: 15,
        progressThickness: 15,
        startAngle: 220,
        endAngle: 140,
        segmentCount: 50,
        gapWidth: 5,
        value: 40,
        animation: {
            enable: true,
            duration: 2000
        },
        annotations: [{
            content: '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>'
        }],
        cornerRadius: 'Square',
        load: (args: ILoadedEventArgs) => {
            let theme: string = loadProgressBarTheme(args);

            switch (theme) {
                case 'material':
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'fabric':
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'bootstrap':
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'bootstrap4':
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'tailwind':
                case 'tailwind3':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;
                case 'bootstrap-dark':
                case 'fabric-dark':
                case 'material-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'bootstrap5':
                case 'bootstrap5-dark':
                case 'fluent':
                case 'fluent-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'tailwind-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'tailwind3-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                    break;
                case 'material3':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'material3-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;          
                case "fluent2":
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                    break;
                case "fluent2-dark":
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                    break; 
                case "fluent2-highcontrast":
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                    break; 
                default:
                    args.progressBar.trackColor = '#969696';
                    args.progressBar.annotations[0].content =
                        '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                    break;

            }
        }
    });
    circularProgress.appendTo('#circularSegment');

    let timer: number = window.setInterval(timing, 2500);
    function timing(): void {
        if (circularProgress.value >= circularProgress.maximum) {
            clearInterval(timer);
        } else {
            circularProgress.value += 20;
            linearProgress.value += 20;
        }
    }
};
