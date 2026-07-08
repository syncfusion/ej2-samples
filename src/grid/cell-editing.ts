import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Toolbar, Edit, Page, Sort, Filter } from '@syncfusion/ej2-grids';
import { appointmentData } from './data-source';

/**
 * Cell Editing sample
 */
Grid.Inject(Edit, Toolbar, Page, Sort, Filter);

(window as any).default = (): void => {
    loadCultureFiles();
    let grid = new Grid({
        dataSource: appointmentData,
        editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Cell' },
        allowPaging: true,
        toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
        allowSorting: true,
        height: 400,
        allowFiltering: true,
        filterSettings: { type: 'CheckBox' },
        rowHeight: 40,
        clipMode:'EllipsisWithTooltip',
        actionBegin: actionBegin,
        actionComplete: function(args: any) {
            if (args.requestType === 'save' && args.columnName === 'Doctor') {
                  const doctorRoomMap: any = {
                    'Dr. Smitha': 'R1',
                    'Dr. Johnson': 'R2',
                    'Dr. Garcia': 'R6',
                    'Dr. Brianna': 'R4',
                    'Dr. Williams': 'R3',
                    'Dr. Martinez': 'R7',
                    'Dr. Davis': 'R8',
                    'Dr. Joanna': 'R5',
                };
                grid.updateCell(args.rowIndex, 'Room', doctorRoomMap[args.data.Doctor])
            }
        },
        columns: [
            {
                field: 'ApptID',
                headerText: 'Appointment ID',
                width: 140,
                isPrimaryKey: true,
                visible: false,
            },
            { field: 'Patient', headerText: 'Patient', width: 150, validationRules: { required: true } },
            {
                field: 'Doctor',
                headerText: 'Doctor',
                width: 160,
                template: '#doctorTemplate',
                editType: 'dropdownedit',
                validationRules: { required: true }
            },
            {
                field: 'AppointmentTime',
                headerText: 'Appointment Time',
                editType: 'datetimepickeredit',
                width: 200,
                format: { type: 'dateTime', format: 'M/d/y hh:mm a' },
                validationRules: {
                    required: true,
                    timeRule: [
                        validateAppointmentTime,
                        'Appointment allowed only between 9AM - 9PM',
                    ],
                },
            },

            {
                field: 'Type',
                headerText: 'Type',
                width: 150,
                template: '#typeTemplate',
                editType: 'dropdownedit',
                validationRules: { required: true }
            },

            {
                field: 'Status',
                headerText: 'Status',
                template: '#statusTemplate',
                editType: 'dropdownedit',
                width: 130,
                validationRules: { required: true }
            },

            {
                field: 'Room',
                headerText: 'Room No',
                width: 120,
                editType: 'dropdownedit'
            },
            {
                field: 'Fee',
                headerText: 'Fee',
                textAlign: 'Right',
                width: 90,
                format: 'C2',
                editType: 'numericedit',
                edit: { params: { showSpinButton: false } },
                validationRules: {
                    required: true,
                    min: 50,
                    max: 500,
                },
            },
            {
                field: 'Notes',
                headerText: 'Notes',
                width: 260
            },
        ],
    });

    grid.appendTo('#CellEdit');

    function actionBegin(args: any) {
        if (args.requestType === 'save' && args.action === 'add') {
            args.data.ApptID = 'APT-' + (Date.now() % 100000);
        }
    };

    function validateAppointmentTime(args: any) {
        if (!args.value) return false;
        let date: Date = new Date(args.value);
        let hour: number = date.getHours();
        return hour >= 9 && hour <= 20;
    };

    (<{ doctorTemplate?: Function }>window).doctorTemplate = (e: any): any => {
        const divElement: HTMLDivElement = document.createElement('div');
        divElement.className = 'doctor-cell';
        const imgElement: HTMLImageElement = document.createElement('img');
        const doctorList: string[] = [
            'Dr. Smitha',
            'Dr. Johnson',
            'Dr. Garcia',
            'Dr. Brianna',
            'Dr. Williams',
            'Dr. Martinez',
            'Dr. Davis',
            'Dr. Joanna',
        ];
        const index: number = doctorList.indexOf(e.Doctor) + 1;
        imgElement.src = 'src/grid/images/' + index + '.png';
        imgElement.alt = e.Doctor;
        imgElement.className = 'doctor-img';
        const span: HTMLSpanElement = document.createElement('span');
        span.textContent = e.Doctor;
        divElement.appendChild(imgElement);
        divElement.appendChild(span);
        return divElement.outerHTML;
    };

    (<{ statusTemplate?: Function }>window).statusTemplate = (e: any): any => {
        const div: HTMLDivElement = document.createElement('div');
        const span: HTMLSpanElement = document.createElement('span');
        span.classList.add('badge');
        if (e.Status === 'Booked') {
            span.classList.add('booked');
        } else if (e.Status === 'Canceled') {
            span.classList.add('canceled');
        } else if (e.Status === 'Completed') {
            span.classList.add('completed');
        } else {
            span.classList.add('waiting');
        }
        span.textContent = e.Status;
        div.appendChild(span);
        return div.outerHTML;
    };

    (<{ typeTemplate?: Function }>window).typeTemplate = (e: any): any => {
        const div: HTMLDivElement = document.createElement('div');
        const span: HTMLSpanElement = document.createElement('span');
        span.classList.add('type');
        if (e.Type === 'Emergency') {
            span.classList.add('emergency');
            span.textContent = e.Type;
        } else if (e.Type === 'Lab Test') {
            span.classList.add('lab');
            span.textContent = e.Type;
        } else if (e.Type === 'Follow-up') {
            span.classList.add('follow');
            span.textContent = e.Type;
        } else if (e.Type === 'Routine Check') {
            span.classList.add('routine');
            span.textContent = e.Type;
        } else {
            span.classList.add('consult');
            span.textContent = e.Type;
        }
        div.appendChild(span);
        return div.outerHTML;
    };
};