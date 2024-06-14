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
        || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark' || args.progressBar.theme === 'Fluent2Dark') {
            for (let i: number = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
        if (selectedTheme === 'fabric') {
            args.progressBar.secondaryProgressColor = '#b0d0e9'
          } else if (selectedTheme === 'material-dark') {
            args.progressBar.secondaryProgressColor = '#b8b8b8'
          } else if (selectedTheme === 'material') {
            args.progressBar.secondaryProgressColor = '#f087ab'
          } else if (selectedTheme === 'bootstrap5-dark') {
            args.progressBar.secondaryProgressColor = '#2b5288'
          } else if (selectedTheme === 'bootstrap5') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
          } else if (selectedTheme === 'bootstrap') {
            args.progressBar.secondaryProgressColor = '#acc6dc'
          }
          else if (selectedTheme === 'bootstrap4') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
          }
          else if (selectedTheme === 'bootstrap-dark') {
            args.progressBar.secondaryProgressColor = '#b8b8b8'
          } else if (selectedTheme === 'highcontrast') {
            args.progressBar.secondaryProgressColor = '#aca379'
          } else if (selectedTheme === 'fluent-dark') {
            args.progressBar.secondaryProgressColor = '#2b5288'
          } else if (selectedTheme === 'fluent') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
          } else if (selectedTheme === 'tailwind-dark') {
            args.progressBar.secondaryProgressColor = '#386e7f'
          } else if (selectedTheme === 'tailwind') {
            args.progressBar.secondaryProgressColor = '#b1afe9'
          }else if (selectedTheme === 'fluent2') {
            args.progressBar.secondaryProgressColor = '#0F6CBD'
          } else if (selectedTheme === 'fluent2-dark') {
            args.progressBar.secondaryProgressColor = '#115EA3'
          }
    };

    let button: Button = new Button();
    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#reLoad');

    let uploadProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '60',
        value: 100,
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
        isIndeterminate: true,
        value: 20,
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
        value: 40,
        secondaryProgress: 60,
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
        segmentCount: 8,
        value: 100,
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
        value: 100,
        isActive: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load: progressLoad
    });
    activeProgress.appendTo('#linearactive');

    let replayBtn: HTMLElement = document.getElementById('reLoad') as HTMLElement;
    replayBtn.onclick = () => {
        uploadProgress.refresh();
        successProgress.refresh();
        warningsProgress.refresh();
        errorProgress.refresh();
        activeProgress.refresh();
    };
};
