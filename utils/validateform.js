document.getElementById('myForm').addEventListener('submit', function(event) {
    const title = document.getElementById('title').value.trim();
    const descrip = document.getElementById('description').value.trim();
    const location = document.getElementById('locaton').value.trim();
    const country = document.getElementById('country').value.trim();
     const price = document.getElementById('price').value.trim();


    const errorMessage = document.getElementById('errorMessage');
  
    if (title === '' || descrip === '' || location==='' || country==='' || price==='') {
      event.preventDefault();
      errorMessage.style.display = 'block';
      return false;
    }
  });
  