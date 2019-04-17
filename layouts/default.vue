<template>
  <v-app>
    <v-toolbar fixed app color="light-blue" dark>
      <v-toolbar-title class="text-xs-center">
        {{title + ' '+ build.version}}
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout column justify-center align-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-3">
              <v-card-text class="text-xs-center">
                <p>整个班的安全作业都无忧了 再也不用催家长/学生们了～
                  <br>为了保障每个同学能够顺利完成安全作业。完成速度会慢点，大概需要两分钟左右时间 请不要重复提交。
                  
                </p>
              </v-card-text>
              <v-card-actions>
                <v-form ref="form" v-model="valid" lazy-validation style="margin:auto;" class="text-xs-center">
                  <v-text-field v-model="username" prepend-icon="account_circle" :rules="usernamerules" label="教师用户名" required></v-text-field>
                  <v-text-field v-model="password" prepend-icon="https" :rules="passwordrules" label="密码" required type="password"></v-text-field>
                  <v-btn :disabled="!valid" @click="login">登录</v-btn>
                </v-form>
              </v-card-actions>
            </v-card>
          </v-flex>
        <v-flex xs12 sm8 md6>
          <v-btn class="green" dark v-if="!timeline_show" @click="timeline_show = true">展开更新日志</v-btn>
        </v-flex>
        <v-timeline v-if="timeline_show">
          <v-timeline-item
            v-for="(year, i) in timelines"
            :key="i"
            :color="year.color"
            small
          >
          <span
            slot="opposite"
            :class="`headline font-weight-bold ${year.color}--text`"
            v-text="year.time"
          ></span>
          <div class="py-3">
            <div>
              {{year.text}}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      
    <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card class="blue-grey lighten-5">
        <v-toolbar color="blue">
          <v-btn icon v-show="progress_value > 99" @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      <v-container>
        <v-alert :value="true" type="success">
          {{welcome_text}}
        </v-alert>
      <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">选择课程</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">选择学生账号</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">日志输出</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-alert :value="true" type="info">
          温馨提示 已授课的课程并且没完成的 才会在这边出现哦～
        </v-alert>
        <v-data-table
        v-model="t1"
        hide-actions
        :headers="[{text:'标题',value:'title'}]"
        :items="v1"
        :value="vv1"
        select-all="blue"
        item-key="title"
        class="elevation-5"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.title }}</td>
    </template>
  </v-data-table>
        <v-btn flat @click="dialog = false">退出登录</v-btn>
        <v-btn
          color="blue"
          @click="step(2)"
        >
          下一步
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-alert :value="true" type="error">
          学生密码会在做题时候自动重置为 123456
        </v-alert>
        <v-data-table
        v-model="t2"
        hide-actions
        :headers="[{text:'用户名',value:'username'},{text:'密码',value:'password'}]"
        :items="v2"
        :value="vv2"
        select-all="pink"
        item-key="username"
        class="elevation-5"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.username }}</td>
      <td>{{ props.item.password }}</td>
    </template>
  </v-data-table>
        <v-btn
          color="blue"
          @click="e1 = 1"
        >
          上一步
        </v-btn>
        <v-btn
          color="blue"
          @click="step(3)"
        >
          开始
        </v-btn>
      </v-stepper-content>
      <v-stepper-content step="3" class="text-xs-center">
        <p>已完成 {{ Math.round(progress_value)}}%</p>
        <v-progress-linear
        :indeterminate="progress_query"
        :active="progress_show"
        v-model="progress_value"
        color="pink lighten-2"
        background-color="green lighten-2"
        :query="true"
        ></v-progress-linear>
         <v-btn  color="error" v-show="progress_value > 99" large @click="dialog = false">关闭</v-btn>
          <p>{{donate_description}}</p>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
      </v-container>
      </v-card>
    </v-dialog>
    
  </v-layout>
  <v-dialog v-model="dialog1" hide-overlay persistent width="300" dark>
      <v-card color="blue">
        <v-card-text>
          Loading....
          <v-progress-linear  indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color=snackbar_color
      :top="true"
    >
      {{ snackbar_text }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </v-layout>
      </v-container>
    </v-content>
    <v-footer class="pa-3">
    <v-spacer></v-spacer>
    <div>{{footer}} Build ver {{build.version}} | <span :title="build.hash">#{{build.hash.slice(0,6)}}</span></div>
  </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'


if (process.client && process.env.NODE_ENV === 'production') {
  console.log(`%c 安全教育平台助手 %c Copyright \xa9 2018-%s \n  __                                               \n/  |                                              \n$$ |____   __    __   ______    ______   __    __ \n$$      \ /  |  /  | /      \  /      \ /  |  /  |\n$$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |$$ |  $$ |\n$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |\n$$ |  $$ |$$ \__$$ |$$ \__$$ |$$ \__$$ |$$ \__$$ |\n$$ |  $$ |$$    $$/ $$    $$ |$$    $$ |$$    $$ |\n$$/   $$/  $$$$$$/   $$$$$$$ | $$$$$$$ | $$$$$$$ |\n                    /  \__$$ |/  \__$$ |/  \__$$ |\n                    $$    $$/ $$    $$/ $$    $$/ \n                     $$$$$$/   $$$$$$/   $$$$$$/  `, 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:4em;color:#00bbee;-webkit-text-fill-color:#ff69b4;-webkit-text-stroke: 1px #ff69b4;', "font-size:12px;color:#999999;", (new Date).getFullYear());
  axios.defaults.baseURL = 'https://aq.gayhub.xyz:8443/api'
}else{
  axios.defaults.baseURL = 'http://127.0.0.1:3000/api'
}
export default {
    
    data: () => ({
      dialog: false,
      e1: 0,
      t1: [],
      v1: [],
      vv1: [],
      t2: [],
      v2: [],
      vv2: [],
      timelines: [
      ],
      timeline_show : false,
      drawer: undefined,
      build: require('~/build.json'),
      footer: 'Copyright © huggy, 2019',
      title: '安全教育平台助手',
      progress_value: 0,
      progress_query: true,
      progress_show: true,
      
      dialog1: false,
      special_data: [],
      welcome_text: '',
      snackbar: false,
      donate_description: undefined,
      class:{},
      snackbar_text: '',
      snackbar_color: '',
      valid: true,
      username: '',
      usernamerules: [
        v => !!v || '用户名是必须的'
      ],
      password: '',
      passwordrules: [
        v => !!v || '密码是必须的'
      ],
    }),
    async mounted(){
      try {
        let data = await axios('siteinfo')
        if(data){
          this.footer = data.data.footer
          this.joinurl = data.data.joinqr
          this.timelines = data.data.timeline
          this.donate_description = data.donate_description
        }
      } catch (error) {
        alert('您的网络或者服务器暂时不可用 无法进行任何操作 可以尝试刷新页面')
      }
  },
    methods: {
      async login () {
        if (this.$refs.form.validate()) {
          this.valid = false
          this.e1 = 1
          this.dialog1 = true
          let data = await axios.post('getstudents_by_teacher_account', {
            username: this.username,
            password: this.password,
          }).catch(e=>{
            this.snackbar_text = "发生错误"
            this.snackbar_color = "error"
            this.snackbar = true
          })
          this.dialog1 = false
          if(data.data.ok){
            data = data.data
            this.class = data
            this.valid = true
            this.snackbar_text = "登录成功"
            this.snackbar_color = "info"
            this.snackbar = true
            this.welcome_text = '欢迎你 ' + this.username + ' 您的班级一共有 ' + this.class.students.length + ' 位学生 一共还有 ' + this.class.skills.length + '次作业未完成'
            this.special_data = (await axios('data').catch(e=>{
              this.snackbar_text = "发生错误"
              this.snackbar_color = "error"
              this.snackbar = true
            })).data
            this.v1 = this.special_data.concat(data.skills)
            this.v2 = data.students
            if(this.v1.length > 0){
              this.dialog = true
            }else{
              this.snackbar_text = "您的班级已经完成了全部已完成的作业～"
              this.snackbar_color = "success"
              this.snackbar = true
            }
          }else{
            this.snackbar_text = "登录失败 账号或密码错误 请检查是不是开头大写了"
            this.snackbar_color = "error"
            this.snackbar = true
            this.valid = false
          }
        }
      },
      step(s){
        switch (s) {
          case 2:
            if(this.t1.length > 0)
              this.e1 = 2
            break;
          case 3:
            if(this.t2.length > 0){
              this.dialog1 = true
              setTimeout(() => {
                this.e1 = 3
                this.dialog1 = false
                
                setTimeout(() => {
                  this.progress_query = false
                }, 1000);
              }, 1000);
              this.run(0)
            }
          default:
            break;
        }
        setTimeout(() => {
          this.$vuetify.goTo(0)
        }, 100);
      },
      async run(sid){
        if(!this.progress_query)
          this.progress_value = ((sid + 1) / this.t2.length) * 100
        let w = this.t1
        let {studentid,username,password} = (this.t2)[sid]
        let skillswork = w.filter((e,i,a)=>{
          return e.type === 0
        })
        if(skillswork.length > 0)
          await axios.post('work',{
            studentid: studentid,
            username: username,
            password: password,
            data: JSON.stringify(skillswork),
            city: this.class.city
          })
        let specialwork_ = w.filter((e,i,a)=>{
          return e.type === 1
        })
        let specialwork = []
        for (let i = 0; i < specialwork_.length; i++) {
          specialwork.push(i)
        }
        if(specialwork.length > 0)
          await axios.post('workspecial',{
            studentid: studentid,
            username: username,
            password: password,
            data: JSON.stringify(specialwork),
            city: this.class.city
          })
        if(sid < this.t2.length -1)
          this.run(sid + 1)
        else{
          this.snackbar_text = "队列已完成"
          this.snackbar_color = "success"
          this.snackbar = true
        }
      }
    }
  }
</script>
