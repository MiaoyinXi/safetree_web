<template>
<v-app>
  <v-app-bar app fixed color="blue lighten-1" dark>
    <v-toolbar-title class="text-xs-center">
      {{title + ' ' + build.version}}
    </v-toolbar-title>
  </v-app-bar>
  <v-content>
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-3">
            <v-card-text>
              <p style="text-align:center;">整个班的安全作业都无忧了 再也不用催家长/学生们了～
                <br>为了保障每个同学能够顺利完成安全作业。完成速度会慢点，大概需要两分钟左右时间 请不要重复提交。
              </p>
              <h2 style="text-align:center;color:red;">请大家低调使用 不要宣传</h2>
            </v-card-text>
            <v-card-actions>
              <!--<v-textarea name="teachers_login" label="批量登录老师账号" hint="账号[空格]密码 每个一行"></v-textarea>-->
              <v-form ref="form" v-model="valid" lazy-validation style="margin:auto;" class="text-xs-center">
                <v-text-field v-model="username" prepend-icon="account_circle" :rules="usernamerules" label="教师用户名" required></v-text-field>
                <v-text-field v-model="password" prepend-icon="https" :rules="passwordrules" label="密码" required type="password"></v-text-field>
                <v-btn color="primary" :disabled="!valid" :block=true @click="login">登录</v-btn>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-if="joinurl" xs12 sm8 md6>
          <v-card>
            <v-card-text class="text-xs-center">
              <img :src="joinurl" style="width:200px;height:200px;">
              <p>微信反馈群</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-timeline>
          <v-timeline-item
            v-for="(year, i) in timelines"
            v-show="i == 0 || timeline_show"
            :key="i"
            :color="year.color"
            small>
            <span
              slot="opposite"
              :class="`headline font-weight-bold ${year.color}--text`"
              v-text="year.time"></span>
              <div class="py-3">
              <div>
                {{year.text}}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
        <v-flex>
          <v-btn v-if="!timeline_show" @click="timeline_show = true">展开更新日志</v-btn>
        </v-flex>
        <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
          <v-toolbar dark color="primary lighten-1">
            <v-btn icon dark @click="dialog = false" v-show="progress_value || e1 !== 3">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card>
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
                  <v-stepper-step step="3">运行</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-alert :value="true" type="info">
                      温馨提示 已授课的课程并且没完成的 才会在这边出现哦～
                      <br>
                      专题课程会一直显示在下面列表，请不要多次提交。
                    </v-alert>
                    <v-data-table
                      v-model="t1"
                      :headers="[{text:'标题',value:'title',sortable:false}]"
                      :items-per-page=200
                      :items="v1"
                      hide-default-footer
                      item-key="title"
                      show-select>
                      <template v-slot:top>
                      </template>
                    </v-data-table>
                    <v-card-actions>
                      <v-btn @click="dialog=false">退出登录</v-btn>
                      <v-btn color="primary" @click="step(2)" dark>下一步</v-btn>
                    </v-card-actions>
                    <v-card>
                      <v-card-text>
                        <div style="text-align:center;">
                          <video width="400" controls>
                          <source src="@/assets/input_special_url.mp4" type="video/mp4">
                        </video>
                        </div>
                        <v-alert :value="true" type="info">
                          请按照视频所示，把专题作业链接复制到下面
                        </v-alert>
                        </v-card-text>
                        <v-card-actions>
                          <v-text-field label="专题作业链接" v-model="special_url_input" required type="text"></v-text-field>
                        </v-card-actions>
                        <v-btn color="primary" block @click="get_special(special_url_input)">提交</v-btn>
                    </v-card>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-alert :value="true" type="error">
                      学生密码会在做题时候自动重置为 123456
                    </v-alert>
                    <v-data-table
                      v-model="t2"
                      hide-default-footer
                      show-select
                      :items-per-page=200
                      :headers="[{text:'用户名',value:'username'},{text:'密码',value:'password'}]"
                      :items="v2"
                      :value="vv2"
                      item-key="username">
                      <template v-slot:top>
                      </template>
                    </v-data-table>
                    <v-card-actions>
                      <v-btn @click="e1 = 1">上一步</v-btn>
                      <v-btn color="primary" @click="step(3)">开始</v-btn>
                    </v-card-actions>
                  </v-stepper-content>
                  <v-stepper-content step="3" style="text-align:center;">
                    <p>提交队列 已完成 {{ Math.round(progress_value)}}%</p>
                    <v-progress-linear
                      :indeterminate="progress_query"
                      :active="progress_show"
                      v-model="progress_value"
                      color="pink lighten-2"
                      background-color="green lighten-2"
                      :query="true"></v-progress-linear>
                      <p>{{donate_description}}</p>
                      <v-layout justify-center>
                        <donate></donate>
                      </v-layout>
                    <p>以下进度仅供参考 上面的进度条走完其实就可以了</p>
                      <v-row>
                        <v-col v-for="c in complete_status" :key="c.username" lg="2" cols="auto">
                          <v-card :dark="c.dark === true" :color="c.color">
                            <v-overlay :absolute=true :value="c.loading == true">
                              <v-progress-circular
                                indeterminate
                                color="primary"
                              ></v-progress-circular>
                            </v-overlay>
                            <v-card-text style="text-align:center;">
                              {{c.name}}
                            </v-card-text>
                          </v-card>
                        <!--<v-card>
                            <v-card-text style="text-align:center;">
                              {{
                                (c.data.map((x)=>{
                                  return x.type + '|' + x.username + ' -> '  + x.value
                                })).join("\n")
                              }}
                            </v-card-text>
                        </v-card>-->
                      </v-col>
                    </v-row>
                  </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-container>
            </v-card>
          </v-dialog>
          <v-overlay :value="overlay">
            <p>网络不可用/服务器崩溃 请稍后刷新看看</p>
            <p>您也可以发邮件 <code>i@huggy.moe</code> 来反馈</p>
          </v-overlay>
          <v-overlay style="z-index:233;" :value="loading_overlay">
            <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
          </v-overlay>
          <v-dialog persistent v-model="terms" width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">安全教育平台助手使用条款</span>
              </v-card-title>
              <v-card-text>上次更新 2020-04-15 23:00:00
                <br><br>安全教育平台助手是由 huggy 提供的服务，本服务条款（下称“服务条款”）是您与 huggy 关于您（“您”或“用户”）访问和使用安全教育平台助手的主要协议。
                <h3>隐私策略</h3>
                <span>1.您的IP地址会被用来识别安全教育平台的登录网址，因此不同地方的ip使用本服务可能会登录不了，根据 gdpr 政策，本站不向欧盟国家提供服务。</span>
                <br>
                <span>2.您登录使用的账号/密码以及老师账号/学生账号的 Cookie 可能会在日志中被记录下来，以便供错误跟踪，处理</span>
                <br>
                <span>3.本站绝对不向第三方透露/售卖任何资料与数据</span>
                <h3>免责声明</h3>
                <span>您在本网站的任何操作若导致被您所在的市安全教育平台黑名单、问责、罚款，被上级领导问话，均与作者无关，作者不承担任何相关责任。</span>
                <h3>使用</h3>
                <span>本网站只需要输入老师的安全教育平台密码 登录 点击需要完成的课程，等待几分钟完成即刻完成班上的安全作业。</span>
                <h3>技术支持</h3>
                <span>如果您有任何问题、建议、意见，或者程序运行中遇到了任何错误请发邮件到 <code>i@huggy.moe</code>来反馈</span>
                <h3>开源</h3>
                <span>本程序前端在 <a href="https://github.com/xiao201261/safetree_web" target="_github">https://github.com/xiao201261/safetree_web</a> 中开源并且遵循 <a href="https://github.com/xiao201261/safetree_web/blob/master/LICENSE" target="_github" >MIT</a> 开发协议。
                  <br>本程序后端暂时不开源，也许将来不维护后会放出源码。部分登录/做题代码可以参考我在2017年的 <a href="https://gist.github.com/xiao201261/e623f93b7bcb93dddcf24cef6f0713ad" target="_gist">gist</a> 供研究。
                </span>
                <br><br><br><br><br><br>
                <h1>Made with <span style="color:#ff69b4;">♥</span></h1>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green lighten-1" dark @click="blank_page">不同意</v-btn>
                <v-btn color="red" @click="terms_agree">同意</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-snackbar
            v-model="snackbar"
            :color=snackbar_color
            :top="true">
            {{ snackbar_text }}
          </v-snackbar>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>{{footer}} | <span :title="'hash: ' + build.hash">#{{build.hash.slice(0,6)}}</span></div>
    </v-footer>
  </v-app>
