import * as React from 'react'
import { shallow } from 'enzyme'
import NowButton from './now'

it('renders without crashing', () => {
  expect(shallow(<NowButton onPress={() => null} />)).toMatchSnapshot()
})
