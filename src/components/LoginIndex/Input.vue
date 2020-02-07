<template>
  <!--  账号输入登录-->
  <div class="login_box">
    <router-link to="/login/auth">
      <div class="login_close"></div>
    </router-link>
    <div class="login_panel">
      <div class="login_title">
        <img src="@/assets/img/logo.png" alt />
        <p>输入账号进行安全登录</p>
        <br />
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        status-icon
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            prefix-icon="el-icon-user"
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Input",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin"
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
/*登录框*/
.login_box {
  z-index: 99;
  position: absolute;
  width: 380px;
  height: 540px;
  top: 50%;
  left: 50%;
  margin-left: -190px;
  margin-top: -270px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 10px #999;
}

.login_close {
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  background: url(~@/assets/img/qrcode.png) no-repeat right top;
  background-size: 100% 100%;
  border-top-right-radius: 5px;
  cursor: pointer;
  z-index: 99;
}

/*登录*/
.login_panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 440px;
  padding: 0 55px;
  transform: translate(-50%, -50%);
  /* background: #fff; */
  border-radius: 6px;
  overflow: hidden;
}

.login_panel .login_title {
  text-align: center;
}

.login_panel .login_title img {
  margin-top: 60px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  padding: 10px;
  border: 3px solid #d7e8fc;
}

.login_panel .login_title p {
  margin-top: 15px;
  color: #999999;
  font-size: 15px;
}
</style>
<style lang="scss">
.el-input__inner {
  padding-left: 35px !important;
}
</style>
<style lang="scss" scoped>
$dark_gray: #889aa4;

.svg-container {
  position: absolute;
  top: -5px;
  font-size: 14px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
  padding: 6px 5px 6px 15px;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.el-input {
  position: initial !important;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: #606266;
    margin: 50px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.el-icon-user::before {
  content: "\e6e3";
}

.show-pwd {
  position: absolute;
  right: 33px;
  top: 0px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
