
var deepAssign = require('..');

var defaultProps = {
  PI: Math.PI,
  AVOGADRO: 6.022e23,
  display: 'The quick brown fox jumped over the lazy dog.'
}

describe('Some Basic tests', function() {

  test('Merge', function() {
    var result = deepAssign({}, defaultProps);
    expect(result).toEqual(defaultProps);
  });

  test('With Defaults', function() {
    var defaultSetting = {
      showDialogs: true,
      loglevel: 4
    };
    var result = deepAssign(defaultSetting, {
      loglevel: 1
    });
    expect(result).toEqual({
      showDialogs: true,
      loglevel: 1
    });
  });

})
