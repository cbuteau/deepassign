
function iterateProperties(obj, callback) {
  var keys = Object.keys(obj);
  keys.forEach(function(key) {
    callback(obj[key]);
  });
}

function isObject(obj) {
  return (obj.isPrototypeOf && obj.hasOwnProperty && obj.toString);
}

function countObjects(obj) {
  var count = 0;
  iterateProperties(obj, function(prop) {
    if (isObject(prop)) {
      count++;
    }
  });
  return count;
}

function deepAssign(obj, merge) {

  iterateProperties(merge, function(mprop) {
    var subcount = countObjects(mprop);
    if (subcount > 0) {
      deepAssign(currentProp, currentMerge);
    } else {
      currentProp = Object.assign(currentProp, currentMerge);
    }
  });
}
