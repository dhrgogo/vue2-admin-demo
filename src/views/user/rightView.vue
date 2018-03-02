<template>
  <div>
    <div class="right-view" v-show="show">
      <div class="header">小明信息</div>
      <div class="content">
        <div class="db_line">
          <span>姓名:</span>
          <span>{{userDetail.name}}</span>
        </div>
        <div class="db_line">
          <span>性别:</span>
          <span>{{userDetail.gender}}</span>
        </div>
        <div class="db_line">
          <span>英文名:</span>
          <span>{{userDetail.position}}</span>
        </div>
        <div class="db_line">
          <span>部门:</span>
          <span>{{userDetail.department}}</span>
        </div>
        <div class="db_line">
          <span>手机号:</span>
          <span>{{userDetail.mobile}}</span>
        </div>
        <div class="db_line">
          <span>职务:</span>
          <span>{{userDetail.position}}</span>
        </div>
        <div class="db_line">
          <span>禁用:</span>
          <span>{{userDetail.enable}}</span>
        </div>
      </div>
      <div class="footer">
        <button type="button" class="btn" @click="UserEdit"><span class="edit">编辑</span></button>
        <button type="button" class="btn"><span class="move">移动</span></button>
        <button type="button" class="btn"><span class="delete">删除</span></button>
      </div>
    </div>
    <!--<div class="module">-->
    <creat-user-view :editUser="userDetail"></creat-user-view>
    <!--</div>-->
  </div>
</template>

<script>
  // eslint-disable-next-line
  /* eslint-disable */
  import creatUserView from "@/views/user/creatUserView";

  export default {
    data() {
      return {
        dialog: false,
      }
    },
    name: "right-view",
    components: {
      creatUserView
    },
    props: ['userDetail', 'show'],
    methods: {
      UserEdit() {
        // this.leftModel();
        for(var i = 0; i < this.$children.length; i++) {
          if(this.$children[i].el_dialog != undefined){
            this.$children[i].el_dialog = true
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .right-view {
    display: flex;
    flex-direction: column;
    width: 400px;
    background: gainsboro;
    float: right;
    position: absolute;
    right: 0;
    top: 100px;
    bottom: 77px;
    z-index: 100;
    .header {
      height: 50px;
      width: 100%;
      top: 0;
      line-height: 50px;
      text-align: center;
      position: absolute;
      color: rgb(96, 98, 102);
      border-bottom: 1px solid #eee;
    }
    .content {
      top: 50px;
      bottom: 50px;
      width: 100%;
      position: absolute;
      .db_line {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-left: 25%;
      }
    }
    .footer {
      height: 50px;
      /*line-height: 50px;*/
      width: 100%;
      bottom: 0;
      /*text-align: center;*/
      position: absolute;
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #eee;
      .btn {
        height: 40px;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        margin-top: 5px;
        border-radius: 4px;
      }
      .move {

      }
      .delete {

      }
    }
  }
</style>
