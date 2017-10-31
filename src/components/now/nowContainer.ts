import { compose } from 'redux'
import { connect } from 'react-redux'
import { IState } from '../../redux/store'
import actionsCreators from '../../redux/actions'
import NowButton from './now'
export default compose(
  connect((state: IState) => ({}), {
    onPress: actionsCreators.ui.userSetNavDate
  })
)(NowButton)
