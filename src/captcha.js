function setCaptcha(input, value) {
  const $input = $captcha.parentElement.nextSibling.getElementsByTagName('input')[0];
  input.value = value;
}

function sendToDropbox(file) {
  /**
   * Two variables should already be set.
   * dropboxToken = OAuth access token, specific to the user.
   * file = file object selected in the file widget.
   */

  const xhr = new XMLHttpRequest();

  xhr.upload.onprogress = function (evt) {
    const percentComplete = parseInt(100.0 * evt.loaded / evt.total);
    // Upload in progress. Do something here with the percent complete.
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      const fileInfo = JSON.parse(xhr.response);
      // Upload succeeded. Do something here with the file info.
    } else {
      const errorMessage = xhr.response || 'Unable to upload file';
      // Upload failed. Do something here with the error.
    }
  };

  xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
  xhr.setRequestHeader('Authorization', `Bearer ${dropboxToken}`);
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');
  xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
    path: '/' + 'file.png',
    mode: 'add',
    autorename: true,
    mute: false,
  }));

  xhr.send(file);
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

function getBase64Image(img) {
  // Create an empty canvas element
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  const dataURL = canvas.toDataURL('image/png');

  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  return dataURL;
}

function getCaptcha() {
  const $location = document.getElementById('loc').contentWindow.document;
  const $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;
  const $captcha = $noCombat.querySelector('img[src^="png.php"]');
  const base64img = getBase64Image($captcha);
  const blobImg = dataURItoBlob(base64img);
  sendToDropbox(blobImg);
}

getCaptcha();
