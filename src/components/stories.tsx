import * as React from 'react'
import { addDecorator } from '@storybook/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const CenterDecorator = (storyFn: Function) => (
  <MuiThemeProvider>
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
  </MuiThemeProvider>
)
addDecorator(CenterDecorator)

require('./loading/loading.story.tsx')
require('./navBar/navBar.story')
