// upload filname
document.getElementById("file-upload").onchange = function() {
  var filePath = this.value;
  var file = filePath.replace("C:\\fakepath\\", '');
  document.getElementById("uploadFile").value = file;
};
// upload buttons
var uploadBtn = document.getElementById("upload-btn-lrg");
var uploadForm = document.querySelector(".upload-div");
uploadBtn.addEventListener('click', function() {
  uploadForm.classList.add('upload-animate');
})
document.querySelector(".upload").addEventListener('click', function() {
  uploadForm.classList.remove('upload-animate');
})
// selecting the images
var selectedImages = [];
function select(e) {
  e.target.classList.toggle('selected');
  var imageCheck = e.target.parentNode.querySelector('.image-check');
  if (e.target.classList.contains('selected')) {
    imageCheck.checked = true;
  } else {
    imageCheck.checked = false;
  }
}
var assets = document.querySelectorAll('.asset');
assets.forEach(function(a) {
  a.addEventListener('click', select);
})

document.querySelector('#upload-exit').addEventListener('click', function() {
  uploadForm.classList.remove('upload-animate');
})
