import { UserRequest } from './usersRequest'

const handlers = [
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Harvey',
      last: 'Daniels',
    },
    location: {
      street: {
        number: 3446,
        name: 'E Pecan St',
      },
      city: 'Edgewood',
      state: 'Maryland',
      country: 'United States',
      postcode: 79347,
      coordinates: {
        latitude: '88.0000',
        longitude: '-135.7751',
      },
      timezone: {
        offset: '+3:30',
        description: 'Tehran',
      },
    },
    email: 'harvey.daniels@example.com',
    login: {
      uuid: '6395346c-b109-49d9-8a62-7598802e00ef',
      username: 'heavydog549',
      password: 'niceguy',
      salt: 'QebIK1LG',
      md5: '94e73dac665d90c6c5abde29ec13867c',
      sha1: 'e00141901873e5301d45628a889290dc978dd81a',
      sha256: '0dc7ab49770fba040bc1aaf43b0904b515af67b0e1064bfe6754bbe39485d2fd',
    },
    dob: {
      date: '1961-12-22T11:05:00.143Z',
      age: 60,
    },
    registered: {
      date: '2012-08-13T00:07:53.113Z',
      age: 9,
    },
    phone: '(501)-900-9946',
    cell: '(238)-053-2518',
    id: {
      name: 'SSN',
      value: '709-81-1478',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/53.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/53.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/53.jpg',
    },
    nat: 'US',
  } as UserRequest,
]
