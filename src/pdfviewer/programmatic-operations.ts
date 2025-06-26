import { loadCultureFiles } from '../common/culture-loader';
import {
    PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, HighlightSettings, UnderlineSettings, StrikethroughSettings, SquigglySettings, LineSettings, ArrowSettings, RectangleSettings, CircleSettings, PolygonSettings, DistanceSettings, PerimeterSettings, AreaSettings, RadiusSettings, VolumeSettings, FreeTextSettings, DynamicStampItem, SignStampItem, StandardBusinessStampItem, CustomStampSettings, InkAnnotationSettings, StickyNotesSettings, StampSettings,
    AnnotationSelectEventArgs,
    AnnotationMoveEventArgs,
    AnnotationResizeEventArgs,
    FontStyle,
    LineHeadStyle,
    FreeTextAnnotation
} from '@syncfusion/ej2-pdfviewer';
import { Switch } from '@syncfusion/ej2-buttons';
// tslint:disable-next-line:max-line-length
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer);


import { DropDownList, DropDownTree } from '@syncfusion/ej2-dropdowns';
import { FileInfo, NumericTextBox, RemovingEventArgs, UploadChangeEventArgs, Uploader } from '@syncfusion/ej2-inputs';
import { ColorPicker, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { TextBox } from '@syncfusion/ej2-inputs';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Button } from '@syncfusion/ej2-buttons';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
MultiSelect.Inject(CheckBoxSelection);
import { ContextMenu, ContextMenuModel, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-navigations';
import { createElement, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { leaderProperty, LineElementInfo } from '@syncfusion/ej2/documenteditor';
import { fixInitialScaleForTile } from '@syncfusion/ej2/maps';
import { alignElement, DecoratorShapes } from '@syncfusion/ej2/diagrams';
import { Font } from '@syncfusion/ej2/excel-export';
import { change } from '@syncfusion/ej2-grids';
//import { VertxePoints } from '@syncfusion/ej2-buttons';
/**
 * Annotations PdfViewer sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();

    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/annotations-v3.pdf";
    viewer.resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";
    viewer.annotationSelect = AnnotationSelectedEvent;
    viewer.annotationMove = AnnotationMoveEvent;
    viewer.annotationResize = AnnotationResizeEvent;
    viewer.annotationUnSelect = AnnotationUnSelectedEvent;
    viewer.annotationRemove = AnnotationUnSelectedEvent;
    viewer.enableAnnotationToolbar = false;
    viewer.toolbarSettings = {
        showTooltip: false,
        toolbarItems: [
            "OpenOption",
            "UndoRedoTool",
            "PageNavigationTool",
            "MagnificationTool",
            "PanTool",
            "SelectionTool",
            "CommentTool",
            "SubmitForm",
            "FormDesignerEditTool",
            "SearchOption",
            "PrintOption",
            "DownloadOption"
        ],
        formDesignerToolbarItems: [
            "TextboxTool",
            "PasswordTool",
            "CheckBoxTool",
            "RadioButtonTool",
            "DropdownTool",
            "ListboxTool",
            "DrawSignatureTool",
            "DeleteTool"
        ]
    };
    function AnnotationUnSelectedEvent(): void {
        viewer.enableCommentPanel = false;
        selectedAnnotation.annotationSelected = false;
        selectedAnnotation.annotationUnSelected = true;
        viewControl();
        onAnnotationChange();
        stateHasChanged = false;
        changeUpdateButton();
    }
    var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
    switchObj.appendTo('#checked');

    switchObj.change = function (args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }

    //here our code staring
    const syncfusionLogo = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADJCAMAAABYMS1zAAAAllBMVEX///8rNXz2kh7b3OXQ0d8jLnlMU4wfK3hYXpH5+fvz8/bv7/SRlbYAAGyLj7GMkLBGToqdoLt4fKS1t8vIydoAGHEXJXUMHnP1hAD1jAD9483+9u7707L4sXSDh6s0PoL3oE76xpr4qV/97d/5vov96NYADW/2m0b7zaX2mTv4t3v5uYT83cL4rms+R4YAAGX2kjBubpsmc7m7AAAEKUlEQVR4nO3c6VbiQBAF4Dai7AiikCbIjuyK7/9ykziTCJLuVLUcu5O5938d8x2kUr0chEAQBEEQpBgJbD/A9RLMVnPbz3C1LHw5Gdh+iCtl7Xue3AxtP8ZVMpReGOlNC/DF2Xt/I+U295rlRHoxZ5ZzzXyWWELNZGn7eX6SYHdiidrA3vYT/SBT3zuPXNt+JOOsv1tCzSKnX5y9vLB4nr/N5TQw8NIwnjzksA3MV6mWqKnlrg0EM4UlmgbyNtu8KC2fs43tx2NlobFEnDzNNmst5bMN5EYzzLKEmlVOmtpgo/8n+/fFyUVTW6ob2ZlG5qCpBbpGdhbf/QXbjmoJNTvHZ5sp3ZI521S7oxY93biqwSga3Wr+/ppjyZptaq3XMjm9Rox569Or3p/Ufz51UtZqdPs2tYf+DTl3CaZdplc11Zj5kWnxtAs2q5hANSlr4+9UTc0mRjMp6zWqfRubmK2ZJdRs0lu0RQyrKX/TTBzDEKZLVeQxfWPdGoY0XSosqpnTFka55KdgVK8aSxizpvzPolxEW8LMLvf7qPHVS2hrn4ypRreAttYADF8y2qMBe615aoTRHgxYfGkOjwYfjnbpbHOc2U/YCwD9EYfVqZm4lZHE32ktttczW05T818yNjTsYkRwcVim+R+bZG1nWMakHpcpLJvMPU3rGLGXtC+OzL6CYh8jlqT5mbKf6QDm/PRfFcq5swsYEewyLaRTZycwYVPLOGyiHc+4gYkW0bpzwMym7BZG7DUaSdwvdwYTzjaqN45PvRfoDkbMD+kan3zI5BBGBIs0jU8/N3cJk3rqLDMmZXcxlws21pm5Y5jvCzY54xz8uYYRy8PpzcbsSdlpjAhO9m2OvLN/9zDRbBNzmLcaHcQks41cMOucxIh91NTkjFvmJkYMVlJKdpWjmOi8k3+3xFWMCAxuljiLMUmxMKP3Z3JeWzFm3KRX6a6bXDfVpw4jyWNxihq6i0BX1rBiVPVrFgRBkIKkVmekZlSV9OaAEwNLtfvxSE9ye7bFKPpIXpovjBxMBs1Ws0dOPxln3p7pVV/jjGSEvCd7ivnNQZNzUA4MMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwPzvmOcCYVoFwlRLXUZKcRmnqJtcBBoysnb+lxkRBEEQSuq3jNTjKk6RYVUt/Xl1qXbuK/R04qpHRlE7mQAYRZV2SfHEmtQajN+e7T/GmArnt2fjC8TipnedX6xVYxhTc3mUYIxms/GdSRUHwxg0gQEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAaaImELdA3i9I6f3henTq5pfNzTK9CqjGxqdt3ty2g8x5qNNrxonmAq96H5sgBH1EiPJPdhbTlVyq4lTVDK41YQgCIIgCIIgSFr+AKg+KPUzaG6DAAAAAElFTkSuQmCC";
    viewer.documentLoad = function (args) {
        if (args.documentName === 'annotations-v3.pdf') {
            viewer.annotation.addAnnotation("Highlight", {
                bounds: [{ x: 97, y: 610, width: 340, height: 14 }],
                pageNumber: 1
            } as HighlightSettings);
            viewer.annotation.addAnnotation("Underline", {
                bounds: [{ x: 97, y: 705, width: 346, height: 14 }],
                pageNumber: 1
            } as UnderlineSettings);
            viewer.annotation.addAnnotation("Strikethrough", {
                bounds: [{ x: 97, y: 800, width: 367, height: 14 }],
                pageNumber: 1
            } as StrikethroughSettings);
            viewer.annotation.addAnnotation("Squiggly", {
                bounds: [{ x: 97, y: 895.5, width: 336, height: 14 }],
                pageNumber: 1
            } as SquigglySettings);
            viewer.annotation.addAnnotation("Line", {
                offset: { x: 200, y: 230 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            } as LineSettings);
            viewer.annotation.addAnnotation("Arrow", {
                offset: { x: 200, y: 370 },
                pageNumber: 2,
                lineHeadStartStyle: 'Closed',
                lineHeadEndStyle: 'Closed',
                vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
            } as ArrowSettings);
            viewer.annotation.addAnnotation("Rectangle", {
                offset: { x: 200, y: 480 },
                pageNumber: 2,
                width: 150,
                height: 75
            } as RectangleSettings);
            viewer.annotation.addAnnotation("Circle", {
                offset: { x: 200, y: 620 },
                pageNumber: 2,
                width: 90,
                height: 90
            } as CircleSettings);
            viewer.annotation.addAnnotation("Polygon", {
                offset: { x: 200, y: 800 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
            } as PolygonSettings);
            viewer.annotation.addAnnotation("Distance", {
                offset: { x: 200, y: 230 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            } as DistanceSettings);
            viewer.annotation.addAnnotation("Perimeter", {
                offset: { x: 200, y: 350 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 350 }, { x: 285, y: 350 }, { x: 286, y: 412 }]
            } as PerimeterSettings);
            viewer.annotation.addAnnotation("Area", {
                offset: { x: 200, y: 500 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 500 }, { x: 288, y: 499 }, { x: 289, y: 553 }, { x: 200, y: 500 }]
            } as AreaSettings);
            viewer.annotation.addAnnotation("Radius", {
                offset: { x: 200, y: 630 },
                pageNumber: 3,
                width: 90,
                height: 90
            } as RadiusSettings);
            viewer.annotation.addAnnotation("Volume", {
                offset: { x: 200, y: 810 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
            } as VolumeSettings);
            viewer.annotation.addAnnotation("FreeText", {
                offset: { x: 250, y: 150 },
                fontSize: 16,
                fontFamily: "Helvetica",
                pageNumber: 4,
                width: 200,
                height: 40,
                isLock: false,
                defaultText: "Syncfusion"
            } as FreeTextSettings);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 240 },
                pageNumber: 4
            } as StampSettings, DynamicStampItem.Approved);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 350 },
                pageNumber: 4
            } as StampSettings, null, SignStampItem.SignHere);
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 460 },
                pageNumber: 4
            } as StampSettings, null, null, StandardBusinessStampItem.Confidential);
            //The customStampImageSource property contains the stamp image as a base64 string
            viewer.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 530 },
                pageNumber: 4,
                customStamps: [
                    {
                        customStampName: "Image",
                        customStampImageSource:
                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAqwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAEEQAAEDAwIEAwYDBAYLAAAAAAECAwQABREGIRIxQVETYXEHFCIygZEVQmIjUnKCJCUzU6HRFhc1c5KisbKzwvD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APcaUpQKUpQKUpQKUpQKUpQKVzXGdFtsN2ZPfbYjNJ4nHHDgJFfEK5Q5ttbuUaQhcNxvxUPcklPfflQdlYJxURpe/salthuMNpxEYvuNtKc28VKVcPGB2JB577Vyz7pNuUxy26eWlCml8Mu4OI4kR/0oB2Wvp2T17EJK43qDbloakOqL7m6I7TanHVjOMhCQTjzxgVut89i4Mqdj8Y4VlC0OIKFIUOYKTuOn0INRZZtWkrVLuDpIIHHJlPK4nX1dOJR5kk4A5DYDArVoWbHuVgTPjvF5Ul5xx5zhIBc4jkJyBlI+UHqE0FjpSlApSlApSlApSlApSlApSlApSlArClAczgVmqr7QZLptkezxHi1KvD4ihxKsFprBU6v6IB+pFBTdUKf1uUuFa0WpyUIVoYBx706chchXdKEhZSPLNXXVTsOw6NdjNxkvJS0iLEidHnDhLaPME4z5ZzVHk6kTHu1vTpyE1Jf8L3Oww1ZDaGc4XJXjklXDhP6UlWd63ybrL1rq1mNa1hLcAKEeQgcTbbvyuScHnw5KGweZJPIVRYoDT6okfSlnfWhmCwlu43FGAUKxu2j9atyT+UHvirZBixLZBaiQ2kR4zCMIQnZKRWuz2yLZ7czBgo4GWh13KidypR6qJJJPevOvaFqCXqC4HSGmzxlxQbmvJJAPXwwe2M8R9R3FQc1xde9qOqEW+C44jTFuVxPvtnHvCvI+e4HYZPavV4sdmLGajxmktMtJCENpGAkDkBUbpixRNO2dm3Q0/Cj4lrPNazzUf/uWKlkkEZByKDNKUoFKUoFKUoFKUoFKwahZ2p7dFfMZhTs+ZnHu0FHirB/VjZHqogUE3WOIYzUApzUlwBKUxLOwQCFL/bv467DCEn6qr5i6btk5ht+ZOlXlCxlLkiTxtr8whGG8fy0HdK1FZorymHbjH8dPNlC+NY/lTk1XNTe0m12SCXBFnrkOpX7uh6ItkKUBzPGEnhzjcA1bokKLAZS1BjMx20jAQy2EjHoK85i6PuOovaFNv+pWPDt8J/ggMKUCXktq+BX8HNXmT2G9HLF1trSyW2GrUFgbluT3eCIRIS26tS/iSjwgCcDl35Z3qBlSb/edVcN58e4tojKafiW2MfDQpRBXF8X5UnZPGsq5ZAr0TV2j52oL9Anx7wqCxHYWypLbeXAFH4lNqz8KiNs8x0qy2e1QrNbmYFuZDUdkYSkHOT1JPUk7k0HhsG6u3SHPeisLFwnucE95hOPdmc8DUNhR/OrCR5Ak9NvX9F6cRp20IZIR706AX1I5DA2Qn9KRsPvzJqGmXG0N6pfk3KTEhW2ykBsLKUh2Y4nKlY6lKCAOuVmuafry5T5rFs0vaHQ5JSVIm3FBaQhvq7wfNwjurAPnQZ9pms1WtlVmtDqRcnxwrdK+ERknqT0Vj7DftUN7OA1BilywWx65TnU8PjOAtMsJJzlbhBypXMhPFgADbrF6B0sNSagkzrk+5cbTDeUQ5IHwy3T+bHbYE/y9yK9sabQ02lDSAhCRhKUjAAoIaFaZ8gh++zg8vIKYsUFphB+/Ev8AmONuVTYGBgcqzSoFKUoFKUoFKUoFcV4mOW+2yJbEN6Y40gqTHYGVuHsK7awRmg8rd/1gameJn2n8Ptv5YQn+78f+8cSFLI57AJ8/Oy2eyalhxkRo79htEVI2YgQ1uEH+JSgD68NW/FQ2r7yqxWCTNZR4knZqM1/ePLPChP3IoKRc4l91FqJ3TkfUst2Aygfiz7TDTaEA8mkEAnjPXfAH2NohaPehR2Y8bVF9QwygNttJMcJSkDAAAZru0hY02CyMxFK8SWv9rMfPN55W6lE9d9vQCpughmrLNZVxI1Fc19kupYUn/wAYP+NdQVMjD+khEhsfM40nhUPMp3z9D9K76xQRN/uNxjWj3qwW9F0krKfDa8YISUn83F25VVocf2kXdR/EJlrskZQxiM14ryR5ZJA9c/SrHo973m2SFjPhCfKSzn9wPLCceXbyxUpPmRrdDemTHUMx2UFbjizgJAoPGrbpyJBRPvEi53STfhc34MRCVMrckLSvCT8aFEEjBUQdhUlfbHcrcItuYvc+VqbUBDcpf7PgDSfnJPBxBCQcDBGcnlUn7Om4kly+aonhbPBPkeGiRsIqCEqUcHkSMZ9K5bRqqMbjJ1E5FkTrndFe72m2sAF1MVBI4iD8iVKyoqO2w7VRbrJpRdkt7MGDe56GGhgJ8Njn1P8AZ9fPNd5gXNKQEXt0q7uRmz/0AqFja29znGFq2EmxuqaLzDrkhK2XUj5gF7YUNvhqsX+66nvtqlarsrsmDa7aUvQIqQULuCUqHiLdGPk4c8I686g9BMK8/lu7IxyzCB/9q4bpJkWeP7xd9TQojGeHjdipRk9hlW5/yrF21raoEGM/HcM+TMSDEhwyFuv55YA5DfcnYVx2fTD9wm/jeskMS7goYYhY42IKeyQeajtlR68tqCUjtXWVHakQL/FejupC23PcwsLSeoKVgEVsLWomsFMm1yAM5C2HGir6hSsfY1B6ILViuV50utSWkRpHvNvQTgGO6OLCe/CviB7bVMXjVMC2vCG0VTrk4MtQIeHHleZHJCf1KwKDTcNSqskB2XqSCYjTQ3fYcDzSj0SOSgSdhlP1r50FqherbM5cVQVQwmQtkNlfFxBON8/XB8wa4JNsfUzJ1Jq/wXFQWnH4tvbPEzFCUk8RyPjd2+bkOQ7nHs0iSLRY7dBkKUoy4gnYV8yHFEFxPoCtOPU+VBdaUpQKUpQKqF4H4xry027YxrYyq4yB3cPwND/vV9BVvNVTRf8ATrhqC9KIUJU4x2T2aZHAB/xcZ+tBa6UpQKr+r7lIjRWrdaz/AFrcleBF2z4W3xOq8kDf1wOtSV5ukSz216fOc4GGhk4GSo9EpHVROwHU1DaWtst2S9qG+N8Nzlp4WWSc+6R85S0P1dVHqfSgm7Rb2bTbItvjcXhR2g2kqOVKx1J6k8zVbfP+leoSxkGx2h7LxztJlD8h6FCOZ/VjtXdq25ymWY9ptSv61uSi2yr+4Rj43T5JHLzIrRfHIujtCy/dthFiqQyD8zrqhgZ7qUo/40FJsbL2q7W/YYchUdqdMlXC5SEDJQhbq/CbHTKuEEj90edXfRWi4Gk4yvAUqTMdADsp35ikckj91I7Vn2e6bTpnTUaG5hUtweLJcHVw9PQch6VZ6Dhudot12aQ1dIEWa2hXEhEllLgSe4Cga7OBPBwYHDjGMbYr6pQRNp03ZrM669arVChuu/OphkJJ8tunlUt0pSgjLxYLVew2LtAYleEctqcT8SPRXMfevq0WO12VtTdpgRoiVHKy02AVnuo8z9akaUEBr2O9L0beI8dtx1xyMpIQ2kqUodQANycZrk07JVeLyq4R2HmrZCiiJFW62UF9SilS1AHfhHAgA7b8XlVqIzWMb0GaUpQKUpQc9wkCJAkyVcmWlOH6AmoL2bsqZ0LZi4SXHowfcUeZU58ZP3VUpqNlcjT1zYaGVuRHUJA6koIFcuiZDcnR9lea+RcFkgdvgG1BN1omS48GM7JluoZYaSVuOLOEpSOZJrXdLjEtUF2bcJLceM0MrccOAP8AP0qqR4czWk1qfd2HItgZWFxLe6MLlKHJ14dE9kH1NBttDEjVVzYvtxaUza4547ZCdThSz0kLHQ4+UdAc86tcmQzDjOyJLiW2WUFxxxWwSkDJJ+lbQAOVVPU6vx29xdLsqPgBKZdzIG3ghWEtE9CtX/Kk0GzSTDlwekamnNlL08BMNCs5ZijdAweRVniPqB0qsarce1XrezWlghVsiTCp3B/tFtDicPok8CP4lq7VedSzXYFr8OBwpmyVCPEyPhStQPxEfupAKj5JNVz2eW9t2RIvLJWqGlsQbetXN1pCsuPerjmVZ6gCqLyBis0pUClKUClKUClKUClKUClKUClKUGCMjFVNqw36yeOxpmbb/wAPdcU43GntLPuqlHJCFJO6ckkJI2zzq20oKtE0iZE5q46mnKu8to8TLSmwiMwe6G99/wBSiTVoGwrNcV4uUez2yTcJiiGY7ZWrAyT2AHUk7D1oMXq6R7PapNxlk+FHQVkAZKj0SB1JOAPWozRtqfhW5ybcf9qXJz3qZk54FEbNg9kDCfoT1qGi++alvEGJdGwlq2hE+e0FApTKVu0we4Qk8R7nhNXkcqCs6q0zK1DcIWbkqNbW23ESmWk4ceCsZAV+UEAgnngnvViix2okZqPHbS2y0kIbQkYCUjYAVtpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKouv7mwi7W2HJBdZiJNxXHSd5DoUER2gOpU4rI/gq9VxO2i3PXRu6OwmFz2m/DbkKQCtKck4B+p+9BxaTtblqtQEvhM+UtUqatO4U8vdW/YbJHkkVNVgDFZoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP//Z"
                    }
                ]
            } as CustomStampSettings);
            //The pathData property holds the value of the signature drawn using the ink annotation
            viewer.annotation.addAnnotation("Ink", {
                offset: { x: 250, y: 860 },
                pageNumber: 4,
                width: 200,
                height: 60,
                path: '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'
            } as InkAnnotationSettings);

            viewer.annotation.addAnnotation("StickyNotes", {
                offset: { x: 300, y: 980 },
                pageNumber: 4,
                isLock: false
            } as StickyNotesSettings);
        }
        selectedAnnotation = new AnnotationBase();
        annotationListObj.value = selectedAnnotation.annotationType;
        AnnotationUnSelectedEvent();
        selectedAnnotation.totalPageNumber = viewer.pageCount;
        pageNumberObj.max = viewer.pageCount
    };
    viewer.appendTo('#pdfViewer');

    interface VertexPoint {
        x: number;
        y: number;
    }

    class Comment {
        id: string;
        author: string;
        note: string;
        modifiedDate: string;
        state: string;
    }

    interface Bound {
        X: number;
        Y: number;
        Width: number;
        Height: number;
    }
    class AnnotationBase {
        annotationType: string = "Rectangle";
        pageNumber: number = 1;
        totalPageNumber: number = 5;
        annotationSelected: boolean = false;
        annotationUnSelected: boolean = true;
        annotationId: string = "";
        x: number = 100;
        y: number = 100;
        width: number = 100;
        height: number = 100;
        opacity: number = 100;
        thickness: number = 1;
        fillColor: string = "rgba(0, 0, 0, 0)";
        strokeColor: string = "#FF0000";
        isPrint: boolean = true;
        isLocked: boolean = false;
        replayId: string = "";
        allowedInteractions: string[] = ["None"];
        author: string = "Guest";
        state: string = "None";
        comment: string = "New Comment";
        replyComments: Comment[] = [];//
        isReply: boolean = false;
        replyAuthor: string = "Guest";
        replyState: string = "None";
        replyComment: string = "Reply Comment";
        editReply: boolean = false;
        stampsType: string = "Dynamic";
        dynamicStamp: string = "Approved";
        signHereStamp: string = "Accepted";
        standardBusinessStamp: string = "Approved";
        stampComments: any;
        modifiedDate: string = new Date().toISOString();
        replyModifiedDate: string = new Date().toISOString();
        bounds: Bound[] = [];
        boundsString: string = "";
        vertexX0: number = 100;
        vertexY0: number = 100;
        vertexX1: number = 200;
        vertexY1: number = 100;
        lineHeadStart: string = "None";
        lineHeadEnd: string = "None";
        leaderLength: number = 0;
        vertexX: number = 10;
        vertexY: number = 10;
        vertexPointCount: number = 0;
        vertexPointString: string = "";
        vertexPoints: VertexPoint[] = [];
        inkAnnotation: string = "Syncfusion";
        fontFamily: string = "Helvetica";
        fontStyle: string = "None";
        alignment: string = "Left";
        defaultText: string = "None";
        fontSize: number = 16;
        fontColor: string = "#000000";
        signHereStampList: string[] = ["Accepted", "InitialHere", "Rejected", "SignHere", "Witness"];
        path: string;
        customStampName:string = "Image";
        customStampImageSource: any = syncfusionLogo;

        public replyMenuItems: MenuItemModel[] = [
            {
                text: 'Edit',

            },
            {
                text: 'Delete',
            }
        ];
        IsInputChange: any = false;

    }
    const dynamicStampMap: { [key: string]: DynamicStampItem } = {
        'Approved': DynamicStampItem.Approved,
        'Confidential': DynamicStampItem.Confidential,
        'NotApproved': DynamicStampItem.NotApproved,
        'Received': DynamicStampItem.Received,
        'Reviewed': DynamicStampItem.Reviewed,
        'Revised': DynamicStampItem.Revised

    };
    const signHereStampMap: { [key: string]: SignStampItem } = {
        'Accepted': SignStampItem.Accepted,
        'InitialHere': SignStampItem.InitialHere,
        'Rejected': SignStampItem.Rejected,
        'SignHere': SignStampItem.SignHere,
        'Witness': SignStampItem.Witness
    };

    const standardBusinessStampMap: { [key: string]: StandardBusinessStampItem } = {
        'Approved': StandardBusinessStampItem.Approved,
        'Completed': StandardBusinessStampItem.Completed,
        'Confidential': StandardBusinessStampItem.Confidential,
        'Draft': StandardBusinessStampItem.Draft,
        'Final': StandardBusinessStampItem.Final,
        'ForComment': StandardBusinessStampItem.ForComment,
        'NotForPublicRelease': StandardBusinessStampItem.NotForPublicRelease,
        'InformationOnly': StandardBusinessStampItem.InformationOnly,
        'NotApproved': StandardBusinessStampItem.NotApproved,
        'ForPublicRelease': StandardBusinessStampItem.ForPublicRelease,
        'PreliminaryResults': StandardBusinessStampItem.PreliminaryResults,
        'Void': StandardBusinessStampItem.Void
    };
    var selectedAnnotation = new AnnotationBase();

    let annotationListObj: DropDownList = new DropDownList({
        index: 5,
        change: () => { onAnnotationChange(); },
        enabled: selectedAnnotation.annotationUnSelected
    });
    annotationListObj.appendTo("#annotationsList")

    let lineHeadStartListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.lineHeadStart,
        change: (args) => onPropertiesValueChange('lineHeadStart', args)
    });
    lineHeadStartListObj.appendTo("#lineHeadStartList");

    let lineHeadEndListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.lineHeadEnd,
        change: (args) => onPropertiesValueChange('lineHeadEnd', args)
    });
    lineHeadEndListObj.appendTo("#lineHeadEndList");

    let inkAnnoatationListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.inkAnnotation,
        change: (args) => onPropertiesValueChange('inkAnnotation', args)
    });
    inkAnnoatationListObj.appendTo("#inkAnnoatationList")

    let fontFamilyListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.fontFamily,
        change: (args) => onPropertiesValueChange('fontFamily', args)
    });
    fontFamilyListObj.appendTo("#fontFamilyList");

    let textAlignmentListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.alignment,
        change: (args) => onPropertiesValueChange('alignment', args)
    });
    textAlignmentListObj.appendTo("#textAlignmentList");

    let fontStyleListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.fontStyle,
        change: (args) => onPropertiesValueChange('fontStyle', args)
    });
    fontStyleListObj.appendTo("#fontStyleList");

    let statusListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.state,
        change: (args) => onPropertiesValueChange('state', args)
    });
    statusListObj.appendTo("#status");

    let replyStatusObj: DropDownList = new DropDownList({
        value: selectedAnnotation.replyState,
        change: (args) => onPropertiesValueChange('replyState', args)
    });
    replyStatusObj.appendTo("#replyStatus");

    let stampTypeListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.stampsType,
        change: (args) => onPropertiesValueChange('stampsType', args)
    });
    stampTypeListObj.appendTo("#stampTypeList");

    let dynamicstampListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.dynamicStamp,
        change: (args) => onPropertiesValueChange('dynamicStamp', args)
    });
    dynamicstampListObj.appendTo("#dynamicstampList");
    let signHerestampListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.signHereStamp,
        change: (args) => onPropertiesValueChange('signHereStamp', args)
    });
    signHerestampListObj.appendTo("#signHerestampList");
    let standardBussinessStampListObj: DropDownList = new DropDownList({
        value: selectedAnnotation.standardBusinessStamp,
        change: (args) => onPropertiesValueChange('standardBusinessStamp', args)
    });
    standardBussinessStampListObj.appendTo("#standardBussinessStampList");
    function findStampComments(type: any) {

        if (type == "Dynamic") {
            document.getElementById("stampClickedIStrue").style.display = "block";
            document.getElementById("dynamicstampListElement").style.display = "block";
            document.getElementById("signHerestampListElement").style.display = "none";
            document.getElementById("standardBussinessStampListElement").style.display = "none";
        }
        else if (type == "Sign Here" || type === "SignHere") {
            document.getElementById("stampClickedIStrue").style.display = "block";
            document.getElementById("dynamicstampListElement").style.display = "none";
            document.getElementById("signHerestampListElement").style.display = "block";
            document.getElementById("standardBussinessStampListElement").style.display = "none";
        }
        else if (type == "Standard Business" || type === "StandardBusiness") {
            document.getElementById("stampClickedIStrue").style.display = "block";
            document.getElementById("dynamicstampListElement").style.display = "none";
            document.getElementById("signHerestampListElement").style.display = "none";
            document.getElementById("standardBussinessStampListElement").style.display = "block";
        }
        else {
            document.getElementById("dynamicstampListElement").style.display = "none";
            document.getElementById("signHerestampListElement").style.display = "none";
            document.getElementById("standardBussinessStampListElement").style.display = "none";
            document.getElementById("stampClickedIStrue").style.display = "none";
        }
    }
    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    //Initialize the control by preload files
    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
        },
        dropArea: dropElement,
        success: onFileSuccess,
        allowedExtensions: '.png, .jpg, .jpeg',
        template: function (args: any) {
            var template = '<span class="wrapper">' +
                '<img class="upload-image" id="uploadedImage" src="' + syncfusionLogo + '" />' +
                '<span class="name file-name" id="fileName">' + args.name + '</span>' +
                '<span class="e-icons e-file-delete-btn" id="removeIcon"></span>' +
                '</span>';
            return template;
        },
        beforeUpload: function (event) {
            var removeIcons = document.getElementById('removeIcon');
            if (removeIcons) {
                removeIcons.onclick = function () {
                    onFileRemove();
                };
            }
        },
        uploading: function (event) {
            document.getElementById('fileName').innerHTML = event.fileData.name;
        }
    });
    uploadObj.appendTo('#fileupload');

    function onFileRemove() {
        selectedAnnotation.customStampImageSource = syncfusionLogo;
        (document.getElementById("uploadedImage") as HTMLImageElement).src = syncfusionLogo;
        uploadObj.remove();
    }

    function onFileSuccess(args: any): void {
        const fileData = args.file.rawFile;
        if (fileData instanceof Blob) {
            convertBlobToBase64(fileData)
                .then((base64String: string) => {
                    selectedAnnotation.customStampName = "Image";
                    if (args.operation === "remove") {
                        selectedAnnotation.customStampImageSource = syncfusionLogo;
                    }
                    else {
                        selectedAnnotation.customStampImageSource = base64String;
                        // Now selectedAnnotation.customStampImageSource contains the base64 string
                        var imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
                        // imageElement.innerHTML = "<img src='" + selectedAnnotation.customStampImageSource
                        //   + "' alt='Syncfusion Logo'>";
                        imageElement.src = base64String;
                    }
                })
                .catch((error: any) => {
                    console.error("Failed to convert Blob to base64:", error);
                });
        } else {
            console.error("Unexpected file data type:", typeof fileData);
        }
    }

    function convertBlobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    function onAnnotationChange(): void {
        let currentSelectedAnnotation = annotationListObj.value as string;
        selectedAnnotation.annotationType = currentSelectedAnnotation;

        switch (currentSelectedAnnotation) {

            case 'Highlight':
            case 'Underline':
            case 'Strikethrough':
            case 'Squiggly':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.width = 100;
                    selectedAnnotation.height = 14;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.thickness = 1;
                    if (selectedAnnotation.annotationType === "Highlight") {
                        selectedAnnotation.fillColor = "#ffff00";
                    } else if (selectedAnnotation.annotationType === "Underline") {
                        selectedAnnotation.fillColor = "#00ff00";
                    } else if (selectedAnnotation.annotationType === "Strikethrough") {
                        selectedAnnotation.fillColor = "#ff0000";
                    } else if (selectedAnnotation.annotationType === "Squiggly") {
                        selectedAnnotation.fillColor = "#ff0000";
                    }
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }
            case 'Line':
            case 'Arrow':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.vertexX0 = 100;
                    selectedAnnotation.vertexY0 = 100;
                    selectedAnnotation.vertexX1 = 100;
                    selectedAnnotation.vertexY1 = 100;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.thickness = 1;
                    selectedAnnotation.fillColor = "#00000000";
                    selectedAnnotation.strokeColor = "#ff0000";
                    if (selectedAnnotation.annotationType === "Arrow") {
                        selectedAnnotation.lineHeadStart = "Arrow";
                        selectedAnnotation.lineHeadEnd = "Arrow";
                    }
                    else {
                        selectedAnnotation.lineHeadStart = "None";
                        selectedAnnotation.lineHeadEnd = "None";
                    }
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }

            case 'Rectangle':
            case 'Circle':
            case 'Radius':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.width = 100;
                    selectedAnnotation.height = 100;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.thickness = 1;
                    selectedAnnotation.fillColor = "#00000000";
                    selectedAnnotation.strokeColor = "#ff0000";
                    resetAnnotationProperties();
                    clearTable();
                    break;
                }
            case 'Polygon':
            case 'Perimeter':
            case 'Area':
            case 'Volume':
                {
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.width = 100;
                    selectedAnnotation.height = 100;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.thickness = 1;
                    selectedAnnotation.fillColor = "#00000000";
                    selectedAnnotation.strokeColor = "#ff0000";
                    selectedAnnotation.lineHeadEnd = "Arrow";
                    selectedAnnotation.lineHeadStart = "Arrow";
                    resetAnnotationProperties();
                    clearTable();
                    break;
                }
            case 'Distance':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.vertexX0 = 100;
                    selectedAnnotation.vertexY0 = 100;
                    selectedAnnotation.vertexX1 = 200;
                    selectedAnnotation.vertexY1 = 100;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.thickness = 1;
                    selectedAnnotation.fillColor = "#00000000";
                    selectedAnnotation.strokeColor = "#ff0000";
                    selectedAnnotation.lineHeadStart = "Arrow";
                    selectedAnnotation.lineHeadEnd = "Arrow";
                    if (selectedAnnotation.vertexPoints.length) {
                        selectedAnnotation.vertexPoints.push({ x: selectedAnnotation.vertexX0, y: selectedAnnotation.vertexY0 }, { x: selectedAnnotation.vertexX1, y: selectedAnnotation.vertexY1 });
                    }
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }
            case 'StickyNotes':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.width = 30;
                    selectedAnnotation.height = 30;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.author = "Guest";
                    selectedAnnotation.comment = "New Comment";
                    selectedAnnotation.thickness = 1;
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }
            case 'Ink':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.width = 30;
                    selectedAnnotation.height = 30;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.author = "Guest";
                    selectedAnnotation.comment = "New Comment";
                    selectedAnnotation.thickness = 1;
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }
            case 'Stamp':
                {

                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "block";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    findStampComments(stampTypeListObj.value);
                    resetAnnotationProperties();
                    clearTable();
                    break;
                }
            case 'FreeText':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "block";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
                    selectedAnnotation.width = 150;
                    selectedAnnotation.height = 26.5;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.thickness = 1;
                    selectedAnnotation.fillColor = "#00000000";
                    selectedAnnotation.strokeColor = "#00000000";
                    selectedAnnotation.defaultText = "Free text";
                    selectedAnnotation.fontFamily = "Helvetica";
                    selectedAnnotation.alignment = "Left";
                    selectedAnnotation.fontStyle = "None";
                    selectedAnnotation.author = "Guest";
                    selectedAnnotation.comment = "New Comment";
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }
            case 'CustomStamp':
                {
                    (document.getElementById("strokethickenssIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("deladdboundsButtonsIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("colorFillerIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "block";
                    (document.getElementById("XYRowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("heightwidthrowIstrue") as HTMLElement).style.display = "flex";
                    (document.getElementById("X1Y1RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("X2Y2RowIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("lineIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("distanceIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("polygonIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("inkAnnoatationIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
                    (document.getElementById("freeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("innerfreeTextIstrue") as HTMLElement).style.display = "none";
                    (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "block";
                    selectedAnnotation.width = 100;
                    selectedAnnotation.height = 100;
                    selectedAnnotation.opacity = 100;
                    selectedAnnotation.author = "Guest";
                    selectedAnnotation.comment = "New Comment";
                    clearTable();
                    resetAnnotationProperties();
                    break;
                }
        }
        if (selectedAnnotation.isLocked) {
            if (selectedAnnotation.allowedInteractions.length > 0) {
                allowInteractionsListObj.value = selectedAnnotation.allowedInteractions;
            }
        }
        replyCommentObj.value = "";
        replyCommentObj.placeholder = "Reply Comment";
    }
    let pageNumberObj: NumericTextBox = new NumericTextBox({ min: 1, max: selectedAnnotation.totalPageNumber,value: selectedAnnotation.pageNumber, change: (args) => onPropertiesValueChange('pageNumber', args), format: "n0", showSpinButton: true, enabled: selectedAnnotation.annotationUnSelected });
    pageNumberObj.appendTo("#pageNumber");
    let XpositionObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.x, change: (args) => { onPropertiesValueChange('x', args); }, format: "###.##", showSpinButton: false });
    XpositionObj.appendTo("#Xposition");
    let YpositionObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.y, change: (args) => { onPropertiesValueChange('y', args); }, format: "###.##", showSpinButton: false });
    YpositionObj.appendTo("#Yposition");
    let widthObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.width, change: (args) => { onPropertiesValueChange('width', args); }, format: "###.##", showSpinButton: false });
    widthObj.appendTo("#width");
    let heightObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.height, change: (args) => { onPropertiesValueChange('height', args); }, format: "###.##", showSpinButton: false });
    heightObj.appendTo("#height");
    let shapeOpacityObj: NumericTextBox = new NumericTextBox({ min: 0,max : 100, value: selectedAnnotation.opacity, format: "###.##", showSpinButton: false, change: (args) => { onPropertiesValueChange('opacity', args); } });
    shapeOpacityObj.appendTo("#shapeOpacity");

    let FillcolorpickerObj: ColorPicker = new ColorPicker(
        {
            value: selectedAnnotation.fillColor,
            mode: 'Palette',
            showButtons: true,
            change: (args) => onFillColorChange(args)
        });
    FillcolorpickerObj.appendTo('#fillColorinput');

    let strokeColorObj: ColorPicker = new ColorPicker(
        {
            value: selectedAnnotation.strokeColor,
            mode: 'Palette',
            showButtons: true,
            change: (args) => onStrokeColorChange(args)
        });
    strokeColorObj.appendTo('#strokeColorinput')

    let fontColorpickerObj: ColorPicker = new ColorPicker(
        {
            value: selectedAnnotation.fontColor,
            mode: 'Palette',
            showButtons: true,
            change: (args) => onFontColorChange(args)
        },);
    fontColorpickerObj.appendTo('#fontColorInput');

    let menuOptions: ContextMenuModel = {
        target: '#contextMenutarget',
        items: selectedAnnotation.replyMenuItems,
        select: function (args) { return contextMenuItemSelected(args); }
    };

    let menuObj: ContextMenu = new ContextMenu(menuOptions, '#contextmenu');
    function onFillColorChange(args: ColorPickerEventArgs): void {
        selectedAnnotation.fillColor = args.currentValue.rgba;
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }
    function contextMenuItemSelected(args: any) {
        switch (args.item.text) {
            case 'Edit':
                onEditButtonClick(currentEditCommentId);
                break;
            case 'Delete':
                onReplyCommentDelete(currentEditCommentId);
                break;
        }
    }
    function onStrokeColorChange(args: ColorPickerEventArgs): void {
        selectedAnnotation.strokeColor = args.currentValue.rgba;
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }
    function onFontColorChange(args: ColorPickerEventArgs): void {
        selectedAnnotation.fontColor = args.currentValue.rgba;
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }
    let strokeThickenssObj: NumericTextBox = new NumericTextBox({ min: 0, max:12, value: selectedAnnotation.thickness, change: (args) => onPropertiesValueChange('thickness', args), format: "###.##", showSpinButton: false });
    strokeThickenssObj.appendTo("#strokeThickenss");
    let X1positionObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.vertexX0, change: (args) => onPropertiesValueChange('vertexX0', args), format: "###.##", showSpinButton: false });
    X1positionObj.appendTo("#X1position");
    let X2positionObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.vertexX1, change: (args) => onPropertiesValueChange('vertexX1', args), format: "###.##", showSpinButton: false });
    X2positionObj.appendTo("#X2position");
    let Y1positionObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.vertexY0, change: (args) => onPropertiesValueChange('vertexY0', args), format: "###.##", showSpinButton: false });
    Y1positionObj.appendTo("#Y1position");
    let Y2positionObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.vertexY1, change: (args) => onPropertiesValueChange('vertexY1', args), format: "###.##", showSpinButton: false });
    Y2positionObj.appendTo("#Y2position");
    let leaderLengthObj: NumericTextBox = new NumericTextBox({ min: 0, value: selectedAnnotation.leaderLength, change: (args) => onPropertiesValueChange('leaderLength', args), format: "###.##", showSpinButton: false });
    leaderLengthObj.appendTo("#leaderLength");

    let defaultTextObj: TextBox = new TextBox({ value: selectedAnnotation.defaultText, change: (args) => onPropertiesValueChange('defaultText', args), });
    defaultTextObj.appendTo('#defaultText');

    let fontSizeObj: NumericTextBox = new NumericTextBox({ min: 1, value: selectedAnnotation.fontSize, change: (args) => onPropertiesValueChange('fontSize', args), format: "###.##", showSpinButton: false });
    fontSizeObj.appendTo("#fontSize");

    let PrintAnnotationCheckBoxObj: CheckBox = new CheckBox({ change: (args) => onPrintAnnoationChecked(args), checked: true, });
    PrintAnnotationCheckBoxObj.appendTo('#PrintAnnotation-isTrueCheckbox');

    function onPrintAnnoationChecked(args: ChangeEventArgs): void {
        selectedAnnotation.isPrint = args.checked;
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }

    let LockAnnotationCheckBoxObj: CheckBox = new CheckBox({ change: (args) => onLockAnnoationChecked(args), checked: false, });
    LockAnnotationCheckBoxObj.appendTo('#LockAnnotation-isTrueCheckbox');
    function onLockAnnoationChecked(args: ChangeEventArgs): void {
        selectedAnnotation.isLocked = args.checked;
        const divElement = document.getElementById('allowinstractionsIstrue');
        if (args.checked) {
            divElement.style.display = 'block';
            if (selectedAnnotation.annotationSelected) {
                allowInteractionsListObj.value = selectedAnnotation.allowedInteractions as string[];
            }
            else {
                allowInteractionsListObj.value = ["Select", "Resize"];
            }
            allowInteractionsListObj.dataBind();
        } else {
            divElement.style.display = 'none';
        }
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }
    let authorNameObj: TextBox = new TextBox({ value: selectedAnnotation.author, change: (args) => onPropertiesValueChange('author', args), });
    authorNameObj.appendTo('#authorName');

    let commentObj: TextBox = new TextBox({ value: selectedAnnotation.comment, change: (args) => onPropertiesValueChange('comment', args), 
        focus: function(args) { args.event.target.placeholder = "" ;},
        blur: function(args) {
            if(args.value === "") {
                args.event.target.placeholder = "New Comment";
        }},
        placeholder: "New Comment"
    });
    commentObj.appendTo('#comment');

    let replyCheckBoxObj: CheckBox = new CheckBox({ change: onreplyCheckboxChecked, checked: false, });
    replyCheckBoxObj.appendTo('#replyCheckbox-isTrue');

    let replyAuthorNameObj: TextBox = new TextBox({ value: selectedAnnotation.replyAuthor, change: (args) => onPropertiesValueChange('replyAuthor', args), });
    replyAuthorNameObj.appendTo('#replyAuthorName');
    let stateHasChanged: boolean = false;
    let replyCommentObj: TextBox = new TextBox({placeholder: "Reply Comment", change: (args) => onPropertiesValueChange('replyComment', args), });
    replyCommentObj.appendTo('#replyComment');

    function onPropertiesValueChange(property: string, event: any): void {
        if (selectedAnnotation.hasOwnProperty(property)) {
            selectedAnnotation[property] = event.value;
            if (property === 'stampsType') {
                findStampComments(event.itemData.text);
                if (selectedAnnotation.annotationUnSelected) {
                    resetAnnotationProperties();
                }
            }
            if ((property === 'dynamicStamp' || property === 'signHereStamp' || property === 'standardBusinessStamp') && selectedAnnotation.annotationUnSelected) {
                resetAnnotationProperties();
            }
        }
        if ((property === 'opacity' || property === 'isPrint' || property === 'author' || property === 'leaderLength' || property === 'vertexX0' || property === 'vertexX1' || property === 'vertexY0' || property === 'vertexY1' || property === 'comment' || property === 'height' || property === 'state' || property === 'thickness' || property === 'lineHeadStart' || property === 'lineHeadEnd' || property === 'defaultText' || property === 'fontFamily' || property === 'alignment' || property === 'fontStyle' || property === 'fontSize') && selectedAnnotation.annotationSelected && event.isInteracted) {
            stateHasChanged = true;
            changeUpdateButton();
        }
        else if (property === 'width' && (selectedAnnotation.annotationType === "Rectangle" || selectedAnnotation.annotationType === "Ink" || selectedAnnotation.annotationType === "StickyNotes" || selectedAnnotation.annotationType === "Circle" || selectedAnnotation.annotationType === "CustomStamp" || selectedAnnotation.annotationType === "Radius" || selectedAnnotation.annotationType === "FreeText" || selectedAnnotation.annotationType === "Stamp" || selectedAnnotation.annotationType === "stamp") && selectedAnnotation.annotationSelected && event.isInteracted) {
            stateHasChanged = true;
            changeUpdateButton();
        }
        else if ((property === 'x' || property === 'y') && (selectedAnnotation.annotationType != "Highlight" && selectedAnnotation.annotationType != "Underline" && selectedAnnotation.annotationType != "Strikethrough" && selectedAnnotation.annotationType != "Squiggly" && selectedAnnotation.annotationType != "Polygon" && selectedAnnotation.annotationType != "Perimeter" && selectedAnnotation.annotationType != "Area" && selectedAnnotation.annotationType != "Volume") && selectedAnnotation.annotationSelected && event.isInteracted) {
            stateHasChanged = true;
            changeUpdateButton();
        }
        else if((property === 'x' || property === 'y' || property === 'width' || property === 'height') && (selectedAnnotation.annotationType === "Highlight" || selectedAnnotation.annotationType === "Underline" || selectedAnnotation.annotationType === 'Strikethrough' || selectedAnnotation.annotationType != "Squiggly") && selectedAnnotation.annotationSelected && event.isInteracted) {
            updateButton.disabled = true;
        }
    }
    function changeUpdateButton(): void {
        if (selectedAnnotation.annotationSelected) {
            updateButton.disabled = !stateHasChanged;
        }
        else {
            updateButton.disabled = !stateHasChanged;
        }
    }
    var selectAnnotationId: string;
    function AnnotationSelectedEvent(args: AnnotationSelectEventArgs): void {
        selectAnnotationId = args.annotationId;
        selectedAnnotation.annotationId = args.annotationId;
        for (let i = 0; i < viewer.annotationCollection.length; i++) {
            if (viewer.annotationCollection[i].annotationId === args.annotationId) {
                updatePropertiesToPanel(viewer.annotationCollection[i]);
                selectedAnnotation.annotationSelected = true;
                selectedAnnotation.annotationUnSelected = false;
                viewControl();
                break;
            }
        }
        viewer.enableCommentPanel = true;
    }
    function AnnotationMoveEvent(args: AnnotationMoveEventArgs): void {
        selectAnnotationId = args.annotationId;
        for (let i = 0; i < viewer.annotationCollection.length; i++) {
            if (viewer.annotationCollection[i].annotationId === args.annotationId) {
                updatePropertiesToPanel(viewer.annotationCollection[i]);
                break;
            }
        }
    }
    function AnnotationResizeEvent(args: AnnotationResizeEventArgs): void {
        selectAnnotationId = args.annotationId;
        for (let i = 0; i < viewer.annotationCollection.length; i++) {
            if (viewer.annotationCollection[i].annotationId === args.annotationId) {
                updatePropertiesToPanel(viewer.annotationCollection[i]);
                break;
            }
        }
    }

    function updatePropertiesToPanel(collection: any) {
        selectedAnnotation.annotationType = collection.shapeAnnotationType;
        //pending property updation for selected annotation
        selectedAnnotation.allowedInteractions = collection.allowedInteractions;
        selectedAnnotation.pageNumber = collection.pageNumber + 1;
        pageNumberObj.value = collection.pageNumber + 1;
        pageNumberObj.dataBind();
        findStampComments("Null");
        if (collection.textMarkupAnnotationType === "Highlight" || collection.textMarkupAnnotationType === "Underline" || collection.textMarkupAnnotationType === "Strikethrough" || collection.textMarkupAnnotationType === "Squiggly") {
            annotationListObj.value = collection.textMarkupAnnotationType;
            selectedAnnotation.annotationType = collection.textMarkupAnnotationType;
            annotationListObj.dataBind()
        }
        else if (collection.shapeAnnotationType === "Square" && collection.subject === "Rectangle") {
            annotationListObj.value = "Rectangle";
            selectedAnnotation.annotationType = "Rectangle";
            annotationListObj.dataBind()
        }
        else if (collection.shapeAnnotationType === "Circle" && collection.subject === "Circle" && collection.indent !== "PolygonRadius") {
            annotationListObj.value = "Circle";
            selectedAnnotation.annotationType = "Circle";
            annotationListObj.dataBind()
        }
        else if (collection.shapeAnnotationType === "Polygon" && collection.subject === "Polygon") {
            if (collection.indent === "PolygonVolume") {
                selectedAnnotation.annotationType = "Volume";
            }
            else if (collection.indent === "PolygonDimension") {
                selectedAnnotation.annotationType = "Area";
            }
            else {
                selectedAnnotation.annotationType = "Polygon";
            }
            annotationListObj.value = selectedAnnotation.annotationType;
            annotationListObj.dataBind()
        }
        else if (collection.shapeAnnotationType === "Line" && collection.subject === "Line" && collection.indent !== "LineDimension") {
            annotationListObj.value = "Line";
            selectedAnnotation.annotationType = "Line";
            annotationListObj.dataBind()
        }
        else if (collection.shapeAnnotationType === "Line" && collection.subject === "Arrow") {
            annotationListObj.value = "Arrow";
            selectedAnnotation.annotationType = "Arrow";
            annotationListObj.dataBind();
        }
        else if (collection.shapeAnnotationType === "sticky") {
            annotationListObj.value = "StickyNotes";
            selectedAnnotation.annotationType = "StickyNotes";
            annotationListObj.dataBind();
        }
        else if (collection.shapeAnnotationType === "FreeText") {
            annotationListObj.value = "FreeText";
            selectedAnnotation.annotationType = "FreeText";
            annotationListObj.dataBind();
        }
        else if (collection.shapeAnnotationType === "Ink") {
            annotationListObj.value = "Ink";
            selectedAnnotation.annotationType = "Ink";
            annotationListObj.dataBind();
        }
        else if (collection.shapeAnnotationType === "stamp" && collection.stampAnnotationType === "path") {
            annotationListObj.value = "Stamp";
            selectedAnnotation.annotationType = "stamp";
            annotationListObj.dataBind();
            if (collection.isDynamicStamp === true) {
                //findStampComments("Dynamic");
                selectedAnnotation.stampsType = "Dynamic";
                stampTypeListObj.value = "Dynamic";
                stampTypeListObj.dataBind();
                dynamicstampListObj.value = collection.subject;
                dynamicstampListObj.dataBind();
            }
            else if (collection.subject === "Accepted" || collection.subject === "InitialHere" || collection.subject === "Rejected" || collection.subject === "SignHere" || collection.subject === "Witness") {
                //findStampComments("Sign Here");
                selectedAnnotation.stampsType = "Sign Here";
                stampTypeListObj.value = "SignHere";
                stampTypeListObj.dataBind();
                signHerestampListObj.value = collection.subject;
                signHerestampListObj.dataBind();
            }
            else {
                //findStampComments("Standard Bussiness");
                selectedAnnotation.stampsType = "Standard Business"
                stampTypeListObj.value = "StandardBusiness";
                stampTypeListObj.dataBind();
                standardBussinessStampListObj.value = collection.subject;
                standardBussinessStampListObj.dataBind();
            }
        }
        else if (collection.shapeAnnotationType === "stamp" && collection.stampAnnotationType === "image") {
            annotationListObj.value = "CustomStamp";
            selectedAnnotation.annotationType = "CustomStamp";
            annotationListObj.dataBind();
        }
        else if (collection.shapeAnnotationType === "Line" || collection.shapeAnnotationType === "Polyline" || collection.shapeAnnotationType === "Square" || collection.shapeAnnotationType === "Circle" || collection.shapeAnnotationType === "Polygon" && collection.indent) {
            selectedAnnotation.vertexPoints = collection.vertexPoints
            if (collection.indent === "LineDimension") {
                annotationListObj.value = "Distance";
                selectedAnnotation.annotationType = "Distance";
                annotationListObj.dataBind();
            }
            else if (collection.indent === "PolyLineDimension") {
                annotationListObj.value = "Perimeter";
                selectedAnnotation.annotationType = "Perimeter";
                annotationListObj.dataBind();
                selectedAnnotation.vertexPoints = collection.vertexPoints;
            }
            else if (collection.indent === "PolyLineDimension" && collection.subject === "Arrow") {
                annotationListObj.value = "Arrow";
                selectedAnnotation.annotationType = "Arrow";
                annotationListObj.dataBind();
            }
            else if (collection.indent === "PolygonDimension") {
                annotationListObj.value = "Area";
                selectedAnnotation.annotationType = "Area";
                annotationListObj.dataBind();
            }
            else if (collection.indent === "PolygonRadius") {
                annotationListObj.value = "Radius";
                selectedAnnotation.annotationType = "Radius";
                annotationListObj.dataBind();
            }
            else if (collection.indent === "PolygonVolume") {
                annotationListObj.value = "Volume";
                selectedAnnotation.annotationType = "Volume";
                annotationListObj.dataBind();
            }
        }
        else {
            selectedAnnotation.annotationType = collection.shapeAnnotationType;
            if (collection.shapeAnnotationType === "Polygon") {
                selectedAnnotation.vertexPoints = collection.vertexPoints;
            }
        }

        if (selectedAnnotation.annotationType === "Highlight" || selectedAnnotation.annotationType === "Underline" || selectedAnnotation.annotationType === "Strikethrough" || selectedAnnotation.annotationType === "Squiggly" && (collection.annotationAddMode === "Imported Annotation" || collection.annotationAddMode === "Existing Annotation")) {
            selectedAnnotation.width = collection.bounds[0].Width;
            widthObj.value = collection.bounds[0].Width;
            widthObj.dataBind();
            selectedAnnotation.height = collection.bounds[0].Height;
            heightObj.value = collection.bounds[0].Height;
            heightObj.dataBind();
            selectedAnnotation.x = collection.bounds[0].X;
            XpositionObj.value = collection.bounds[0].X;
            XpositionObj.dataBind();
            selectedAnnotation.y = collection.bounds[0].Y;
            YpositionObj.value = collection.bounds[0].Y;
            YpositionObj.dataBind();
            selectedAnnotation.fillColor = collection.color ? (collection.color.includes("rgba") ? rgbaStringToHex(collection.color) : collection.color) : "";;
            FillcolorpickerObj.value = selectedAnnotation.fillColor;
            FillcolorpickerObj.dataBind();

        }
        else if (selectedAnnotation.annotationType === "Highlight" || selectedAnnotation.annotationType === "Underline" || selectedAnnotation.annotationType === "Strikethrough" || selectedAnnotation.annotationType === "Squiggly" && (collection.annotationAddMode === "UI Drawn Annotation")) {
            selectedAnnotation.width = collection.bounds[0].width;
            widthObj.value = collection.bounds[0].width;
            widthObj.dataBind();
            selectedAnnotation.height = collection.bounds[0].height;
            heightObj.value = collection.bounds[0].height;
            heightObj.dataBind();
            selectedAnnotation.x = collection.bounds[0].left;
            XpositionObj.value = collection.bounds[0].left;
            XpositionObj.dataBind();
            selectedAnnotation.y = collection.bounds[0].right;
            YpositionObj.value = collection.bounds[0].right;
            YpositionObj.dataBind();
            selectedAnnotation.fillColor = collection.color ? (collection.color.includes("rgba") ? rgbaStringToHex(collection.color) : collection.color) : "";;
            FillcolorpickerObj.value = selectedAnnotation.fillColor;
            FillcolorpickerObj.dataBind();
        }
        else if (selectedAnnotation.annotationType === "FreeText") {
            //for updating the property panel
            selectedAnnotation.width = collection.bounds.width;
            widthObj.value = collection.bounds.width;
            widthObj.dataBind();
            selectedAnnotation.height = collection.bounds.height;
            heightObj.value = collection.bounds.height;
            heightObj.dataBind();
            selectedAnnotation.x = collection.bounds.x ? collection.bounds.x : collection.bounds.left;
            XpositionObj.value = collection.bounds.x ? collection.bounds.x : collection.bounds.left;
            XpositionObj.dataBind();
            selectedAnnotation.y = collection.bounds.y ? collection.bounds.y : collection.bounds.top;
            YpositionObj.value = collection.bounds.y ? collection.bounds.y : collection.bounds.top;
            YpositionObj.dataBind();
            selectedAnnotation.defaultText = collection.dynamicText;
            defaultTextObj.value = collection.dynamicText;
            defaultTextObj.dataBind();
            selectedAnnotation.alignment = collection.alignment;
            textAlignmentListObj.value = collection.alignment;
            textAlignmentListObj.dataBind();
            selectedAnnotation.fontFamily = collection.fontFamily;
            fontFamilyListObj.value = collection.fontFamily;
            fontFamilyListObj.dataBind();
            if (collection.font.isBold) {
                selectedAnnotation.fontStyle = "Bold";
            }
            else if (collection.font.isItalic) {
                selectedAnnotation.fontStyle = "Italic";
            }
            else if (collection.font.isStrikeout) {
                selectedAnnotation.fontStyle = "Strikethrough";
            }
            else if (collection.font.isUnderline) {
                selectedAnnotation.fontStyle = "Underline";
            }
            else {
                selectedAnnotation.fontStyle = "None"
            }
            fontStyleListObj.value = selectedAnnotation.fontStyle;
            fontStyleListObj.dataBind();
            selectedAnnotation.fontSize = collection.fontSize;
            fontSizeObj.value = collection.fontSize;
            fontSizeObj.dataBind();
            selectedAnnotation.fontColor = collection.fontColor ? (collection.fontColor.includes("rgba") ? rgbaStringToHex(collection.fontColor) : collection.fontColor) : "";
            fontColorpickerObj.value = collection.fontColor ? (collection.fontColor.includes("rgba") ? rgbaStringToHex(collection.fontColor) : collection.fontColor) : "";
            fontColorpickerObj.dataBind();
        }
        else if (selectedAnnotation.annotationType === "Line" || selectedAnnotation.annotationType === "Arrow" || selectedAnnotation.annotationType === "Distance") {
            selectedAnnotation.vertexX0 = collection.vertexPoints[0].x;
            X1positionObj.value = collection.vertexPoints[0].x;
            X1positionObj.dataBind();
            selectedAnnotation.vertexY0 = collection.vertexPoints[0].y;
            Y1positionObj.value = collection.vertexPoints[0].y;
            Y1positionObj.dataBind();
            selectedAnnotation.vertexX1 = collection.vertexPoints[1].x;
            X2positionObj.value = collection.vertexPoints[1].x;
            X2positionObj.dataBind();
            selectedAnnotation.vertexY1 = collection.vertexPoints[1].y;
            Y2positionObj.value = collection.vertexPoints[1].y;
            Y2positionObj.dataBind();
            if(collection.lineHeadStartStyle && collection.lineHeadEndStyle){
                selectedAnnotation.lineHeadStart = collection.lineHeadStartStyle;
                lineHeadStartListObj.value = collection.lineHeadStartStyle;
                selectedAnnotation.lineHeadEnd = collection.lineHeadEndStyle;
                lineHeadEndListObj.value = collection.lineHeadEndStyle;
            }
            else {
                selectedAnnotation.lineHeadStart = viewer.annotation.getArrowType(collection.lineHeadStart);
                lineHeadStartListObj.value = viewer.annotation.getArrowType(collection.lineHeadStart);
                selectedAnnotation.lineHeadEnd = viewer.annotation.getArrowType(collection.lineHeadEnd);
                lineHeadEndListObj.value = viewer.annotation.getArrowType(collection.lineHeadEnd);
            }
            lineHeadStartListObj.dataBind();
            lineHeadEndListObj.dataBind();
            if (selectedAnnotation.annotationType === "Distance") {
                selectedAnnotation.leaderLength = collection.leaderLength;
                leaderLengthObj.value = collection.leaderLength;
                leaderLengthObj.dataBind();
            }
            selectedAnnotation.vertexPoints = collection.vertexPoints;
        }
        else if (selectedAnnotation.annotationType === "Ink") {
            selectedAnnotation.width = collection.bounds.width;
            widthObj.value = collection.bounds.width;
            widthObj.dataBind();
            selectedAnnotation.height = collection.bounds.height;
            heightObj.value = collection.bounds.height;
            heightObj.dataBind();
            selectedAnnotation.x = collection.bounds.x;
            XpositionObj.value = collection.bounds.x;
            XpositionObj.dataBind();
            selectedAnnotation.y = collection.bounds.y;
            YpositionObj.value = collection.bounds.y;
            YpositionObj.dataBind();
        }
        else {
            selectedAnnotation.width = collection.bounds.width;
            widthObj.value = collection.bounds.width;
            widthObj.dataBind();
            selectedAnnotation.height = collection.bounds.height;
            heightObj.value = collection.bounds.height;
            heightObj.dataBind();
            //binding values to x and y positions
            selectedAnnotation.x = collection.bounds.x ? collection.bounds.x : collection.bounds.left;
            selectedAnnotation.y = collection.bounds.y ? collection.bounds.y : collection.bounds.top;
            if (selectedAnnotation.annotationType === "Polygon" || selectedAnnotation.annotationType === "Perimeter" || selectedAnnotation.annotationType === "Area" || selectedAnnotation.annotationType === "Volume") {
                selectedAnnotation.x = collection.vertexPoints[0].x;
                selectedAnnotation.y = collection.vertexPoints[0].y;
            }
            XpositionObj.value = selectedAnnotation.x;
            XpositionObj.dataBind();
            YpositionObj.value = selectedAnnotation.y;
            YpositionObj.dataBind();
        }
        selectedAnnotation.opacity = Number(collection.opacity) * 100;
        shapeOpacityObj.value = Number(collection.opacity) * 100;
        shapeOpacityObj.dataBind();
        selectedAnnotation.thickness = collection.thickness;
        strokeThickenssObj.value = collection.thickness;
        strokeThickenssObj.dataBind();
        if (selectedAnnotation.annotationType === "Highlight" || selectedAnnotation.annotationType === "Underline" || selectedAnnotation.annotationType === "Strikethrough" || selectedAnnotation.annotationType === "Squiggly") {
            selectedAnnotation.fillColor = collection.color ? (collection.color.includes("rgba") ? rgbaStringToHex(collection.color) : collection.color) : "";;
            FillcolorpickerObj.value = collection.color ? (collection.color.includes("rgba") ? rgbaStringToHex(collection.color) : collection.color) : "";;
            FillcolorpickerObj.dataBind();
            selectedAnnotation.bounds = collection.bounds;
            generateTable();
        }
        else {
            if (selectedAnnotation.annotationType === "Ink" && !collection.fillColor) {
                collection.fillColor = "#ffffff00";
            }
            selectedAnnotation.fillColor = collection.fillColor ? (collection.fillColor.includes("rgba") ? rgbaStringToHex(collection.fillColor) : collection.fillColor) : "";
            FillcolorpickerObj.value = collection.fillColor ? (collection.fillColor.includes("rgba") ? rgbaStringToHex(collection.fillColor) : collection.fillColor) : "";;
            FillcolorpickerObj.dataBind();
            if(selectedAnnotation.annotationType === "FreeText" && collection.strokeColor === "rgba(255,255,255,1)") {
                collection.strokeColor = "#00000000";
            }
            selectedAnnotation.strokeColor = collection.strokeColor ? (collection.strokeColor.includes("rgba") ? rgbaStringToHex(collection.strokeColor) : collection.strokeColor) : "";
            strokeColorObj.value = collection.strokeColor ? (collection.strokeColor.includes("rgba") ? rgbaStringToHex(collection.strokeColor) : collection.strokeColor) : "";
            strokeColorObj.dataBind();
        }
        if (selectedAnnotation.annotationType === "Polygon" || selectedAnnotation.annotationType === "Perimeter" ||
            selectedAnnotation.annotationType === "Area" || selectedAnnotation.annotationType === "Volume" || selectedAnnotation.annotationType === "Distance") {
            selectedAnnotation.vertexPoints = collection.vertexPoints;
            //for displaying co-ordinte table
            if (selectedAnnotation.annotationType != "Distance") {
                //addVertex(selectedAnnotation);
                generateTable();
            }
        }
        selectedAnnotation.isPrint = collection.isPrint;
        PrintAnnotationCheckBoxObj.checked = collection.isPrint;
        PrintAnnotationCheckBoxObj.dataBind();
        selectedAnnotation.isLocked = collection.isLocked;
        LockAnnotationCheckBoxObj.checked = collection.isLocked;
        LockAnnotationCheckBoxObj.dataBind();
        const divElement = document.getElementById('allowinstractionsIstrue');
        if (collection.isLocked) {
            divElement.style.display = "block";
            selectedAnnotation.allowedInteractions = collection.allowedInteractions;
            allowInteractionsListObj.value = collection.allowedInteractions;
        }
        else {
            divElement.style.display = "none";
            selectedAnnotation.allowedInteractions = collection.allowedInteractions;
        }
        selectedAnnotation.author = collection.author;
        authorNameObj.value = collection.author;
        authorNameObj.dataBind();
        selectedAnnotation.bounds = collection.bounds;
        selectedAnnotation.comment = collection.note;
        if(!collection.note && (selectedAnnotation.annotationType === "FreeText" || selectedAnnotation.annotationType === "Ink")){
            collection.note = "";
        }
        commentObj.value = collection.note;
        commentObj.placeholder = "";
        commentObj.dataBind();
        selectedAnnotation.state = collection.state;
        statusListObj.value = collection.state;
        statusListObj.dataBind();
        selectedAnnotation.replyComments = [] as Comment[];
        if (collection.comments) {
            if (collection.comments.length > 0) {
                for (let i = 0; i < collection.comments.length; i++) {
                    let reply = new Comment();
                    reply.id = collection.comments[i].annotName;
                    reply.author = collection.comments[i].author;
                    reply.note = collection.comments[i].note;
                    reply.modifiedDate = formatCurrentDate(new Date(collection.comments[i].modifiedDate));
                    reply.state = collection.comments[i].state;
                    selectedAnnotation.replyComments.push(reply);
                }
            }
        }
        else if (selectedAnnotation.replyComment) {
            if (selectedAnnotation.replyComment.length > 0) {
                for (let i = 0; i < selectedAnnotation.replyComment.length; i++) {
                    let reply = new Comment();
                    reply.id = generateRandomId();
                    reply.author = selectedAnnotation.replyAuthor;
                    reply.note = selectedAnnotation.replyComment;
                    reply.modifiedDate = new Date().toString();
                    reply.state = 'None';
                    selectedAnnotation.replyComments.push(reply);
                }
            }
        }
        if (collection.comments.length > 0) {
            selectedAnnotation.isReply = true;
            replyCheckBoxObj.checked = true;
            replyCheckBoxObj.dataBind();
            (document.getElementById('repliesContainer') as HTMLDivElement).style.display = "block";
            displayReplies();
            (document.getElementById('ischeckedReplybox')).style.display = "block";
        }
        else {
            (document.getElementById('ischeckedReplybox')).style.display = "none";
            (document.getElementById('repliesContainer') as HTMLDivElement).style.display = "none";
        }
        replyCommentObj.value = "";
        replyCommentObj.placeholder = "Reply Comment";
    }
    function rgbaStringToHex(rgba: string): string | null {
        var rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
        var match = rgba.match(rgbaRegex);
        if (match) {
            var r = parseInt(match[1], 10);
            var g = parseInt(match[2], 10);
            var b = parseInt(match[3], 10);
            var a = parseFloat(match[4]);
    
            // Convert to integer range [0, 255] for alpha
            var alpha = Math.round(a * 255);
            
            var redHex = ('0' + r.toString(16)).slice(-2);
            var greenHex = ('0' + g.toString(16)).slice(-2);
            var blueHex = ('0' + b.toString(16)).slice(-2);
            var alphaHex = ('0' + alpha.toString(16)).slice(-2);  // Fixing alpha conversion
    
            // If alpha is 255 (fully opaque), return only RGB
            if (a === 255) {
                return "#" + redHex + greenHex + blueHex;
            } else {
                return "#" + redHex + greenHex + blueHex + alphaHex;
            }
        } else {
            return null;
        }
    }


    function onreplyCheckboxChecked(args: ChangeEventArgs): void {
        const divElement = document.getElementById('ischeckedReplybox');
        selectedAnnotation.isReply = args.checked;
        if (divElement) {
            if (args.checked) {
                divElement.style.display = 'block';
                document.getElementById("updateReplyButton").style.display = "none";
                document.getElementById("addreplyButton").style.display = "block";
            } else {
                divElement.style.display = 'none';
            }
        }
    }
    let interactionsList =
        [
            { Type: 'None', Value: "None" },
            { Type: 'Delete', Value: "Delete" },
            { Type: 'Property Change', Value: "PropertyChange" },
            { Type: 'Move', Value: "Move" },
            { Type: 'Select', Value: "Select" },
            { Type: 'Resize', Value: "Resize" },
        ];

    let allowInteractionsListObj: MultiSelect = new MultiSelect({
        dataSource: interactionsList,
        fields: { text: 'Type', value: 'Value' },
        value: ["None"],
        mode: 'CheckBox',
        placeholder: 'Select Interactions',
        showDropDownIcon: true,
        allowFiltering: false,
        popupHeight: '350px',
        change: function (args) {
            selectedAnnotation.allowedInteractions = allowInteractionsListObj.value as string[];
            if (selectedAnnotation.annotationSelected && args.isInteracted) {
                stateHasChanged = true;
                changeUpdateButton();
            }
        }
    });
    allowInteractionsListObj.appendTo('#interactionDropdownTree');

    let addBoundsButtonobj: Button = new Button({ isPrimary: true });
    addBoundsButtonobj.appendTo('#addboundsbutton');
    let deletebutton = new Button({ cssClass: 'e-outline', isPrimary: true });
    deletebutton.appendTo('#deletebutton');
    let addVertexButtonObj: Button = new Button({ isPrimary: true });
    addVertexButtonObj.appendTo('#addVertexButton');
    let vertexDeleteButton: Button = new Button({ cssClass: 'e-outline', isPrimary: true });
    vertexDeleteButton.appendTo('#vertexdelete');
    let addreplyButtonObj: Button = new Button({ isPrimary: true });
    addreplyButtonObj.appendTo('#addreplyButton');
    let updatereplyButtonObj: Button = new Button({ isPrimary: true });
    updatereplyButtonObj.appendTo('#updateReplyButton');
    addreplyButtonObj.element.onclick = (): void => {
        updateReply();
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }
    updatereplyButtonObj.element.onclick = (): void => {
        updateEditReply(currentEditCommentId);
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
        document.getElementById("updateReplyButton").style.display = "none";
        document.getElementById("addreplyButton").style.display = "block";
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }

    function updateEditReply(currentEditCommentId: any) {
        if (currentEditCommentId && selectedAnnotation.editReply) {
            let currentReplyComment = selectedAnnotation.replyComments.find(comment => comment.id === currentEditCommentId);
            if (currentReplyComment) {
                currentReplyComment.author = selectedAnnotation.replyAuthor;
                currentReplyComment.note = selectedAnnotation.replyComment;
                currentReplyComment.state = selectedAnnotation.replyState;
                currentReplyComment.modifiedDate = formatCurrentDate(new Date());
            }
            else {
                console.log(`Comment ID : ${currentEditCommentId} is not found`);
            }
            currentEditCommentId = "";
        }
        selectedAnnotation.editReply = false;
        displayReplies();
        //for refreshing reply container
        selectedAnnotation.replyAuthor = 'Guest';
        replyAuthorNameObj.value = selectedAnnotation.replyAuthor;
        replyCommentObj.value = "";
        replyCommentObj.placeholder = "Reply Comment";
        selectedAnnotation.replyState = 'None';
        replyStatusObj.value = selectedAnnotation.replyState;
    }

    const annotationSettings = (): any => ({

        offset: { x: selectedAnnotation.x, y: selectedAnnotation.y },
        pageNumber: selectedAnnotation.pageNumber,
        width: selectedAnnotation.width,
        height: selectedAnnotation.height,
        opacity: Number(selectedAnnotation.opacity) / 100,
        thickness: selectedAnnotation.thickness,
        strokeColor: selectedAnnotation.strokeColor,
        fillColor: selectedAnnotation.fillColor,
        bounds: (selectedAnnotation.bounds && selectedAnnotation.bounds.length > 0) ? selectedAnnotation.bounds.map((item) => ({ x: item.X, y: item.Y, width: item.Width, height: item.Height })) :
            [{
                x: selectedAnnotation.x,
                y: selectedAnnotation.y,
                width: selectedAnnotation.width,
                height: selectedAnnotation.height
            }],
        vertexPoints: selectedAnnotation.vertexPoints,
        fontFamily: selectedAnnotation.fontFamily,
        fontStyle: convertStyleToEnum(selectedAnnotation.fontStyle),
        fontSize: selectedAnnotation.fontSize,
        defaultText: selectedAnnotation.defaultText,
        textAlignment: selectedAnnotation.alignment,
        author: selectedAnnotation.author,
        setState: selectedAnnotation.state,
        note: selectedAnnotation.comment,
        comments: selectedAnnotation.replyComments,
        replyAuthor: selectedAnnotation.replyAuthor,
        replyState: selectedAnnotation.replyState,
        replyComment: selectedAnnotation.replyComment,
        modifiedDate: selectedAnnotation.modifiedDate,
        replyModifiedDate: selectedAnnotation.replyModifiedDate,
        lineHeadEndStyle: viewer.annotation.getArrowString(selectedAnnotation.lineHeadEnd as DecoratorShapes),
        lineHeadStartStyle: viewer.annotation.getArrowString(selectedAnnotation.lineHeadStart as DecoratorShapes),
        leaderLength: selectedAnnotation.leaderLength,
        inkAnnotationType: selectedAnnotation.inkAnnotation,
        color: selectedAnnotation.fillColor,
        allowedInteractions: selectedAnnotation.allowedInteractions,
        dynamicStamps: selectedAnnotation.dynamicStamp,
        signStamps: selectedAnnotation.signHereStamp,
        standardBusinessStamps: selectedAnnotation.standardBusinessStamp,
        path: selectedAnnotation.path,
        fontColor: selectedAnnotation.fontColor,
        isPrint: selectedAnnotation.isPrint,
        isLock: selectedAnnotation.isLocked,
        borderColor: selectedAnnotation.strokeColor,
        customStamps: [{
            customStampImageSource: selectedAnnotation.customStampImageSource,
            customStampName: selectedAnnotation.customStampName,
        }]
    });
    function convertStyleToEnum(style: string): FontStyle | any {
        switch (style) {
            case "None":
                {
                    return FontStyle.None;
                }
            case "Bold":
                {
                    return FontStyle.Bold;
                }
            case "Italic":
                {
                    return FontStyle.Italic;
                }
            case "Strikethrough":
                {
                    return FontStyle.Strikethrough;
                }
            case "Underline":
                {
                    return FontStyle.Underline;
                }
        }
    }

    (document.getElementById("resetbutton") as HTMLElement).addEventListener('click', resetAnnotationProperties);
    let addbutton: Button = new Button({ isPrimary: true, disabled: selectedAnnotation.annotationSelected });
    addbutton.appendTo('#addAnnotationButton');
    function viewControl(): void {
        if (selectedAnnotation.annotationSelected) {
            annotationListObj.enabled = false;
            pageNumberObj.enabled = false;
            addbutton.disabled = true;
            inkAnnoatationListObj.enabled = false;
            if (annotationListObj.value === "Stamp") {
                (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "none";
            }
            else if (selectedAnnotation.annotationType === "CustomStamp") {
                (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "none";
            }
        }
        else if (selectedAnnotation.annotationUnSelected) {
            annotationListObj.enabled = true;
            pageNumberObj.enabled = true;
            addbutton.disabled = false;
            updateButton.disabled = false;
            inkAnnoatationListObj.enabled = true;
            if (selectedAnnotation.annotationType === "stamp" || selectedAnnotation.annotationType === "Stamp") {
                (document.getElementById("stampClickedIStrue") as HTMLElement).style.display = "block";
            }
            else if (selectedAnnotation.annotationType === "CustomStamp") {
                (document.getElementById("fileUploaderIsTrue") as HTMLElement).style.display = "block";
            }
            clearTable();
        }
    }
    let updateButton: Button = new Button({ isPrimary: true, disabled: !stateHasChanged });
    updateButton.appendTo('#updateannotationButton');
    updateButton.element.onclick = (): void => {
        const index = viewer.annotationCollection.findIndex(item => item.annotationId == selectAnnotationId);
        let updateAnnotation = updateAnnotationSettings(viewer.annotationCollection[index]);
        viewer.annotation.editAnnotation(updateAnnotation);
        updateButton.disabled = true;
    }
    function updateAnnotationSettings(annotation: any) {
        let currentAnnotation = annotation;
        if (currentAnnotation.textMarkupAnnotationType === "Highlight" || currentAnnotation.textMarkupAnnotationType === "Underline" || currentAnnotation.textMarkupAnnotationType === "Strikethrough" || currentAnnotation.textMarkupAnnotationType === "Squiggly") {
            currentAnnotation.bounds = [];
            currentAnnotation.color = selectedAnnotation.fillColor ? (selectedAnnotation.fillColor.includes("rgba") ? rgbaStringToHex(selectedAnnotation.fillColor) : selectedAnnotation.fillColor) : "";
            if (selectedAnnotation.bounds.length <= 1) {
                currentAnnotation.bounds.push({
                    X: selectedAnnotation.x,
                    Y: selectedAnnotation.y,
                    Width: selectedAnnotation.width,
                    Height: selectedAnnotation.height,
                    Left: selectedAnnotation.x,
                    Top: selectedAnnotation.y
                })
            }
            else if (selectedAnnotation.bounds.length > 1) {
                for (let i = 0; i < selectedAnnotation.bounds.length; i++) {
                    currentAnnotation.bounds.push({
                        X: selectedAnnotation.bounds[i].X,
                        Y: selectedAnnotation.bounds[i].Y,
                        Width: selectedAnnotation.bounds[i].Width,
                        Height: selectedAnnotation.bounds[i].Height,
                        Left: selectedAnnotation.bounds[i].X,
                        Top: selectedAnnotation.bounds[i].Y
                    })
                }
            }
            else {
                currentAnnotation.bounds.X = selectedAnnotation.x;
                currentAnnotation.bounds.Y = selectedAnnotation.y;
                currentAnnotation.bounds.Width = selectedAnnotation.width;
                currentAnnotation.bounds.Height = selectedAnnotation.height;
                currentAnnotation.Left = selectedAnnotation.x;
                currentAnnotation.Top = selectedAnnotation.y;
            }
        }
        else if (currentAnnotation.shapeAnnotationType === "Ink" || currentAnnotation.shapeAnnotationType === "StickyNotes" || currentAnnotation.shapeAnnotationType === "Square" || currentAnnotation.shapeAnnotationType === "Circle" || currentAnnotation.shapeAnnotationType === "Radius" || currentAnnotation.shapeAnnotationType === "FreeText") {
            currentAnnotation.bounds.width = selectedAnnotation.width;
            currentAnnotation.bounds.height = selectedAnnotation.height;
            currentAnnotation.bounds.x = selectedAnnotation.x;
            currentAnnotation.bounds.y = selectedAnnotation.y;
        }
        else {
            currentAnnotation.bounds.width = selectedAnnotation.width;
            currentAnnotation.bounds.height = selectedAnnotation.height;
            currentAnnotation.bounds.left = selectedAnnotation.x;
            currentAnnotation.bounds.top = selectedAnnotation.y;
            currentAnnotation.bounds.x = selectedAnnotation.x;
            currentAnnotation.bounds.y = selectedAnnotation.y;
        }

        if (selectedAnnotation.annotationType === "Line" || selectedAnnotation.annotationType === "Arrow" || selectedAnnotation.annotationType === "Distance") {
            currentAnnotation.vertexPoints = [];
            currentAnnotation.vertexPoints[0] = { x: selectedAnnotation.vertexX0, y: selectedAnnotation.vertexY0 };
            currentAnnotation.vertexPoints[1] = { x: selectedAnnotation.vertexX1, y: selectedAnnotation.vertexY1 };
            currentAnnotation.lineHeadStartStyle = selectedAnnotation.lineHeadStart;
            currentAnnotation.lineHeadEndStyle = selectedAnnotation.lineHeadEnd;
            currentAnnotation.offset = { x: currentAnnotation.vertexPoints[0].x, y: currentAnnotation.vertexPoints[0].y };
            if (selectedAnnotation.annotationType === "Line") {
                currentAnnotation.subject = 'Line';
            }
            else if (selectedAnnotation.annotationType === 'Arrow') {
                currentAnnotation.subject = 'Arrow';
            }
            else {
                currentAnnotation.leaderLength = selectedAnnotation.leaderLength;
                currentAnnotation.subject = "LineDimension";
            }
        }
        else if (currentAnnotation.shapeAnnotationType === "FreeText") {
            currentAnnotation.textAlign = selectedAnnotation.alignment;
            //currentAnnotation.fontStyle = convertStyleToEnum(selectedAnnotation.fontStyle);
            if(selectedAnnotation.fontStyle === "Bold"){
                currentAnnotation.font.isBold = true;
                currentAnnotation.font.isStrikeout = false;
                currentAnnotation.font.isUnderline = false;
                currentAnnotation.font.isItalic = false;
            }else if (selectedAnnotation.fontStyle === "Italic") {
                currentAnnotation.font.isItalic = true;
                currentAnnotation.font.isStrikeout = false;
                currentAnnotation.font.isUnderline = false;
                currentAnnotation.font.isBold = false;
            } else if (selectedAnnotation.fontStyle === "Underline") {
                currentAnnotation.font.isUnderline = true;
                currentAnnotation.font.isStrikeout = false;
                currentAnnotation.font.isItalic = false;
                currentAnnotation.font.isBold = false;
            } else if (selectedAnnotation.fontStyle === "Strikethrough") {
                currentAnnotation.font.isStrikeout = true;
                currentAnnotation.font.isUnderline = false;
                currentAnnotation.font.isItalic = false;
                currentAnnotation.font.isBold = false;
            } else {
                currentAnnotation.font.isStrikeout = false;
                currentAnnotation.font.isUnderline = false;
                currentAnnotation.font.isItalic = false;
                currentAnnotation.font.isBold = false;
            }
            currentAnnotation.fontFamily = selectedAnnotation.fontFamily;
            currentAnnotation.fontSize = selectedAnnotation.fontSize;
            currentAnnotation.dynamicText = selectedAnnotation.defaultText;
            currentAnnotation.fontColor = selectedAnnotation.fontColor ? (selectedAnnotation.fontColor.includes("rgba") ? rgbaStringToHex(selectedAnnotation.fontColor) : selectedAnnotation.fontColor) : "";
        }
        
        currentAnnotation.opacity = Number(selectedAnnotation.opacity) / 100;
        currentAnnotation.thickness = selectedAnnotation.thickness;
        if (currentAnnotation.textMarkupAnnotationType === "Highlight" || currentAnnotation.textMarkupAnnotationType === "Underline" || currentAnnotation.textMarkupAnnotationType === "Strikethrough" || currentAnnotation.textMarkupAnnotationType === "Squiggly") {
            currentAnnotation.color = selectedAnnotation.fillColor ? (selectedAnnotation.fillColor.includes("rgba") ? rgbaStringToHex(selectedAnnotation.fillColor) : selectedAnnotation.fillColor) : "";
        }
        else {
            currentAnnotation.fillColor = selectedAnnotation.fillColor ? (selectedAnnotation.fillColor.includes("rgba") ? rgbaStringToHex(selectedAnnotation.fillColor) : selectedAnnotation.fillColor) : "";
            currentAnnotation.strokeColor = selectedAnnotation.strokeColor ? (selectedAnnotation.strokeColor.includes("rgba") ? rgbaStringToHex(selectedAnnotation.strokeColor) : selectedAnnotation.strokeColor) : "";
        }
        if (selectedAnnotation.isPrint) {
            currentAnnotation.annotationSettings.isPrint = true;
            currentAnnotation.isPrint = true;
        }
        else {
            currentAnnotation.annotationSettings.isPrint = false;
            currentAnnotation.isPrint = false;
        }
        if (selectedAnnotation.annotationType === "Line") {
            currentAnnotation.subType = 'Line';
        }
        else if (selectedAnnotation.annotationType === "Arrow") {
            currentAnnotation.subType = 'Arrow';
        }
        else if (selectedAnnotation.annotationType === "Distance") {
            currentAnnotation.subType = "Distance";
        }
        if (selectedAnnotation.isLocked) {
            currentAnnotation.isLocked = true;
            currentAnnotation.annotationSettings.isLock = true;
            currentAnnotation.allowedInteractions = selectedAnnotation.allowedInteractions;
        }
        else {
            currentAnnotation.isLocked = false;
            currentAnnotation.annotationSettings.isLock = false;
        }
        updateAnnotationComments(currentAnnotation);
        return currentAnnotation;
    }
    let addBoundsbutton = document.getElementById('addboundsbutton');
    if (addBoundsbutton) {
        addBoundsbutton.addEventListener('click', addBounds);
    }
    function deleteBounds(): void {
        // Select the table body element by its ID
        const tableBody = document.getElementById('pdfViewer-coordinate-table');

        // Check if the table body exists
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear all rows
            tableBody.style.display = 'none'; // Hide the table after deletion
            indexValue = 0; // Reset the index value
            selectedAnnotation.bounds = [];
        }
    }

    // Attach the clearTable function to the click event of the delete button
    const deleteButton = document.getElementById('deletebutton');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteList);
    }
    //for updating comments 
    function updateAnnotationComments(annotation: any) {
        var isReplyChanged = false;
        var currentAnnotation = annotation; // Declare currentAnnotation first

        // If currentAnnotation's note or notes differ from the selectedAnnotation's comment
        if (((!isNullOrUndefined(currentAnnotation.note) && (currentAnnotation.note !== selectedAnnotation.comment)) ||
            (!isNullOrUndefined(currentAnnotation.notes) && (currentAnnotation.notes !== selectedAnnotation.comment))) &&
            (currentAnnotation.comments && currentAnnotation.comments.length > 0)) {

            currentAnnotation.commentType = "edit"; // Mark it as an edit
        } else {
            currentAnnotation.commentType = "add"; // If no edit, treat it as an add
        }

        // Check if annotation type should handle comments (not for certain types like dimensions)
        var calibrationType = currentAnnotation.indent || ""; // Use "||" instead of optional chaining
        if (calibrationType !== "LineDimension" && calibrationType !== "PolyLineDimension" && calibrationType !== "PolygonDimension" &&
            calibrationType !== "PolygonRadius" && calibrationType !== "PolygonVolume") {

            // Safeguard against null or undefined notes
            if (!isNullOrUndefined(currentAnnotation.note) || ((currentAnnotation.shapeAnnotationType === "Ink" || currentAnnotation.shapeAnnotationType === "FreeText") && !currentAnnotation.note)) {
                currentAnnotation.note = selectedAnnotation.comment;
            } else if (!isNullOrUndefined(currentAnnotation.notes)) {
                currentAnnotation.notes = selectedAnnotation.comment;
            }
        }

        // Initialize the replyComment array
        currentAnnotation.replyComment = [];

        // Check if there are replyComments and process them
        if (!isNullOrUndefined(selectedAnnotation.replyComments) && selectedAnnotation.replyComments.length > 0) {
            if (selectedAnnotation.replyComments.length > currentAnnotation.comments.length) {
                var diff = selectedAnnotation.replyComments.length - currentAnnotation.comments.length;
                currentAnnotation.commentType = "add"; // Mark as "add" if replies are new
                for (var index = (selectedAnnotation.replyComments.length - diff); index < selectedAnnotation.replyComments.length; index++) {
                    currentAnnotation.replyComment.push(selectedAnnotation.replyComments[index].note);
                }
            } else if (selectedAnnotation.replyComments.length === currentAnnotation.comments.length) {
                // Compare individual reply comments
                for (var i = 0; i < selectedAnnotation.replyComments.length; i++) {
                    var value = selectedAnnotation.replyComments[i];
                    if (currentAnnotation.comments[i] && (value.note !== currentAnnotation.comments[i].note)) {
                        isReplyChanged = true;
                        currentAnnotation.commentType = 'edit';
                        currentAnnotation.commentId = currentAnnotation.comments[i].annotName;
                        currentAnnotation.editComment = value.note;
                    }
                }
            }
        }

        // If no reply was changed, reset the edit comment variables
        if (!isReplyChanged) {
            currentAnnotation.commentId = null;
            currentAnnotation.editComment = null;
        }
    }

    function deleteVertex(): void {
        // Select the table body element by its ID
        const tableBody = document.getElementById('pdfViewer-coordinate-table');

        // Check if the table body exists
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear all rows
            tableBody.style.display = 'none'; // Hide the table after deletion
            indexValue = 0; // Reset the index value
            selectedAnnotation.vertexPoints = [];
        }
    }
    const deleteVertexButton = document.getElementById('vertexdelete');
    if (deleteVertexButton) {
        deleteVertexButton.addEventListener('click', deleteList);
    }

    function clearTable(): void {
        // Select the table body element by its ID
        const tableBody = document.getElementById('pdfViewer-coordinate-table');

        // Check if the table body exists
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear all rows
            tableBody.style.display = 'none'; // Hide the table after deletion
            indexValue = 0; // Reset the index value
        }
    }
    let indexValue = 0;

    function addBounds(): void {
        selectedAnnotation.bounds.push({X: selectedAnnotation.x, Y: selectedAnnotation.y, Width: selectedAnnotation.width, Height: selectedAnnotation.height});
        generateTable();
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }

    let addvertexButton = document.getElementById('addVertexButton');
    if (addvertexButton) {
        addvertexButton.addEventListener('click', addNewVertex);
    }
    function deleteList() {
        if (selectedAnnotation.annotationType === "Polygon" ||
            selectedAnnotation.annotationType === "Perimeter" ||
            selectedAnnotation.annotationType === "Area" ||
            selectedAnnotation.annotationType === "Volume") {
            if(selectedAnnotation.vertexPoints.length > 1){
                selectedAnnotation.vertexPoints.splice(selectedAnnotation.vertexPoints.length-1, 1);
            }
        }
        else {
            if(selectedAnnotation.bounds.length > 1){
                selectedAnnotation.bounds.splice(selectedAnnotation.bounds.length-1, 1);
            }
        }
       generateTable();
       if(selectedAnnotation.annotationSelected) {
        updateButton.disabled = false;
       }
    }
    function addNewVertex(): void {
        selectedAnnotation.vertexPoints.push({ x: Number(selectedAnnotation.x), y: Number(selectedAnnotation.y) });
        generateTable();
        if (selectedAnnotation.annotationSelected) {
            stateHasChanged = true;
            changeUpdateButton();
        }
    }
    
    function generateTable() {
        const container = document.getElementById("pdfViewer-coordinate-table");
        container.innerHTML = "";
        let tableHTML = "";

        // Check annotation type (Polygon, Perimeter, etc.)
        if (selectedAnnotation.annotationType === "Polygon" ||
            selectedAnnotation.annotationType === "Perimeter" ||
            selectedAnnotation.annotationType === "Area" ||
            selectedAnnotation.annotationType === "Volume") {

            if (selectedAnnotation.vertexPoints.length > 0) {
                tableHTML += '<div>';
                tableHTML += '<table class="inner-table coordinate-table vertex">';

                // Loop through the VertexPoints and create rows with 2 columns
                for (let i = 0; i < selectedAnnotation.vertexPoints.length; i++) {
                    if (i % 2 === 0) {
                        // Start a new row every two points
                        tableHTML += '<tr>';
                    }

                    // Add the X and Y value of the current point in a single cell
                    const point = selectedAnnotation.vertexPoints[i];
                    if (i % 2 === 0) {
                        tableHTML += `<td style="border-right: 1px solid #ddd;">X${i + 1} =${parseInt(point.x.toString(), 10)} &ensp; Y${i + 1} =${parseInt(point.y.toString(), 10)}</td>`;
                    } else {
                        // For the second point in the pair (i + 1), add it to the second column
                        const point2 = selectedAnnotation.vertexPoints[i];
                        tableHTML += `<td>X${i + 1} =${parseInt(point2.x.toString(), 10)} &ensp; Y${i + 1} =${parseInt(point2.y.toString(), 10)}</td>`;
                        tableHTML += '</tr>';
                    }
                }

                tableHTML += '</table>';
                tableHTML += '</div>';
            }
            if(selectedAnnotation.vertexPoints.length === 1) {
                vertexDeleteButton.disabled = true;
            }
            else {
                vertexDeleteButton.disabled = false;
            }
        }
        else {
            tableHTML += '<div>';
            tableHTML += '<table class="inner-table coordinate-table-bounds">';
            selectedAnnotation.bounds.forEach((bound : any, index) => {
                tableHTML += '<tr>';
                tableHTML += `<td style="width:400px">X${index + 1} = ${parseInt(bound.X.toString(), 10)} &ensp; Y${index + 1} = ${parseInt(bound.Y.toString(), 10)} &ensp; W${index + 1} = ${parseInt(bound.Width.toString(), 10)} &ensp; H${index + 1} = ${parseInt(bound.Height.toString(), 10)}</td>`;
                tableHTML += '</tr>';
            });
            tableHTML += '</table>';
            tableHTML += '</div>';
            if(selectedAnnotation.bounds.length === 1) {
                deletebutton.disabled = true;
            } else {
                deletebutton.disabled = false;
            } 
        }
        // Insert the generated table into the DOM
        container.innerHTML = tableHTML;
        container.style.display = "block";
    }
    addbutton.element.onclick = (): void => {
        let currentAnnotationSettings = annotationSettings();
        switch (selectedAnnotation.annotationType) {
            case "Highlight":
            case "Underline":
            case "Strikethrough":
            case "Squiggly":
                viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings);
                break;
            case "Rectangle":
            case "Circle":
            case "StickyNotes":
            case "FreeText":
                viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings);
                break;

            case "Line":
            case "Arrow":
                if (selectedAnnotation.vertexPoints.length === 0) {
                    selectedAnnotation.vertexPoints.push({ x: selectedAnnotation.vertexX0, y: selectedAnnotation.vertexY0 },
                        { x: selectedAnnotation.vertexX1, y: selectedAnnotation.vertexY1 });
                }
                viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings);
                selectedAnnotation.vertexPoints = [];
                break;

            case "Polygon":
            case "Perimeter":
            case "Area":
            case "Volume":
                if (selectedAnnotation.vertexPoints.length === 0) {
                    if (selectedAnnotation.annotationType === "Polygon") {
                        selectedAnnotation.vertexPoints.push({ x: 100, y: 39 }, { x: 142, y: 10 }, { x: 189, y: 38 }, { x: 178, y: 81 }, { x: 111, y: 81 }, { x: 100, y: 39 });
                    }
                    else if (selectedAnnotation.annotationType === "Perimeter") {
                        selectedAnnotation.vertexPoints.push({ x: 100, y: 100 }, { x: 185, y: 100 }, { x: 186, y: 162 });
                    }
                    else if (selectedAnnotation.annotationType === "Area") {
                        selectedAnnotation.vertexPoints.push({ x: 100, y: 100 }, { x: 188, y: 99 }, { x: 189, y: 153 }, { x: 100, y: 100 });
                    }
                    else if (selectedAnnotation.annotationType === "Volume") {
                        selectedAnnotation.vertexPoints.push({ x: 100, y: 100 }, { x: 100, y: 209 }, { x: 220, y: 209 }, { x: 220, y: 99 }, { x: 100, y: 100 });
                    }
                }
                viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings);
                break;
            case "Radius":
                {
                    if (selectedAnnotation.vertexPoints.length === 0) {
                        selectedAnnotation.vertexPoints.push({ x: 200, y: 500 }, { x: 250, y: 550 });
                    }
                    viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings);
                    break;
                }
            case "Distance":
                {
                    //selectedAnnotation.vertexPoints = [];
                    if (selectedAnnotation.vertexPoints.length === 0) {
                        selectedAnnotation.vertexPoints.push({ x: selectedAnnotation.vertexX0, y: selectedAnnotation.vertexY0 },
                            { x: selectedAnnotation.vertexX1, y: selectedAnnotation.vertexY1 });
                    }
                    currentAnnotationSettings.vertexPoints = selectedAnnotation.vertexPoints;
                    viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings);
                    break;
                }
            case "Ink": {
                if (selectedAnnotation.inkAnnotation === "Syncfusion") {
                    selectedAnnotation.path = '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'

                }
                else if (selectedAnnotation.inkAnnotation === "PdfViewer") {
                    selectedAnnotation.path = "M10,50 L10,65 M10,50 L25,50 L25,57.5 L10,57.5 M40, 50 L40, 65 M40, 50 L43, 50 L55, 55 L55, 60 L43, 65 L40, 65 M80, 50 L80, 65 M80, 50 L95, 50 M80, 57.5 L95, 57.5 M110, 50 L125, 65 L140, 50 M160, 50 L160, 65 M155, 50 L165, 50 M155, 65 L165, 65 M182, 50 L192, 65 L202, 50 L212, 65 L222, 50 M230, 50 L230, 65 M230, 50 L240, 50 M230, 57.5 L240, 57.5 M230, 65 L240, 65 M255, 50 L270, 65 L285, 50 M295, 50 L295, 65 M290, 50 L300, 50 M290, 65 L300, 65 M310, 50 L310, 65 M310, 50 L325, 50 M310, 57.5 L325, 57.5 M310, 65 L325, 65 M340, 50 L340, 65 M340, 50 L355, 50 L355, 57.5 L340, 57.5 M340, 57.5 L355, 65";
                }
                else if (selectedAnnotation.inkAnnotation === "Star") {
                    selectedAnnotation.path = '[{\"command\":\"M\",\"x\":72,\"y\":200},{\"command\":\"L\",\"x\":79,\"y\":65},{\"command\":\"L\",\"x\":92,\"y\":200},{\"command\":\"L\",\"x\":65,\"y\":110},{\"command\":\"L\",\"x\":95,\"y\":110},{\"command\":\"L\",\"x\":72,\"y\":200}]';
                }
                currentAnnotationSettings = annotationSettings();
                viewer.annotation.addAnnotation(selectedAnnotation.annotationType, currentAnnotationSettings)

                break;
            }

            case "Stamp":
                {

                    currentAnnotationSettings.customStamps = null;
                    if (stampTypeListObj.value === "Dynamic") {
                        const selectedStampItem = dynamicStampMap[dynamicstampListObj.value as string];
                        viewer.annotation.addAnnotation("Stamp", currentAnnotationSettings, selectedStampItem);
                    } else if (stampTypeListObj.value === "SignHere") {
                        const selectedStampItem = signHereStampMap[signHerestampListObj.value as string];
                        viewer.annotation.addAnnotation("Stamp", currentAnnotationSettings, null, selectedStampItem);
                    } else {
                        const selectedStampItem = standardBusinessStampMap[standardBussinessStampListObj.value as string];
                        viewer.annotation.addAnnotation("Stamp", currentAnnotationSettings, null, null, selectedStampItem);
                    }

                    break;
                }
            case "CustomStamp":
                {
                    viewer.annotation.addAnnotation("Stamp", currentAnnotationSettings);
                    uploadObj.clearAll();
                    break;
                }
        }
        let newAnnotation = viewer.annotationCollection[viewer.annotationCollection.length - 1];
        if (newAnnotation) {
            updateAnnotationComments(newAnnotation);
            viewer.annotation.editAnnotation(newAnnotation);
        }
        resetReplies();
    }
    function updateAnnotationComment(currentAnnotation: any) {
        let isReplyChanged = false;
        currentAnnotation.commentType = 'add';
        if (!isNullOrUndefined(currentAnnotation.note) && (currentAnnotation.note != "") && (currentAnnotation.note != selectedAnnotation.comment)) {
            currentAnnotation.commentType = 'edit';
        }
        if ((!isNullOrUndefined(currentAnnotation.note) && (currentAnnotation.note != selectedAnnotation.comment)) && (currentAnnotation.comments && currentAnnotation.comments.length > 0)) {
            currentAnnotation.commentType = 'edit';
        }
        let shapeType = currentAnnotation.indent ? currentAnnotation.indent : "";
        if (shapeType != "LineDimension" || shapeType != "PolyLineDimension" || shapeType != "PolygonDimension" || shapeType != "PolygonRadius" || shapeType != "PolygonVolume") {
            currentAnnotation.note = selectedAnnotation.comment;
            currentAnnotation.setState = selectedAnnotation.state;
        }
        currentAnnotation.author = selectedAnnotation.author;
        currentAnnotation.replyComment = [];
        if (selectedAnnotation.replyComments.length > 0) {
            for (let i = 0; i < selectedAnnotation.replyComments.length; i++) {
                if (currentAnnotation.comments[i] && (selectedAnnotation.replyComments[i].note != currentAnnotation.comments[i].note)) {
                    isReplyChanged = true;
                    currentAnnotation.commentType = 'edit';
                    currentAnnotation.commentId = currentAnnotation.comments[i].annotName;
                    currentAnnotation.editComment = selectedAnnotation.replyComments[i].note;
                }
                currentAnnotation.replyComment.push(selectedAnnotation.replyComments[i].note);
            }
        }
        if (!isReplyChanged) {
            currentAnnotation.commentId = null;
            currentAnnotation.editComment = null;
        }
        return currentAnnotation;
    }

    function resetAnnotationProperties(): void {
        deleteVertex();
        deleteBounds();
        selectedAnnotation.vertexPoints = [];
        selectedAnnotation.bounds = [];
        const shapeAnnotation = selectedAnnotation.annotationType;
        if (!selectedAnnotation.annotationSelected) {
            if (shapeAnnotation === "Arrow" || shapeAnnotation === "Distance") {
                selectedAnnotation.lineHeadStart = "Arrow";
                selectedAnnotation.lineHeadEnd = "Arrow";
                if (shapeAnnotation === "Distance") {
                    selectedAnnotation.leaderLength = 0;
                }
            } else if (shapeAnnotation === "Perimeter") {
                selectedAnnotation.lineHeadEnd = "OpenArrow";
                selectedAnnotation.lineHeadStart = "OpenArrow";
            } else {
                selectedAnnotation.lineHeadEnd = "None";
                selectedAnnotation.lineHeadStart = "None";
            }

            if (shapeAnnotation === "Rectangle" || shapeAnnotation === "Circle" || shapeAnnotation === "Radius") {
                selectedAnnotation.width = 100;
                selectedAnnotation.height = 100;
            } else if (shapeAnnotation === "Ink") {
                selectedAnnotation.width = 150;
                selectedAnnotation.height = 60;
                selectedAnnotation.fillColor = "ffffff00";
            } else if (shapeAnnotation === "FreeText") {
                selectedAnnotation.width = 150;
                selectedAnnotation.height = 26.5;
                selectedAnnotation.defaultText = "Free Text"
                selectedAnnotation.fontFamily = "Helvetica";
                selectedAnnotation.fontStyle = "None";
                selectedAnnotation.alignment = "Left";
                selectedAnnotation.fontSize = 16;
                selectedAnnotation.fontColor = "#000000";
            } else if (shapeAnnotation === "StickyNotes") {
                selectedAnnotation.width = 30;
                selectedAnnotation.height = 30;
            } else if (shapeAnnotation === "Stamp") {
                if (selectedAnnotation.stampsType === "Dynamic") {
                    findStampComments("Dynamic");
                    selectedAnnotation.width = 140;
                    selectedAnnotation.height = 55;
                }
                else if (selectedAnnotation.stampsType === "SignHere" || selectedAnnotation.stampsType === "Sign Here") {
                    findStampComments("Sign Here");
                    for (const stamp of selectedAnnotation.signHereStampList) {
                        if (selectedAnnotation.signHereStamp === stamp) {
                            switch (stamp) {
                                case "SignHere":
                                    selectedAnnotation.width = 110;
                                    selectedAnnotation.height = 30;
                                    break;
                                case "Witness":
                                    selectedAnnotation.width = 130;
                                    selectedAnnotation.height = 30;
                                    break;
                                case "InitialHere":
                                    selectedAnnotation.width = 90;
                                    selectedAnnotation.height = 30;
                                    break;
                                case "Accepted":
                                case "Rejected":
                                    selectedAnnotation.width = 35;
                                    selectedAnnotation.height = 35;
                                    break;
                                default:
                                    selectedAnnotation.height = 30;
                                    break;
                            }
                        }
                    }
                }

                else if (selectedAnnotation.stampsType === "Standard Business" || selectedAnnotation.stampsType === "StandardBusiness") {
                    findStampComments('Standard Business');
                    switch (selectedAnnotation.standardBusinessStamp) {
                        case "Final":
                        case "Draft":
                            selectedAnnotation.width = 110;
                            break;
                        case "Void":
                            selectedAnnotation.width = 100;
                            break;
                        default:
                            selectedAnnotation.width = 130;
                            break;
                    }
                    selectedAnnotation.height = 30;
                }
            } else if (shapeAnnotation === "CustomStamp") {
                selectedAnnotation.width = 100;
                selectedAnnotation.height = 100;
            } else if (shapeAnnotation === "Highlight" || shapeAnnotation === "Underline" || shapeAnnotation === "Strikethrough" || shapeAnnotation === "Squiggly") {
                selectedAnnotation.width = 100;
                selectedAnnotation.height = 14;
            } else {
                selectedAnnotation.width = 0;
                selectedAnnotation.height = 0;
            }
            selectedAnnotation.x = 100;
            selectedAnnotation.y = 100;
            selectedAnnotation.author = "Guest";
            selectedAnnotation.comment = "";
            commentObj.placeholder = "New Comment";
            selectedAnnotation.state = "None";
            selectedAnnotation.isPrint = true;
            selectedAnnotation.isLocked = false;
            selectedAnnotation.isReply = false;
            (document.getElementById('repliesContainer') as HTMLDivElement).style.display = "none";
            (document.getElementById('ischeckedReplybox') as HTMLDivElement).style.display = "none";
            (document.getElementById('allowinstractionsIstrue') as HTMLDivElement).style.display = "none";
            (document.getElementById('repliesList') as HTMLDivElement).style.display = "none";
            selectedAnnotation.allowedInteractions = ["None"];
        }
        pageNumberObj.value = selectedAnnotation.pageNumber;
        pageNumberObj.dataBind();
        if (shapeAnnotation === "Highlight" || shapeAnnotation === "Underline" ||
            shapeAnnotation === "Strikethrough" || shapeAnnotation === "Squiggly" || shapeAnnotation === "FreeText" || shapeAnnotation === "Polygon" || shapeAnnotation === "Area" || shapeAnnotation === "Perimeter" || shapeAnnotation === "Volume") {
            selectedAnnotation.x = 10;
            selectedAnnotation.y = 10;
            selectedAnnotation.strokeColor = "#FF0000";
            selectedAnnotation.fillColor = "#00000000";
            selectedAnnotation.opacity = 100;
            selectedAnnotation.thickness = 1;
            selectedAnnotation.author = "Guest";
            selectedAnnotation.state = "";
            selectedAnnotation.comment = "";
            selectedAnnotation.replyState = "None";
            selectedAnnotation.vertexPointCount = 0;
            selectedAnnotation.replyComment = "";
            replyCommentObj.value = "";
            replyCommentObj.placeholder = "Reply Comment";
            selectedAnnotation.replyComments = [];
            selectedAnnotation.replyAuthor = "Guest";
            selectedAnnotation.vertexPointCount = 0;
            selectedAnnotation.isReply = false;
        }
        XpositionObj.value = selectedAnnotation.x;
        XpositionObj.dataBind();
        YpositionObj.value = selectedAnnotation.y;
        YpositionObj.dataBind();
        widthObj.value = selectedAnnotation.width;
        widthObj.dataBind();
        heightObj.value = selectedAnnotation.height;
        heightObj.dataBind();
        //for binding fillColor property value 
        if (selectedAnnotation.annotationType === "Highlight") {
            selectedAnnotation.fillColor = "#ffff00";
        } else if (selectedAnnotation.annotationType === "Underline") {
            selectedAnnotation.fillColor = "#00ff00";
        } else if (selectedAnnotation.annotationType === "Strikethrough") {
            selectedAnnotation.fillColor = "#ff0000";
        } else if (selectedAnnotation.annotationType === "Squiggly") {
            selectedAnnotation.fillColor = "#ff0000";
        }
        FillcolorpickerObj.value = selectedAnnotation.fillColor;
        FillcolorpickerObj.dataBind();
        if (selectedAnnotation.annotationType === "FreeText") {
            selectedAnnotation.strokeColor = "#00000000";
        }
        else if(selectedAnnotation.annotationType === "Ink"){
            selectedAnnotation.strokeColor = "#ff0000";
        }
        strokeColorObj.value = selectedAnnotation.strokeColor;
        strokeColorObj.dataBind();
        if (shapeAnnotation === "Highlight" || shapeAnnotation === "Underline" || shapeAnnotation === "Strikethrough" || shapeAnnotation === "Squiggly" || shapeAnnotation === "FreeText" || shapeAnnotation === "Polygon" || shapeAnnotation === "Perimeter" || shapeAnnotation === "Volume" || shapeAnnotation === "Area") {
            selectedAnnotation.x = 10;
            selectedAnnotation.y = 10;
            selectedAnnotation.fillColor = "";
            selectedAnnotation.strokeColor = "";
        }
        shapeOpacityObj.value = selectedAnnotation.opacity;
        shapeOpacityObj.dataBind();
        selectedAnnotation.thickness = 1;
        strokeThickenssObj.value = selectedAnnotation.thickness;
        strokeThickenssObj.dataBind();
        authorNameObj.value = selectedAnnotation.author;
        authorNameObj.dataBind();
        if (selectedAnnotation.annotationType != "Arrow" && selectedAnnotation.annotationType != "Distance" && selectedAnnotation.annotationType != "Perimeter") {
            selectedAnnotation.lineHeadEnd = "None";
            selectedAnnotation.lineHeadStart = "None";
        }
        lineHeadStartListObj.value = selectedAnnotation.lineHeadStart;
        lineHeadStartListObj.dataBind();
        lineHeadEndListObj.value = selectedAnnotation.lineHeadEnd;
        lineHeadEndListObj.dataBind();
        leaderLengthObj.value = selectedAnnotation.leaderLength;
        leaderLengthObj.dataBind();
        commentObj.value = selectedAnnotation.comment;
        commentObj.dataBind();
        replyAuthorNameObj.value = selectedAnnotation.replyAuthor;
        replyAuthorNameObj.dataBind();
        replyStatusObj.value = selectedAnnotation.replyState;
        replyStatusObj.dataBind();
        replyCommentObj.value = selectedAnnotation.replyComment;
        replyCommentObj.dataBind();
        selectedAnnotation.vertexX0 = 100;
        X1positionObj.value = selectedAnnotation.vertexX0;
        X1positionObj.dataBind();
        selectedAnnotation.vertexY0 = 100;
        Y1positionObj.value = selectedAnnotation.vertexY0;
        Y1positionObj.dataBind();
        selectedAnnotation.vertexX1 = 200;
        X2positionObj.value = selectedAnnotation.vertexX1;
        X2positionObj.dataBind();
        selectedAnnotation.vertexY1 = 100;
        Y2positionObj.value = selectedAnnotation.vertexY1;
        Y2positionObj.dataBind();
        defaultTextObj.value = selectedAnnotation.defaultText;
        defaultTextObj.dataBind();
        fontFamilyListObj.value = selectedAnnotation.fontFamily;
        fontFamilyListObj.dataBind();
        textAlignmentListObj.value = selectedAnnotation.alignment;
        textAlignmentListObj.dataBind();
        fontStyleListObj.value = selectedAnnotation.fontStyle;
        fontStyleListObj.dataBind();
        fontSizeObj.value = selectedAnnotation.fontSize;
        fontSizeObj.dataBind();
        fontColorpickerObj.value = selectedAnnotation.fontColor;
        fontColorpickerObj.dataBind();
        statusListObj.value = selectedAnnotation.state;
        statusListObj.dataBind();
        LockAnnotationCheckBoxObj.checked = selectedAnnotation.isLocked;
        LockAnnotationCheckBoxObj.dataBind();
        allowInteractionsListObj.value = selectedAnnotation.allowedInteractions;
        allowInteractionsListObj.dataBind();
        PrintAnnotationCheckBoxObj.checked = selectedAnnotation.isPrint;
        PrintAnnotationCheckBoxObj.dataBind();
        replyCheckBoxObj.checked = selectedAnnotation.isReply;
        replyCheckBoxObj.dataBind();
    }

    function updateReply() {
        const currentReplyComment: Comment = new Comment();
        currentReplyComment.id = generateRandomId();
        currentReplyComment.author = selectedAnnotation.replyAuthor;
        currentReplyComment.note = selectedAnnotation.replyComment;
        currentReplyComment.modifiedDate = formatCurrentDate(new Date());
        currentReplyComment.state = selectedAnnotation.replyState;

        selectedAnnotation.replyComments.push(currentReplyComment);
        displayReplies();


        // Reset the reply fields
        selectedAnnotation.replyAuthor = 'Guest';
        replyAuthorNameObj.value = selectedAnnotation.replyAuthor;
        replyCommentObj.value = "";
        replyCommentObj.placeholder = "Reply Comment";
        selectedAnnotation.replyState = 'None';
        replyStatusObj.value = selectedAnnotation.replyState;
    }

    function formatCurrentDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Use 12-hour format
        };
        return date.toLocaleString('en-US', options).replace(',', '');
    }

    function generateRandomId(): string {
        return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
    }


    let currentEditCommentId: string;

    function displayReplies(): void {
        const repliesContainer = document.getElementById('repliesContainer') as HTMLDivElement;
        repliesContainer.style.display = "block";
        document.getElementById('repliesList').style.display = "block";
        document.getElementById('repliesList').innerHTML = "Replies";
        if (repliesContainer) {
            // Clear the container before re-rendering
            repliesContainer.innerHTML = '';

            // Iterate over each comment in the selectedAnnotation.replyComments array
            selectedAnnotation.replyComments.forEach(comment => {
                // Create a container for each reply
                const replyContainer = document.createElement('div');
                replyContainer.className = 'reply-container';
                replyContainer.id = comment.id;

                // Populate the replyContainer with the comment's content
                replyContainer.innerHTML = `
                    <div class="reply-icon e-pv-comment-icon e-pv-icon"></div>
                    <div class="reply-main-container">
                        <div class="reply-text">${comment.author} - ${comment.modifiedDate}</div>
                        <div class="reply-text">${comment.note} &nbsp; ${comment.state !== 'None' ? comment.state : ''}</div>
                    </div>
                    <div class="more-container">
                        <button class="e-control e-btn e-lib e-flat e-icon-btn context-menu-btn" 
                                data-id="${comment.id}" 
                                id="contextmenutarget-${comment.id}" 
                                style="padding: 5px 4px;">
                            <span class="e-icons e-more-vertical-1 e-btn-icon"></span>
                        </button>
                        <ul id="contextmenu-${comment.id}" style="display: none;"></ul>
                    </div>
                `;

                // Append the replyContainer to the repliesContainer
                repliesContainer.appendChild(replyContainer);

                // Set up the event listener for the button click
                const contextMenuButton = replyContainer.querySelector(`#contextmenutarget-${comment.id}`) as HTMLButtonElement;
                if (contextMenuButton) {
                    contextMenuButton.onmousedown = function () {
                        getCommentID(comment.id);
                    };

                    // Bind openContextMenu function to the onclick event
                    contextMenuButton.onclick = function (event) {
                        openContextMenu(event);
                    };
                }
            });
        }
    }
    function openContextMenu(event: any) {
        // Assuming contextMenu is an element in your DOM
        menuObj.open(event.clientY, event.clientX);
    }
    // Function to set the current editing comment ID
    function getCommentID(commentId: string): void {
        currentEditCommentId = commentId;
    }

    // Initialize context menu for a specific comment
    function initializeContextMenu(commentId: string): void {
        const menuOptions: ContextMenuModel = {
            target: `#contextmenutarget-${commentId}`,
            items: selectedAnnotation.replyMenuItems,
            showItemOnClick: true,
            select: (args: MenuEventArgs) => {
                if (args.item && args.item.text) {
                    switch (args.item.text) {
                        case 'Edit':
                            onEditButtonClick(currentEditCommentId);
                            break;
                        case 'Delete':
                            onReplyCommentDelete(currentEditCommentId);
                            break;
                    }
                } else {
                    console.error("Context menu item is undefined or has no text property");
                }
            },
        };

        const contextMenuElement = document.getElementById(`contextmenu-${commentId}`) as HTMLUListElement;
        if (contextMenuElement) {
            new ContextMenu(menuOptions, contextMenuElement);
        } else {
            console.error(`Context menu element #contextmenu-${commentId} not found.`);
        }
    }

    function onEditButtonClick(commentId: string): void {
        // Get the comment to edit
        selectedAnnotation.editReply = true;
        const comment = selectedAnnotation.replyComments.find(comment => comment.id === commentId);
        if (comment) {
            // Set the fields for editing
            selectedAnnotation.replyAuthor = comment.author;
            replyAuthorNameObj.value = comment.author;
            selectedAnnotation.replyComment = comment.note;
            replyCommentObj.value = comment.note;
            selectedAnnotation.replyState = comment.state;
            replyStatusObj.value = comment.state;
            currentEditCommentId = commentId;
            document.getElementById("updateReplyButton").style.display = "block";
            document.getElementById("addreplyButton").style.display = "none";
        }
    }

    function onReplyCommentDelete(commentId: string): void {
        stateHasChanged = true;
        changeUpdateButton();
        // Remove the comment from the array
        const commentIndex = selectedAnnotation.replyComments.findIndex(comment => comment.id === commentId);
        if (commentIndex !== -1) {
            selectedAnnotation.replyComments.splice(commentIndex, 1);
        }
        if (selectedAnnotation.replyComments.length === 0) {
            selectedAnnotation.isReply = false;
        }
        // Remove the comment container from the DOM
        const replyContainer = document.getElementById(commentId);
        if (replyContainer) {
            replyContainer.remove();
        }
        // Update the displayed replies
        displayReplies();
    }
    //Method to reset reply comments on adding an annotation
    function resetReplies() {
        selectedAnnotation.isReply = false;
        replyCheckBoxObj.checked = selectedAnnotation.isReply;
        selectedAnnotation.replyComments = [];
        (document.getElementById('ischeckedReplybox') as HTMLDivElement).style.display = "none";
        (document.getElementById('repliesList') as HTMLDivElement).style.display = "none";
        (document.getElementById('repliesContainer') as HTMLDivElement).style.display = "none";
    }
};