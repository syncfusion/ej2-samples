import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Sample for default linear progress bar.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let div: HTMLCollection = document.getElementsByClassName('progressbar-label');
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
            || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark'|| args.progressBar.theme === 'Material3Dark') {
            for (let i: number = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
    };


    let uploadProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '60',
        value: 75,
        trackThickness: 20,
        progressThickness: 20,
        tooltip:{enable: true},
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    uploadProgress.appendTo('#lineardeterminate');

    let successProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '60',
        value: 65,
        trackThickness: 20,
        progressThickness: 20,
        tooltip:{enable: true},
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    successProgress.appendTo('#linearindeterminate');

    let warningsProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '60',
        value: 75,
        trackThickness: 20,
        progressThickness: 20,
        tooltip:{enable: true},
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    warningsProgress.appendTo('#linearbuffer');

    let errorProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '60',
        value: 55,
        trackThickness: 20,
        progressThickness: 20,
        tooltip:{enable: true},
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    errorProgress.appendTo('#linearsegment');

    let activeProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '60',
        value: 75,
        trackThickness: 20,
        progressThickness: 20,
        tooltip:{enable: true},
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    activeProgress.appendTo('#linearactive');

};
