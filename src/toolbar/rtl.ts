/**
 *  Toolbar sample to demonstrate RTL feature.
 */
import { Toolbar, OverflowMode } from '@syncfusion/ej2-navigations';
this.default = () => {
    let toolbarObj: Toolbar = new Toolbar({
        items: [
            {
              prefixIcon: 'e-cut-icon tb-icons', tooltipText: 'يقطع' , overflow: 'Show' },
            {
              prefixIcon: 'e-copy-icon tb-icons', tooltipText: 'نسخ', overflow: 'Show' },
            {
              prefixIcon: 'e-paste-icon tb-icons', tooltipText: 'معجون' , overflow: 'Show' },
            {
              type: 'Separator' },
            {
              prefixIcon: 'e-bold-icon tb-icons', tooltipText: 'بالخط العريض', overflow: 'Show' },
            {
              prefixIcon: 'e-underline-icon tb-icons', tooltipText: 'أكد' , overflow: 'Show' },
            {
              prefixIcon: 'e-italic-icon tb-icons', tooltipText: 'مائل' , overflow: 'Show' },
            {
              type: 'Separator' },
            {
              text: 'الرصاص', prefixIcon: 'e-bullets-icon tb-icons', tooltipText: 'الرصاص', showTextOn: 'Overflow' },
            {
              text: 'الترقيم', prefixIcon: 'e-numbering-icon tb-icons', tooltipText: 'الترقيم' , showTextOn: 'Overflow' },
            {
              type: 'Separator' },
            {
                prefixIcon: 'e-alignleft-icon tb-icons', tooltipText: 'محاذاة اليسار',
                showTextOn : 'Overflow', overflow: 'Show', text: 'اليسار' },
            {
                prefixIcon: 'e-alignright-icon tb-icons', tooltipText: 'محاذاة اليمين',
                showTextOn : 'Overflow', text: 'حق' },
            {
               prefixIcon: 'e-aligncenter-icon tb-icons', tooltipText: 'محاذاة سنتر',
               showTextOn : 'Overflow', text: 'مركز' },
            {
                prefixIcon: 'e-alignjustify-icon tb-icons', tooltipText: 'محاذاة، ضبط',
                showTextOn : 'Overflow', overflow: 'Show', text: 'تبرير' },
            {
                type: 'Separator' },
            {
              prefixIcon: 'e-undo-icon tb-icons', tooltipText: 'فك', text: 'فك' },
            {
              prefixIcon: 'e-redo-icon tb-icons', tooltipText: 'فعل ثانية', text: 'فعل ثانية' },
            {
              type: 'Separator' },
            {
                text: 'رادار', prefixIcon: 'e-radar-icon tb-icons', tooltipText: 'مخطط الرادار' , showTextOn: 'Overflow' },
            {
                text: 'خط', prefixIcon: 'e-line-icon tb-icons', tooltipText: 'خط الرسم البياني' , showTextOn: 'Overflow' },
            {
                type: 'Separator' },
            {
              prefixIcon: 'e-table-icon tb-icons', text: 'الطاولة', tooltipText: 'الطاولة' , showTextOn: 'Overflow' },
            {
                prefixIcon: 'e-picture-icon tb-icons', overflow: 'Hide', text: 'صورة',
                tooltipText: 'صورة' , showTextOn: 'Overflow' },
            {
                text: 'التصميم', prefixIcon: 'e-design-icon tb-icons', overflow: 'Hide',
                tooltipText: 'التصميم', showTextOn: 'Overflow'
        }]
    });
    toolbarObj.enableRtl = true;
    toolbarObj.appendTo('#ej2Toolbar_Scroll');
    document.getElementById('drop').onchange = (e : Event) => {
        let ddl: HTMLSelectElement = document.getElementById('drop') as HTMLSelectElement;
        toolbarObj.overflowMode = ddl.value as OverflowMode;
        toolbarObj.dataBind();
   };
};

