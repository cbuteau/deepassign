
function iterateProperties(obj, callback) {
  var keys = Object.keys(obj);
  keys.forEach(function(key) {
    callback(obj[key]);
  });
}

function isObject(obj) {
  return (obj.isPrototypeOf && obj.hasOwnProperty && obj.toString);
}

function countDepth(object) {
  var count = 0;
  var parent = object.__proto__;

  while (parent !== null) {
    count++;
    parent = parent.__proto__;
  }

  // Base inline object {} seems to have one parent.
  return count;
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

  var depthObj = countDepth(obj);
  var depthMerg = countDepth(merge);

  if (depthObj === 1 && depthMerg === 1) {
    return Object.assign(obj, merge);
  }

  iterateProperties(merge, function(mprop) {
    var subcount = countDepth(mprop);
    if (subcount > 0) {
      deepAssign(currentProp, currentMerge);
    } else {
      currentProp = Object.assign(currentProp, currentMerge);
    }
  });
}

module.exports = deepAssign;
