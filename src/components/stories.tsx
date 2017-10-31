import * as React from 'react'
import { addDecorator } from '@storybook/react'
const CenterDecorator = (storyFn: Function) => (
  <div style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'absolute' }}>
    <div
      style={{
        display: 'inline-block',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        left: 0,
        right: 0
      }}
    >
      {storyFn()}
    </div>
  </div>
)

// Non centered stories
require('./loading/loading.story')
require('./navBar/navBar.story')
require('./bookings/bookings.story')
require('./addBooking/addBooking.story')
require('./now/now.story')
addDecorator(CenterDecorator)
// centered stories
