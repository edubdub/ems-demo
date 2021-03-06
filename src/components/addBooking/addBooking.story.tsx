import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AddBooking from './addBooking'
storiesOf('components/addBooking', module)
  .add('open', () => (
    <AddBooking
      open
      onRequestClose={action('requestClose')}
      onSubmit={action('onSubmit')}
    />
  ))
  .add('closed', () => (
    <AddBooking
      open={false}
      onRequestClose={action('requestClose')}
      onSubmit={action('onSubmit')}
    />
  ))
