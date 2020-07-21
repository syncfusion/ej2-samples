import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Sample for default bullet chart.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            if(args.progressBar.theme === 'Material') {
                args.progressBar.trackColor = '#eee';
            }
            if(selectedTheme === 'highcontrast') {
                args.progressBar.trackColor = '#969696';
            }
    };

    let button: Button = new Button();
    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#reLoad');

    let dangerProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '30',
        width: '100%',
        value: 20,
        trackThickness: 20,
        progressThickness: 20,
        role: 'Success',
        isStriped: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load:progressLoad
    });
    dangerProgress.appendTo('#danger');
    let warningProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '30',
        width: '100%',
        value: 40,
        trackThickness: 20,
        progressThickness: 20,
        role: 'Info',
        isStriped: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load:progressLoad
    });
    warningProgress.appendTo('#warning');
    let infoProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '30',
        width: '100%',
        value: 70,
        role: 'Warning',
        trackThickness: 20,
        progressThickness: 20,
        isStriped: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load:progressLoad
    });
    infoProgress.appendTo('#info');

    let successProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '30',
        width: '100%',
        value: 100,
        trackThickness: 20,
        progressThickness: 20,
        role: 'Danger',
        isStriped: true,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        },
        load:progressLoad
    });
    successProgress.appendTo('#success');

    let animationBtn: HTMLElement = document.getElementById('animation') as HTMLElement;
    animationBtn.onclick = () => {
        if(!dangerProgress.animation.enable) {
        dangerProgress.animation.enable = true;
        animationBtn.innerHTML = 'Stop Animation';
        dangerProgress.refresh();
        } else {
        dangerProgress.animation.enable = false;
        animationBtn.innerHTML = 'Start Animation';
        dangerProgress.refresh(); 
        }
        if(!warningProgress.animation.enable) {
            warningProgress.animation.enable = true;
            warningProgress.refresh();
        } else {
            warningProgress.animation.enable = false;
            warningProgress.refresh(); 
        }
        if(!infoProgress.animation.enable) {
            infoProgress.animation.enable = true;
            infoProgress.refresh();
        } else {
            infoProgress.animation.enable = false;
            infoProgress.refresh(); 
        }
        if(!successProgress.animation.enable) {
            successProgress.animation.enable = true;
            successProgress.refresh();
        } else {
            successProgress.animation.enable = false;
            successProgress.refresh(); 
        }
    };
}
