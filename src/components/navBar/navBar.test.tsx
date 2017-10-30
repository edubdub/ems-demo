import * as React from 'react'
import { shallow } from 'enzyme'
import NavBar from './navBar'

it('renders without crashing', () => {
  expect(
    shallow(
      <NavBar
        date={new Date(0)}
        fuzzySearch={true}
        height={64}
        heightRealized={() => null}
        onDateChange={() => null}
        onFuzzySearchChange={() => null}
        onPlusClick={() => null}
        onSearchTermChange={() => null}
        searchTerm="test"
      />
    )
  ).toMatchSnapshot()
})
