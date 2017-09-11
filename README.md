# json-server-helpr

elements to assist with setting up [json-server](https://github.com/typicode/json-server) to mock various protocols

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

see example setup [here](./test/fixtures/mock-server)

## adapter usage

example below illustrates how to mock [feathers-rest](https://github.com/feathersjs/feathers-rest) syntax

```js
import faker from 'faker'
import _ from 'lodash'
import RandExp from 'randexp'
import {feathers} from 'json-server-helpr'
import resource from './resource'

const {pre, post} = feathers

const ssnRe = new RandExp(/\d{3}-\d{2}-\d{4}/)
const phoneRe = new RandExp(/\(\d{3}\) \d{3}-\d{4}/)
const zipRe = new RandExp(/\d{5}/)

export default Object.assign({}, resource, {
  fake: () => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    return {
      firstName: firstName,
      lastName: lastName,
      fullName: `${lastName}, ${firstName}`,
      dateOfBirth: faker.date.past(),
      gender: _.sample(['M', 'F']),
      ssn: ssnRe.gen(),
      phoneNumber: phoneRe.gen(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: zipRe.gen()
    }
  },

  pre,
  post
})
```
