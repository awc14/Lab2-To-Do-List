const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementsByClassName('close')[0];

addBtn.onclick = function() {
  modal.style.display = 'block';
}

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
 
