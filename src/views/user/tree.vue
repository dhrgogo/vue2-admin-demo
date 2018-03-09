<template>
   <div class="app-container">
      <!--<el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>-->
       <div class="btn">
         <div class="add-department inp">
           <el-button type="primary" icon="el-icon-plus">部门</el-button>
         </div>
         <div class="user-search-name inp">
          <el-input  placeholder="姓名" v-model="input1"></el-input>
         </div>
         <div class="user-search-department inp">
           <el-input  placeholder="部门" v-model="input2"></el-input>
         </div>
         <div class="user-search-phone inp">
           <el-input  placeholder="手机号" v-model="input3"></el-input>
         </div>
         <div class="user-search-btn inp">
           <el-button type="success" @click="UserList">查询</el-button>
         </div>
         <div class="user-search-btn inp">
           <el-button type="success" @click="UserCreat">创建</el-button>
         </div>
       </div>
       <div class="user" style="width:100%">
           <div class="department" style="width:15%">
              <el-tree class="filter-tree tree"
              :data="data"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              node-key="id"
              :render-content="renderContent">
                 ref="tree2">
              </el-tree>
           </div>
           <div class="userlist" style="width:85%">
              <user-table v-bind:tables="tableData" :count="totalCount"></user-table>
           </div>
       </div>
       <div class="module">
         <creat-user-view ></creat-user-view>
       </div>
   </div>
</template>
<script>
// eslint-disable-next-line
/* eslint-disable */
import UserTable from "@/views/user/UserTable";
import creatUserView from "@/views/user/creatUserView";
import { getUser , Creat , getDepartment} from '@/api/user'

let id = 1000;
export default {
  data() {
    return {
      input1:'',
      input2:'',
      input3:'',
      tableData:[],
      totalCount:0,
      filterText: '',
      // dialogVisible:false,
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  components: {
    UserTable,
    creatUserView
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  created() {
    this.Department();
    this.UserList();
  },
  methods: {
    open3() {
      this.$prompt("请输入部门名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //  inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
          this.$message({
            type: "success",
            message: "创建的部门是: " + value
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    edit(data) {
      // console.log("data", data);
      this.$prompt("请输入部门名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //  inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          //  const newChild = { id: data.id, label: value, children: [] };
          //  if (!data.children) {
          //    this.$set(data, "children", []);
          //  }
          data.label = value;
          this.$message({
            type: "success",
            message: "创建的部门是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    append(data) {
      this.$prompt("请输入部门名字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        //  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //  inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
          const newChild = { id: id++, label: value, children: [] };
          if (!data.children) {
            this.$set(data, "children", []);
          }
          data.children.push(newChild);
          this.$message({
            type: "success",
            message: "创建的部门是: " + value
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    renderContent(h, { node, data, store }) {
      return (
            <span  style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
            <span>{node.label}</span>
            </span>
            <a class="useredit">
            <el-button
            style="font-size: 12px;"
            icon="el-icon-edit-outline"
            type="text"
            on-click={() => this.edit(data)}>
           </el-button>
           <el-button
            style="font-size: 12px;"
            icon="el-icon-plus"
            type="text"
            on-click={() => this.append(data)}>
           </el-button>
           <el-button
            style="font-size: 12px;"
            type="text"
            icon="el-icon-close"
            on-click={() => this.remove(node, data)}>
          </el-button>
          </a>
          </span>
      );
    },
    Department(){
          getDepartment().then(response => {
            this.data = response.data
          })
        },
    UserList(){
        this.listLoading = true
        let params = {
            name:this.input1,
            department:this.input2,
            mobile:this.input3
        }
        getUser(params).then(response => {
          this.leftModel()
          this.tableData = response.data
          this.totalCount = response.totalCount
          this.listLoading = false
        })
    },
    leftModel(){
      this.$store.dispatch('rightShow', {right_show: false}).catch((e) => {
        this.listLoading = false
      })
    },
    UserCreat(){
      this.leftModel();
      for(var i = 0; i < this.$children.length; i++) {
        if(this.$children[i].el_dialog != undefined){
          this.$children[i].el_dialog = true
        }
      }
    }
  }
};
</script>
<style>
  .app-container {
    padding: 0px;
  }
  .user {
    display: flex;
  }
  a.useredit{
    /* background: green; */
    /* display: none; */
  }
  a.useredit:hover{
    /* background: rebeccapurple; */
    /* display: block; */

  }
  .el-tree-node__content span{
    font-size: 17px;
    font-family: "Microsoft YaHei", "微软雅黑";
    font-weight: 500;
  }
  .el-tree-node__content:hover{
    background: deepskyblue;
  }
  .btn{
    background: #eee;
    height: 50px;
    line-height: 50px;
    /*margin-left: 9px;*/
    display: flex;
  }
  .btn .inp{
    padding-left:10px;
  }
</style>
