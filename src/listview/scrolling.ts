import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListView Scrolling Sample
 */
import { ListView } from '@syncfusion/ej2-lists';
import { enableRipple, Browser, getUniqueID } from '@syncfusion/ej2-base';
enableRipple(false);

//Import an array of JSON data from dataSource
import { foodData, foodItems } from './datasource';
import { Rating } from '@syncfusion/ej2/inputs';

//Define customized template
function loadTemplate(data: any) {
    let typeValue = data.type === 'veg' ? '#006400' : '#FF0000';
    let ratingId = getUniqueID('rating');
    if (!Browser.isDevice) {
        return  '<div class="e-list-wrapper" style="border-bottom: inset;">' +
                    '<div style="display: flex; justify-content: space-between; align-items: flex-start; white-space: normal; padding: 10px;">' +
                        '<div style="display: flex; align-items: center;">' +
                            '<img class="e-avatar" src="'+ data.src +'" style="background:#BCBCBC; width: 100px; height: 100px; border-radius: 4px;" />' +
                            '<div style="margin-left: 20px; text-align: left; max-width: 600px; display: flex; flex-direction: column;">' +
                                '<div style="display: flex; align-items: center;">' +
                                    '<span style="font-size: 18px; font-weight: 600; padding-bottom: 3px;" class="e-headertext">' + data.text + '</span>' +
                                    '<svg width="12" height="12" style="margin-left: 15px; margin-top: -2px;" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' + 
                                    '<path fill-rule="evenodd" clip-rule="evenodd" d="M2 1H10C10.5523 1 11 1.44771 11 2V10C11 10.5523 10.5523 11 10 11H2C1.44771 11 1 10.5523 1 10V2C1 1.44771 1.44771 1 2 1ZM0 2C0 0.895432 0.895432 0 2 0H10C11.1046 0 12 0.895432 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895432 12 0 11.1046 0 10V2ZM4 3C3.44771 3 3 3.44771 3 4V8C3 8.55229 3.44771 9 4 9H8C8.55229 9 9 8.55229 9 8V4C9 3.44771 8.55229 3 8 3H4Z" fill=" ' + typeValue +' "/>' +
                                    '</svg>' +
                                '</div>' +
                                '<span style="font-size: 16px; padding-bottom: 3px;">' + data.price + '</span>' +
                                '<div id="id-description" class="e-text-content" style="font-size: 15px;">' + data.description + '</div>' +
                                '<div class="rating-content">' +
                                    '<input id="' + ratingId + '" class="ratings">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
    } else {
        return '<div class="e-list-wrapper e-list-multi-line e-list-avatar" style="padding-left: 122px; padding-right: 1.0666em; border-bottom: inset;">' +
                '<img class="e-avatar" src="'+ data.src +'" />' +
                '<span class="e-list-item-header e-headertext" style="font-size: 14px;">' + data.text +  '</span>' +
                '<svg width="12" height="12" style="right: 10px; margin-top: -15px; position: absolute;" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' + 
                '<path fill-rule="evenodd" clip-rule="evenodd" d="M2 1H10C10.5523 1 11 1.44771 11 2V10C11 10.5523 10.5523 11 10 11H2C1.44771 11 1 10.5523 1 10V2C1 1.44771 1.44771 1 2 1ZM0 2C0 0.895432 0.895432 0 2 0H10C11.1046 0 12 0.895432 12 2V10C12 11.1046 11.1046 12 10 12H2C0.895432 12 0 11.1046 0 10V2ZM4 3C3.44771 3 3 3.44771 3 4V8C3 8.55229 3.44771 9 4 9H8C8.55229 9 9 8.55229 9 8V4C9 3.44771 8.55229 3 8 3H4Z" fill=" ' + typeValue +' "/>' +
                '</svg>' +
                '<div style="font-size: 12px;">' + data.price + '</div>' +
                '<span class="e-list-content e-text-overflow" style="font-size: 11px;" >' + data.description + '</span>' +
                '</div>';
    }

}

(window as any).default = (): void => {
    loadCultureFiles();
    //Initialize ListView component
    let listviewInstance: ListView = new ListView({
        dataSource: foodData,
        height: 500,
        template: loadTemplate,
        scroll: onListScroll,
        cssClass: 'e-list-template',
    });
    //Render initialized ListView component
    listviewInstance.appendTo('#list-scrolling');
    
    let ratingElements = listviewInstance.element.querySelectorAll('.ratings');
    for (let i = 0; i < ratingElements.length; i++) {
        let ratingObj: Rating = new Rating({
            value: foodData[i].rating as number,
            showTooltip: false,
            readOnly: true
        });
        ratingObj.appendTo('#' + ratingElements[i].id)
    }

    function onListScroll(args: any) {
        let newData = [];
        let elementsCount = listviewInstance.element.querySelectorAll('.ratings');
        let elementCountsLength = elementsCount.length;
        if (args.scrollDirection === "Bottom") {
            if (args.distanceY < 100) {
                for (let i = 0; i <= foodItems.length - 1; i++) {
                    let newId = getUniqueID('list');
                    newData.push({ text: foodItems[i].text, id: newId, price: foodItems[i].price, src: foodItems[i].src, description: foodItems[i].description, type: foodItems[i].type });
                }
                listviewInstance.addItem(newData);
                let newElements = listviewInstance.element.querySelectorAll('.ratings');
                for (let i = elementCountsLength; i < newElements.length; i++) {
                    let ratingObj_1: Rating = new Rating({
                        value: foodItems[i - elementCountsLength].rating as number,
                        showTooltip: false,
                        readOnly: true
                    });
                    ratingObj_1.appendTo('#' + newElements[i].id)
                }
            }
        }
    }
};
