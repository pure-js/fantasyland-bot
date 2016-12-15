function getCaptcha() {
  let $location = document.getElementById('loc').contentWindow.document;
  let $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;
  let $captcha = $noCombat.querySelector('img[src^="png.php"]');
  let $input = $captcha.parentElement.nextSibling.getElementsByTagName('input')[0];
  console.log($captcha, $input);
  let ololo = getBase64Image($captcha);
}

function setCaptcha(input, value) {
  input.value = value;
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
}

getCaptcha();
