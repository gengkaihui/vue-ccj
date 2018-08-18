<template>
  <div class="bgf3">
    <!--下拉选项弹窗 start-->
    <div class="layer_load">
      <div class="content"><img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAADfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTDfMTBHesYPAAAAEnRSTlMA/fF5o97FSww1Za0f1IwpVkAcANuOAAABh0lEQVRIx+2U27KDIAxFIwQMNy///7OnVSSMgJXj9K1rpi/K6k7ZmUIbcmIYhCP4B2aImH6XhkR/tmPZdcuCZdEtDxnflmcMStursWk2xlPNxWFD+eaFmXHD19yIoKIqduv2zGexviR+TFC7VlFfzzW5RXR4W/HjocbInBdWDcxcc+lC1plMvcl207ZyA1Qx+YU1517rMhXBjBfRldCA2C0gfOthhSb0nnz1UMcbgmsIfgBNQYgw0W3BWCntXtisxIaab2ZZuWFfaaRERN3LtjJiASaRmG7NLBMGAsvhZjBHi4w7ssx4JD8a+9GFPanq0ZI8Wc8fQP7jCWo8l0Ep5Uzb9BIRp6XmarWzNBvCnUqpTh2YRi4eSDgxqoSryxIT569HxdRlZGwxNeNrLiEjL2TqlSW7ASIWteYRJ5bPhXiWZXzi9IaLv2JhmaAVreMrpyOOTtEjQMM+jlqdsMcKslvgpXP8BlnG/F9gIfiMzoCCL8nl2B2UF9YL5VX1UC5JP9a91KuZ/wCIaBQFmaG1twAAAABJRU5ErkJggg=="
        alt="" class="loading"><br>加载中...
      </div>
    </div>
    <div class="container">
      <ul class="msg">
        <li class="userPhoto">
          <input type="file">
          <p>
            <span class="fl">头像</span>
            <span class="fr">
              <img :src="head_image_url" alt="" id="userImg">
            </span>
          </p>
        </li>
        <li class="nickname" @click="selectName=true;temp=nickname">
          <p class="clearfix">
            <span class="fl">昵称</span>
            <span class="fr">{{nickname}}</span>
          </p>
        </li>
        <li class="userSex" @click="selectSex=true">
          <p class="clearfix">
            <span class="fl">性别</span>
            <span class="fr">{{gender}}</span>
          </p>
        </li>
        <li class="userJob" @click="selectJob=true">
          <p class="clearfix">
            <span class="fl">职业</span>
            <span class="fr"> {{occupation}}</span>
          </p>
        </li>
        <li class="userPhone">
          <p class="clearfix">
            <span class="fl">手机号</span>
            <span class="fr">{{tel}}</span>
          </p>
        </li>
        <li class="modify" @click="selectPassword=true">
          <p>
            <span class="fl">修改密码</span>
            <i class="fr iconfont icon-right"></i>
          </p>
        </li>
        <li class="address" @click="toAddress">
          <p>
            <span class="fl">我的收货地址</span>
            <i class="fr iconfont icon-right"></i>
          </p>
        </li>
      </ul>
    </div>
    <div class="btn bgblue" id="back" @click="back">
      <span class="ftFFF">返回</span>
    </div>
    <div class="btn bgred" id="signOut" :to="{name:'login'}" @click="logOut">
      <span class="ftFFF">退出登录</span>
    </div>
    <!--修改昵称弹窗 start-->
    <div v-if="selectName" class="layer_name">
      <h2 class="head">
        <i class="iconfont icon-back" @click="goBack"></i>修改昵称
      </h2>
      <div class="con">
        <p>
          <input type="text" v-model="nickname">
        </p>
        <p class="bgred" @click="saveName">保存</p>
      </div>
    </div>
    <!--修改密码弹窗 start-->
    <div v-if="selectPassword" class="layer_psw">
      <h2 class="head">
        <i class="iconfont icon-back" @click="goBack"></i>修改账户密码
      </h2>
      <div class="con">
        <p><input type="password" placeholder="原密码" v-model="orgpsw">
        </p>
        <p><input type="password" placeholder="新密码" v-model="newpsw">
        </p>
        <p><input type="password" placeholder="确认密码" v-model="confirmpsw">
        </p>
        <p class="bgred" @click="savePsw">保存</p>
      </div>
    </div>

    <!--职业、性别：下拉选项弹窗 start-->
    <div v-if="selectSex" class="layer_sex">
      <div class="sex">
        <h1 class="">性别选择</h1>
        <p v-for="(sex,index) in sexList" :key="index" @click="changeSex(sex)">{{sex}}</p>
      </div>
    </div>
    <div v-if="selectJob" class="layer_job">
      <div class="job">
        <h1 class="">职业选择</h1>
        <p v-for="(job,index) in jobList" :key="index" @click="changeJob(job)">{{job}}</p>
      </div>
    </div>

    <!--文本展示弹窗 start-->
    <div v-if="warn" class="layer_text"><span>{{tip}}</span></div>
  </div>
