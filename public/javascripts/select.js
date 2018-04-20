document.getElementById("file-upload").onchange = function() {
  document.getElementById("uploadFile").value = this.value;
};
var select = document.querySelector('.asset');
select.addEventListener('click', function () {
  select.classList.add('selected');
})
