'use strict';

function iterateProperties(obj, callback) {
  var keys = Object.keys(obj);
  keys.forEach(function(key) {
    callback(obj[key], key);
  });
}

function iterateArray(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

function isValueType(obj) {
  var code = tc.get(obj);
  return code !== tc.CODES.OBJECT && code !== tc.CODES.ARRAY;
}

function countPropDepth(obj) {
  var count = 0;
  if (isValueType(obj)) {
    return count;
  }

  iterateProperties(obj, function(prop) {
    var code = tc.get(prop);
    switch (code) {
      case tc.CODES.OBJECT:
        count++;
        var propObjDepth = countPropDepth(prop);
        count += propObjDepth;
        break;
      case tc.CODES.ARRAY:
        count++;
        iterateArray(prop, function(item) {
          var itemDepth = countPropDepth(item);
          count += itemDepth;
        });
        break;
      default:
        // skip its just valuetype.
        break;
    }
  });
  return count;
}

function deepClone(obj) {
  var final = {};

  iterateProperties(obj, function(prop, propKey) {
    var subcount = countPropDepth(prop);
    if (subcount > 0) {
      final[propKey] = deepClone(prop);
    } else {
      final[propKey] = prop;
    }
  });

  return final;
}

function deepAssign(obj, merge) {
  if (!tc.is(obj, tc.CODES.OBJECT) || !tc.is(merge, tc.CODES.OBJECT)) {
    throw new Error('Only works when both paramteres are objects');
  }
  // clone initial object.
  var final = deepClone(obj);
  var depthObj = countPropDepth(obj);
  var depthMerg = countPropDepth(merge);

  if (depthObj === 0 && depthMerg === 0) {
    return Object.assign(obj, merge);
  }
  iterateProperties(merge, function(mprop, propKey) {
    var subcount = countPropDepth(mprop);
    var currentProp = obj[propKey];
    if (subcount > 0) {
      final[propKey] = deepAssign(currentProp, mprop);
    } else {
      // TODO make this point to polyfill for IE.
      currentProp = Object.assign(currentProp, mprop);
      final[propKey] = currentProp;
    }
  });


  return final;
}

var exposed = deepAssign;
if (window && window.performance) {
  window.deepAssign = exposed;
} else {
  module.exports = exposed;
}
