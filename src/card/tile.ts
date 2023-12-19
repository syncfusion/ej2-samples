import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Sample for CSS Cards Tile View.
 */
import { compile, detach} from '@syncfusion/ej2-base';
import { MultiSelect, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { cardBook } from './datasource';

/* tslint:disable:max-line-length
   tslint:disable:max-func-body-length
   tslint:disable:no-string-literal */

(window as any).default = (): void => {
    loadCultureFiles();

    interface FilterKey {
        Code : string;
    }
    let cardTemplateFn: (data: object) => HTMLCollection = compile(document.getElementById('card_template').innerHTML.trim()) as any;
    let card: HTMLCollection; let cardEle: HTMLElement; let cardObj: JSON[] = cardBook as JSON[]; let data: Object[] = []; let multiSelectData: Object[] = []; let searchData: Object[] = [];
    let searchValCount: number = 0; let filterCategory: { [key: string]: Object; }[] = [{ Name: 'Client-Side', Code: 'client' }, { Name: 'Server-Side', Code: 'server' }, { Name: 'Front-End', Code: 'ui' }];
    let emptyData: boolean = true;
    cardRendering(cardObj);
    /*  Initialize MultiSelect component */
    let multiselectComp: MultiSelect = new MultiSelect({
        // set the local data to dataSource property
        dataSource: filterCategory,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code'},
        // set the placeholder to MultiSelect input element
        placeholder: 'Search by categories',
        select: multiSelectFun,
        removed: multiSelectRemove,
    });
    multiselectComp.appendTo('#local');

    /* Funtion for Rendering Cards */
    function cardRendering(cardObj: Object[]): void {
        let errorContent: HTMLElement = document.querySelector('.tile_layout .row.error') as HTMLElement;
        if (cardObj.length > 0) {
            errorContent.style.display = 'none';
            cardObj.forEach((data: Object, index: number): void => {
                card = cardTemplateFn(data); cardEle = document.getElementById('card_sample_' + (++index));
                if (cardEle) { cardEle.appendChild(card[0]); } });
        } else {
            errorContent.style.display = 'flex';
        }
    }
    /* Funtion for Destroying Cards */
    function destroyAllCard(): void {
      let cards: NodeList = document.querySelectorAll('.card-control-section .e-card');
      [].slice.call(cards).forEach( (el: HTMLElement) => {
        detach(el);
      });
    }
    /* Remove event function for multiSelect component */
    function multiSelectRemove(e: RemoveEventArgs): void {
      let cardDa: Object[] = searchData.length > 0 ? searchData : (multiSelectData.length > 0 ? multiSelectData : cardObj);
      if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
        multiSelectData = cardDa; destroyAllCard(); cardRendering(cardObj);
      } else if (multiselectComp.value.length === 0 && searchValCount > 0) {
          searchFilter((<HTMLInputElement>document.getElementById('search_Card')).value);
       } else if (multiselectComp.value.length === 0) {
          destroyAllCard(); multiSelectData = cardDa;
          cardRendering(cardDa); } else {
      let keywords: string[] = (<FilterKey>e.itemData).Code.split(',');
      let dublicate: Object[];
      keywords.forEach((key: string): void => {
        dublicate = new DataManager(cardObj as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
        dublicate.forEach((da: Object): void => {
            if (cardDa.indexOf(da) !== -1) {
                cardDa.splice(cardDa.indexOf(da), 1); }
           });
        multiSelectData = cardDa;
      });
      destroyAllCard(); cardRendering(multiSelectData); }
    }
    /* Select event function for multiSelect component */
    function multiSelectFun(e: SelectEventArgs): void {
      let keywords: string[] = (<FilterKey>e.itemData).Code.split(','); let dublicate: Object[];
      let cardDa: Object[] = searchData.length > 0 ? searchData : cardObj;
      if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
         multiSelectData = []; }
      keywords.forEach((key: string): void => {
        dublicate = new DataManager(cardDa as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
        if (dublicate.length === 0) {
            multiSelectData = [];
            destroyAllCard();
            return; }
        dublicate.forEach((da: Object): void => {
         if (multiSelectData.indexOf(da) === -1) {
            multiSelectData.push(da); }
        }); });
      destroyAllCard();
      cardRendering(multiSelectData);
    }
    /* Function for Filtering Cards */
    function searchFilter(key: string): void {
        searchValCount = key.length;
        let predicate: Predicate = new Predicate('cardContent', 'Contains', key, true);
        predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
        let cardDa: Object[] = (multiSelectData.length > 0 && multiselectComp.value.length > 0 ) ? multiSelectData : cardObj;
        searchData = data = new DataManager(cardDa as JSON[]).executeLocal(new Query().where(predicate));
        destroyAllCard(); cardRendering(data);
    }
    document.getElementById('search_Card').onkeyup = (e: KeyboardEvent) => {
        if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyData)) {
            return; }
        let inputVal: string = (<HTMLInputElement>e.target).value;
        inputVal.length === 0 ? emptyData = true : emptyData = false;
        searchFilter(inputVal);
    };
};
/* tslint:enable:max-line-length
   tslint:enable:no-string-literal */
