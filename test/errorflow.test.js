const assume = require('assume');
const errorflow = require('../lib/errorflow')

describe('errorflow', function() {

  it('exposes version', function () {
    assume(errorflow.version).equals(require('../package').version);
  });
})
