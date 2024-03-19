import { loadCultureFiles } from '../common/culture-loader';
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

/**
 *  Sample for template
 */
(window as any).default = (): void => {
    loadCultureFiles();

    const gitHubRoadmap = [
        { icon: "sf-icon-commit", message: "Created 10 commits in 5 repositories" },
        { icon: "sf-icon-create", message: "Created 1 repository" },
        { icon: "sf-icon-pull", message: "Created a pull request in <u>organization/new-control-roadmap</u>" },
        { icon: "sf-icon-review", message: "Reviewed 3 pull requests in 2 repositories" }
    ];
    
    const timelineItems: TimelineItemModel[] = gitHubRoadmap.map(({ icon, message }) => ({
        dotCss: icon,
        content: message
    }));

    const templateTimeline: Timeline = new Timeline({
        items: timelineItems,
        cssClass: 'custom-timeline',
        template: '#custom-template'
    });
    templateTimeline.appendTo('#template');
};
