<script setup lang="ts">
import { loginAPI } from '@/apis/user'

const login = async () => {
  console.log('登录请求')
  const res = await loginAPI({ workNumber: 'D00001', password: '12345678' })
  console.dir(res.message)
}
</script>

<template>
  <body class="container2">
  <!-- 按钮模块 -->
  <input class="checkbox" type="checkbox" id="a12" hidden>
  <i class="indicator"></i>
  <label class="c2" for="a12"></label>
  <!-- 日月交替模块 -->
  <div id="container" class="dark">
    <div class="bg"></div>
    <div class="moon-box">
      <div class="moon"></div>
    </div>
    <div class="sun-box">
      <div class="sun"></div>
    </div>
    <div class="sea"></div>
  </div>
  <!-- 登录模块 -->
  <div class="form-box">
    <div class="tit">login</div>
    <label>
      <input id="wordNumber" type="text" name="work_number" placeholder="工号" required>
    </label>
    <label>
      <input id="password" type="password" name="password" placeholder="密码" required>
    </label>
    <button @click="login()" id="button" value="button" type="button">登录</button>
    <span>初始密码为12345678</span>
  </div>
  </body>
</template>

<style scoped>
@font-face {
  font-family: 'icomoon';
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

body {
  /* 初始化 取消内外边距 */
  margin: 0;
  padding: 0;
  overflow: hidden;
  zoom: 85%;
}

button {
  /* 去除按钮自带样式 */
  border: none !important;
  outline: none !important;
}

#container {
  /* 100%窗口高度 */
  height: 100vh;
}

.bg {
  /* 绝对定位 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.sun {
  margin: 0;
  padding: 0;
  /* 绝对定位 水平垂直居中 */
  position: absolute;
  top: 500px;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: orange;
  border-radius: 50%;
}

.moon {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 54%;
  left: 48%;
  /* 计算得出月亮的位置 */
  transform: translate(calc(-50% + -160px), calc(-50% + -180px));
  width: 600px;
  height: 600px;
  /* 通过阴影绘制月亮 */
  box-shadow: 160px 180px 0 cyan;
  border-radius: 50%;
}

.sea {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  /* 背景模糊制造大海的感觉 */
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  z-index: 100;
}

.sun,
.moon,
.sun-box,
.moon-box,
.bg {
  /* 添加动画过渡 */
  transition: all 1s ease-in-out;
}

.sun-box,
.moon-box {
  /* 相对定位 */
  position: relative;
  /* 溢出隐藏 */
  /* overflow: hidden; */
}

.light .bg {
  background: #ffeea2;
}

/* 夜晚 */
.dark .sun-box {
  height: 0;
}

.dark .moon-box {
  height: 100%;
}

.dark .bg {
  background: #040720;
}

/* ................................................. */
/* ....................按钮模块..................... */
/* ...... ..........................................*/

.container2 .c2 {
  /* 相对定位 */
  /* position: relative; */
  transition: 1s;
  z-index: 1;
  float: left;
  margin: 5px 0;
  cursor: pointer;
  position: relative;
  display: block;
  width: 80px;
  height: 40px;
  background-color: #222;
  border-radius: 40px;
  /* 内阴影 */
  box-shadow: inset 0 2px 15px rgba(0, 0, 0, 0.2),
  inset 0 2px 2px rgba(0, 0, 0, 0.2),
  inset 0 -1px 1px rgba(0, 0, 0, 0.2);
}

