/**
 * ListView Template Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

//Import an array of JSON data from newsData
import { dataSource } from './newsData';

//Define customized template
let template: string = '<div ${if(category!==null)} class = "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar" ${else} ' +
'class = "clearfix e-list-wrapper e-list-multi-line e-list-avatar" ${/if}> ${if(imgSrc!=="")}' +
'<img class="e-avatar" src="src/listview/images/${imgSrc}.png" /> ' +
'${/if} <span class="e-list-item-header">${title} </span>' +
'<span class="e-list-content e-text-overflow" >${description} </span> ${if(timeStamp!=="")}  <div id="list-logo">' +
'<span class="bookmark"></span> <span class="comments"></span>' +
'<span class="share"></span></div> <div class="timeStamp">' +
'${timeStamp} </div> ${/if} </div>';

(window as any).default = () => {
    //Initialize ListView component
    let listviewInstance: ListView = new ListView({
        //Set defined data to dataSource property
        dataSource: dataSource,

        //Set defined customized template
        template: template,

        //Set built-in cssClass for templates
        cssClass: 'e-list-template',

        //Set header title
        headerTitle: 'Syncfusion Blog',

        //Set true to show header title
        showHeader: true,

        //bind event to customize ListView
        actionComplete: onComplete

    });

    //Render initialized ListView component
    listviewInstance.appendTo('#listview_template');

    //Customizing the elements to perform our own events
    let share: any = document.getElementsByClassName('share');
    let comments: any = document.getElementsByClassName('comments');
    let bookmark: any = document.getElementsByClassName('bookmark');
    let description: any = document.getElementsByClassName('e-list-content');
    let timeStamp: any = document.getElementsByClassName('timeStamp');

    for (let i: number = 0; i < comments.length; i++) {
        comments[i].setAttribute('title', 'We can customize this element to perform our own action');
        comments[i].addEventListener('click', (event: any) => {
            event.stopPropagation();
        });
    }

    for (let i: number = 0; i < bookmark.length; i++) {
        bookmark[i].setAttribute('title', 'We can customize this element to perform our own action');
        bookmark[i].addEventListener('click', (event: any) => {
            event.stopPropagation();
        });
    }

    for (let i: number = 0; i < share.length; i++) {
        share[i].setAttribute('title', 'We can customize this element to perform our own action');
        share[i].addEventListener('click', (event: any) => {
            event.stopPropagation();
        });
    }

    for (let i: number = 0; i < description.length; i++) {
        description[i].addEventListener('click', (event: any) => {
            event.stopPropagation();
        });
    }

    for (let i: number = 0; i < timeStamp.length; i++) {
        timeStamp[i].addEventListener('click', (event: any) => {
            event.stopPropagation();
        });
    }

    function onComplete(): void {
        let listHeader: HTMLElement = listviewInstance.element.childNodes[0] as HTMLElement;
        let header: HTMLElement = listHeader.childNodes[0] as HTMLElement;
        if (header.style.display === 'none' || listHeader.childNodes.length === 3) {
            if (listHeader.childNodes[2] != null) {
                let childHeader: HTMLElement = listHeader.childNodes[2] as HTMLElement;
                childHeader.remove();
            }
        } else {
            let headerEle: HTMLElement = listviewInstance.element.querySelector('.e-list-header') as HTMLElement;
            let headerElement: HTMLElement = listviewInstance.element.querySelector('#list-logo') as HTMLElement;
            let clone: HTMLElement = headerElement.cloneNode(true) as HTMLElement;
            headerEle.appendChild(clone);
        }
    }
};
