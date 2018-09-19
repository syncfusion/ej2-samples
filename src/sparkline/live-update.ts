/**
 * sparkline sample for live update
 */
import { Sparkline, ISparklineLoadEventArgs, SparklineTheme } from '@syncfusion/ej2-charts/index';
import { EmitType } from '@syncfusion/ej2-base';
export let sparkload: EmitType<ISparklineLoadEventArgs> = (args: ISparklineLoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.sparkline.theme = <SparklineTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
};
// tslint:disable-next-line:max-func-body-length
this.default = (): void => {
    let spark: Sparkline = new Sparkline({
        height: '130px',
        width: '90%', load: sparkload,
        axisSettings: {
            minY: 0, maxY: 150
        },
        containerArea: {
            background: 'white',
            border: {
                color: '#dcdfe0',
                width: 2
            }
        },
        border: {
            color: '#0358a0',
            width: 1
        },
        fill: '#e8f2fc',
        type: 'Area',
        valueType: 'Numeric',
        dataSource: [
            { x: 0, yval: 50 },
            { x: 1, yval: 30 },
            { x: 2, yval: 20 },
            { x: 3, yval: 30 },
            { x: 4, yval: 50 },
            { x: 5, yval: 40 },
            { x: 6, yval: 20 },
            { x: 7, yval: 10 },
            { x: 8, yval: 30 },
            { x: 9, yval: 10 },
            { x: 10, yval: 40 },
            { x: 11, yval: 50 },
            { x: 12, yval: 10 },
            { x: 13, yval: 30 },
            { x: 14, yval: 50 },
            { x: 15, yval: 20 },
            { x: 16, yval: 10 },
            { x: 17, yval: 40 },
            { x: 18, yval: 30 },
            { x: 19, yval: 40 }
        ],
        xName: 'x', yName: 'yval'
    });
    spark.appendTo('#spark-container1');
    let temp1: number = spark.dataSource.length - 1;
    function update(): void {
        if (spark.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 50;
            spark.dataSource.push({ x: ++temp1, yval: value });
            spark.dataSource.shift();
            spark.refresh();
            let cpu: Element = document.getElementById('cpu');
            cpu.innerHTML = ((value / 150) * 100).toFixed(0) + '% ' + ((value * 3) / 100).toFixed(2) + 'GHz';
        }
    }
    let time: number = setInterval(update, 500);
    let spark1: Sparkline = new Sparkline({
        height: '130px',
        width: '90%', load: sparkload,
        lineWidth: 1,
        axisSettings: {
            minY: 4, maxY: 8
        },
        containerArea: {
            background: 'white',
            border: {
                color: '#dcdfe0',
                width: 2
            }
        },
        border: {
            color: '#b247c6',
            width: 1
        },
        type: 'Area',
        fill: '	#f5e8fc',
        valueType: 'Numeric',
        dataSource: [
            { x: 0, yval: 6.05 },
            { x: 1, yval: 6.03 },
            { x: 2, yval: 6.02 },
            { x: 3, yval: 6.07 },
            { x: 4, yval: 6.05 },
            { x: 5, yval: 6.09 },
            { x: 6, yval: 6.08 },
            { x: 7, yval: 6.01 },
            { x: 8, yval: 6.03 },
            { x: 9, yval: 6.01 },
            { x: 10, yval: 6.07 },
            { x: 11, yval: 6.05 },
            { x: 12, yval: 6.01 },
            { x: 13, yval: 6.06 },
            { x: 14, yval: 6.05 },
            { x: 15, yval: 6.03 },
            { x: 16, yval: 6.01 },
            { x: 17, yval: 6.09 },
            { x: 18, yval: 6.06 },
            { x: 19, yval: 6.05 }
        ],
        xName: 'x', yName: 'yval'
    });
    spark1.appendTo('#spark-container2');
    let temp2: number = spark1.dataSource.length - 1;
    function update1(): void {
        if (spark1.element.className.indexOf('e-sparkline') > -1) {
            let value: number = Math.random();
            if (value > 0.6) {
                value = 6 + (value / 10);
            } else {
                value = 6 - (value / 10);
            }
            spark1.dataSource.push({ x: ++temp2, yval: value });
            spark1.dataSource.shift();
            spark1.refresh();
            let memory: Element = document.getElementById('memory');
            let gb: string = parseFloat(value.toString().replace('0', '')).toFixed(1);
            memory.innerHTML = gb + '/15.8 GB (' + ((value / 15.8) * 100).toFixed(0) + '%)';
        }
    }
    let time1: number = setInterval(update1, 500);
    let spark2: Sparkline = new Sparkline({
        height: '130px',
        width: '90%', load: sparkload,
        lineWidth: 1,
        axisSettings: {
            minY: 0, maxY: 130
        },
        containerArea: {
            background: 'white',
            border: {
                color: '#dcdfe0',
                width: 2
            }
        },
        border: {
            color: '#27ad66',
            width: 1
        },
        type: 'Area',
        fill: '#e0f9d1',
        valueType: 'Numeric',
        dataSource: [
            { x: 0, yval: 50 },
            { x: 1, yval: 30 },
            { x: 2, yval: 20 },
            { x: 3, yval: 70 },
            { x: 4, yval: 50 },
            { x: 5, yval: 20 },
            { x: 6, yval: 80 },
            { x: 7, yval: 10 },
            { x: 8, yval: 30 },
            { x: 9, yval: 10 },
            { x: 10, yval: 70 },
            { x: 11, yval: 50 },
            { x: 12, yval: 10 },
            { x: 13, yval: 60 },
            { x: 14, yval: 50 },
            { x: 15, yval: 30 },
            { x: 16, yval: 10 },
            { x: 17, yval: 20 },
            { x: 18, yval: 60 },
            { x: 19, yval: 50 }
        ],
        xName: 'x', yName: 'yval'
    });
    spark2.appendTo('#spark-container3');
    let temp3: number = spark2.dataSource.length - 1;
    function update2(): void {
        if (spark2.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 80;
            spark2.dataSource.push({ x: ++temp3, yval: value });
            spark2.dataSource.shift();
            spark2.refresh();
            let disk: Element = document.getElementById('disk');
            disk.innerHTML = value.toFixed(0) + '%';
        }
    }
    let time2: number = setInterval(update2, 500);
    let spark3: Sparkline = new Sparkline({
        height: '130px',
        width: '90%', load: sparkload,
        lineWidth: 1,
        axisSettings: {
            minY: 0, maxY: 120
        },
        containerArea: {
            background: 'white',
            border: {
                color: '#dcdfe0',
                width: 2
            }
        },
        border: {
            color: '#AA907A',
            width: 1
        },
        type: 'Area',
        fill: '#F2D8C7',
        valueType: 'Numeric',
        dataSource: [
            { x: 0, yval: 50 },
            { x: 1, yval: 30 },
            { x: 2, yval: 20 },
            { x: 3, yval: 70 },
            { x: 4, yval: 50 },
            { x: 5, yval: 20 },
            { x: 6, yval: 80 },
            { x: 7, yval: 10 },
            { x: 8, yval: 30 },
            { x: 9, yval: 10 },
            { x: 10, yval: 70 },
            { x: 11, yval: 50 },
            { x: 12, yval: 10 },
            { x: 13, yval: 60 },
            { x: 14, yval: 50 },
            { x: 15, yval: 30 },
            { x: 16, yval: 10 },
            { x: 17, yval: 20 },
            { x: 18, yval: 60 },
            { x: 19, yval: 50 }
        ],
        xName: 'x', yName: 'yval'
    });
    spark3.appendTo('#spark-container4');
    let temp4: number = spark3.dataSource.length - 1;
    function update4(): void {
        if (spark3.element.className.indexOf('e-sparkline') > -1) {
            let value: number = ((Math.random() * 100) + 5) % 80;
            spark3.dataSource.push({ x: ++temp3, yval: value });
            spark3.dataSource.shift();
            spark3.refresh();
            let net: Element = document.getElementById('net');
            net.innerHTML = 'R: ' + value.toFixed(0) + 'Kbps';
        }
    }
    let time4: number = setInterval(update4, 500);
};