/* 滑块 */
.container2 .indicator {
  /* 绝对定位 */
  position: absolute;
  z-index: 2;
  left: 0;
  top: 5px;
  width: 40px;
  height: 40px;
  /* 渐变背景 */
  background: linear-gradient(to bottom, #444, #222);
  border-radius: 50%;
  /* 阴影 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5),
  inset 0 1px 1px rgba(255, 255, 255, 0.1);
  /* 缩小 */
  transform: scale(0.9);
  /* 动画过渡 */
  transition: 1s;
  /* 鼠标事件取消 */
  pointer-events: none;
}

/* 滑块中心发光点 */
.container2 .indicator::before {
  content: "";
  width: 5px;
  height: 5px;
  /* 绝对定位 居中 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f00;
  border-radius: 50%;
  /* 阴影制造发光效果 */
  box-shadow: 0 0 2px #f00,
  0 0 5px #f00,
  0 0 10px #f00,
  0 0 15px #f00,
  0 0 20px #f00,
  0 0 25px #f00,
  0 0 30px #f00,
  0 0 35px #f00;
  transition: 0.5s;
}

/* 勾选复选框后滑块的变化 */
.container2 input:checked ~ .indicator {
  left: 40px;
}

.container2 input:checked ~ .indicator::before {
  background-color: #0f0;
  box-shadow: 0 0 2px #0f0,
  0 0 5px #0f0,
  0 0 10px #0f0,
  0 0 15px #0f0,
  0 0 20px #0f0,
  0 0 25px #0f0,
  0 0 30px #0f0,
  0 0 35px #0f0;
}

.container2 input:checked ~ .dark .sun-box {
  height: 100% !important;
}

.container2 input:checked ~ .dark .sun {
  top: 62%;
}

.container2 input:checked ~ .dark .moon-box {
  height: 0 !important;
  transform-origin: -10px;
  transform: rotate(-90deg);
}

.container2 input:checked ~ .dark .bg {
  background: #ffeea2;
}

.container2 input:checked ~ label {
  background-color: #ffeea2;
}

.container2 input:checked ~ .indicator {
  background: #ffeea2;
}

/* ................................................. */
/* ....................登录模块...................... */
/* ...... ..........................................*/

.form-box {
  /* transform: scale(0.7, 0.7);   */
  /* zoom: 90%; */
  position: fixed;
  top: 28%;
  left: 36%;
  width: 400px;
  height: 550px;
  z-index: 101;
  background-color: rgba(255, 255, 255, 0.1);
  /* 背景模糊 */
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 阴影 */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.form-box .tit {
  cursor: default;
  color: #fff;
  font-size: 45px;
  font-weight: bold;
  /* 大写 */
  text-transform: uppercase;
  /* 字间距 */
  letter-spacing: 10px;
  text-indent: 10px;
  margin: 90px auto 50px auto;
}

.form-box input {
  width: 350px;
  height: 35px;
  font-size: 17px;
  background: transparent;
  text-indent: 8px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  margin: 15px 24px;
  outline: none;
  color: #fff;
}

.form-box input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.form-box button {
  font-size: 20px;
  width: 350px;
  height: 45px;
  margin: 35px 25px 40px;
  border: none;
  background: #00addd;
  color: #fff;
  letter-spacing: 20px;
  text-indent: 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.form-box button:hover {
  transition: .5s;
  background: #0098d4;
  letter-spacing: 50px;
  text-indent: 45px;
}

.form-box span {
  font-size: 14px;
  color: #fff;
}

.form-box a {
  color: #00addd;
  text-decoration: none;
}

/* .............................................. */
/* ....................注册特效................... */
/* ...............................................*/

.search-box input {
  width: 100%;
  height: 50px;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  /* 请输入前的缩进 */
  text-indent: 8px;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.s3 button {
  position: fixed;
  pointer-events: all !important;
  font-style: normal;
  top: 56.5%;
  left: 51%;
  font-size: 15px;
  width: 130px;
  height: 45px;
  margin: 35px auto 40px auto;
  border: none;
  background-color: #d5e4f6;
  color: #71c9eb;
  /* letter-spacing: 20px;
  text-indent: 20px; */
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: .5s;
}

/* 流星特效 */

.container4 span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  /* 发光效果 */
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
  0 0 0 8px rgba(255, 255, 255, 0.1),
  0 0 20px rgba(255, 255, 255, 1);
  /* 执行动画 */
  animation: animate 3s linear infinite;
}

/* 拖尾效果 */
.container4 span::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 3px;
  background: linear-gradient(90deg, #fff, transparent);
}

/* 分别为每一个流星设置位置、动画延迟时间、动画时长 */
.container4 span:nth-child(1) {
  top: 0;
  right: 0;
  /* initial关键字用于设置CSS属性为它的默认值 */
  /* 这个东西可以用来强制覆盖前面设置的属性 */
  /* left的初始值为auto，所以就相当于left:auto */
  left: initial;
  /* 动画延迟时间 */
  animation-delay: 0s;
  /* 动画时长 */
  animation-duration: 1s;
}

.container4 span:nth-child(2) {
  top: 0;
  right: 80px;
  left: initial;
  animation-delay: 0.2s;
  animation-duration: 3s;
}

.container4 span:nth-child(3) {
  top: 80px;
  right: 0;
  left: initial;
  animation-delay: 0.4s;
  animation-duration: 2s;
}

.container4 span:nth-child(4) {
  top: 0;
  right: 180px;
  left: initial;
  animation-delay: 0.6s;
  animation-duration: 1.5s;
}

.container4 span:nth-child(5) {
  top: 0;
  right: 400px;
  left: initial;
  animation-delay: 0.8s;
  animation-duration: 2.5s;
}

.container4 span:nth-child(6) {
  top: 0;
  right: 600px;
  left: initial;
  animation-delay: 1s;
  animation-duration: 3s;
}

.container4 span:nth-child(7) {
  top: 300px;
  right: 0;
  left: initial;
  animation-delay: 1.2s;
  animation-duration: 1.75s;
}

.container4 span:nth-child(8) {
  top: 0;
  right: 700px;
  left: initial;
  animation-delay: 1.4s;
  animation-duration: 1.25s;
}

.container4 span:nth-child(9) {
  top: 0;
  right: 1000px;
  left: initial;
  animation-delay: 0.75s;
  animation-duration: 2.25s;
}

.container4 span:nth-child(10) {
  top: 0;
  right: 450px;
  left: initial;
  animation-delay: 2.75s;
  animation-duration: 2.25s;
}

</style>
