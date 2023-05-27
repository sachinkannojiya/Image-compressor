window.onload = function() {
    const fileInput = document.getElementById('file-input');
    const originalImage = document.getElementById('original-image');
    const compressedImage = document.getElementById('compressed-image');
    const downloadLink = document.getElementById('download-link');
  
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function(e) {
        originalImage.src = e.target.result;
        compressImage(file);
      };
  
      reader.readAsDataURL(file);
    });
  
    function compressImage(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
  
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob(function(blob) {
            const compressedURL = URL.createObjectURL(blob);
            compressedImage.src = compressedURL;
            downloadLink.href = compressedURL;
            downloadLink.style.display = 'inline';
          }, 'image/jpeg', 0.7);
        };
  
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
  };
  