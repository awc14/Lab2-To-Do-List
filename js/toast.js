function displayToast(message) {
    const toast = document.getElementById('toast');
    toast.innerHTML = message;
    toast.style.visibility = 'visible';
  
    setTimeout(function() {
      toast.style.visibility = 'hidden';
    }, 3000);
  } 
