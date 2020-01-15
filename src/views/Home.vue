<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/assets/images/logo.png" /> -->
    <!-- <HelloWorld :info="info" @sunchangedata="getData" :msg="info" /> -->
	<h3>查询/新增</h3>
	<ul class="condition_">
		<li><label for="">用户名</label><input v-model="params.userName" type="text"></li>
		<li><label for="">感情状况</label><input v-model="params.singleStatus" type="text"></li>
		<li><label for="">性别</label><input v-model="params.sex" type="text"></li>
		<li><label for="">手机号</label><input v-model="params.phone" type="text"></li>
		<li><label for="">年龄</label><input v-model="params.age" type="text"></li>
	</ul>
	<div class="botton_">
		<span class="btn_" @click="getlist">点击查询</span>
		<span class="btn_" @click="createUser">新增用户</span>
	</div>
	<h4>用户列表<span class="float-rt">共 {{users.total}} 条</span></h4>
	<table>
		<tr><th>用户名</th><th>性别</th><th>手机</th><th>感情状况</th><th>年龄</th><th>创建时间</th><th>修改时间</th><th>操作</th></tr>
		<tr v-for="item of users.list" :key="item.id">
			<td>{{item.userName}}</td>
			<td>{{item.sex}}</td>
			<td>{{item.phone}}</td>
			<td>{{item.singleStatus}}</td>
			<td>{{item.age}}</td>
			<td>{{item.createTime}}</td>
			<td>
				<span v-if="item.updateTime">{{item.updateTime}}</span>
				<span v-else>--</span>
			</td>
			<td>
				<span class="remove_" @click="editFunc(item)">修改</span>&nbsp;&nbsp;&nbsp;
				<span class="remove_" @click="removeUser(item.id)">删除</span>
			</td>
		</tr>
	</table>
	<hr style="margin: 15px 0;" />
	<h3>修改</h3>
	<ul class="condition_">
		<li><label for="">用户名</label><input v-model="update.userName" type="text"></li>
		<li><label for="">感情状况</label><input v-model="update.singleStatus" type="text"></li>
		<li><label for="">性别</label><input v-model="update.sex" type="text"></li>
		<li><label for="">手机号</label><input v-model="update.phone" type="text"></li>
		<li><label for="">年龄</label><input v-model="update.age" type="text"></li>
	</ul>
	<div class="botton_">
		<span class="btn_" @click="updatelist">确认修改</span>
	</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
	public $axios:any;
	info = "你不是好人？";
	public ip = "http://172.20.37.161:3036";
	// public ip = "/api"
	info2 = 'hahaha';
	params = {
		userName:"",
		singleStatus:"",
		sex:"",
		phone:"",
		age:"",
	};
	update = {
		id:"",
		userName:"",
		singleStatus:"",
		sex:"",
		phone:"",
		age:"",
	};
	users = {
		list:[],
		total:0
	};
	created() {
		this.getlist();
	}
	getlist(){
		let _this = this;
		let obj = this.deleteObjEmpty(_this.params); //清空没有填写的字段
		_this.$axios.get(_this.ip + '/lists/query', {params: obj}).then(function (res:any) {
			if(res.data.code == 1){
				_this.users = res.data.data;
			}else{
				_this.users.list = [];
				_this.users.total = 0;
			}
		}).catch(function (error:any) {
			console.log(error);
		});
	}
	createUser(){
		let _this = this;
		let obj = this.deleteObjEmpty(_this.params); //清空没有填写的字段
		let l = Object.keys(obj).length;
		if(l == 5){
			_this.$axios.post(_this.ip + '/lists/post/create', obj).then(function (res:any) {
				if(res.data.code == 1){
					_this.params = _this.emptyObjVal(_this.params);
					_this.getlist();
				}else{
					alert(res.data.msg)
				}
			}).catch(function (error:any) {
				console.log(error);
			});
		}else{
			alert('请输入所有信息！')
		}
	}
	removeUser(id:string) { //删除
		let _this = this;
		_this.$axios.post(_this.ip + '/lists/post/remove', {id}).then(function (res:any) {
			if(res.data.code == 1){
				_this.getlist();
			}
		}).catch(function (error:any) {
			console.log(error);
		});
	}
	editFunc(obj:any) { //点击修改按钮
		this.update = Object.assign({},obj);
	};
	updatelist(){ //修改
		let _this = this;
		let obj = this.deleteObjEmpty(_this.update); //清空没有填写的字段
		let l = Object.keys(obj).length;
		if(l >= 7){
			_this.$axios.post(_this.ip + '/lists/post/update', obj).then(function (res:any) {
				if(res.data.code == 1){
					_this.update = _this.emptyObjVal(_this.update);
					_this.getlist();
				}
			}).catch(function (error:any) {
				console.log(error);
			});
		}else{
			alert('修改信息所有项必填！')
		}
	}
	public deleteObjEmpty(obj:any) { //清除对象中的空属性
		for (var i in obj) {
			if (obj[i] === '' || obj[i] === null) {
				delete obj[i]
			}
		}
		return obj;
	};
	public emptyObjVal(obj:any){
		for(var i in obj){
			obj[i] = ""
		}
		return obj
	};
	getData(val:any){
		this.info = val;
	};
}
</script>

<style lang="less" scoped>
	table{ border: 1px solid #ddd; width: 100%; border-collapse:collapse;
		tr{ text-align: center;
			&:not(:last-child){border-bottom: 1px solid #ddd;}
			th{ background: #eee;}
			th,td{ height: 40px;
				&:not(:last-child){ border-right: 1px solid #ddd;}
			}
			td{
				.remove_{ cursor: pointer; color: #E7BA5A;
					&:hover{ color:red;}
				}
			}
		}
	}
	.home{ text-align: left;}
	.condition_{ overflow: hidden;
		li{ width: 90%/3; float: left; margin-left: 5%; height: 40px; line-height: 40px; overflow: hidden;
			&:nth-child(3n+1){ margin-left: 0;}
			label{ width: 30%; float: left;}
			input{ width: 60%;float: right;height: 30px; margin-top: 5px; border: 1px solid #ddd;}
		}
	}
	.botton_{ height: 40px;
		.btn_{ height: 30px; line-height: 30px; cursor: pointer; padding: 0 20px; display: inline-block; background: #E0DAB7; float: left; margin: 5px 20px 0 0;}
	}
</style>
