import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Custom Filtering Sample
 */
import { AutoComplete, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import Fuse from 'fuse.js';
import * as booksData from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        //set the data to dataSource property
        dataSource: (booksData as any).booksData ,
        // maps the appropriate column to fields property
        fields: { value: 'BookName' },
        // set placeholder to AutoComplete input element
        placeholder: 'e.g. Node.js Succinctly',
        //Bind the filter event
        filtering: (e: FilteringEventArgs) => {
            let options: Object = {
                keys: ['BookName'],
                includeMatches: true,
                findAllMatches: true
            };
            // create object from Fuse constructor
            let fuse: Fuse <any>= new Fuse((booksData as any).booksData, options);
            // store the search result data based on typed characters
            let result: any = fuse.search(e.text);
            // declare  object array for storing filtering results
            let data: { [key: string]: Object; }[] = [];
            // store the search result to the array 
            for (let i: number = 0; i < result.length; i++) {
                data.push(result[i].item as any);
            }
            // pass the filter data source to updateData method.
            e.updateData(data, null);
            let popupElement: HTMLElement = document.getElementById('books_popup');
            if (popupElement)
            {
                let lists: Element[] = <NodeListOf<Element> & Element[]>popupElement.querySelectorAll('.e-list-item');
                // For highlight the typed characters, pass the result data and list items to highlightSearch method.
                highlightSearch(lists, result);
            }
        }
    });
    atcObj.appendTo('#books');

    function highlightSearch(listItems: Element[], result: any): void {
        if (result.length > 0) {
            for (let i: number = 0; i < listItems.length; i++) {
                let innerHTML: string = listItems[i].innerHTML;
                for (let j: number = result[i].matches[0].indices.length - 1; j >= 0; j--) {
                    let indexes: number[] = <number[]>result[i].matches[0].indices[j];
                    innerHTML = innerHTML.substring(0, indexes[0]) + '<span class="e-highlight">' +
                        innerHTML.substring(indexes[0], (indexes[1] + 1)) + '</span>' + innerHTML.substring(indexes[1] + 1);
                    listItems[i].innerHTML = innerHTML;
                }
            }
        }
    }
};
