<template>
  <div class="address">
    <div class="container">
      <div class="add-address" @click="addAddress">
          <span class="fl">
            <i class="iconfont icon-address"></i>
            <span class="txt">添加收货地址</span>
          </span>
        <i class="iconfont icon-right fr"></i>
      </div>
      <section class="address-list">
        <div class="con" :class="{active:iscur==index}"
             v-for="(consignee,index) in consigneeList"
             :key="index">
          <p class="txt1">
            <span class="fl">收货人:{{consignee.consignee}}</span>
            <span class="fr">{{consignee.tel}}</span>
          </p>
          <p class="txt2">收货地址：{{consignee.address.join('')}}</p>
          <ul class="handle">
            <li @click="tabswitch(index)">
              <i v-if="(iscur==index)" class="iconfont icon-select"></i>
              <i v-else="" class="iconfont icon-select-no"></i>
              <span>设为默认</span>
            </li>
            <li @click="edit(index)">
              <i class="iconfont icon-edit"></i>
              <span>编辑</span>
            </li>
            <li @click="remove(index)">
              <i class="iconfont icon-remove"></i>
              <span>删除</span>
            </li>
          </ul>
          <div :class="{select:iscur==index}"></div>
        </div>
      </section>
    </div>
    <!--编辑遮层-->
    <div v-if="editmask" class="mask">
      <div class="content">
        <div class="p_margin">
          <ul>
            <li class="border_1">
              <label>收货人姓名：</label>
              <input type="text" name="consignee" v-model="consignee">
            </li>
            <li class="border_1">
              <label>手机号码：</label>
              <input type="tel" name="tel" v-model="tel">
            </li>
            <li class="border_1 sel">
              <label>所在地区：</label>
              <div class="area">
                <area-select type="text"
                             :placeholders="placeholders"
                             :level="2"
                             v-model="selected" :data="pcaa">
                </area-select>
              </div>
            </li>
            <li>
              <label>街道地址：</label>
              <input name="street" v-model="street"></input>
            </li>
          </ul>
        </div>
        <div class="btn">
          <div class="btn_two" @click="save">保存</div>
        </div>
      </div>
    </div>
    <!--添加遮层-->
    <div v-if="addmask" class="mask addmask">
      <div class="content">
        <div class="p_margin">
          <ul>
            <li class="border_1">
              <label>收货人姓名：</label>
              <input type="text" name="consignee" v-model="consignee">
            </li>
            <li class="border_1">
              <label>手机号码：</label>
              <input type="tel" name="tel" v-model="tel">
            </li>
            <li class="border_1 sel">
              <label>所在地区：</label>
              <div class="area">
                <area-select type="text"
                             :placeholders="placeholders"
                             :level="2"
                             v-model="selected" :data="pcaa">
                </area-select>
              </div>
            </li>
            <li class="border_1">
              <label>街道地址：</label>
              <input name="street" v-model="street"></input>
            </li>
            <li class="default" @click="flag=!flag">
              <i v-if="flag" class="iconfont icon-select"></i>
              <i v-else="" class="iconfont icon-select-no"></i>
              <span>设为默认</span>
            </li>
          </ul>
        </div>
        <div class="btn">
          <div class="center">
            <span class="save" @click="saveAddress">保存</span>
            <span class="cancel" @click="cancel">取消</span>
          </div>
        </div>
      </div>
    </div>
    <!--提示遮层-->
    <!--文本展示弹窗 start-->
    <div v-if="warn" class="layer_text"><span>{{tip}}</span></div>
  </div>
