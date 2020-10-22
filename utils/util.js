function getCurrentDate() {
  var myDate = new Date();
  myDate.getFullYear();
  myDate.getMonth();
  myDate.getDate();
  return myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
}
function getDataSet(event, key) {
  return event.currentTarget.dataset[key];
}

function isMobile(mobile) {
  return !!mobile.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/);
}

function createSignature(appkey, timestamp, randomStr, masterSecret) {
  var str = `appkey=${appkey}&timestamp=${timestamp}&random_str=${randomStr}&key=${masterSecret}`;
  console.log(str);
  return md5.md5(str);
}
function imageZoomHeightUtil(screenWidth, originalWidth, originalHeight) {
  let imageSize = {};
  var imageWidth = screenWidth / 2;
  imageSize.width = imageWidth;
  imageSize.height = (imageWidth * originalHeight) / originalWidth;
  return imageSize;
}

module.exports = {
  getCurrentDate,
  getDataSet,
  createSignature,
  imageZoomHeightUtil,
  isMobile
}
