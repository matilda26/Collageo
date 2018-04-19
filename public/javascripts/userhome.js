var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    id: 'main'
});

var layer = new Konva.Layer();


// images
var imgTwo = new Konva.Image({
});
var imgOne = new Konva.Image({
});
var imgOneGroup = new Konva.Group({
    x: 180,
    y: 50,
    draggable: true
});
layer.add(imgOneGroup);
imgOneGroup.add(imgOne);
var imageObj1 = new Image();
imageObj1.onload = function() {
    imgOne.image(imageObj1);
    layer.draw();
};
imageObj1.src = '/images/test_3.jpg';

var imgTwo = new Konva.Image({
});
var imgTwoGroup = new Konva.Group({
    x: 20,
    y: 110,
    draggable: true
});
layer.add(imgTwoGroup);
imgTwoGroup.add(imgTwo);
var imageObj2 = new Image();
imageObj2.onload = function() {
    imgTwo.image(imageObj2);
    layer.draw();
};
imageObj2.src = '/images/test_4.jpg';
// Update to be user's collages



stage.add(layer);
