
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

})
