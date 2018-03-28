window.blurBg = function(viewId, image, w, h, blur) {
  var view = document.getElementById(viewId);
  view.width = w;
  view.height = h;
  var ctx = view.getContext('2d');

  ctx.drawImage(image, 0, 0, w, h);
  StackBlur.canvasRGB(view, 0, 0, view.width, view.height, blur);
}
