const {get, set, isArray, merge, each} = require('lodash')
const Validator = require('validatorjs')

module.exports = (function(){

  this.policies = {};

  /**
   * Creates an object with policy rules to be merged into registry
   * @param  {String} path  A string or array representing the rule set to be copared against
   * @param  {Object} rules Object containing keys with validation rules
   * @return {Object}       Policy rules partial
   */
  this.createPolicy = (path, rules) => {
    return set(Object.create(null), path, rules)
  }

  /**
   * Registers policies into the registry
   * @param  {Object|Array} policies Single or Array of policies to be registered
   * @return {Void}
   */
  this.registerPolicies = (policies) => {
    if(!isArray(policies)){
      merge(this.policies, policies)
    } else {
      each(policies, policy => {
        merge(this.policies, policy)
      })
    }
  }

  /**
   * Gate middleware used on routes
   * @param  {String} path Path to policy to check data against
   * @return {Response}    In case of validation errors Response with status 400 is returned.
   */
  this.middleware = (path) => (req, res, next) => {
    let policy = get(this.policies, path)

    if(!policy){
      throw new Error(`Policy ${path} not found.`)
    }

    let data = ['POST', 'PATCH', 'PUT'].indexOf(req.method) > -1 ? req.body : req.params
    let validation = new Validator(data, policy.rules)

    if(validation.fails()){
      return res.status(400).json({status: 400, message: 'Validation failed', errors: validation.errors.all()})
    }

    next()
  }

  return this;
})();