</template>

<script>

import axios from 'axios'
import donate from './components/donate.vue'

console.log(`%c 安全教育平台助手 %c Copyright \xa9 2018-%s \n  __                                               \n/  |                                              \n$$ |____   __    __   ______    ______   __    __ \n$$      \ /  |  /  | /      \  /      \ /  |  /  |\n$$$$$$$  |$$ |  $$ |/$$$$$$  |/$$$$$$  |$$ |  $$ |\n$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |\n$$ |  $$ |$$ \__$$ |$$ \__$$ |$$ \__$$ |$$ \__$$ |\n$$ |  $$ |$$    $$/ $$    $$ |$$    $$ |$$    $$ |\n$$/   $$/  $$$$$$/   $$$$$$$ | $$$$$$$ | $$$$$$$ |\n                    /  \__$$ |/  \__$$ |/  \__$$ |\n                    $$    $$/ $$    $$/ $$    $$/ \n                     $$$$$$/   $$$$$$/   $$$$$$/  `, 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:4em;color:#00bbee;-webkit-text-fill-color:#ff69b4;-webkit-text-stroke: 1px #ff69b4;', "font-size:12px;color:#999999;", (new Date).getFullYear())
axios.defaults.baseURL = 'https://aq.gayhub.xyz:18444/api'
//axios.defaults.baseURL = 'http://127.0.0.1:3000/api'
if(process.env.NODE_ENV === 'production')
  axios.defaults.baseURL = 'https://aq.gayhub.xyz:8443/api'

export default {
    
    data: () => ({
      dialog: false,
      e1: 1,
      t1: [],
      v1: [],
      vv1: [],
      t2: [],
      v2: [],
      vv2: [],
      timelines: [],
      timeline_show : false,
      drawer: undefined,
      build: require('../build.json'),
      footer: 'Copyright © huggy, 2020',
      title: '安全教育平台助手',
      progress_value: 0,
      progress_query: true,
      progress_show: true,
      overlay: false,
      special_url: '',
      special_url_input: '',
      joinurl: false,
      loading_overlay: false,
      special_data: [],
      welcome_text: '',
      snackbar: false,
      donate_description: undefined,
      class:{},
      snackbar_text: '',
      snackbar_color: '',
      terms: false,
      valid: true,
      username: '',
      custom_specials: [],
      usernamerules: [
        v => !!v || '用户名是必须的'
      ],
      password: '',
      passwordrules: [
        v => !!v || '密码是必须的'
      ],
      teacher_cookie: '',
      complete_status: []
    }),
    async mounted(){
      // 夜间模式判断，来源忘记哪里了 随便搜索下吧？
      let media = window.matchMedia('(prefers-color-scheme: dark)');
      let darkcallback = (e) => {
          let prefersDarkMode = e.matches;
          if (prefersDarkMode) {
            this.$vuetify.theme.dark = true
          }else{
            this.$vuetify.theme.dark = false
          }
      }
      if (typeof media.addEventListener === 'function') {
          media.addEventListener('change', darkcallback)
      } else if (typeof media.addListener === 'function') {
          media.addListener(darkcallback)
      }
      darkcallback(media)
      try {
        //网站更新检测
        let data = await axios({
          url: '/version.json?_t' + new Date().getTime(),
          baseURL: './'
        })
        let urlhash = new URL(location.href).searchParams.get('hash')
        if(urlhash)
          window.history.replaceState( {} , '', '/' );
        if(data.data.hash !== this.build.hash && urlhash !== data.data.hash)
          location.reload(true) //听说 直接reload(true) 就能忽略掉缓存 那我就这样试了 上面urlhash算是遗留代码 这半年内更新了后在去掉
        //  location.href = '?hash=' + data.data.hash
        
      } catch (error) {
        this.overlay = true // 断网提示
      }
      if(!localStorage.terms1){
        this.terms = true
      }
      try {
        let data = await axios('siteinfo')
        if(data){
          this.footer = data.data.footer
          this.joinurl = data.data.joinqr
          this.timelines = data.data.timeline
          this.donate_description = data.donate_description
        }
      } catch (error) {
        this.overlay = true
      }
  },
    methods: {
      async login () {
        if (this.$refs.form.validate()) {
          this.e1 = 1
          this.loading_overlay = true
          let data = await axios.post('login', {
            username: this.username,
            password: this.password,
          }).catch(e=>{
            this.snackbar_text = "发生错误"
            this.snackbar_color = "error"
            this.snackbar = true
          })
          this.loading_overlay = false
          if(data.data.ok){
            data = data.data
            this.class = data
            this.valid = true
            this.snackbar_text = "登录成功"
            this.snackbar_color = "info"
            this.snackbar = true
            this.welcome_text = '欢迎你 ' + this.username + ' 您的班级一共有 ' + this.class.students.length + ' 位学生 一共还有 ' + this.class.skills.length + ' 次技能训练作业未完成'
            this.teacher_cookie = data.cookie
            this.special_url = data.special_url
            this.special_data = (await axios('data').catch(e=>{
              this.snackbar_text = "发生错误"
              this.snackbar_color = "error"
              this.snackbar = true
            })).data
            /*if(localStorage.teachers){
              let teachers = JSON.parse(localStorage.teachers)
              teachers.push({
                username: this.username,
                cookie: data.cookie
              })
              localStorage.teachers = JSON.stringify(teachers)
            }
            */
            this.v1 = this.special_data.concat(data.skills).concat(this.custom_specials)
            this.v2 = data.students
            this.dialog = true
            if(this.v1.length === 0){
              this.snackbar_text = "您的班级已经完成了全部已完成的作业 要做专题作业请继续"
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
      blank_page () {
        document.write('ok')
      },
      terms_agree () {
        this.terms = false
        localStorage.terms1 = 'ok'
      },
      step(s){
        switch (s) {
          case 2:
            if(this.t1.length > 0)
              this.e1 = 2
              this.t2 = []
            break
          case 3:
            if(this.t2.length > 0){
              this.loading_overlay = true
              this.complete_status = this.t2
              setTimeout(() => {
                this.e1 = 3
                this.loading_overlay = false
                
                setTimeout(() => {
                  this.progress_query = false
                }, 1000)
              }, 1000)
              this.run(0)
            }
          default:
            break
        }
        setTimeout(() => {
          this.$vuetify.goTo(0)
        }, 500)
      },
      async get_special(url) {
          let data = await axios.post('get_special',{url,city: this.class.city})
          if(data.data.ok){
            this.v1.push(data.data)
            this.custom_specials.push(data.data)
          }
      },
      async check_complete(sid,count,retry = 0){
        if(this.complete_status.length === 0)
          return true
        let data = await axios('log/' + (this.t2)[sid].studentid)
        if(this.complete_status[sid].loading === undefined)
          this.$set(this.complete_status[sid],'loading',true)
        setTimeout(()=>{
          if(data.data){
            data = data.data
            this.$set(this.complete_status[sid],'text',data)
            if(data.length >= count){
              this.$set(this.complete_status[sid],'loading',false)
              this.$set(this.complete_status[sid],'color','success')
              this.$set(this.complete_status[sid],'dark',true)
              if(sid < this.t2.length - 1)
                this.check_complete(sid + 1,count,0)
            }else{
              if(retry < 30)
                this.check_complete(sid,count,retry + 1)
              else{
                this.$set(this.complete_status[sid],'loading',false)
                this.$set(this.complete_status[sid],'color','error')
                this.$set(this.complete_status[sid],'dark',true)
                if(sid < this.t2.length -1)
                  this.check_complete(sid + 1,count,0)
              }
            }
        }
        },500)
      },
      async run(sid){
        if(!this.progress_query)
          this.progress_value = ((sid + 1) / this.t2.length) * 100
        let w = this.t1
        let {studentid,username,password} = (this.t2)[sid]
        let skillswork = w.filter((e,i,a)=>{
          return e.type === 0
        })
        let teacher_cookie = this.teacher_cookie
        await axios('clearlog/' + studentid)
        if(skillswork.length > 0)
          await axios.post('work',{
            studentid: studentid,
            username: username,
            password: password,
            data: JSON.stringify(skillswork),
            city: this.class.city,
            teacher_cookie: teacher_cookie
          })
        let specialwork_ = w.filter((e,i,a)=>{
          return e.type === 1
        })
        let specialwork = []
        let countspecialwork = 0
        for (let i = 0; i < specialwork_.length; i++) {
          countspecialwork += specialwork_[i].request.length
          specialwork.push(specialwork_[i])
        }
        console.log(countspecialwork)
        if(specialwork.length > 0)
          await axios.post('workspecial',{
            studentid: studentid,
            username: username,
            password: password,
            data: specialwork,
            city: this.class.city,
            special_url: this.special_url,
            teacher_cookie: teacher_cookie
          })
        
        if(sid == 0)
          this.check_complete(sid, countspecialwork + skillswork.length * 2)
        if(sid < this.t2.length -1)
          this.run(sid + 1)
        else{
          this.snackbar_text = "队列已完成"
          this.snackbar_color = "success"
          this.snackbar = true
        }
      }
    },
    components: {
      donate: donate
    },
  }
</script>