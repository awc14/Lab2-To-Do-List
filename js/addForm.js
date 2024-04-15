const addForm = document.getElementById('add-form');

addForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(addForm);
  const taskData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/add-task-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    
    if (response.ok) {
      displayToast('Task added successfully!');
    } else {
      throw new Error('Failed to add task.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

function displayToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = message;
  toast.style.visibility = 'visible';

  setTimeout(function() {
    toast.style.visibility = 'hidden';
  }, 3000);
}
