// Acessar a câmera do dispositivo
const video = document.getElementById('video');
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Erro ao acessar a câmera: ", err);
  });

// Capturar a imagem ao clicar no botão
const captureButton = document.getElementById('capture');
const canvas = document.getElementById('canvas');
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Enviar a imagem capturada para o servidor
const uploadForm = document.getElementById('upload-form');
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append('image', blob, 'captured-image.png');

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      alert('Imagem enviada com sucesso!');
    })
    .catch(err => {
      console.error('Erro ao enviar imagem:', err);
    });
  });
});
