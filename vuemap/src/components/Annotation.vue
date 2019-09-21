<template>
    <div id="app">
            <el-row>
                <el-col :span="12" :offset="6">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="IF" prop="IF">
                            <el-input v-model="ruleForm.IF"></el-input>
                        </el-form-item>
                        <el-form-item label="Topic" prop="Topic">
                            <el-input v-model="ruleForm.Topic"></el-input>
                        </el-form-item>
                        <el-form-item label="Policy" prop="Policy">
                            <el-input v-model="ruleForm.Policy"></el-input>
                        </el-form-item>
                        <el-form-item label="ID" prop="ID">
                            <el-input v-model="ruleForm.ID"></el-input>
                        </el-form-item>
                        <el-form-item label="Name" prop="Name">
                            <el-input v-model="ruleForm.Name"></el-input>
                        </el-form-item>
                        <el-form-item label="PointcutType" prop="PointcutType">
                            <el-input v-model="ruleForm.PointcutType"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="活动名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户邮箱" prop="email">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="客户年龄" prop="age">
                            <el-input type="age" v-model.number="ruleForm.age" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date1">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2">
                                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="活动性质" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                <el-checkbox label="地推活动" name="type"></el-checkbox>
                                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="线上品牌商赞助"></el-radio>
                                <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div v-show="show">
                <p v-html="ans">{{this.ans}}</p>
            </div>

        </div>
</template>>
<script>
export default {
  data () {
    return {
      show: false,
      //   age: '',
      ruleForm: {
        IF: '',
        Topic: '',
        Policy: '',
        ID: '',
        Name: '',
        PointcutType: ''
        // name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: '',
        // email: '',
        // age: ''
      },
      rules: {
        IF: [{
          required: true,
          message: '条件不能为空',
          trigger: 'blur'
        }],
        Topic: [{
          required: true,
          message: '场景主体不能为空',
          trigger: 'blur'
        }]
        // age: [{
        //   required: true,
        //   message: '年龄不能为空'
        // },
        // {
        //   type: 'number',
        //   message: '年龄必须为数字值'
        // }

        // ],
        // email: [{
        //   required: true,
        //   message: '请输入邮箱地址',
        //   trigger: 'blur'
        // },
        // {
        //   type: 'email',
        //   message: '请输入正确的邮箱地址',
        //   trigger: ['blur', 'change']
        // }
        // ],
        // name: [{
        //   required: true,
        //   message: '请输入活动名称',
        //   trigger: 'blur'
        // }],
        // region: [{
        //   required: true,
        //   message: '请选择活动区域',
        //   trigger: 'change'
        // }],
        // date1: [{
        //   type: 'date',
        //   required: true,
        //   message: '请选择日期',
        //   trigger: 'change'
        // }],
        // date2: [{
        //   type: 'date',
        //   required: true,
        //   message: '请选择时间',
        //   trigger: 'change'
        // }],
        // type: [{
        //   type: 'array',
        //   required: true,
        //   message: '请至少选择一个活动性质',
        //   trigger: 'change'
        // }],
        // resource: [{
        //   required: true,
        //   message: '请选择活动资源',
        //   trigger: 'change'
        // }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ans = 'IF ' + this.ruleForm.IF + ' THEN ' + this.ruleForm.Topic
          if (this.ruleForm.Policy !== '') {
            this.ans += ' ' + 'policy: ' + this.ruleForm.Policy
          }
          if (this.ruleForm.ID !== '') {
            this.ans += ' ' + 'id: ' + this.ruleForm.ID
          }
          if (this.ruleForm.Name !== '') {
            this.ans += ' ' + 'name: ' + this.ruleForm.Name
          }
          if (this.ruleForm.PointcutType !== '') {
            this.ans += ' ' + 'pointcutType: ' + this.ruleForm.PointcutType
          }
          this.show = true
        //   alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>>

<style scoped>
.ans{
  color: #000;
  text-align: left
}
.title{
  text-align:left;
}
</style>
