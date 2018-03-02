<template>
  <el-dialog
    title="创建人员"
    :visible.sync="el_dialog"
    width="450px"
    :before-close="handleClose"
    center>
    <div class="out-form">
      <el-form
        :model="form"
        label-width="70px"
        :rules="rules"
        size="mini">
        <el-form-item label="姓名:" prop="name">
          <el-input class="inp" v-model="form.name" size="large"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" large prop="mobile">
          <el-input class="inp" v-model="form.mobile" size="large"></el-input>
        </el-form-item>
        <el-form-item label="职务:" large>
          <el-input class="inp" v-model="form.position" size="large"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="form.gender" size="medium">
            <el-radio border :label="1">男</el-radio>
            <el-radio border :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门:" large>
          <el-input class="inp" v-model="form.department" size="large"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" large prop="email">
          <el-input class="inp" v-model="form.email" size="large"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel(false)">取 消</el-button>
      <el-button type="primary" @click="dialogVisible(false)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // eslint-disable-next-line
  /* eslint-disable */
  import {getUser, Creat , Update } from '@/api/user'

  export default {
    name: "creat-user-view",
    data() {
      return {
        el_dialog: false,
        form: {
          name: '',
          mobile: '',
          position: '',
          gender: '',
          department: '',
          email: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        },
        formLabelWidth: '100px'
      };
    },
    props: ['editUser'],
    computed: {},
    beforeUpdate: function () {
      if (this.editUser) {
        this.form = this.editUser
      }
    },
    methods: {
      handleClose(done) {
        this.$emit('showCityName');
        this.$confirm('确认关闭？').then(() => {
          done();
        }).catch(_ => {
        });
      },
      dialogVisible(type) {
        this.el_dialog = type;
        if (this.editUser) {
          Update(this.form)
        } else {
          if (this.form.name && this.form.mobile && this.form.email)
            Creat(this.form)
          else
            return
        }
      },
      cancel(type) {
        this.el_dialog = type;
      }
    }
  }
</script>

<style scoped>
  .inp {
    width: 250px;
  }

  .out-form {
    display: flex;
    justify-content: center;
  }
</style>
