
var deepAssign = require('..');

var defaultOptions = {
  inlineAMDS: [
    'path/to/module',
    'path/to/utilty',
    'path/to/singleton'
  ],
  layout: {
    visibleProps: [
      'display',
      'index',
      'tags'
    ],
    tagManager: 'standard'
  },
  performance: {
    usePooling: false,
    useDocumentFragment: true
  }
};

var mergedOptions = {
  inlineAMDS: [
    'path/to/module',
    'path/to/utilty',
    'path/to/singleton'
  ],
  layout: {
    visibleProps: [
      'display',
      'index',
      'tags'
    ],
    tagManager: 'dynamic'
  },
  performance: {
    usePooling: false,
    useDocumentFragment: true
  }
};


describe('Some Tests that use some object depth', function() {

  test('Component', function() {
    var result = deepAssign(defaultOptions, {
      layout: {
        tagManager: 'dynamic'
      }
    });
    expect(result).toEqual(mergedOptions);
  });

});
