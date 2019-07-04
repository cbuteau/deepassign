'use strict';

function iterateProperties(obj, callback) {
  var keys = Object.keys(obj);
  keys.forEach(function(key) {
    callback(obj[key]);
  });
}

function iterateArray(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

function isObject(obj) {
  return (obj.isPrototypeOf && obj.hasOwnProperty && obj.toString);
}

function isArray(obj) {
  return (obj.map && obj.indexOf && obj.push && obj.slice);
}

function isValueType(obj) {
  if (obj === true || obj === false) {
    return true; //boolean
  }
  if (obj.getDay && obj.getYear && obj.getMonth && obj.getHours && obj.getMinutes && obj.getSeconds) {
    return true; //date
  }
  if (obj.toString && obj.valueOf && obj.toPrecision) {
    return true; //number
  }
  if (obj.trim && obj.indexOf && obj.toLowerCase && obj.toUpperCase) {
    return true; //string
  }
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

function countPropDepth(obj) {
  var count = 0;
  if (isValueType(obj)) {
    return count;
  }

  iterateProperties(obj, function(prop) {
    if (isValueType(prop)) {
      // skip its just valuetype.
    } else if (isArray(prop)) {
      count++;
      iterateArray(prop, function(item) {
        var itemDepth = countPropDepth(item);
        count += itemDepth;
      });
    } else if (isObject(prop)) {
      count++;
      var propObjDepth = countPropDepth(prop);
      count += propObjDepth;
      //count++;
    }
  });
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

  var depthObj = countPropDepth(obj);
  var depthMerg = countPropDepth(merge);

  if (depthObj === 0 && depthMerg === 0) {
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
