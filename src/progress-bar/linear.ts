import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { loadProgressBarTheme } from './theme-colors';

/**
 * Sample for default linear progress bar.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let div: HTMLCollection = document.getElementsByClassName('progressbar-label');
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
      let theme: string = loadProgressBarTheme(args);
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
        || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark' || args.progressBar.theme === 'Fluent2Dark' || args.progressBar.theme === 'Fluent2HighContrast') {
            for (let i: number = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
        if (theme === 'fabric') {
            args.progressBar.secondaryProgressColor = '#b0d0e9'
          } else if (theme === 'material-dark') {
            args.progressBar.secondaryProgressColor = '#b8b8b8'
          } else if (theme === 'material') {
            args.progressBar.secondaryProgressColor = '#f087ab'
          } else if (theme === 'bootstrap5-dark') {
            args.progressBar.secondaryProgressColor = '#2b5288'
          } else if (theme === 'bootstrap5') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
          } else if (theme === 'bootstrap') {
            args.progressBar.secondaryProgressColor = '#acc6dc'
          }
          else if (theme === 'bootstrap4') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
          }
          else if (theme === 'bootstrap-dark') {
            args.progressBar.secondaryProgressColor = '#b8b8b8'
          } else if (theme === 'highcontrast') {
            args.progressBar.secondaryProgressColor = '#aca379'
          } else if (theme === 'fluent-dark') {
            args.progressBar.secondaryProgressColor = '#2b5288'
          } else if (theme === 'fluent') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
          } else if (theme === 'tailwind-dark') {
            args.progressBar.secondaryProgressColor = '#22D3EE'
          } else if (theme === 'tailwind') {
            args.progressBar.secondaryProgressColor = '#4F46E5'
          } else if (theme === 'fluent2') {
            args.progressBar.secondaryProgressColor = '#0F6CBD'
          } else if (theme === 'fluent2-dark') {
            args.progressBar.secondaryProgressColor = '#115EA3'
          } else if (theme === 'fluent2-highcontrast') {
            args.progressBar.secondaryProgressColor = '#1AEBFF'
          } else if (theme === 'tailwind3-dark') {
            args.progressBar.secondaryProgressColor = '#6366F1'
          } else if (theme === 'tailwind3') {
            args.progressBar.secondaryProgressColor = '#4F46E5'
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
