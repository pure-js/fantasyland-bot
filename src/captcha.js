function getCaptcha() {
  let $location = document.getElementById('loc').contentWindow.document;
  let $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;
  let $input = $noCombat.getElementById('value');
  let $captcha = $input.parentElement.previousSibling.getElementsByTagName('img');
  let captchaSrc = $captcha.src;
  console.log($captcha, captchaSrc);
}
getCaptcha();
