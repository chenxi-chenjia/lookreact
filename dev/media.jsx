const React=require('react');
const $=require('jquery');

//内部列表组件
class Lis extends React.Component{
	constructor(props){
		super(props);
		this.state={
			title:this.props.title,
			showChildren:true
		}
		this.addL=this.addL.bind(this);
		this.deleteL=this.deleteL.bind(this);
		this.inpull=this.inpull.bind(this);
		this.slt=this.slt.bind(this);
	}
	deleteL(){
		this.props.delete(this.props.id)
	}
	addL(){
		this.props.add(this.props.id)
	}
	inpull(e){
		var obj={
			name:e.target.value,
			id:this.props.id
		}
		this.props.inpu(obj);
		this.setState({
			title:e.target.value
		})
	}
	//收放
	slt(){
		this.setState({
			showChildren:!this.state.showChildren
		})
	}
	render(){
		return(
			<div className="media-list">
				<div className="media-body">
					<h4 className="media-heading">
						<button className="btn btn-success add"
						onClick={this.addL}
						>添加</button>
						<button className="btn btn-danger rm"
						onClick={this.deleteL} >删除</button>
						<button className="btn btn-info shrink"
						onClick={this.slt} >
							收起
							<span className="caret"></span></button>
						<input type="text" 
						value={this.state.title}
						defaultValue={this.state.title}
						onChange={this.inpull} />
					</h4>
					<div
					style={{display:(this.state.showChildren?'block':'none')}} >
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}
//整体框架
class Media extends React.Component{
	constructor(props){
		super(props);
		this.addL=this.addL.bind(this);
		this.delete=this.delete.bind(this);
		this.change=this.change.bind(this);
		this.addZ=this.addZ.bind(this);
		this.deleteZ=this.deleteZ.bind(this);
		this.ssl=this.ssl.bind(this);
		this.state={
			data:[],
			showChildren: true
		}
	}
	addZ(){
		var obj={
			name:'',
			parentId:0
		};
		var data=this.state.data;
		$.ajax({
			url:'/data',
			type:'post',
			data:obj,
			success:(function(res){
				obj.id=res;
				data.push(obj);
				this.setState({
					data:data
				})
			}).bind(this)
		})
	}
	deleteZ(){
		var data=this.state.data;
		var num=[];
		data.forEach((v,i)=>{
			num.push(v.id);
		})
		data=[];
		num=num.join(",");console.log(num)
		$.ajax({
			url:'/data',
			type:'delete',
			data:{num:num},
			success:(function(res){
				if(res===1){
					this.setState({
						data:data
					})
				}
			}).bind(this)
		})
	}
	addL(e){
		var obj={};
		obj.parentId=e;
		obj.name='';
		var data=this.state.data;
		$.ajax({
			url:'/data',
			type:'post',
			data:obj,
			success:(function(res){
				obj.id=res;
				data.push(obj);
				this.setState({
					data:data
				})
			}).bind(this)
		})
	}
	delete(e){
		var data=this.state.data;
		var num=[];
		num.push(e);
		function dtl (pid){
			data.forEach((v,i)=>{
				if(v.parentId==pid){
					num.push(v.id);
					dtl(v.id);
				}
			})
		}
		dtl(e);
		num.forEach((v,i)=>{
			data.forEach((m,n)=>{
				if(m.id==v){
					data.splice(n,1);
				}
			})
		})
		num=num.join(",");
		$.ajax({
			url:'/data',
			type:'delete',
			data:{num:num},
			success:(function(res){
				if(res===1){
					this.setState({
						data:data
					})
				}
			}).bind(this)
		})
	}
	change(e){
		$.ajax({
			url:'/data',
			type:"put",
			data:e,
			success:function(res){
				
			}
		})
	}
	componentDidMount(){
		$.ajax({
			url:'/data',
			type:'get',
			success:(function(res){
				this.setState({
					data:res
				})
			}).bind(this)
		})
	}
	//主部件缩放
	ssl(){
		this.setState({
			showChildren:!this.state.showChildren
		})
	}
	render(){
		//数据处理
		var self=this;
		var data=this.state.data;
		function dataCl(pid){
			var narr=data.filter((v)=>{
				return v.parentId==pid;
			});
			if(narr.length){
				return narr.map((v)=>{
					return(
						<Lis title={v.name} 
						key={v.id}
						add={self.addL}
						delete={self.delete}
						id={v.id}
						inpu={self.change}
						 >
							{dataCl(v.id)}
						</Lis>
					)
				})
			}else{
				return;
			}
		}
		var list=dataCl(0);
		return(
			<div className="panel panel-primary">
				<div className="panel-heading">
					<button className="btn btn-success add"
					onClick={this.addZ}  >添加</button>
					<button className="btn btn-danger rm"
					onClick={this.deleteZ}
					 >删除</button>
					<button className="btn btn-info shrink"
					onClick={this.ssl} >收起<span className="caret"></span></button>
					{this.props.title}
				</div>
				<div className="panel-body">
					<div 
					style={{display:(this.state.showChildren?'block':'none')}}>
						{list}
					</div>
					
				</div>
			</div>
		)
	}
}
module.exports={
	Media:Media
}