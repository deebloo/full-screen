# full-screen
Vanilla Web Component for the HTML5 full screen API. [Demo](http://deebloo.github.io/full-screen/)

##### Instalation
```
npm i --save full-screen

bower install --save full-screen
```

#### Properties

| Name           | Description |
| -------------- | ------------- |
| target         | The target item that should be full screened. if none is provided it will full screen the whole page |

#### Example
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="full-screen.js"></script>
</head>
<body>
    <video id="my-video" src="my-video.mp4"></video>
    
    <full-screen target="#my-video">
        <button>Full Screen Video</button>
    </full-screen>
    
    <full-screen>
        <button>Full Screen Whole Page</button>
    </full-screen>
</body>
</html>
```

#### Dynamic
To dynamically add new Full Screen element.

```JS
var createFullScreen = require('full-screen/full-screen'); // or available by 'createFullScreen' on window if not using modules

var fullScreen = createFullScreen({
    target = "#my-element"
});

document.appendElement(fullScreen);
```

