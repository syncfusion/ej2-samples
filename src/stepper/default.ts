import { loadCultureFiles } from '../common/culture-loader';
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();

    let iconOnly: StepModel[] = [
        { iconCss: 'sf-icon-cart' },
        { iconCss: 'sf-icon-user' },
        { iconCss: 'sf-icon-transport' },
        { iconCss: 'sf-icon-payment' },
        { iconCss: 'sf-icon-success' }
    ];
    let customText: StepModel[] = [
        {text: '1'},
        {text: '2'},
        {text: '3'},
        {text: '4'},
        {text: '5'}
    ]
    let labelOnly: StepModel[] = [
        { label: 'Cart'},
        { label: 'Address' },
        { label: 'Delivery'},
        { label: 'Payment'},
        { label: 'Ordered'}
    ];
    let iconWithLabel: StepModel[] = [
        { label: 'Cart', iconCss: 'sf-icon-cart' },
        { label: 'Address', iconCss: 'sf-icon-user' },
        { label: 'Delivery', iconCss: 'sf-icon-transport' },
        { label: 'Payment', iconCss: 'sf-icon-payment', optional: true },
        { label: 'Ordered', iconCss: 'sf-icon-success' }
    ];

    let iconLabelStepper: Stepper = new Stepper({
        steps: iconWithLabel,
        created: () => {
            iconLabelStepper.activeStep = 2;
        }
    });

    let iconStepper: Stepper = new Stepper({
        steps: iconOnly,
        created: () => {
            iconStepper.activeStep = 2;
        }
    });

    let indicatorStepper: Stepper = new Stepper({
        steps: customText,
        stepType: 'indicator',
        created: () => {
            indicatorStepper.activeStep = 2;
        }
    });

    let labelStepper: Stepper = new Stepper({
        steps: labelOnly,
        created: () => {
            labelStepper.activeStep = 2;
        }
    });
    
    indicatorStepper.appendTo('#customText');
    iconStepper.appendTo('#iconOnly');
    iconLabelStepper.appendTo('#iconWithLabel');
    labelStepper.appendTo('#labelOnly');

};