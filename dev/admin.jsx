const React=require('react');
const ReactDOM=require('react-dom');
const media=require('./media.jsx');

function Root (props){
	return (
		<div className="container">
			<div className="row">
				<media.Media title="良好的分类习惯，给一个不一样的自己！" />
			</div>
		</div>
	)	
}
ReactDOM.render(
	<Root/>,
	document.getElementById('root')
)