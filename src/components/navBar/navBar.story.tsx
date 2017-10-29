import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import NavBar from './navBar'
storiesOf('components/navBar', module).add('default', () => (
  <NavBar
    heightRealized={action('ref')}
    height={64}
    date={new Date()}
    onDateChange={action('onDateChange')}
    onSearchTermChange={action('onSearchTermChange')}
    fuzzySearch={true}
    onFuzzySearchChange={action('onFuzzySearchChange')}
    searchTerm={'steve'}
  />
))
