import { loadCultureFiles } from '../common/culture-loader';
import { Skeleton } from '@syncfusion/ej2-notifications';

(window as any).default = (): void => {
    loadCultureFiles();
    let skeletonCircleSmall: Skeleton = new Skeleton({
        shape: 'Circle',
        width: "3rem"
    });
    skeletonCircleSmall.appendTo("#skeletonCircleSmall");
    
    let skeletonCircleMedium: Skeleton = new Skeleton({
        shape: 'Circle',
        width: "48px"
    });
    skeletonCircleMedium.appendTo("#skeletonCircleMedium");
    
    let skeletonCircleLarge: Skeleton = new Skeleton({
        shape: 'Circle',
        width: "64px"
    });
    skeletonCircleLarge.appendTo("#skeletonCircleLarge");
    
    let skeletonCircleLarger: Skeleton = new Skeleton({
        shape: 'Circle',
        width: "80px"
    });
    skeletonCircleLarger.appendTo("#skeletonCircleLarger");
    
    let skeletonSquareSmall: Skeleton = new Skeleton({
        shape: 'Square',
        width: "3rem"
    });
    skeletonSquareSmall.appendTo("#skeletonSquareSmall");
    
    let skeletonSquareMedium: Skeleton = new Skeleton({
        shape: 'Square',
        width: "48px"
    });
    skeletonSquareMedium.appendTo("#skeletonSquareMedium");
    
    let skeletonSquareLarge: Skeleton = new Skeleton({
        shape: 'Square',
        width: "64px"
    });
    skeletonSquareLarge.appendTo("#skeletonSquareLarge");
    
    let skeletonSquareLarger: Skeleton = new Skeleton({
        shape: 'Square',
        width: "80px"
    });
    skeletonSquareLarger.appendTo("#skeletonSquareLarger");
    
    let skeletonText: Skeleton = new Skeleton({
        width: "100%",
        height: "15px"
    });
    skeletonText.appendTo("#skeletonText");
    
    let skeletonTextMedium: Skeleton = new Skeleton({
        width: "30%",
        height: "15px"
    });
    skeletonTextMedium.appendTo("#skeletonTextMedium");
    
    let skeletonTextSmall: Skeleton = new Skeleton({
        width: "15%",
        height: "15px"
    });
    skeletonTextSmall.appendTo("#skeletonTextSmall");
    
    let skeletonTextMedium1: Skeleton = new Skeleton({
        width: "60%",
        height: "15px"
    });
    skeletonTextMedium1.appendTo("#skeletonTextMedium1");
    
    let skeletonTextSmall1: Skeleton = new Skeleton({
        width: "15%",
        height: "15px"
    });
    skeletonTextSmall1.appendTo("#skeletonTextSmall1");
    
    let skeletonRectangle: Skeleton = new Skeleton({
        shape: 'Rectangle',
        width: '100%',
        height: '100px'
    });
    skeletonRectangle.appendTo("#skeletonRectangle");
    
    let skeletonRectangleMedium: Skeleton = new Skeleton({
        shape: 'Rectangle',
        width: '20%',
        height: '35px'
    });
    skeletonRectangleMedium.appendTo("#skeletonRectangleMedium");
    
    let skeletonRectangleMediumRight: Skeleton = new Skeleton({
        shape: 'Rectangle',
        width: '20%',
        height: '35px'
    });
    skeletonRectangleMediumRight.appendTo("#skeletonRectangleMediumRight");
};