</template>
<script>
  //根据需要按需引入数据
  import {pcaa} from "area-data"
  import {getAddress, updateAddress} from "../../api"
  export default {
    data(){
      return {
        username: "",
        pcaa: pcaa,
        placeholders: ['选择省', '选择市', '选择区'],
        selected: [],
        street: '',
        consigneeList: [],
        iscur: 0,//用于切换“设为默认”
        editmask: false,
        addmask: false,
        consignee: '',
        tel: '',
        address: '',
        cur: 0,
        flag: true,//用于添加时，设为默认地址
        warn: false,
        tip: ""
      }
    },
    created(){
      this.getData()
    },
    methods: {
      //获取地址列表
      async getData(){
        //从本地获取用户信息
        let userinfo = localStorage.getItem("m_ccj_userinfo")
        this.userinfo = JSON.parse(userinfo)
        this.username = this.userinfo.username
        //根据username向后台请求地址列表
        this.consigneeList = await getAddress(this.username)
      },
      //添加地址
      addAddress(){
        //如果地址数量>=10条了，不再增加，提示先删除再添加
        if (this.consigneeList.length > 9) {
          this.warn = true
          this.tip = "地址数量超过10条，请先删除再添加"
          setTimeout(() => {
            this.warn = false
            this.tip = ""
          }, 1000)
          return
        }
        this.addmask = true
      },
      cancel(){//取消
        this.addmask = false
        this.consignee = ""
        this.tel = ""
        this.selected = ""
        this.street = ""
      },
      saveAddress(){//保存
        //判断各项数据，如果为空或者格式不正确，则显示提示信息，代码停止执行
        if (!this.consignee) {
          this.warn = true
          this.tip = "请填写收货人姓名"
          setTimeout(() => {
            this.warn = false
            this.tip = ""
          }, 1000)
          return
        } else if (!this.tel) {
          this.warn = true
          this.tip = "请填写手机号码"
          setTimeout(() => {
            this.warn = false
            this.tip = ""
          }, 1000)
          return
        } else if (!/^1\d{10}$/.test(this.tel)) {
          this.warn = true
          this.tip = "手机号码格式不正确"
          setTimeout(() => {
            this.warn = false
            this.tip = ""
          }, 1000)
          return
        } else if (this.selected.length == 0) {
          this.warn = true
          this.tip = "请选择所在地区"
          setTimeout(() => {
            this.warn = false
            this.tip = ""
          }, 1000)
          return
        } else if (this.street.length == 0) {
          this.warn = true
          this.tip = "请填写具体地址"
          setTimeout(() => {
            this.warn = false
            this.tip = ""
          }, 1000)
          return
        }
        //数据填写正确
        // 将省市区和街道都保存在this.selected中
        this.selected.push(this.street)
        let consignee = {consignee: this.consignee, tel: this.tel, address: this.selected}
        if (this.flag) {//如果添加时设为默认地址，则添加到数组开头
          this.consigneeList.unshift(consignee)
        } else {//否则，添加到数组末尾
          this.consigneeList.push(consignee)
        }
        //保存后，将“添加遮层”数据设为空，flag设为true，即每次添加时，默认设置为默认地址
        this.consignee = ""
        this.tel = ""
        this.selected = ""
        this.street = ""
        this.flag = true
        //更新服务端
        this.update()
        this.addmask = false
      },
      tabswitch(index){//切换“设为默认”的地址的样式
        this.iscur = index
      },
      edit(index){//编辑地址
        //console.log(index);
        this.cur = index
        this.editmask = true
        this.consignee = this.consigneeList[index].consignee
        this.tel = this.consigneeList[index].tel
        let address = this.consigneeList[index].address
        this.selected = address.filter((item, index) => {
          return index < 3
        })
        this.street = address[3]
      },
      save(){
        let index = this.cur
        console.log(index);
        this.editmask = false
        this.consigneeList[index].consignee = this.consignee
        this.consigneeList[index].tel = this.tel
        this.consigneeList[index].address = this.selected
        this.consigneeList[index].address.push(this.street)
        this.update()
      },
      remove(index){//删除地址，加确认框
        let cur = index
        let flag = confirm("确认删除？")//确认则返回true
        if (flag) {
          this.consigneeList = this.consigneeList.filter((item, index) => {
            return index !== cur
          })
        } else {
          return
        }

      },

      async update(){//添加或更新时调用
        let user = {username: this.username, consigneeList: this.consigneeList}
        await updateAddress(user)
      }
    },
    computed: {},
    components: {}
  }
</script>
<style scoped lang="less">
  .address {
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #707070;
    font-size: 12px;
    font-family: "\5FAE\8F6F\96C5\9ED1";
    font-weight: 400;
    line-height: 1.5;
    background: #f8f8f8;
    z-index: 100;
    .container {
      margin: 10px;
      .add-address {
        position: relative;
        height: 50px;
        line-height: 50px;
        color: #444;
        font-size: 16px;
        background-color: #fff;
        span.fl {
          height: 50px;
        }
        .icon-address {
          font-size: 32px;
        }
        span.txt {
          position: absolute;
          top: 0;
          left: 32px;
        }
        .icon-right {
          color: #aaa;
        }
      }
      .address-list {
        margin-top: 10px;
        background-color: #fff;
        .con {
          position: relative;
          padding: 0 8px;
          border: 1px solid #fff;
          .txt1 {
            height: 45px;
            line-height: 45px;
            color: #444;
            font-size: 16px;
            span.fr {
              color: #707070;
              font-size: 12px;
            }
          }
          .txt2 {
            line-height: 21px;
            font-size: 14px;
            padding-bottom: 15px;
          }
          .handle {
            display: flex;
            height: 50px;
            border-top: 1px solid #f7f7f7;
            overflow: hidden;
            zoom: 1;
            li {
              flex: 1;
              line-height: 50px;
              color: #aaa;
              font-size: 14px;
              .iconfont {
                color: #df3130;
                font-size: 18px;
              }
              .icon-select-no {
                color: #aaa;
              }
            }
          }
          .select {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 20px;
            height: 20px;
            background-color: #df3130;
          }

        }
        .active {
          border: 1px solid #df3130;
        }
      }
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .6);
      z-index: 999;
      .content {
        position: fixed;
        width: 92%;
        left: 4%;
        top: 15%;
        padding: 15px 0 40px;
        background: #fff;
        border-radius: 5px;
        z-index: 1000;
        .p_margin {
          margin: 10px;
          padding: 10px;
          li {
            margin-bottom: 10px;
            height: 32px;
            line-height: 32px;
            label {
              display: inline-block;
              width: 80px;
              font-size: 12.8px;
            }
            input {
              height: 25px;
              line-height: 25px;
              display: inline-block;
              font-size: 16px;
            }
          }
          li.border_1 {
            border-bottom: solid 1px #eee;
          }
        }
        .btn {
          margin-top: 30px;
          .btn_two {
            width: 60%;
            margin: 0 auto;
            padding: 6px 0;
            text-align: center;
            color: #FFF;
            font-size: 16px;
            letter-spacing: 2px;

            border-radius: 5px;
            background: #df3130;
          }
        }
      }

    }
    .addmask {
      li.default {
        font-size: 14px;
        .iconfont {
          color: #df3130;
          font-size: 20px;
        }
        .icon-select-no {
          color: #aaa;
        }
      }
      .btn {
        .center {
          width: 60%;
          margin: 0 auto;
          span {
            display: inline-block;
            padding: 6px 0;
            width: 45%;
            text-align: center;
            color: #FFF;
            font-size: 16px;
            letter-spacing: 2px;
            border-radius: 5px;
            background: #df3130;
          }
          span.save {
            float: left;
          }
          span.cancel {
            float: right;
            background: #707070;
          }
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
  }
</style>
