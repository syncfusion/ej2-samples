import { loadCultureFiles } from '../common/culture-loader';
import { ProgressBar, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { loadProgressBarTheme } from './theme-colors';

/**
 * Sample for default bullet chart.
 */
// tslint:disable-next-line:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let theme: string = loadProgressBarTheme(args);
        if (args.progressBar.theme === 'Material') {
            args.progressBar.trackColor = '#eee';
        }
        if (theme === 'highcontrast') {
            args.progressBar.labelStyle.color = '#000000';
            args.progressBar.trackColor = '#969696';
        }
    };

    let button: Button = new Button();
    button = new Button({ cssClass: 'e-outline', isPrimary: true });
    button.appendTo('#reLoad');

    let nearProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '40',
        width: '100%',
        showProgressValue: true,
        value: 40,
        trackThickness: 24,
        progressThickness: 24,
        labelStyle: {
            textAlignment: 'Center',
            text: '40% Complete (Success)',
            color: '#ffffff'
        },
        role: 'Success',
        load: progressLoad,
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        }
    });
    nearProgress.appendTo('#percentage');
    let centerProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '40',
        width: '100%',
        showProgressValue: true,
        value: 50,
        trackThickness: 24,
        progressThickness: 24,
        role: 'Info',
        load: progressLoad,
        labelStyle: {
            textAlignment: 'Center',
            text: '50% Complete (Info)',
            color: '#ffffff'
        },
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        }
    });
    centerProgress.appendTo('#ratio');
    let farProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '40',
        width: '100%',
        showProgressValue: true,
        role: 'Warning',
        load: progressLoad,
        value: 60,
        trackThickness: 24,
        progressThickness: 24,
        labelStyle: {
            textAlignment: 'Center',
            text: '60% Complete (Warning)',
            color: '#ffffff'
        },
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        }
    });
    farProgress.appendTo('#acutal');
    let customProgress: ProgressBar = new ProgressBar({
        type: 'Linear',
        height: '40',
        width: '100%',
        showProgressValue: true,
        value: 70,
        trackThickness: 24,
        progressThickness: 24,
        role: 'Danger',
        load: progressLoad,
        labelStyle: {
            textAlignment: 'Center',
            text: '70% Complete (Danger)',
            color: '#ffffff'
        },
        animation: {
            enable: true,
            duration: 2000,
            delay: 0,
        }
    });

    customProgress.appendTo('#custom');
    let replayBtn: HTMLElement = document.getElementById('reLoad') as HTMLElement;
    replayBtn.onclick = () => {
        nearProgress.refresh();
        centerProgress.refresh();
        farProgress.refresh();
        customProgress.refresh();
    };
};