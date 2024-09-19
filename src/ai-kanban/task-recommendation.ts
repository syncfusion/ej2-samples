
import { Kanban } from '@syncfusion/ej2-kanban';
import { Button } from '@syncfusion/ej2-buttons';
import { Grid, Page, Selection, DialogEditEventArgs, Edit, Toolbar, IDialogUI } from '@syncfusion/ej2-grids';
import { Dialog } from '@syncfusion/ej2-popups';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { Toast } from '@syncfusion/ej2/notifications';
import { ProgressButton } from '@syncfusion/ej2/splitbuttons';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { assigneeDetails } from './data-source';

(window as any).default = (): void => {

    Grid.Inject(Page, Selection, Edit, Toolbar);
    MultiSelect.Inject(CheckBoxSelection);

    let smartSuggestion: object[] = [];
    let tasks: object[] = [];
    let projectDetailsDialog: Dialog;
    let projectDetailsDialogCreated: boolean = false;
    let showSprintPlanDetailsCreated: boolean = false;
    let isGeneratedProjectTasks: boolean = false;
    let aiResultUpdated: boolean = false;
    let taskCount: NumericTextBox;
    let generateTasks: ProgressButton;
    let projectDetails: TextBox;
    let checkList: MultiSelect;
    const expectedFormat = `[{'Id': 'TASK1', 'Title': 'Crunches x50', 'Status': 'Open', 'Color': 'black', 'Description': 'Perform 50 crunches for core strengthening', 'StoryPoints': 3, 'Assignee': 'Alice Johnson'}, {'Id': 'TASK2', 'Title': 'Plank x2 minutes', 'Status': 'Open', 'Color': 'black', 'Description': 'Hold a plank position for 2 minutes for core and upper body strength', 'StoryPoints': 5, 'Assignee': 'Alice Johnson'}, {'Id': 'TASK3', 'Title': 'Russian Twists x40', 'Status': 'Open', 'Color': 'black', 'Description': 'Complete 40 reps of Russian twists for oblique muscle development', 'StoryPoints': 4, 'Assignee': ''}, {'Id': 'TASK5', 'Title': 'Bicycle Crunches x60', 'Status': 'Open', 'Color': 'black', 'Description': 'Complete 60 reps of bicycle crunches for overall core activation', 'StoryPoints': 5, 'Assignee': 'Alice Johnson'}]`;

    let toast = new Toast({
        position: { X: 'Right', Y: 'Top' },
        showCloseButton: true,
        target: '#toast-kanban-observable'
    });
    toast.appendTo('#toast');

    let taskCountHome= new NumericTextBox({
        min: 1,
        step: 1,
        width: '100%',
        floatLabelType: 'Always',
        value: 0
    });
    taskCountHome.appendTo('#tasks-value-home');
    let projectDetailsHome = new TextBox({
        width: '100%',
        floatLabelType: 'Always',
        value: '',
        multiline: true
    });
    projectDetailsHome.appendTo('#project-details-home');
    let generateTasksHome = new ProgressButton({
        content: 'Generate Tasks',
        enableProgress: false,
        begin: () => {
            generateButtonBegin();
        }
    });
    generateTasksHome.appendTo('#generate-tasks');
    generateTasksHome.appendTo('#generate-tasks-home');
    if (generateTasksHome.element) {
        generateTasksHome.element.onclick = (): void => {
            generateTasksClick(taskCountHome.value, projectDetailsHome.value);
        };
    }

    let openProjectDetailsDialog: Button = new Button({
        content: 'Add New Projects'
    });
    openProjectDetailsDialog.appendTo('#openProjectDetailsDialog');
    if (openProjectDetailsDialog.element) {
        openProjectDetailsDialog.element.onclick = (): void => {
            isGeneratedProjectTasks = false;
            projectDetailsDialog.show();
        };
    }

    let prepareSprintPlanDetails: Button = new Button({
        content: 'Sprint Plan',
        disabled: true
    });
    prepareSprintPlanDetails.appendTo('#prepareSprintPlanDetails');
    if (prepareSprintPlanDetails.element) {
        prepareSprintPlanDetails.element.onclick = (): void => {
            aiResultUpdated = false;
            showSprintPlanDetails.show();
        };
    }

    let goToBacklogView: Button = new Button({
        content: 'Backlog'
    });
    goToBacklogView.appendTo('#goToBacklogView');
    if (goToBacklogView.element) {
        goToBacklogView.element.onclick = (): void => {
            goToBacklogBoardView.content = "View as Board";
            grid.dataSource = smartSuggestion;
            grid.dataBind();
            (document.getElementById('grid-cntiner') as HTMLElement).style.display = '';
            (document.getElementById('backlog') as HTMLElement).style.display = '';
            (document.getElementById('backlogsBoard') as HTMLElement).style.display = 'none';
            (document.getElementById('sprint') as HTMLElement).style.display = 'none';
        };
    }

    let goToSprintBoardView: Button = new Button({
        content: 'Sprint'
    });
    goToSprintBoardView.appendTo('#goToSprintBoardView');
    if (goToSprintBoardView.element) {
        goToSprintBoardView.element.onclick = (): void => {
            sprintBoardKanbanObj.dataSource = tasks;
            sprintBoardKanbanObj.dataBind();
            sprintBoardKanbanObj.refresh();
            (document.getElementById('backlog') as HTMLElement).style.display = 'none';
            (document.getElementById('grid-cntiner') as HTMLElement).style.display = 'none';
            (document.getElementById('backlogsBoard') as HTMLElement).style.display = 'none';
            (document.getElementById('sprint') as HTMLElement).style.display = '';
        };
    }

    let goToBacklogBoardView: Button = new Button({
        content: 'View as Board'
    });
    goToBacklogBoardView.appendTo('#goToBacklogBoardView');
    if (goToBacklogBoardView.element) {
        goToBacklogBoardView.element.onclick = (): void => {
            if (goToBacklogBoardView.content == "View as Board") {
                goToBacklogBoardView.content = "View as Backlog";
                backlogKanbanObj.dataSource = smartSuggestion;
                backlogKanbanObj.dataBind();
                backlogKanbanObj.refresh();
                (document.getElementById('grid-cntiner') as HTMLElement).style.display = 'none';
                (document.getElementById('backlogsBoard') as HTMLElement).style.display = '';
            } else {
                goToBacklogBoardView.content = "View as Board";
                grid.dataSource = smartSuggestion;
                grid.dataBind();
                (document.getElementById('grid-cntiner') as HTMLElement).style.display = '';
                (document.getElementById('backlogsBoard') as HTMLElement).style.display = 'none';
            }
            (document.getElementById('sprint') as HTMLElement).style.display = 'none';
        };
    }

    let grid: Grid = new Grid(
        {
            dataSource: smartSuggestion,
            allowPaging: true,
            toolbar: ['Add'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true, mode: 'Dialog', template: '#dialogtemplate' },
            columns: [
                { field: "Id", headerText: 'Task ID', defaultValue: '', isPrimaryKey: true, validationRules: { required: true } },
                { field: "Title", headerText: 'Title', defaultValue: '', validationRules: { required: true } },
                { field: "Description", headerText: 'Description', defaultValue: '', editType: 'defaultEdit' },
                { field: "StoryPoints", headerText: 'StoryPoints', defaultValue: 0, editType: 'defaultEdit', validationRules: { required: true, min: 0 } },
                { field: "Status", headerText: 'Status', defaultValue: '', isPrimaryKey: true, validationRules: { required: true } },
            ],
            actionComplete: actionComplete
        });
    grid.appendTo('#grid-container');

    function actionComplete(args: DialogEditEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            let data: any = args.rowData;
            new NumericTextBox({
                min: 1,
                step: 1,
                placeholder: "StoryPoints",
                width: '100%',
                floatLabelType: 'Always',
                value: data.StoryPoints ? data.StoryPoints : 1
            }, args.form?.elements.namedItem('StoryPoints') as HTMLInputElement);
            new TextBox({
                placeholder: 'Task ID',
                width: '100%',
                floatLabelType: 'Always',
                value: data.Id ? data.Id : ''
            }, args.form?.elements.namedItem('Id') as HTMLInputElement);
            new TextBox({
                placeholder: 'Title',
                width: '100%',
                floatLabelType: 'Always',
                value: data.Title ? data.Title : ''
            }, args.form?.elements.namedItem('Title') as HTMLInputElement);

            new TextBox({
                placeholder: 'Description',
                width: '100%',
                floatLabelType: 'Always',
                multiline: true,
                value: data.Description ? data.Description : ''
            }, args.form?.elements.namedItem('Description') as HTMLInputElement);

            new TextBox({
                placeholder: 'Status',
                width: '100%',
                floatLabelType: 'Always',
                value: data.Status ? data.Status : 'Open'
            }, args.form?.elements.namedItem('Status') as HTMLInputElement);
        }
    }

    let backlogKanbanObj: Kanban = new Kanban({
        keyField: 'Status',
        dataSource: smartSuggestion,
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Review', keyField: 'Review' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            headerField: 'Title',
            contentField: 'Description',
            grabberField: 'Color',
            template: '#cardTemplate-backlog-board'
        }
    });
    backlogKanbanObj.appendTo('#backlogsBoard');

    let dialogCtn: HTMLElement = document.getElementById('projectDetails') as HTMLElement;
    let dialogFooter: HTMLElement = document.getElementById('projectdialogFooter') as HTMLElement;
    projectDetailsDialog = new Dialog({
        header: 'AI Smart Task Suggestion',
        content: dialogCtn,
        showCloseIcon: true,
        width: '30%',
        minHeight: '60%',
        zIndex: 1000,
        isModal: true,
        cssClass: 'custom-dialog',
        footerTemplate: dialogFooter,
        target: document.getElementById('container') as HTMLElement,
        close: (): void => {
            closeprojectDetailsDialog();
        }
    });
    projectDetailsDialog.appendTo('#projectDetailsDialog');
    if (projectDetailsDialog.element) {
        projectDetailsDialog.hide();
    }
    projectDetailsDialog.open = (): void => {
        if (!projectDetailsDialogCreated) {
            projectDetailsDialogCreated = true;
            taskCount = new NumericTextBox({
                min: 1,
                step: 1,
                width: '100%',
                floatLabelType: 'Always',
                value: 0
            });
            taskCount.appendTo('#tasks-value');
            projectDetails = new TextBox({
                width: '100%',
                floatLabelType: 'Always',
                value: '',
                multiline: true
            });
            projectDetails.appendTo('#project-details');
            generateTasks = new ProgressButton({
                content: 'Generate Tasks',
                enableProgress: false,
                begin: () => {
                    generateButtonBegin();
                }
            });
            generateTasks.appendTo('#generate-tasks');
            generateTasks.element.onclick = (): void => {
                generateTasksClick(taskCount.value, projectDetails.value);
            };
        }
    };

    function generateTasksClick(taskCount: number, projectDetails:string): void {
        isGeneratedProjectTasks = false;    
        GenerateProjectTasks(taskCount, projectDetails);
    }

    function generateButtonBegin(): void {
        generateTasks.content = "Progressing...";
        generateTasks.dataBind();
        const checkTasksGenerated = () => {
            if (isGeneratedProjectTasks) {
                (document.getElementById('homecontainer') as HTMLElement).style.display = 'none';
                (document.getElementById('toast-kanban-observable') as HTMLElement).style.display = '';
                goToBacklogBoardView.content = "View as Board";
                grid.dataSource = smartSuggestion;
                grid.dataBind();
                (document.getElementById('grid-cntiner') as HTMLElement).style.display = '';
                (document.getElementById('backlogsBoard') as HTMLElement).style.display = 'none';
                (document.getElementById('sprint') as HTMLElement).style.display = 'none';
                generateTasks.content = "Generate Tasks";
                generateTasks.dataBind();
                closeprojectDetailsDialog();
            } else {
                setTimeout(checkTasksGenerated, 100);
            }
        };
        checkTasksGenerated();
    }

    function closeprojectDetailsDialog(): void {
        projectDetailsDialog.hide();
        taskCount.value = 0;
        projectDetails.value = '';
    }

    let sprintBoardKanbanObj: Kanban = new Kanban({
        keyField: 'Status',
        dataSource: tasks,
        columns: [
            { headerText: 'To Do', keyField: 'Open' },
            { headerText: 'In Progress', keyField: 'InProgress' },
            { headerText: 'Review', keyField: 'Review' },
            { headerText: 'Done', keyField: 'Close' }
        ],
        cardSettings: {
            headerField: 'Title',
            contentField: 'Description',
            grabberField: 'Color',
            template: '#cardTemplate-sprint-board'
        },
        swimlaneSettings: {
            keyField: 'Assignee'
        }
    });
    sprintBoardKanbanObj.appendTo('#sprintBoard');

    let dialogCtnsprint: HTMLElement = document.getElementById('sprintDetails') as HTMLElement;
    let dialogFootersprint: HTMLElement = document.getElementById('sprintdialogFooter') as HTMLElement;

    let showSprintPlanDetails: Dialog = new Dialog({
        header: 'Sprint Plan Details',
        content: dialogCtnsprint,
        showCloseIcon: true,
        width: '30%',
        minHeight: '40%',
        isModal: true,
        cssClass: 'custom-dialog',
        footerTemplate: dialogFootersprint,
        target: '#toast-kanban-observable',
        close: (): void => {
            showSprintPlanDetails.hide();
            checkList.value = [];
        }
    });
    showSprintPlanDetails.appendTo('#sprintPlanDetailsDialog');
    if (showSprintPlanDetails.element) {
        showSprintPlanDetails.hide();
    }
    showSprintPlanDetails.open = (): void => {
        if (!showSprintPlanDetailsCreated) {
            showSprintPlanDetailsCreated = true;
            checkList = new MultiSelect({
                dataSource: assigneeDetails,
                fields: { text: 'Assignee', value: 'Assignee' },
                mode: 'CheckBox',
                placeholder: 'Select assignees',
                showSelectAll: true,
                showDropDownIcon: true,
                filterBarPlaceholder: 'Search assignees',
                popupHeight: '350px',
                value: []
            });
            checkList.appendTo('#assignee-details');
            let prepareSprintTasks = new ProgressButton({
                content: 'PrepareSprintPlan',
                enableProgress: false,
                begin: () => {
                    prepareSprintTasks.content = "Progressing...";
                    prepareSprintTasks.dataBind();
                    const checkTasksGenerated = () => {
                        if (aiResultUpdated) {
                            prepareSprintTasks.content = "PrepareSprintPlan";
                            prepareSprintTasks.dataBind();
                            showSprintPlanDetails.hide();
                            checkList.value = [];
                        } else {
                            setTimeout(checkTasksGenerated, 100);
                        }
                    };
                    checkTasksGenerated();
                }
            });
            prepareSprintTasks.appendTo('#prepare-sprint-tasks');
            prepareSprintTasks.element.onclick = (): void => {
                prepareSprintPlan();
            };
        }
    }

    function GenerateProjectTasks(taskCount: number, projectDetails:string): void {
        try {
            if (taskCount && projectDetails) {
                var description = `Generate ${taskCount} task recommendations for ${projectDetails}. Each task should include the following fields: Id (like example: ID should be in project name simple 4char word - 1), Title, Status, Description, Assignee, StoryPoints, Color and Due Date, formatted according to the dataset. Assign each task to the Assignee: empty string, set the Status to 'Open', and use black for the Color. Use the dataset provided below to create your recommendations. IMPORTANT: Return the data strictly in JSON format with all the required fields. Only the JSON data is needed, no additional text.Return only the JSON array format without any explanations.`;
                let result: any = getResponseFromOpenAI(description);
                result.then((result: any) => {
                    try {
                        const jsonArrayPattern = /\[.*?\]/s;
                        result = result.match(jsonArrayPattern);
                        if (result && result[0]) {
                            let data = result[0].replace("```json", "").replace("```", "").replace("\r", "").replace("\n", "").replace("\t", "").trim();
                            let modifiedData = JSON.parse(data);
                            smartSuggestion = modifiedData !== null ? smartSuggestion.concat(modifiedData) : smartSuggestion;
                            grid.dataSource = smartSuggestion;
                            grid.dataBind();
                            isGeneratedProjectTasks = true;
                            prepareSprintPlanDetails.disabled = false;
                        } else {
                            toast.content = "An error occurred during the AI process, Please try again."
                            toast.show();
                        }

                    } catch {
                        toast.content = "An error occurred during the AI process, Please try again."
                        toast.show();
                    }

                });
            }
        } catch {
            toast.content = "An error occurred during the AI process, Please try again."
            toast.show();
        }
    }

    function prepareSprintPlan() {
        aiResultUpdated = false;
        try {
            var tasksDataset = JSON.stringify(smartSuggestion);
            var assigneeCapacityDetails = JSON.stringify(assigneeDetails);
            var selectedAssignees = JSON.stringify(checkList.value);
            var sprintWorkingDays = 12;
            const prompt = `You are a sprint planner assistant. Your task is to generate a sprint plan by assigning backlog tasks to the selected assignee based on their daily capacity and the overall sprint duration.
                Inputs:
                1. Backlog tasks dataset:
                - ID: Unique identifier for the task.
                - Title: Brief description of the task.
                - Status: Current status of the task (e.g., 'Open').
                - Assignee: Person responsible for the task.
                - Color: A color code representing the priority or category.
                - Description: Detailed description of the task.
                - StoryPoints: Effort required to complete the task, measured in story points.

                - Data: ${tasksDataset}

                2. Assignee capacity dataset:
                - Assignee: Name of the assignee.
                - Capacity: Number of story points the assignee can complete per day (day = 8 hours, 1 story point = 3 hours).

                - Data: ${assigneeCapacityDetails}

                3. Selected assignee dataset:
                - Assignee: Name of the assignee selected for the sprint. Should assign tasks for all selected assignees.

                - Data: ${selectedAssignees}

                4. Sprint duration: The total number of working days in the sprint.

                - Data: ${sprintWorkingDays}

                Make a sprint plan for overall working days (Sprint duration: ${sprintWorkingDays} days).

                Objective:
                Based on the inputs, assign tasks from the backlog to the selected assignee while considering their daily capacity and the sprint duration. The total story points assigned to the assignee should not exceed their available capacity over the sprint.

                Output:
                Expected format: ${expectedFormat}

                Return a JSON object containing the list of tasks assigned to the selected assignee for the sprint.
                Note: Ensure the JSON output includes all tasks with the necessary updates. Return only the JSON array format without any explanations or JSON structure changes.`;
            let result: any = getResponseFromOpenAI(prompt);
            result.then((result: any) => {
                try {
                    const jsonArrayPattern = /\[.*?\]/s;
                    result = result.match(jsonArrayPattern);
                    if (result && result[0]) {
                        let data = result[0].replace("```json", "").replace("```", "").replace("\r", "").replace("\n", "").replace("\t", "").trim();
                        let updatedTasks = JSON.parse(data);
                        tasks = updatedTasks !== null ? tasks.concat(updatedTasks) : tasks;
                        sprintBoardKanbanObj.dataSource = tasks;
                        sprintBoardKanbanObj.dataBind();
                        (document.getElementById("backlog") as HTMLElement).style.display = "none";
                        (document.getElementById("grid-cntiner") as HTMLElement).style.display = "none";
                        (document.getElementById("backlogsBoard") as HTMLElement).style.display = "none";
                        (document.getElementById("sprint") as HTMLElement).style.display = "";
                        aiResultUpdated = true;
                    } else {
                        toast.content = "An error occurred during the AI process, Please try again."
                        toast.show();
                    }
                } catch {
                    toast.content = "An error occurred during the AI process, Please try again."
                    toast.show();
                }
            });
        } catch {
            toast.content = "An error occurred during the AI process, Please try again."
            toast.show();
        }
        aiResultUpdated = true;
    }

    async function getResponseFromOpenAI(promptQuery: string): Promise<string> {
        const content = await (window as any).OpenAiModel(promptQuery);
        return content ? content as string : '';
    }
}