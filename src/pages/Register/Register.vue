<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" ref="codeValue">
        <button class="sendCode" @click="sendCode" ref="sendCode" >发送验证码</button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="passwordR">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="finishRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <UserFooter/>
  </div>
</template>

<script>
  import UserFooter from "@/components/UserFooter/UserFooter";
  export default {
    name: 'Register',
    data(){
      return{
        timer:null,
        phone:null,
        code:null,
        password:null,
        passwordR:null,
        agree:false
      }
    },
    components:{
      UserFooter
    },
    methods:{
      //发送验证码
      async sendCode(){
        //判断手机号是否符合要求
        //^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
        if((/^1[3,4,5,8]\d{9}$/).test(this.phone)){
          let res=await this.$store.dispatch('user/getCodeAction',this.phone)
          //判断验证码是否发送成功
          if (res.code==200){
            this.code=res.data
            //发送成功按钮60秒后恢复使用
            let num=10
            this.$refs.sendCode.disabled=true
            this.timer=setInterval(()=>{
              this.$refs.sendCode.textContent=num
              num--
              if(num<0){
                clearInterval(this.timer)
                this.$refs.sendCode.disabled=false
                this.$refs.sendCode.textContent='发送验证码'
                this.num=10
              }
            },1000)
            console.log('验证码为:'+res.data)
          }else {
            alert('验证码发送失败')
          }
        }else {
          alert('手机号码格式错误')
        }
      },

      //完成注册
      async finishRegister(){
        if (!this.agree){
          alert('请同意协议')
          return
        }
        if (!this.phone || !this.password || !this.passwordR){
          alert('表单内容请全部填写')
          return
        }
        if (this.code!==this.$refs.codeValue.value){
          alert('验证码输入错误')
          return
        }
        if(!(/^[a-zA-Z0-9]{6,18}$/).test(this.password)){
          alert('请输入6-18密码')
          return
        }
        if(this.password!==this.passwordR){
          alert('两次密码输入不一致')
          return
        }
        //完成注册
        const res=await this.$store.dispatch(
            'user/finishRegisterAction',
            {phone:this.phone,password:this.password,code:this.code
            })
        if (res.code==200){
          console.log('注册成功')
          // 清楚定时器跳转到登录页面
          clearInterval(this.timer)
          this.$router.push('./login')
        }else {
          alert(res.message)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sendCode{
    height: 38px;
    width: 80px;
  }
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }
  }
</style>