// var width = window.innerWidth;
// var height = window.innerHeight;

var width = 600;
var height = 600;

function update(activeAnchor) {
    var group = activeAnchor.getParent();

    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    // debugger
    var image = group.getChildren()[0];
    // var rect = group.get('Rect')[0];

    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();

    // update anchor positions
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
    }

    image.position(topLeft.position());

    var width = topRight.getX() - topLeft.getX();
    var height = bottomLeft.getY() - topLeft.getY();
    if(width && height) {
        image.width(width);
        image.height(height);
    }
}
function addAnchor(group, x, y, name) {
    var stage = group.getStage();
    var layer = group.getLayer();

    var anchor = new Konva.Circle({
        x: x,
        y: y,
        fill: 'rgba(0,0,0,0)',
        radius:8,
        name: name,
        draggable: true,
        dragOnTop: false
    });

    anchor.on('dragmove', function() {
        update(this);
        layer.draw();
    });
    anchor.on('mousedown touchstart', function() {
        group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on('dragend', function() {
        group.setDraggable(true);
        layer.draw();
    });
    // add hover styling
    anchor.on('mouseover', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setRadius(8);
        this.fill('#666');
        layer.draw();
    });
    anchor.on('mouseout', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setRadius(8);
        this.fill('rgba(0,0,0,0)');
        layer.draw();
    });

    group.add(anchor);
}

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
imageObj1.src = '/images/test_image_3.jpg';

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
imageObj2.src = '/images/test_image_4.jpg';

// rectangles
var rect1 = new Konva.Rect({
  width: 100,
  height: 100,
  fill: 'red',
  name: 'rect',
});

var rect1Group = new Konva.Group({
    x: 20,
    y: 60,
    draggable: true,
    name: 'red-rect',
});
layer.add(rect1Group);
rect1Group.add(rect1).draw();

var rect2 = new Konva.Rect({
  width: 100,
  height: 100,
  fill: 'black',
  name: 'rect',
});

var rect2Group = new Konva.Group({
    x: 100,
    y: 100,
    draggable: true,
    name: 'black-rect'
});
layer.add(rect2Group);
rect2Group.add(rect2).draw();



function addAnchors(obj, group) {
  addAnchor(group, 0, 0, 'topLeft');
  addAnchor(group, obj.width(), 0, 'topRight');
  addAnchor(group, obj.width(), obj.height(), 'bottomRight');
  addAnchor(group, 0, obj.height(), 'bottomLeft');
};
window.addEventListener('load', function(){
  addAnchors(imgOne, imgOneGroup);
  addAnchors(imgTwo, imgTwoGroup);
  addAnchors(rect1, rect1Group);
  addAnchors(rect2, rect2Group);
});

var selected = '';
layer.on('dblclick', function (evt) {
  // evt.target.fill('hotpink');
  evt.target.getParent().opacity('0.7');
  selected = evt.target.getParent();
  layer.draw();
})

var upBtn = document.querySelector('#move-up');
upBtn.addEventListener('click', function () {
  selected.moveUp();
  layer.draw();
})
var downBtn = document.querySelector('#move-down');
downBtn.addEventListener('click', function () {
  selected.moveDown();
  layer.draw();
})
var toTopBtn = document.querySelector('#send-to-front');
toTopBtn.addEventListener('click', function () {
  selected.moveToTop();
  layer.draw();
})
var toBackBtn = document.querySelector('#send-to-back');
toBackBtn.addEventListener('click', function () {
  selected.moveToBottom();
  layer.draw();
})
var done = document.querySelector('#done');
done.addEventListener('click', function () {
  selected.opacity('1');
  layer.draw();
})
var rotate = document.querySelector('#rotate');
rotate.addEventListener('click', function () {
  selected.rotate(-45);
  layer.draw();
})
var canvas = document.querySelector('#container');
// var stagecan = document.querySelector('canvas');

var colors = ["bg-black", "bg-red", "bg-yellow", "bg-green", "bg-blue", "bg-white"];
var current = 0;

var bgColor = document.querySelector('#bgcol');
bgColor.addEventListener('click', function () {
  canvas.classList.remove('canvas-default')
  canvas.classList.remove(colors[current]);
  current = current + 1;
  if (current === 6) {
    current = 0;
  }
  canvas.classList.add(colors[current]);
  })
  
// var size = document.querySelector('#size');
// size.addEventListener('click', function () {
//   canvas.style.width = '900px';
//   stagecan.style.width = '900px';
//   layer.draw();
// })

stage.add(layer);
