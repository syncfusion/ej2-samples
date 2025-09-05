import { loadCultureFiles } from '../common/culture-loader';
import { Button, SpeedDial, SpeedDialItemModel } from '@syncfusion/ej2-buttons';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Browser } from '@syncfusion/ej2/base';

(window as any).default = (): void => {
    loadCultureFiles();

    let items: SpeedDialItemModel[] = [
        {
            text: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            text: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            text: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            text: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            text: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ]

    let popupTemp: SpeedDial = new SpeedDial(
        {
            content: 'Feedback',
            openIconCss: 'speeddial-icons speeddial-icon-feedback',
            items: items,
            target: '#target',
            position: 'BottomLeft',
            cssClass:"popupSpeedDial",
            popupTemplate: '#popupTemplate'
        });
    popupTemp.appendTo('#btn1');

    let itemTemp: SpeedDial = new SpeedDial(
        {
            content: "Edit",
            openIconCss: 'speeddial-icons speeddial-icon-edit',
            items: items,
            target: '#target',
            position: 'BottomRight',
            itemTemplate: '#itemTemplate'
        });
    itemTemp.appendTo('#btn2');

    let inputNameObj:TextBox = new TextBox({
        placeholder:"Enter your name",
        floatLabelType:"Always",
        showClearButton:true,
    });
    inputNameObj.appendTo('#name');

    let inputEmailObj:TextBox = new TextBox({
        placeholder:"Enter your e-mail",
        floatLabelType:"Always",
        showClearButton:true,
    });
    inputEmailObj.appendTo('#email');

    let inputCommentObj:TextBox = new TextBox({
        placeholder:"Share your comments",
        floatLabelType:"Always",
        showClearButton:true,
    });
    inputCommentObj.appendTo('#comment');

    let button:Button = new Button({
        cssClass:"e-success",
        content:" Submit ",
    })
    button.appendTo("#primarybtn");

    document.getElementById('btn1').onclick = () => {
        if (Browser.isDevice) {
            document.getElementById('btn2').style.visibility = 'hidden';
        }
    };

    document.getElementById('close-icon').onclick = () => {
        popupTemp.hide();
        if (Browser.isDevice) {
            document.getElementById('btn2').style.visibility = 'visible';
        }
    };

    document.getElementById('primarybtn').onclick = () => {
        popupTemp.hide();
        if (Browser.isDevice) {
            document.getElementById('btn2').style.visibility = 'visible';
        }
    };

    document.addEventListener('click', function (event) {
        if (Browser.isDevice) {
            const btn1 = document.getElementById('btn1');
            const btn2 = document.getElementById('btn2');
            const popup = document.querySelector('.popupSpeedDial');
            if (btn2 && btn1 && !btn1.contains(event.target as Node) && (!popup || !popup.contains(event.target as Node))) {
                btn2.style.visibility = 'visible';
            }
        }
    });


};
