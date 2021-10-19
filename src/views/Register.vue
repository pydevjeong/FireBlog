<template>
    <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?  
        <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon"/>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon"/>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon"/>
        </div>
        <div v-show="error" class="error">{{this.errorMsg}}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <!-- 위 버튼을 누르면 firebase에 데이터가 가도록 만들것 -->
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";
export default {
  name:"Register",
  components:{
    email,
    password,
    user,
  },
  data() {
    return{
      firstName:"",
      lastName:"",
      username:"",
      email:"",
      password:"",
      error:null,
      errorMsg:"",
    };
  },
  methods:{
    //https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Async_await
    // firebase function 만들기
    //async 를 함수와 같이 사용하면 결과를 직접 반환하는게 아니라 Promise를 반환하게 한다
    // 왜 사용하느냐? 이 동기식함수는 await사용을 위한 지원+ 함께 실행되는 잠재적인 오버헤드를 피할 수 있다.
    async register() {
      //자 데이터베이스에 넘기려면 항목들이 다 채워져야한다 따라서
      if(
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ){
        this.error=false;
        this.errorMsg="";
        //firebase 문법쪽 ->
        const firebaseAuth=await firebase.auth();
        const createUser=await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const dataBase =db.collection("users").doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email
        });
        //이제 푸쉬
        this.$router.push({name:'Home'});
        return;
      }
      this.error=true;
      this.errorMsg="Please fill out all the fiedls";
      return;
  },
},
}
</script>

<style lang="scss" scoped>
.register{
  h2{
    max-width: 350px;

  }
}

</style>