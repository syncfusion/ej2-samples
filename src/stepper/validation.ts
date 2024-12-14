import { loadCultureFiles } from '../common/culture-loader';
import { Stepper, StepModel, StepperChangingEventArgs } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();
    let isEmailValid: boolean = false;
    let isFeedbackTextValid: boolean = false;
    let isUserNavigatingReverse: boolean = false;
    let isCurrentStepValid: boolean = false;

    const stepperContentWrapper = (document.getElementById('validation-step-content') as HTMLElement);
    const regex: RegExp = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
    const stepperWithText: StepModel[] = [
        { iconCss: 'sf-icon-survey-intro', text: 'Survey Introduction' },
        { iconCss: 'sf-icon-survey-feedback', text: 'Feedback' },
        { iconCss: 'sf-icon-survey-status', text: 'Status' }
    ];
    const stepperContents = [
        "<div class='step-content step-content-0 step-active'><div id='agreement-text'><p>Welcome! This survey is an opportunity for you to share your opinions and experiences, contributing to the ongoing improvement of our offerings. Your participation is highly appreciated, and we look forward to gaining a deeper understanding of your preferences. </p></div><label style='margin-top: 15px'>Enter your email <span class='required'>*</span></label><input class='e-input inputContainer' id='add-email' placeholder='Enter here' oninput='onInputChange(this, true)' /><div class='add-email error-label'>Email cannot be empty.</div><button style='margin-top: 20px;' class='e-btn nextStep stepperBtn' onclick='onNextStep(this)'>Next</button></div>",
        "<div class='step-content step-content-1'> <div class='question-container'> <div class='survey-question'><p> Is this the first time you have visited this website? <span class='required'>*</span></p><label> <input type='radio' class='inputContainer new-user' name='service-usage' value='yes' checked> Yes </label> <label style='margin: 0px 10px'> <input type='radio' class='inputContainer old-user' name='service-usage' value='no'> No </label></div> <div class='feedback-section'> <p class='feedback-label'>Anything else you would like to share? <span class='required'>*</span></p> <textarea id='feedback-text' class='inputContainer' placeholder='I have feedback on...' oninput='onInputChange(this)' required></textarea> <div class='feedback-area error-label' style='margin: 0'>Feedback cannot be empty.</div> </div> </div><div style='display: flex;'> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn previousStep' onclick='onPreviousStep(this)'>Previous</button> <button style='margin-top: 20px;' class='e-btn nextStep' onclick='onNextStep(this)'>Submit Feedback</button></div></div></div>",
        "<div class='step-content step-content-2'><div class='confirm-section'><div class='feedback-msg'><b>Please confirm to submit your feedback.</b></div><br/><div class='feedback-msg' id='feedback-message'></div> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn previousStep' onclick='onPreviousStep(this)'>Previous</button> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn confirmbutton' id='confirm-button' onclick='onConfirm(this)'>Confirm</button></div></div>",
        "<div class='step-content step-content-3'><div class='success-section'><div class='success-message' id='success-message'>Thanks! Feedback has been submitted successfully.</div><button style='margin-top: 20px; margin-right: 5%;' type='reset' class='e-btn e-hide' id='reset-button' onclick='onReset(this)'> Reset </button> </div></div>"
    ];

    const validationStepper: Stepper = new Stepper({
        steps: stepperWithText,
        linear: true,
        created: handleStepCreated,
        stepChanging: (args: StepperChangingEventArgs) => handleStepChange(args)
    });
    validationStepper.appendTo('#validation-stepper');

    (window as any).onNextStep = () => validationStepper.nextStep();
    (window as any).onPreviousStep = () => validationStepper.previousStep();
    (window as any).onConfirm = function () {
        let stepContent = document.querySelector('.step-content-3');
        if (!stepContent) {
            stepperContentWrapper.insertAdjacentHTML('beforeend', stepperContents[3]);
            stepContent = document.querySelector(".step-content.step-content-3");
        }        
        document.querySelectorAll('.step-content').forEach((step) => step.classList.remove('step-active'));
        if (stepContent) {
            stepContent.classList.add('step-active');
            validationStepper.steps[validationStepper.activeStep].isValid = true;
            validationStepper.steps[validationStepper.activeStep].status = 'completed';
        }
    };
    (window as any).onInputChange = function (args: any, isEmailInput?: boolean) {
        const elementId = isEmailInput ? 'add-email' : 'feedback-area';
        const errElement = (document.querySelector(`.${elementId}.error-label`) as HTMLElement);
        if (args.value.length === 0) {
            if (isEmailInput) {
                errElement.textContent = 'Email cannot be empty.';
                isEmailValid = false;
            }
            else {
                errElement.textContent = 'Feedback cannot be empty.';
                isFeedbackTextValid = false;
            }
        } else {
            if (isEmailInput) {
                isEmailValid = regex.test(args.value);
                errElement.textContent = isEmailValid ? '' : 'Enter a valid email address.';
            } else {
                isFeedbackTextValid = args.value.length > 15;
                errElement.textContent = isFeedbackTextValid ? '' : 'Please enter at least 15 characters.';
            }
        }
        errElement.style.visibility = errElement.textContent ? 'visible' : 'hidden';
    };
    (window as any).onReset = function () {
        isCurrentStepValid = false;
        validationStepper.reset();
        Array.from(document.querySelectorAll('.inputContainer')).forEach((ele: HTMLInputElement) => {
            ele.value = ''
            if (ele.classList.contains('new-user')) ele.checked = true;
            else ele.checked = false;
        });
        for (let i = 0; i < validationStepper.steps.length; i++) {
            validationStepper.steps[i].isValid = null;
        }
    };

    function handleStepCreated(): void {
        stepperContentWrapper.innerHTML = stepperContents[validationStepper.activeStep];
    }

    function handleStepChange(args: StepperChangingEventArgs) {
        isUserNavigatingReverse = args.activeStep < args.previousStep ? true : false;
        if (!isUserNavigatingReverse) {
            setValidState(args);
        }
        // Making the previous and current step invalid if user navigates in reverse order.
        else {
            validationStepper.steps[args.activeStep].isValid = validationStepper.steps[args.activeStep + 1].isValid = null;
            isCurrentStepValid = true;
        }
        if (isCurrentStepValid) {
            let stepContent = document.querySelector(`.step-content-${args.activeStep}`);
            /* Remove all active class */
            document.querySelectorAll('.step-content').forEach((step) => step.classList.remove('step-active'));
            /* Only update the html into DOM if not previously */
            if (!stepContent) {
                stepperContentWrapper.insertAdjacentHTML('beforeend', stepperContents[args.activeStep]);
                stepContent = document.querySelector(".step-content.step-content-" + args.activeStep);
            }
            /* Update the active class */
            if (stepContent) {
                stepContent.classList.add('step-active');
            }
            if (args.activeStep === 2) {
                let feedbackMessage = document.getElementById('feedback-message');
                feedbackMessage.textContent = (document.getElementById('feedback-text') as HTMLInputElement).value;
            }
        }
    }

    function setValidState(args: StepperChangingEventArgs) {
        const stepIndexToValidate = validationStepper.activeStep;
        if (validationStepper.activeStep === 0) {
            const emailInput = (document.getElementById('add-email') as HTMLInputElement);
            (window as any).onInputChange(document.getElementById('add-email'), true);
            isCurrentStepValid = emailInput.value.length && isEmailValid;
        }
        if (validationStepper.activeStep === 1) {
            const radioInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.survey-question input');
            const isChecked = Array.from(radioInputs).some(input => input.checked);
            (window as any).onInputChange(document.getElementById('feedback-text'));
            isCurrentStepValid = isChecked && isFeedbackTextValid;
        }
        if (validationStepper.activeStep === 2) isCurrentStepValid = true;
        args.cancel = !isCurrentStepValid;
        validationStepper.steps[stepIndexToValidate].isValid = isCurrentStepValid;
    }
};