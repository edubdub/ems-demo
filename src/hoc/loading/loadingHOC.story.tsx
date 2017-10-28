import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LoadingHOC from './loadingHOC'
const DemoComponent: React.StatelessComponent<{ title?: string }> = props => (
  <h1>{props.title || 'Not Loading!'}</h1>
)
const falseSelector: () => boolean = () => false
const trueSelector: () => boolean = () => true

storiesOf('HOC/loading', module)
  .add('loading: true', () => {
    const SmartLoading = LoadingHOC(trueSelector)(DemoComponent)
    return <SmartLoading />
  })
  .add('loading: false', () => {
    const SmartLoading = LoadingHOC(falseSelector)(DemoComponent)
    return <SmartLoading />
  })
  .add('loading: false w/ title', () => {
    const SmartLoading = LoadingHOC(falseSelector)(DemoComponent)
    return <SmartLoading title="Hello" />
  })
