import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Filter, Toolbar, Edit } from '@syncfusion/ej2-treegrid';
import { showCheckBoxData } from './data-source';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * CheckBox Selection TreeGrid sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    TreeGrid.Inject(Filter, Toolbar, Edit);
    let treegrid: TreeGrid = new TreeGrid({
        dataSource: showCheckBoxData,
        childMapping: "subTasks",
        treeColumnIndex: 1,
        toolbar: ["Delete", "Search"],
        editSettings: { allowDeleting:true },
        hierarchyCheckboxMode: "self",
        allowFiltering: true,
        height: 380,
        columns: [
            {
                field: "taskID",
                visible: false,
                isPrimaryKey: true
            },
            {
                field: "taskName",
                headerText: "Task Name",
                width: 270,
                showCheckbox: true
            },
            {
                field: "assignee",
                headerText: "Employee",
                width: 180
            },
            {
                field: 'designation',
                headerText: 'Designation',
                width: 220
            },
            {
                field: "priority",
                headerText: "Priority",
                width: 140
            },
            {
                field: "status",
                headerText: "Status",
                width: 120,
                textAlign: "Center"
            },
            {
                field: "progress",
                headerText: "Progress",
                width: 120,
                textAlign: "Right"
            },
        ],
        queryCellInfo: (args) => {
            if (args.column.field === "status") {
                args.cell.innerHTML = `<span class="status-badge ${args.data.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}">
                ${args.data.status}
                </span>`;
            }
        },
    });
    treegrid.appendTo("#TreeGrid");

    const dropDownColumns = new DropDownList({
        dataSource: [
            { id: "Self", name: "Self" },
            { id: "Hierarchy", name: "Hierarchy" },
            { id: "FilteredHierarchy", name: "Filtered Hierarchy" },
        ],
        fields: { text: "name", value: "id" },
        value: "Self",
        width: "180px",
        change: function (e) {
            if (e.value === "Hierarchy") {
                treegrid.hierarchyCheckboxMode = "hierarchy";
            } else if (e.value === "FilteredHierarchy") {
                treegrid.hierarchyCheckboxMode = "filteredHierarchy";
            } else if (e.value === "Self") {
                treegrid.hierarchyCheckboxMode = "self";
            }
        },
    });
    dropDownColumns.appendTo("#hierarchyModes");
};
