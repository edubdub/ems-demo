import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NavBar from './navBar'
storiesOf('components/navBar', module).add('default', () => (
  <NavBar title="Test" />
))
