import { loadCultureFiles } from '../common/culture-loader';
import { Stepper, StepModel } from '@syncfusion/ej2-navigations';

(window as any).default = (): void => {
    loadCultureFiles();

    let stepper: StepModel[] = [
        { iconCss: 'sf-icon-form', label: 'Project Setup' },
        { iconCss: 'sf-icon-tasksheet', label: 'Task Planning' },
        { iconCss: 'sf-icon-progress', label: ' Progress Tracking' },
        { iconCss: 'sf-icon-submit', label: 'Project Completion' }
    ];

    let linearStepper: Stepper = new Stepper ({
        steps: stepper,
        linear: true,
        stepChanged: (args) => {
            updateContent(args.activeStep);
        }
    });
    linearStepper.appendTo('#linear-stepper');

    (window as any).updateBack = () => {
        linearStepper.previousStep();
        updateContent(linearStepper.activeStep);
    };

    (window as any).updateNext = () => {
        linearStepper.nextStep();
        updateContent(linearStepper.activeStep);
    };

    function toggleNavigationButtons(activeStep: number) {
        (document.getElementById('previousStep') as HTMLElement).style.display = (activeStep !== 0) ? 'block' : 'none';
        (document.getElementById('nextStep') as HTMLElement).style.display = (activeStep !== 3) ? 'block' : 'none';
    };

    function updateContent(args: number): void {
        let stepperContent: HTMLElement = document.getElementById('linear-stepper-content') as HTMLElement;
        switch (args) {
          case 0:
              stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>`;
              break;
          case 1:
              stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>Task planning involves creating a comprehensive roadmap that outlines specific tasks, sets achievable milestones, and allocates responsibilities among team members. </li>
              <li>This phase requires a detailed breakdown of the project's requirements, resources, and a strategic timeline to ensure a systematic and efficient execution of tasks.</li>
              </ul>`;
              break;
          case 2:
              stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>In this phase, project managers closely monitor the progress of individual tasks, track the overall project's advancement, and regularly update task statuses.</li><li>Continuous assessment of the project's timeline and potential challenges allows for timely adjustments, ensuring that the project stays on course and within the predefined parameters.</li></ul>`;
              break;
          case 3:
              stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>
              The final phase focuses on the comprehensive evaluation of the project's success, completion of all deliverables, and documentation of lessons learned. </li><li>Analyzing the outcomes and documenting the experiences gained during the project's lifecycle are crucial for improving future project management processes and enhancing overall organizational efficiency.</li>`;
              break;
          default:
              break;
      }
      toggleNavigationButtons(args);
    }

    (window as any).updateLinear = (args: any) => {
        linearStepper.linear = (/true/).test(args.value) ? true : false;
        linearStepper.reset();
        updateContent(linearStepper.activeStep);
    };
};
