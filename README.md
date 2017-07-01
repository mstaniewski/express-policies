# Express Policies

Express policies is a small utility for checking incoming request against given rules. Module comes with a middleware, which takes care of comparing params in case of `GET` requests and body in case of `POST`, `PUT` and `PATCH` requests.

## Usage

```javascript
let router = require('express').Router()
let endpoint = require('endpoint')

let Gate = require('express-policies')
let policy = Gate.middleware

let EndpointPolicy = Gate.createPolicy('endpoint', {
  create: {
    rules: {
      id: 'required|integer'
    }
  },
  update: {
    rules: {
      id: 'required|integer'
    }
  }
})

Gate.registerPolicies(EndpointPolicy)


router.post('/endpoint', policy('endpoint.create'), endpoint.create)
router.patch('/endpoint', policy('endpoint.update'), endpoint.update)
```

## Documentation

### Gate.createPolicy
Create a policy object

```javascript
let Gate = require('express-policies')
const Policy = Gate.createPolicy(policyPath, rules)
```
### Gate.registerPolicies
Registers given policies

```javascript
let Gate = require('express-policies')
const Policy = Gate.createPolicy(policyPath, rules)
Gate.registerPolicies(Policy)

// Or alternatively
const Policy2 = Gate.createPolicy(policyPath, rules)
Gate.registerPolicies([Policy, Policy2])
```

### Gate.middleware
Checks request against given rules

```javascript
let Gate = require('express-policies')
let policy = Gate.middleware
const CreatePolicy = Gate.createPolicy('endpoint.create', rules)
Gate.registerPolicies(CreatePolicy)

router.post('/endpoint', policy('endpoint.create'), endpoint.create)
```

### Available Validation Rules
Used gread validation library in this project. It is https://github.com/skaterdav85/validatorjs
This part is copied from it's documentation, for more info visit link above.

Validation rules do not have an implicit 'required'. If a field is _undefined_ or an empty string, it will pass validation. If you want a validation to fail for undefined or '', use the _required_ rule.

#### accepted

The field under validation must be yes, on, 1 or true. This is useful for validating "Terms of Service" acceptance.

#### after:date

The field under validation must be after the given date.

#### after_or_equal:date

The field unter validation must be after or equal to the given field 

#### alpha

The field under validation must be entirely alphabetic characters.

#### alpha_dash

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

#### alpha_num

The field under validation must be entirely alpha-numeric characters.

#### array

The field under validation must be an array.

#### before:date

The field under validation must be before the given date.


#### before_or_equal:date

The field under validation must be before or equal to the given date.

#### between:min,max

The field under validation must have a size between the given min and max. Strings, numerics, and files are evaluated in the same fashion as the size rule.

#### boolean

The field under validation must be a boolean value of the form `true`, `false`, `0`, `1`, `'true'`, `'false'`, `'0'`, `'1'`,

#### confirmed

The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### date

The field under validation must be a valid date format which is acceptable by Javascript's `Date` object.

#### digits:value

The field under validation must be numeric and must have an exact length of value.

#### different:attribute

The given field must be different than the field under validation.

#### email

The field under validation must be formatted as an e-mail address.

#### in:foo,bar,...

The field under validation must be included in the given list of values. The field can be an array or string.

#### integer

The field under validation must have an integer value.

#### max:value

Validate that an attribute is no greater than a given size

_Note: Maximum checks are inclusive._

#### min:value

Validate that an attribute is at least a given size.

_Note: Minimum checks are inclusive._

#### not_in:foo,bar,...

The field under validation must not be included in the given list of values.

#### numeric

Validate that an attribute is numeric. The string representation of a number will pass.

#### required

Checks if the length of the String representation of the value is >

#### required_if:anotherfield,value

The field under validation must be present and not empty if the anotherfield field is equal to any value.

#### required_unless:anotherfield,value

The field under validation must be present and not empty unless the anotherfield field is equal to any value.

#### required_with:foo,bar,...

The field under validation must be present and not empty only if any of the other specified fields are present.

#### required_with_all:foo,bar,...

The field under validation must be present and not empty only if all of the other specified fields are present.

#### required_without:foo,bar,...

The field under validation must be present and not empty only when any of the other specified fields are not present.

#### required_without_all:foo,bar,...

The field under validation must be present and not empty only when all of the other specified fields are not present.

#### same:attribute

The given field must match the field under validation.

#### size:value

The field under validation must have a size matching the given value. For string data, value corresponds to the number of characters. For numeric data, value corresponds to a given integer value.

#### string

The field under validation must be a string.

#### url

Validate that an attribute has a valid URL format

#### regex:pattern

The field under validation must match the given regular expression.

**Note**: When using the ``regex`` pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character.
For each backward slash that you used in your regex pattern, you must escape each one with another backward slash.


## Running the tests
Simply run **mocha** in project root directory to fire up the tests 

## FAQ
**Why rules are nested inside rules object?**

In future I'm planning to implement more functionalities to validate requests, so to avoid schema changes, decided to put it there from the beginning.



## Release history
* 0.1.0 - Initial release
