import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor inline toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor} from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor);

(window as any).default = (): void => {
    loadCultureFiles();
let defaultRTE: RichTextEditor = new RichTextEditor({
    //inlineMode: true,
    /* tslint:disable */
    value: `<div style="padding-left:25px" ><p>We’re all tired of hearing about the “rapid pace of technological change.” But it really is the one constant in today’s business world.
    And while it’s startups that are most commonly associated with innovation and technical ingenuity, it is, in fact,impacting businesses of every size.From the SME seeking growth and managing change in stormy economic waters to the enterprise that dismisses concepts like “digital transformation” as needlessly highfalutin, taking advantage of a growing ecosystem of tools isn’t technical hipsterism, it’s absolutely vital.</p>
    <div>
    <img style="width:400px; height:200px; margin-left:auto; margin-right:auto;padding-bottom:10px;
    display:block"; alt=" Logo " src="./src/rich-text-editor/images/rte2.png " /></div>
    <p style><b> Let’s look at the reasons businesses are going to fall behind in 2017 – and how Mapt can help.</b></p><ol type="1"><li><p>They’re not going to focus on the needs of their customers.</p></li><li><p>They’re not going to move quickly enough when building and iterating their mobile apps.</p></li><li><p>They’re going to underestimate the competition when it comes to the games industry.</p></li><li><p>They’re going to be focusing on data for data’s sake. They’ll forget that insight is everything</p></li>
    <li><p>They’re going to ignore agile ways of working. And they’re going to think their software and systems are <b>secure enough</b>.
    </p></li><li><p>They’re going to dismiss IOT as a fad. They’re going to fear innovation and invention.</p></li></ol>`
    /* tslint:enable */
});
defaultRTE.appendTo('#defaultRTE');

};
