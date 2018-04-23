
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


function addAnchors(group) {
  for (var i = 0; i < selectedImages.length; i++) {
    addAnchor(group, 0, 0, 'topLeft');
    addAnchor(group, imgDim[i*2], 0, 'topRight');
    addAnchor(group, imgDim[i*2], imgDim[i*2+1], 'bottomRight');
    addAnchor(group, 0, imgDim[i*2+1], 'bottomLeft');
  }
};


var selected = '';
layer.on('dblclick', function (evt) {
  if (selected === '') {
    evt.target.shadowColor('grey');
    evt.target.shadowBlur(20);
    evt.target.shadowOffset({x:-5, y:5});
    evt.target.shadowOpacity(0.5);
    selected = evt.target.getParent();
  } else {
    evt.target.shadowOpacity(0);
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
var opacity = [1, 0.75, 0.5, 0.25];
var opacCount = 0;
document.querySelector('#opacity').addEventListener('click', function () {
  selected.opacity(opacity[opacCount + 1]);
  opacCount += 1;
  layer.draw();
})
document.querySelector('#delete').addEventListener('click', function () {
  selected.destroy();
  layer.draw();
})

stage.add(layer);


// selecting the images
var selectedImages = [];
imgDim = [];
function select(e) {
  e.target.classList.add('selected');
  if (e.target.classList.contains('selected')) {
    selectedImages.push(e.target.src);
    imgDim.push(e.target.naturalWidth);
    imgDim.push(e.target.naturalHeight);
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
  for (var i = 0; i < selectedImages.length; i++) {
    var newImg = new Konva.Image({
    });
    var newImgGroup = new Konva.Group({
        x: 20,
        y: 110,
        draggable: true
    });
    layer.add(newImgGroup);
    newImgGroup.add(newImg);
    var imageObj = new Image();
    imageObj.crossOrigin = 'Anonymous';
    imageObj.onload = function() {
        newImg.image(imageObj);
        layer.draw();
    };
    imageObj.src = selectedImages[i];
    addAnchors(newImgGroup);
  }
  var withSelected = document.querySelectorAll('.selected');
  for (var i = 0; i < withSelected.length; i++) {
    withSelected[i].classList.remove('selected');
  }
  selectedImages = [];
  imgDim = [];
})

document.querySelector('#add-rect').addEventListener('click', function () {
  var rect = new Konva.Rect({
    width: 200,
    height: 150,
    fill: colors[0],
    name: 'rect'
  });
  var rectGroup = new Konva.Group({
      x: 100,
      y: 60,
      draggable: true,
      name: 'red-rect'
  });
  layer.add(rectGroup);
  rectGroup.add(rect).draw();
  addAnchor(rectGroup, 0, 0, 'topLeft');
  addAnchor(rectGroup, 200, 0, 'topRight');
  addAnchor(rectGroup, 200, 150, 'bottomRight');
  addAnchor(rectGroup, 0, 150, 'bottomLeft');
})

var colors = ['#C0C0C0', '#808080', '#000000', '#FF0000', '#800000', '#FFFF00', '#808000', '#00FF00', '#008000', '#00FFFF', '#008080','#0000FF', '#000080', '#FF00FF', '#800080'];
var current = 1;

var shapeColor = document.querySelector('#shape-col');
shapeColor.addEventListener('click', function () {
  selected.children[0].fill(colors[current]);
  layer.draw();
  current = current + 1;
  if (current === 16) {
    current = 0;
  }
})


var can = document.querySelector('canvas');
function downloadCanvas(canvas, filename) {
    var save = document.querySelector('#save');
    save.href = canvas.toDataURL('image/jpeg', 1.0);
    save.download = filename;
}

document.getElementById('save').addEventListener('click', function(e) {
    downloadCanvas(can, 'collageo.jpg');
})