</template>
<script>
  import myMd5 from "./myMd5"
  import {updateUserinfo} from "../../api"
  export default {
    data(){
      return {
        userinfo: {},
        username: '',
        password: "",
        head_image_url: "",
        selectName: false,
        nickname: "",
        temp: '',//用于保存昵称修改之前的nickname值，如果修改时点击后退，则让昵称=之前的值
        selectSex: false,
        gender: "",
        sexList: ["男", "女"],
        selectJob: false,
        occupation: "",
        jobList: ["学生", "初入社会", "资深工作党", "自由职业"],
        tel: "",
        selectPassword: false,
        orgpsw: '',
        newpsw: '',
        confirmpsw: '',
        warn: false,
        tip: "",
      }
    },
    created(){
      this.getData()
    },
    methods: {
      async getData(){
        //从本地获取用户信息
        let userinfo = localStorage.getItem("m_ccj_userinfo")
        this.userinfo = JSON.parse(userinfo)
        this.username = this.userinfo.username
        this.password = this.userinfo.password
        this.head_image_url = this.userinfo.head_image_url
        this.nickname = this.userinfo.nickname
        //vue中取的值都是string类型，“0”和“1”转成布尔都是true，需要先转成数字再判断
        this.gender = parseInt(this.userinfo.gender) ? "男" : "女"
        this.occupation = this.userinfo.occupation
        this.tel = this.userinfo.tel
      },
      goBack(){//点击后退，不修改
        this.nickname = this.temp
        console.log(this.temp);
        this.selectName = false
        this.selectPassword = false
      },
      async saveName(){//点击保存时修改
        this.update()
        this.selectName = false
      },
      changeSex(sex){
        this.gender = sex
        this.update()
        this.selectSex = false
      },
      changeJob(job){
        this.occupation = job
        this.update()
        this.selectJob = false
      },
      async savePsw(){
        let orgPsw = myMd5(this.orgpsw + this.username)
        let newPsw = myMd5(this.newpsw + this.username)
        let confirmPsw = myMd5(this.confirmpsw + this.username)
        this.warn = true
        //首先密码不能为空
        if (orgPsw === "d41d8cd98f00b204e9800998ecf8427e"
          || newPsw === "d41d8cd98f00b204e9800998ecf8427e"
          || confirmPsw === "d41d8cd98f00b204e9800998ecf8427e") {
          this.tip = "密码不能为空"
        } else {
          if (newPsw !== confirmPsw) {//判断两次新密码必须相同
            this.tip = "两次输入的密码不一致"
          } else {
            if (orgPsw !== this.password) {
              this.tip = "原密码不正确"
            } else {
              this.password = newPsw
              this.update()
              this.tip = "修改成功"
              this.selectPassword = false
            }
          }
        }
        setTimeout(() => {
          this.warn = false
          this.tip = ""
        }, 1000)
      },

      //更新服务端用户信息
      async update(){
        this.userinfo.username = this.username
        this.userinfo.password = this.password
        this.userinfo.head_image_url = this.head_image_url
        this.userinfo.nickname = this.nickname
        this.userinfo.gender = this.gender === "男" ? 1 : 0
        this.userinfo.occupation = this.occupation
        this.userinfo.tel = this.tel
        console.log(this.userinfo);
        //更新用户信息
        await updateUserinfo(this.userinfo)//更新服务端
        localStorage.setItem("m_ccj_userinfo", JSON.stringify(this.userinfo))//更新本地
      },
      //点击返回时，后退到personal页面
      async back(){
        this.$router.go(-1)
      },
      //点击退出登录时，删除本地缓存，跳转到登录login页面
      async logOut(){
        localStorage.removeItem("m_ccj_userinfo")
        this.$router.push({name: "login"})
      },
      //点击收货地址时，跳转到收货地址页面address.vue
      toAddress(){
          this.$router.push({name:"address"})
      }
    },
  }
