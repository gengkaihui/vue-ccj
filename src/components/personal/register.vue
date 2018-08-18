<template>
  <div class="log">
    <div class="layer warn" v-if="warn">
      <p>
        <!--手机号或密码为空时：请输入手机号和密码；手机号与本地存储的不相符时：账号不存在-->
        <span>{{tip}}</span>
        <!--手机号相符时，显示验证码：图形、短信-->
        <!--不输图形验证码时：请输入图形验证码；不输短信验证码时：请输入短信验证码；输错短信时：短信验证码已失效-->
      </p>
    </div>
    <h1 class="head">注册 楚楚街 账号</h1>
    <div class="login">
      <ul>
        <li>
          <input type="tel" placeholder="手机号" v-model="username">
        </li>
        <li>
          <input type="password" placeholder="密码" v-model="password">
        </li>
        <li class="pdr" id="verify">
          <input type="text" placeholder="图形验证码" class="big" v-model="verify">
          <p class="code" @click="changecode">{{code}}</p>
        </li>
        <li class="pdr" id="sms">
          <input type="text" placeholder="短信验证码" class="big" v-model="sms">
          <!--点击发送验证码，按钮背景换成bgddd，“发送验证码”改为“重新发送(60)”-->
          <button v-if="btn" @click="changebtn">发送短信验证码</button>
          <button v-else="" :class="{bgddd:!btn}">重新发送({{count}})</button>
        </li>
      </ul>
      <div class="to">
        <!--点击注册-->
        <a class="toLogin" @click="toLogin">
          <span class="ftFFF">确定</span>
        </a>
      </div>
    </div>
    <p class="agreement">
      *注册则代表同意
      <a href="javascript:;" id="chuChuJieAgreement">
        <span class="ftred">《楚楚街网络服务使用协议》</span>
      </a>
    </p>
  </div>
</template>
<script>
  import {register} from "../../api"
  import myMd5 from "./myMd5"//引入封装的加密插件
  export default {
    data(){
      return {
        username: '',
        password: '',
        verify: '',
        sms: '',
        code: '',
        warn: false,
        tip: '',
        btn:true,
        count:60,
      }
    },
    created(){
      this.changecode()
    },
    methods: {
      async toLogin(){
        //用正则判断手机号
        let reg = /^1(\d{10})$/
        if (this.username ==='' || this.password ==='') {
          this.tip = "请输入手机号和密码"
          this.warn = true
          setTimeout(() => {
            this.warn = false
          }, 1000)
          return
        } else {
          if (!reg.test(this.username)) {
            this.tip = "请输入正确的手机号"
            this.warn = true
            setTimeout(() => {
              this.warn = false
              this.tip = ''
              this.username=''
            }, 1000)
            return
          }
        }
        if (this.verify !== this.code) {
          this.tip = "验证码错误"
          this.warn = true
          setTimeout(() => {
            this.warn = false
            this.tip = ''
            this.verify=''
          }, 1000)
          this.changecode()
          return
        }
        //提交登录信息，根据后台返回的结果，确定是否跳转到“个人中心”；
        // 如果登录信息错误，则返回“账号不存在”或“密码不正确”；
        // 如果登录信息正确，则返回“登录成功”，并跳转到个人中心页面。
        let password = myMd5(this.password + this.username);
        let userinfo = {username: this.username, password: password}
        this.tip = await register(userinfo)
        if (this.tip ==="注册成功"||this.tip ==="手机号已经存在，请直接登录") {
          this.warn=true
          setTimeout(() => {
            this.warn = false
            this.tip = ''
          }, 1000)
          this.$router.push({name: 'login', params: {}})
        }
      },
      changecode(){
        let ary = []
        for (let i = 0; i < 4; i++) {
          ary.push(Math.round(Math.random() * 9))
        }
        this.code = ary.join('')
      },
      changebtn(){
        this.btn=false//显示重新发送(60)
        setInterval(()=>{
          if(this.count>0){
            this.count-=1
          }else {
            this.btn=true//显示发送短信验证码
            this.count=60
          }
        },1000)
      }
    },
  }
</script>
<style scoped lang="less">
  .log {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
    .warn {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 101;
      p {
        display: block;
        position: absolute;
        top: 272px;
        margin: -50px auto 0;
        width: 100%;
        text-align: center;
        span {
          padding: 10px;
          line-height: 18px;
          color: #fff;
          font-size: 13px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 3px;
        }
      }
    }
    .head {
      margin: 20px 0 40px;
      line-height: 24px;
      color: #333;
      font-size: 16px;
      text-align: center;
    }
    .login {
      margin: 0 10%;
      color: #333;
      ul {
        li {
          position: relative;
          margin-top: 20px;
          border-bottom: 1px solid #aaa;
          input {
            width: 100%;
            height: 30px;
            margin-bottom: 5px;
            font-size: 14px;
          }
        }
        li.pdr {
          input {
            width: 72%;
          }
          p.code {
            display: inline-block;
            position: absolute;
            bottom: -1px;
            right: 0;
            padding: 5px;
            font-size: 16px;
            background-color: #fff333;
            border: 1px solid #000;
            border-radius: 3px;
          }
          button {
            position: absolute;
            right: 0;
            bottom: -1px;
            padding: 10px;
            color: #fff;
            background-color: #fe3355;
            border-radius: 3px;
          }
          button.bgddd{
            background-color: #ddd;
          }
        }
      }
      div.to {
        position: relative;
        margin-top: 40px;
        font-size: 16px;
        text-align: center;
        a.toLogin {
          display: block;
          padding: 10px 0;
          width: 100%;
          line-height: 24px;
          background-color: #fe3355;
          border-radius: 3px;
          span {
            color: #fff;
          }
        }
      }
    }
    .agreement {
      /*mt10 ft3 ft08 align-ct*/
      display: block;
      margin-top: 10px;
      line-height: 19px;
      color: #333;
      font-size: 12.8px;
      text-align: center;
      a {
        span {
          color: #fe3355;
        }
      }
    }
  }
</style>
