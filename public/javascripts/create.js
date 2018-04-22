
var width = 550;
var height = 550;

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
        this.fill('black');
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

function addAnchors(obj, group) {
  addAnchor(group, 0, 0, 'topLeft');
  addAnchor(group, obj.width(), 0, 'topRight');
  addAnchor(group, obj.width(), obj.height(), 'bottomRight');
  addAnchor(group, 0, obj.height(), 'bottomLeft');
};


var selected = '';
layer.on('dblclick', function (evt) {
  if (selected === '') {
    evt.target.getParent().opacity('0.7');
    selected = evt.target.getParent();
  } else {
    evt.target.getParent().opacity('1');
    selected = '';
  }
  layer.draw();
})

document.querySelector('#move-up').addEventListener('click', function () {
  selected.moveUp();
  layer.draw();
})
document.querySelector('#move-down').addEventListener('click', function () {
  selected.moveDown();
  layer.draw();
})
document.querySelector('#send-to-front').addEventListener('click', function () {
  selected.moveToTop();
  layer.draw();
})
document.querySelector('#send-to-back').addEventListener('click', function () {
  selected.moveToBottom();
  layer.draw();
})
document.querySelector('#rotate').addEventListener('click', function () {
  selected.rotate(-45);
  layer.draw();
})
document.querySelector('#delete').addEventListener('click', function () {
  selected.destroy();
  layer.draw();
})

stage.add(layer);

// upload filname
document.getElementById("file-upload").onchange = function() {
  var filePath = this.value;
  var file = filePath.replace("C:\\fakepath\\", '');
  document.getElementById("uploadFile").value = file;
};
// upload buttons
// var uploadBtn = document.getElementById("upload-btn");
// var uploadForm = document.querySelector(".upload-div");
// uploadBtn.addEventListener('click', function() {
//   uploadForm.classList.add('upload-animate');
// })
// document.querySelector(".upload").addEventListener('click', function() {
//   uploadForm.classList.remove('upload-animate');
// })
// selecting the images
var selectedImages = [];
function select(e) {
  e.target.classList.toggle('selected');
  if (e.target.classList.contains('selected')) {
    selectedImages.push(e.target.src);
    console.log(selectedImages);
  } else {
    var index = selectedImages.indexOf(e.target.src);
    selectedImages.splice(index, 1);
    console.log(selectedImages);
  }
}
var assets = document.querySelectorAll('.asset-thumb');
assets.forEach(function(a) {
  a.addEventListener('click', select);
})

document.querySelector('#upload-exit').addEventListener('click', function() {
  uploadForm.classList.remove('upload-animate');
})

document.querySelector('#add').addEventListener('click', function () {
  var newImg = new Konva.Image({
    width: 200,
    height: 200
  });
  var newImgGroup = new Konva.Group({
      x: 20,
      y: 110,
      draggable: true
  });
  layer.add(newImgGroup);
  newImgGroup.add(newImg);
  var imageObj = new Image();
  imageObj.onload = function() {
      newImg.image(imageObj);
      layer.draw();
  };
  imageObj.src = selectedImages[0];
  addAnchors(newImg, newImgGroup);
})

document.querySelector('#add-rect').addEventListener('click', function () {
  var rect = new Konva.Rect({
    width: 200,
    height: 100,
    fill: 'red',
    name: 'rect'
  });
  var rectGroup = new Konva.Group({
      x: 20,
      y: 60,
      draggable: true,
      name: 'red-rect'
  });
  layer.add(rectGroup);
  rectGroup.add(rect).draw();
  addAnchors(rect, rectGroup);
})

// var canvas = document.querySelector('#container');
var colors = ['#ffff00', '#00ff00', '#0000ff', '#ff8000', '#ff00ff', '#ff0000'];
var current = 0;

var shapeColor = document.querySelector('#shape-col');
shapeColor.addEventListener('click', function () {
  selected.children[0].fill(colors[current]);
  layer.draw();
  current = current + 1;
  if (current === 6) {
    current = 0;
  }
})



// var output = document.querySelector('canvas');
// console.log(output);
// document.querySelector('#save').addEventListener('click', function () {
//   var dataurl = output.toDataURL();
//   console.log(dataurl);
// })