</script>
<style scoped lang="less">
  .layer_load {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    z-index: 500;
    display: none;
    .content {
      position: absolute;
      top: 50%;
      margin-top: -40px;
      left: 0;
      width: 100%;
      color: #000;
      text-align: center;
      font-size: .8rem;
      img {
        width: 20px;
        height: 20px;
        -webkit-animation: 5s loading linear infinite;
      }
    }
  }

  .container {
    padding: 0 10px;
    background-color: #fff;
    .msg {
      color: #222;
      font-size: 14.4px;
      li {
        position: relative;
        padding: 12px 0;
        line-height: 21px;
        border-bottom: 1px solid #eee;
        p {
          overflow: hidden;
          zoom: 1;
          .fl {
            float: left;
          }
          .fr {
            float: right;
            color: #aaa;
          }
          .icon-right{
            font-size: 20px;
          }
        }
      }
      li.userPhoto {
        padding: 5px 0;
        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: alpha(opacity=0);
          opacity: 0;
        }
        p {
          span {
            height: 50px;
            line-height: 50px;
            img {
              height: 100%;
            }
          }
        }
      }
    }
  }

  .btn {
    display: block;
    margin: 30px 6%;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    background: #47d2d0;
    span {
      color: #fff;
    }
  }

  .btn.bgred {
    background: #fe3355;
  }

  .layer_name, .layer_psw {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 100;
    .head {
      position: relative;
      padding: 5px 0;
      border-bottom: 1px solid #f3f3f3;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      .icon-back {
        display: inline-block;
        position: absolute;
        left: 10px;
      }
    }
    .con {
      margin-top: 20px;
      padding: 0 15px;
      p {
        margin-top: 5px;
        padding: 0 10px;
        border: solid 1px #ddd;
        border-radius: 3px;
        background: #F7F7F7;
        input {
          height: 36px;
          width: 100%;
          background: 0 0;
          font-size: 14px;
        }
      }
      p.bgred {
        margin-top: 30px;
        line-height: 40px;
        color: #FFF;
        font-size: 18px;
        text-align: center;
        background: #fe3355;
      }
    }
  }

  .layer_job, .layer_sex {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
    .job, .sex {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 0 10px;
      color: #333;
      font-size: 16px;
      text-align: center;
      background: #FFF;
      z-index: 999;
      h1 {
        color: #55a5ff;
        border-bottom: solid 1px #55a5ff;
        padding: 5px 0;
        font-size: 16px;
        line-height: 40px;
      }
      p {
        border-bottom: solid 1px #ddd;
        line-height: 40px;
      }
    }
  }

  .layer_text {
    /*align-ct warm Ndisplay*/
    position: fixed;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -50px;
    z-index: 999;
    text-align: center;
    span {
      /*layer_text_content ft12 ftFFF lh18 p10 bd_radius*/
      padding: 10px;
      line-height: 18px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 3px;

    }

  }

</style>
