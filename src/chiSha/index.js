import React, {
	Component
} from 'react';
import './index.css';

class Chisha extends Component {

	render() {
		return <div onClick={() => {
			this.http()
		}}>看看中午吃哪家</div>
	}
	http() {
		this.props.http.$get('/websites').then((res => {
			console.log(res)
		}))
	}
}
export default Chisha


