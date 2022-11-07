<template>
  <div class="user">
    <!-- 登录前 -->
    <div @click="onOpenModal" class="login-trigger" v-if="!isLogin">
      <i class="user-icon iconfont icon-yonghu" />
      <p class="user-name">未登录</p>
    </div>
    <!-- 登录后 -->
    <div @click="onLogout" class="logined-user" v-else>
      <img v-lazy="$utils.genImgUrl(user.avatarUrl, 80)" class="avatar" />
      <p class="user-name">{{ user.nickname }}</p>
    </div>

    <!-- 登录框 -->
    <el-dialog
      :modal="false"
      :visible.sync="visible"
      :width="$utils.toRem(320)"
    >
      <p slot="title">登录</p>
      <div class="login-body" v-if="!isImgLogin">
        <el-input
          class="input"
          placeholder="请输入手机号"
          v-model="phone"
        />
        <el-input
            class="input"
            placeholder="请输入密码"
            v-model="password"
            type="password"
        />
        <span class="dialog-footer" slot="footer">
        <el-button
            :loading="loading"
            @click="onLogin(phone,password)"
            class="login-btn"
            type="primary"
        >登 录</el-button
        >
      </span>

      </div>

      <span class="dialog-footer" slot="footer"  v-if="!isImgLogin">
        <el-button
            :loading="loading"
            @click="setImgLogin()"
            class="login-btn"
            type="primary"
        >二维码登录</el-button
        >
      </span>

      <div class="login-body" v-if="isImgLogin">
      <el-row>
        <el-col >
          <el-card :body-style="{ padding: '0px' }">
            <img :src="imgurl" class="image">
          </el-card>
        </el-col>
      </el-row>
        <span class="dialog-footer" slot="footer" >
        <el-button
            :loading="loading"
            @click="setPhone()"
            class="login-btn"
            type="primary"
        >密码登录</el-button
        >
      </span>
      </div>



    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
/*import storage from "good-storage"
import { UID_KEY, isDef } from "@/utils"*/
import { confirm } from "@/base/confirm"
import {
  mapActions as mapUserActions,
  mapState as mapUserState,
  mapGetters as mapUserGetters
} from "@/store/helper/user"
import {checkKey, getLoginImg, loginStatus} from "@/api";
import storage from "good-storage";
import {COOKIE_KEY, UID_KEY} from "@/utils";

export default {
  // 自动登录
  created() {
   /* const uid = storage.get(UID_KEY)
    if (isDef(uid)) {
      this.onLogin(uid)
    }*/
  },
  data() {
    return {
      visible: false,
      loading: false,
      uid: "",
      isImgLogin:false,
      phone:"",
      password:"",
      key:"",
      imgurl:"",
    }
  },
  methods: {
    onOpenModal() {
      this.visible = true
    },
    onCloseModal() {
      this.visible = false
    },
  setPhone(){
      this.isImgLogin=false
  },
    async onLogin(phone,password) {
      this.loading = true
      const success = await this.phoneLogin({phone,password}).finally(() => {
        this.loading = false
      })
      if (success) {
        this.onCloseModal()
      }
    },
    async setImgLogin(){
      this.isImgLogin=true
      const options=await getLoginImg()
      this.key=options.key
      this.imgurl=options.url
      await this.selectStatus()
    },
    async selectStatus(){

      let timer = setInterval(async () => {
        const statusRes = await  checkKey(this.key)
        if (statusRes.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer)
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          alert('授权登录成功')
          storage.set(COOKIE_KEY,statusRes.cookie)
          const status=await loginStatus()
          storage.set(UID_KEY, status.data.account.id)
          const res=await this.login(status.data.account.id)
          if (res){
            this.onCloseModal()
          }
        }
      }, 3000)
    },
    onLogout() {
      confirm("确定要注销吗？", () => {
        this.logout()
      })
    },
    ...mapUserActions(["login", "logout","phoneLogin"])
  },
  computed: {
    ...mapUserState(["user"]),
    ...mapUserGetters(["isLogin"])
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  display: block;
}
.user {
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .login-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-icon {
    font-size: 24px;
  }

  .user-name {
    margin-left: 8px;
  }

  .logout {
    transform: translateY(1px);
    margin-left: 8px;
    color: var(--font-color-shallow-grey);
  }

  .login-body {
    .input {
      margin-bottom: 16px;
    }

    .login-help {
      .help {
        margin-bottom: 4px;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 8px 0;
  }

  .logined-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      @include round(40px);
    }
  }
}
</style>
