<template>
  <div class="container">
    <div class="wrapper">
      <div class="input-content">
        <div class="input-item">
          <input v-model="username" placeholder="请输入账号" data-key="username" @input="inputChange">
        </div>
        <div class="input-item">
          <input type="password" v-model="password" placeholder="请输入密码" placeholder-class="input-empty" maxlength="20"
            data-key="password" @input="inputChange">
        </div>
      </div>
      <div class="login-row">
        <button class="confirm-btn" @click="onLogin">
          登录
        </button>
        <button class="confirm-btn" @click="onRegister">
          注册
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
	import { ref } from 'vue';
	import { login, register } from '@/common/api';

	const username = ref('');
	const password = ref('');

	const inputChange = (e) => {
	  const key = e.currentTarget.dataset.key;
	  if (key === 'username') {
		username.value = e.detail.value;
	  } else if (key === 'password') {
		password.value = e.detail.value;
	  }
	  // console.log(username.value, password.value);
	};

	const onLogin = () => {
		const params = {
			username: username.value,
			password: password.value
		};
		login(params).then(resp => {
			if (!resp.data.code) {
				uni.setStorageSync('token',resp.data.data.token)
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		});
	};

	const onRegister = () => {
		const params = {
			username: username.value,
			password: password.value
		};
		register(params).then(resp => {
			console.log(resp.data.code)
			if (!resp.data.code) {
			  uni.setStorageSync('token',resp.data.data.token)
			  uni.switchTab({
				url: '/pages/index/index'
			  })
			}
		});
	};
</script>

<style scoped lang='scss'>
	.container {
	  padding-top: 40px;
	  overflow: hidden;
	}

	.wrapper {
	  position: relative;
	}

	.input-content {
	  padding: 0 50px;
	}

	.input-item {
	  display: flex;
	  flex-direction: column;
	  align-items: flex-start;
	  justify-content: center;
	  padding: 0 30px;
	  height: 50px;
	  border-radius: 2rem;
	  border-color: #ED9220;
	  border: 1px solid darkgray;
	  margin-top: 10px;
	}

	.confirm-btn {
	  width: 150px;
	  border-radius: 2rem;
	  margin: 50px auto 0;
	  background-color: #ED9220;
	  color: #fff;
	}

	.login-row {
	  display: flex;
	}
</style>
