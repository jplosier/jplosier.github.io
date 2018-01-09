var newRuler = null;

document.getElementById("open").addEventListener("click", openPopOut, false);
document.getElementById("close").addEventListener("click", closePopOut, false);


function openPopOut(event) {
  newRuler = window.open(window.location, 'ruler', 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=600,height=300');
}


function closePopOut(event) {
  newRuler.close();
}