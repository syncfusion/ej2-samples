import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ProgressAnnotation, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
ProgressBar.Inject(ProgressAnnotation);

/**
 * Sample for Semi circular progress bar
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    function annotationElementContent(color: string, controlID: string): string {
        let content: string;
        switch (controlID) {
            case 'angle-container':
                content = '100%';
                break;
            case 'vertical-container':
                content = '100%';
                break;
            case 'vsemi-container':
                content = '100%';
                break;
            case 'semi-container':
                content = '100%';
                break;
        }
        return ('<div id="point1" style="font-size:24px;font-weight:bold;color: ' + color + ' "><span>' + content + '</span></div>');
    }
    let annotationColors: string[] = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD', '#6750A4', '#D0BCFF', '#0F6CBD', '#115EA3'];

    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        switch (selectedTheme) {
            case 'material':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[0], args.progressBar.element.id);
                break;
            case 'fabric':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[1], args.progressBar.element.id);
                break;
            case 'bootstrap':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[2], args.progressBar.element.id);
                break;
            case 'bootstrap4':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[3], args.progressBar.element.id);
                break;
            case 'tailwind':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[4], args.progressBar.element.id);
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[6], args.progressBar.element.id);
                break;
            case 'bootstrap5':
            case 'bootstrap5-dark':
            case 'fluent':
            case 'fluent-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[8], args.progressBar.element.id);
                break;
            case 'tailwind-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[7], args.progressBar.element.id);
                break;
            case 'material3':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[9], args.progressBar.element.id);
                break;
            case 'material3-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[10], args.progressBar.element.id);
                break;       
            case "fluent2":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[11], args.progressBar.element.id);
                break;
            case "fluent2-dark":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[12], args.progressBar.element.id);
                break;
            default:
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[5], args.progressBar.element.id);
                break;

        }
    };

    let button: Button = new Button();
    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#reLoad');

    let inverseSemiProgress: ProgressBar = new ProgressBar({
        type: 'Circular',
        startAngle: 240,
        endAngle: 120,
        minimum: 0,
        width: '160px',
        height: '160px',
        maximum: 100,
        value: 100,
        cornerRadius: 'Round',
        trackThickness: 5,
        progressThickness: 5,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        annotations: [
            {
                content: '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>'
            },
        ],
        load: progressLoad
    });
    inverseSemiProgress.appendTo('#angle-container');

    let verticalProgress: ProgressBar = new ProgressBar({
        type: 'Circular',
        startAngle: 180,
        endAngle: 0,
        minimum: 0,
        width: '160px',
        height: '160px',
        maximum: 100,
        value: 100,
        cornerRadius: 'Round',
        trackThickness: 5,
        progressThickness: 5,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        annotations: [
            {
                content: '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>'
            },
        ],
        load: progressLoad
    });
    verticalProgress.appendTo('#vertical-container');
    let verticalOppose: ProgressBar = new ProgressBar({
        type: 'Circular',
        startAngle: 0,
        endAngle: 180,
        minimum: 0,
        width: '160px',
        height: '160px',
        maximum: 100,
        value: 100,
        cornerRadius: 'Round',
        trackThickness: 5,
        progressThickness: 5,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        annotations: [
            {
                content: '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>'
            },
        ],
        load: progressLoad
    });
    verticalOppose.appendTo('#vsemi-container');

    let semiProgress: ProgressBar = new ProgressBar({
        type: 'Circular',
        startAngle: 270,
        endAngle: 90,
        width: '160px',
        height: '160px',
        minimum: 0,
        maximum: 100,
        value: 100,
        cornerRadius: 'Round',
        trackThickness: 5,
        progressThickness: 5,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        annotations: [
            {
                content: '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>'
            },
        ],
        load: progressLoad
    });
    semiProgress.appendTo('#semi-container');
    let replayBtn: HTMLElement = document.getElementById('reLoad') as HTMLElement;
    replayBtn.onclick = () => {
        inverseSemiProgress.refresh();
        verticalProgress.refresh();
        verticalOppose.refresh();
        semiProgress.refresh();
    };
};