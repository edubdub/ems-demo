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
    const SmartLoading = LoadingHOC(DemoComponent, trueSelector)
    return <SmartLoading />
  })
  .add('loading: false', () => {
    const SmartLoading = LoadingHOC(DemoComponent, falseSelector)
    return <SmartLoading />
  })
  .add('loading: false w/ title', () => {
    const SmartLoading = LoadingHOC(DemoComponent, falseSelector)
    return <SmartLoading title="Hello" />
  })
