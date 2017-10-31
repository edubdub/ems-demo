import * as React from 'react'
import { storiesOf } from '@storybook/react'
import NowButton from './now'
import { action } from '@storybook/addon-actions'
storiesOf('components/now', module).add('default', () => (
  <NowButton onPress={action('now pressed')} />
))
