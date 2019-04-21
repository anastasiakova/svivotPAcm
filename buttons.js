var $buttonLogIN = document.getElementsByClassName('button')[0];
$buttonLogIN.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;
  TweenMax.to($buttonLogIN, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to($buttonLogIN, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to($buttonLogIN, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
});
var $buttonRegistration = document.getElementsByClassName('button')[1];
$buttonRegistration.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;
  TweenMax.to($buttonRegistration, duration, {scaleY: 1.6, ease: Expo.easeOut});
  TweenMax.to($buttonRegistration, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
  TweenMax.to($buttonRegistration, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
});