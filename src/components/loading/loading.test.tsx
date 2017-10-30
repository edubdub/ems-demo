import * as React from 'react'
import { shallow } from 'enzyme'
import Loading from './loading'

it('renders without crashing', () => {
  expect(shallow(<Loading />)).toMatchSnapshot()
})
