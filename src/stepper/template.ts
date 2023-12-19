import { loadCultureFiles } from '../common/culture-loader';
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();

    let templateContent: string [] = [
        "<p>To get started, click the <b>Continue</b> button to move on to the next step.</p><button class='e-btn e-primary' onclick='event.stopPropagation(); clickAction(false, `continue`)'>CONTINUE</button>",
        "<p>This is the second step. To proceed to next step, click <b>Continue</b>; to go back to the previous step, click the <b>Back</b> button.</p><button class='e-btn e-primary' onclick='event.stopPropagation(); clickAction(false, `continue`)'>CONTINUE</button><button class='e-btn' onclick='event.stopPropagation(); clickAction(true, `back`)'>BACK</button>",
        "<p>If everything looks correct, click <b>Continue</b> to move on.<br/>If not, you can click <b>Back</b> to revisit the previous step.</p><button class='e-btn e-primary' onclick='event.stopPropagation(); clickAction(false, `continue`)'>CONTINUE</button><button class='e-btn' onclick='event.stopPropagation(); clickAction(true, `back`)'>BACK</button>",
        "<p>Congratulations! You've reached the final step.</p><button class='e-btn e-primary' onclick='event.stopPropagation(); clickAction(false, `finish`)'>FINISH</button><button class='e-btn' onclick='event.stopPropagation(); clickAction(true, `back`)'>BACK</button>"
    ];
    let finishContent: string = "<p>Congratulations! You've reached the final step.</p><button class='e-btn e-primary' onclick='event.stopPropagation(); clickAction(false, `finish`)'>FINISH</button><button class='e-btn' onclick='event.stopPropagation(); clickAction(true, `back`)'>BACK</button>";
    let resetContent: string = "<p>To start over again with the first step, click <b>Reset</b>.</p><button class='e-btn e-primary' onclick='event.stopPropagation(); clickAction(false, `reset`)'>RESET</button>";

    let stepperTemplate: StepModel[] = [
        { iconCss: 'e-icons e-check', text: 'Step 1' },
        { iconCss: 'e-icons e-check', text: 'Step 2' },
        { iconCss: 'e-icons e-check', text: 'Step 3' },
        { iconCss: 'e-icons e-check', text: 'Step 4' }
    ];

    let stepperWithTemplate: Stepper = new Stepper({
        steps: stepperTemplate,
        linear: true,
        orientation: "vertical",
        template: '<span class="e-step ${step.iconCss}"></span><span class="e-text-step">${step.text}</span><br/><div class="stepper-content"></div>',
        created: () => {
            stepperWithTemplate.activeStep = 1;
            handleContent(stepperWithTemplate, false);
        },
        stepClick: (args: any) => {
            handleContent(args, args.previousStep > args.activeStep ? true : false);
        }
    });
    stepperWithTemplate.appendTo('#template-stepper');

    (window as any).clickAction = function (isBackButton?: boolean, buttonType?: string) {
        switch (buttonType) {
            case 'continue':
                stepperWithTemplate.nextStep();
                break;
            case 'back':
                stepperWithTemplate.previousStep();
                break;
        }
        updateContent(stepperWithTemplate, isBackButton ? true : false, buttonType);
    };

    function updateContent(stepperWithTemplate?: Stepper, isBackButton?: boolean, buttonType?: string) {
        if (buttonType === 'continue' || buttonType === 'back') {
            handleContent(stepperWithTemplate, isBackButton as boolean);
        }
        if (buttonType === 'finish' || buttonType === 'reset') {
            let activeElement: NodeListOf<Element> = document.querySelectorAll('.stepper-content');
            if (buttonType === 'finish') {
                activeElement[stepperWithTemplate.activeStep].innerHTML = resetContent;
                stepperWithTemplate.steps[stepperWithTemplate.activeStep].status = 'completed';
            }
            if (buttonType === 'reset') {
                activeElement[stepperWithTemplate.activeStep].innerHTML = finishContent
                activeElement[stepperWithTemplate.activeStep].innerHTML = '';
                stepperWithTemplate.reset();
                activeElement[stepperWithTemplate.activeStep].innerHTML = templateContent[stepperWithTemplate.activeStep];
            }
        }
    }

    function handleContent(args: any, isBackClicked: boolean): void {
        let activeElement: NodeListOf<Element> = document.querySelectorAll('.stepper-content');
        activeElement[args.activeStep].innerHTML = templateContent[args.activeStep];
        if (activeElement && !isBackClicked) {
            activeElement[args.activeStep - 1].innerHTML = '';
        }
        if (isBackClicked) {
            if (activeElement[args.activeStep + 1])
            activeElement[args.activeStep + 1].innerHTML = '';
        }
    }
};
