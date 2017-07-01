const chai = require('chai')
const chaiJsonEqual = require('chai-json-equal');
chai.use(chaiJsonEqual);

const expect = chai.expect

describe('Gate', function(){
  const path = require('path');
  const basePath = process.cwd();

  let Gate = require(path.resolve(basePath + '/src/Gate'));

  var testPolicy;
  var testAgainst = {
    test: {
      deep: {
        index: {
          rules: {
            id: 'required|integer'
          }
        }
      }
    }
  };

  beforeEach(function() {
    testPolicy = Gate.createPolicy('test.deep', {
      index: {
        rules: {
          id: 'required|integer'
        }
      }
    })
  });

  it('Should have a createPolicy method, returning a policy object', function(){
    expect(testPolicy).to.jsonEqual(testAgainst);
  })

  it('Should have a registerPolicies method, accepting single policy and registering it', function(){
    Gate.registerPolicies(testPolicy)
    expect(Gate.policies).to.jsonEqual(testAgainst)
  })

  it('Should have a registerPolicies method, accepting array of policies and registering them', function(){
    let anotherTestPolicy = Gate.createPolicy('test2.deep', {
      index: {
        rules: {
          id: 'required|integer'
        }
      }
    })
    Gate.registerPolicies([testPolicy, anotherTestPolicy])

    testAgainst.test2 = {
      deep: {
        index: {
          rules: {
            id: 'required|integer'
          }
        }
      }
    }

    expect(Gate.policies).to.jsonEqual(testAgainst)
  })
})
