<template>
  <div class="user-table">
    <right-view :userDetail="userDetail" :show="right_show"></right-view>
    <div class="in-table">
      <el-table ref="multipleTable"
                :data="tables"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                @row-click="openDetails">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="position" label="职务" show-overflow-tooltip></el-table-column>
        <el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mobile" label="手机" show-overflow-tooltip></el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="page">
      <div class="block">
        <!--<span class="demonstration">直接前往</span>-->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="15"
          layout="prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style>
  .user-table {
    width: 100%;
    background: #eee;
  }

  .in-table {
    margin-left: 20px;
    /*height: 800px;*/
  }

  .el-table__body-wrapper {
    height: 750px;
    overflow: auto;
  }

  .page {
    text-align: center;
  }
</style>
<script>
  // eslint-disable-next-line
  /* eslint-disable */
  // import locale from 'element-ui/lib/locale/lang/en'
  import {getUser} from '@/api/user'
  import RightView from "./rightView";
  import { mapGetters } from 'vuex'

  export default {
    components: {RightView},
    computed: {
      ...mapGetters([
        'right_show'
      ])
    },
    data() {
      return {
        currentPage: 1,
        userDetail: {},
        // right_show: false,
        multipleSelection: []
      }
    },
    props: {
      'tables': {
        type: Array
      },
      'count': {
        type: Number
      }
    },
    created() {
      // this.UserList()
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // UserList() {
      //   this.listLoading = true
      //   getUser().then(response => {
      //     this.tableData = response.data
      //     this.totalCount = response.totalCount
      //     // this.list = response.data.items
      //     this.listLoading = false
      //   })
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      openDetails(val) {
        this.$store.dispatch('rightShow', {right_show: true}).then((resp) => {
          this.loading = false;
          this.userDetail= val;
        }).catch((e) => {
          this.loading = false
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
