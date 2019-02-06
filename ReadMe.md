# TypeScript Sample Browser

Repository for typescript sample browser.

## Adding New Sample

Create your new folder in 'src' location and name the folder as control name for example “button” it is control name.

Add your sample order in the `src/common/sampleOrder.json` with corresponding category.

Note: Do not use whitespace at any cause in folder’s name. Use “-” instead of space.

[Refer here](https://bitbucket.org/syncfusion/ej2-sample-browser/src/7740ab838973c7ebb3e970acb5246ff4c89ccd67/src/?at=master)

### Configure the folder and sample

Create the “sample.json” file inside of your control folder.  Create your sample html and ts file in same folder also name the html and ts files with same name.

Note: Do not use whitespace at any cause in file’s name. Use “-” instead of space.

[Refer here](https://bitbucket.org/syncfusion/ej2-sample-browser/src/7740ab838973c7ebb3e970acb5246ff4c89ccd67/src/button/?at=master)

### Configure Sample JSON

Configure your sample json file as like below code snippet.

```
{ 
   "name": "Button", 
   "directory": "button", 
   "category":"Editors", 
   "samples" : [
    {"url":"default", "name": "Default Functionalities", "category":"Button"},
    {"url":"api", "name": "API", "category":"Button"},
    {"url":"repeatbutton", "name": "Repeat Button", "category":"Button", hideOnDevice:true },
    {"url":"events", "name": "Events", "category":"Button"},
    {"url":"rtl", "name": "RTL", "category":"Button"}
   ]
}

```
*Note: To exculde a sample in the device you need to set **hideOnDevice** as true for the sample json file.*

**Fields Description:**

_name :_ Its can be any string that you want show as a control name.

_directory :_ Specifies that your sample directory name.

_category :_ Specify that your sample comes under which category.

_samples :_ Specify array of samples are in your control.

_samples.url :_ specifies the file name without extension.

_samples.name :_ Its can be any string that you want show as a sample name.

_samples.category :_ Specify that your sample comes under which category.

## Configure your dependency

Add your dependency in “package.json” file inside the dependencies.

Note: Here, `'*'` Specifies that install the latest published package form the online. `'*'` is recommended for Syncfusion packages.

```
    "dependencies": {
        "@syncfusion/ej2-base": "*",
        "@syncfusion/ej2-buttons": "*",
        "@syncfusion/ej2-lists": "*",
        "@syncfusion/ej2-grids": "*",
        "bootstrap": "^3.3.6",
        "crossroads": "^0.12.2",
        "hasher": "^1.2.0"
    },
    
```

## Run the sample browser

We can run the sample browser with two commands

1. **gulp _serve_** – run the sample browser alone.
2. **gulp _watch_** – run the sample browser and monitor typescript as well. This will help at development time. If any changes detect means it will automatically compile and browser will reloaded.

```
D:\dev\typescript\source\ej2-sample-browser>gulp serve
```


**Access URLs:**

Local URL is works only in your machine.

```
http://localhost:3000
```

External URL is works in all locally connected LAN. (You can use to see sample browser in mobile).

```
http://your-ip-address:3000
```

Note: Here, The mentioned IP is your local machine IP Address.

# Plunker Guidelines

1.	In import statements in html file for a sample the package subdirectory shouldn’t be mentioned. Please refer the link given below.

    https://gitlab.syncfusion.com/essential-studio/ej2-samples/blob/development/src/grid/events.ts#L3 

2.	In Base component dom and util are not available in the customer end. So, please don’t use the same. Please refer the link below.

    https://gitlab.syncfusion.com/essential-studio/ej2-samples/blob/development/src/grid/events.ts#L3 

3.	To add any icon in the samples use base64 font and don’t use any font files like ttf, woff, or svg externally. Please refer the link given below.

    https://gitlab.syncfusion.com/essential-studio/ej2-samples/blob/development/src/toolbar/default.html#L5 

    For example:
    ```
    <style>
        @font-face {
    font-family: 'temp1';
    src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj0gSIMAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmazsA9wAAAcgAAAAcaGVhZA3qwqgAAADQAAAANmhoZWEHmQNrAAAArAAAACRobXR4B+gAAAAAAYAAAAAIbG9jYQAOAAAAAAHAAAAABm1heHABDQAPAAABCAAAACBuYW1lv7gVOQAAAeQAAAINcG9zdD4ZCQ8AAAP0AAAANgABAAADUv9qAFoEAAAA//4D6gABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAAThBvMl8PPPUACwPoAAAAANVxP0wAAAAA1XE/TAAAAAAD6gMrAAAACAACAAAAAAAAAAEAAAACAAMAAQAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQP0AZAABQAAAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAANS/2oAWgNSAJYAAAABAAAAAAAABAAAAAPoAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAADgAAAAEAAAAAA+oDKwACAAA3IQECA+j+DMICaQAAAAAAABIA3gABAAAAAAAAAAEAAAABAAAAAAABAAUAAQABAAAAAAACAAcABgABAAAAAAADAAUADQABAAAAAAAEAAUAEgABAAAAAAAFAAsAFwABAAAAAAAGAAUAIgABAAAAAAAKACwAJwABAAAAAAALABIAUwADAAEECQAAAAIAZQADAAEECQABAAoAZwADAAEECQACAA4AcQADAAEECQADAAoAfwADAAEECQAEAAoAiQADAAEECQAFABYAkwADAAEECQAGAAoAqQADAAEECQAKAFgAswADAAEECQALACQBCyB0ZW1wMVJlZ3VsYXJ0ZW1wMXRlbXAxVmVyc2lvbiAxLjB0ZW1wMUZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAdABlAG0AcAAxAFIAZQBnAHUAbABhAHIAdABlAG0AcAAxAHQAZQBtAHAAMQBWAGUAcgBzAGkAbwBuACAAMQAuADAAdABlAG0AcAAxAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAHUAcwBpAG4AZwAgAFMAeQBuAGMAZgB1AHMAaQBvAG4AIABNAGUAdAByAG8AIABTAHQAdQBkAGkAbwB3AHcAdwAuAHMAeQBuAGMAZgB1AHMAaQBvAG4ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIBAgEDAAxhcnJvd2hlYWQtMDEAAAAA) format('truetype');
    font-weight: normal;
    font-style: normal;
    }
    #font::after {
        content: "\e700";
        font-size: large
    }
    .icon {
        font-family: temp1;
    }
    </style>
    <div id="font" class="icon"></div>
    ```
    
4. For loading json files in the sample use import statements instead of require. Please refer the link given below.

    https://gitlab.syncfusion.com/essential-studio/ej2-samples/blob/development/src/calendar/internationalization.ts#L9
    
    ( For example: import * as testJson from '../common/cldr-data/supplemental/numberingSystems.json'; )

5. If a New Component is added to TypeScript Sample Browser it’s package dependency should be added to the config in src/sys.js file.

    ( For example: https://gitlab.syncfusion.com/essential-studio/ej2-samples/blob/development/src/sys.js#L19 )