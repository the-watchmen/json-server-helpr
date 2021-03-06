import faker from 'faker'
import _ from 'lodash'
import RandExp from 'randexp'
// import debug from 'debug'
import resource from './resource'
import {feathers} from '../../../src/index'

// const dbg = debug('app:mock:people')

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
      //phoneNumber: faker.phone.phoneNumber(),
      phoneNumber: phoneRe.gen(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      //zip: faker.address.zipCode(),
      zip: zipRe.gen()
    }
  },

  pre,
  post
})
