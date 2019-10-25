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
	componentDidMount() {
		this.http()
	}
	http() {
		this.props.http.$get('/area_table',{id:3}).then((res => {
			console.log(res)
		}))
	}
}
export default Chisha


