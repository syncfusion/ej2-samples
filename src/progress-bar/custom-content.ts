import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ProgressAnnotation, IProgressValueEventArgs, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
ProgressBar.Inject(ProgressAnnotation);

/**
 * Sample for custom content progress bar sample.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let clearTimeout1: number;
    let clearTimeout2: number;
    let annotationColors: {
        material: string,
        fabric: string,
        bootstrap: string,
        bootstrap4: string,
        highcontrast: string,
        tailwind: string,
        bootstrap5dark: string,
        bootstrapdark: string,
        fabricdark: string,
        materialdark: string,
        tailwinddark: string,
        bootstrap5: string,
        fluent: string,
        fluentdark: string,
        material3: string,
        material3dark: string
        fluent2: string,
        fluent2dark: string,
    } = { fluent: '#0D6EFD', fluentdark: '#0D6EFD',  material: '#e91e63', fabric: '#0078D6', bootstrap: '#317ab9', bootstrap4: '#007bff', highcontrast: '#FFD939', tailwind: '#4F46E5', bootstrap5: '#0D6EFD', bootstrap5dark: '#0D6EFD', bootstrapdark: '#9A9A9A', fabricdark: '#9A9A9A', materialdark: '#9A9A9A', tailwinddark: '#22D3EE',material3 : '#6750A4', material3dark: '#D0BCFF', fluent2: '#0F6CBD', fluent2dark: '#115EA3'};
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        if (args.progressBar.element.id === 'label-container') {
            // tslint:disable-next-line:max-line-length
            args.progressBar.annotations[0].content = '<div id="point1" class="plabeltxt" style="color: ' + annotationColors[selectedTheme.replace(/-/i, '')] + ' "><span>80%</span></div>';
        } else if (args.progressBar.element.id === 'download-container') {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + selectedTheme.replace(/-/i, '') + '-Download.svg" alt="Download Icon"></img>';
        } else {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + selectedTheme.replace(/-/i, '') + '-pause.svg" alt="Pause Icon"></img>';
        }
    };
    let pausePlay: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 100,
        width: '160px',
        height: '160px',
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad,
        progressCompleted: (args: IProgressValueEventArgs) => {
            clearTimeout(clearTimeout1);
            clearTimeout1 = +setTimeout(
                () => {
                    //tslint:disable-next-line
                    pausePlay.annotations[0].content = '<img src="src/progress-bar/images/' + (pausePlay.theme).toLowerCase() + '-Play.svg" alt=\"Play Icon\"></img>';
                    pausePlay.dataBind();
                },
                2000);
        },
        annotations: [
            {
                //tslint:disable-next-line
                content: `<img src="src/progress-bar/images/material-pause.svg" alt="Pause Icon"></img>`,
            },
        ]
    });
    pausePlay.appendTo('#pause-container');
    let downloadProgress: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 100,
        width: '160px',
        height: '160px',
        enableRtl: false,
        load: progressLoad,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        progressCompleted: (args: IProgressValueEventArgs) => {
            clearTimeout(clearTimeout2);
            clearTimeout2 = +setTimeout(
                () => {
                    //tslint:disable-next-line
                    downloadProgress.annotations[0].content = '<img src="src/progress-bar/images/' + (downloadProgress.theme).toLowerCase() + '-Tick.svg" alt=\"Tick Icon\"></img>';
                    downloadProgress.dataBind();
                },
                2000);
        },
        annotations: [
            {
                //tslint:disable-next-line
                content: `<img src="src/progress-bar/images/material-Download.svg" alt="Download Icon"></img>`,
            },
        ]
    });
    downloadProgress.appendTo('#download-container');
    let annotate: ProgressBar = new ProgressBar({
        type: 'Circular',
        value: 80,
        width: '160px',
        height: '160px',
        cornerRadius: 'Round',
        startAngle: 180,
        endAngle: 180,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        annotations: [
            {
                content: '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>',
            }
        ],
        load: progressLoad
    });
    annotate.appendTo('#label-container');
    let replayBtn: HTMLElement = document.getElementById('reLoad') as HTMLElement;
    replayBtn.onclick = () => {
        pausePlay.refresh();
        downloadProgress.refresh();
        annotate.refresh();
    };
};