<template>
  <header>
   <nav class="container">
    <div class="branding">
           <router-link class="header" :to="{name: 'Home'}">FireBlogs</router-link>
    </div>
    <div class="nav-links">
        <ul v-show="!mobile">
            <router-link class="link" :to="{name:'Home'}">Home</router-link>
            <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
            <router-link class="link" :to="{name:'Blogs'}">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{name:'Login'}">Login/Register</router-link>
        </ul>
    <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
        <span>{{this.$store.state.profileInitials}}</span>
     <div v-show="profileMenu" class="profile-menu">
        <div class="info">
            <p class="initials">{{this.$store.state.profileInitials}}</p>
        <div class="right">
            <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
            <p>{{this.$store.state.profileUsername}}</p>
            <p>{{this.$store.state.profileEmail}}</p>
          </div>
         </div>
         <div class="options">
             <div class="option">
                 <router-link class="option" :to="{name:'Profile'}">
                     <userIcon class="icon"/>
                     <p>profile</p>
                 </router-link>
             </div>
             <div class="option">
                 <router-link class="option" :to="{name:'Admin'}">
                     <adminIcon class="icon"/>
                     <p>Admin</p>
                 </router-link>
             </div>
             <div @click="signOut" class="option">
                     <signOutIcon class="icon"/>
                     <p>Sign out</p>
             </div>
         </div>
      </div>
     </div>
    </div>
   </nav>
   <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile"/>
   <!-- 아래 transition은 모바일로 볼때 즉 화면이 줄었을때 메뉴를 나타낸다 -->
   <transition name="mobile-nav">
   <ul class="mobile-nav" v-show="mobileNav">
       <router-link class="link" :to="{name:'Home'}">Home</router-link>
       <router-link class="link" :to="{name:'Blogs'}">Blogs</router-link>
       <router-link class="link" to="#">Create Post</router-link>
       <router-link v-if="!user" class="link" to="Login">Login/Register</router-link>
   </ul>
   </transition>
  </header>
</template>
<script>
import menuIcon from '../assets/Icons/bars-regular.svg';
import userIcon from '../assets/Icons/user-alt-light.svg';
import adminIcon from '../assets/Icons/user-crown-light.svg';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import firebase from "firebase/app";
import "firebase/auth";
export default {
    name: 'navigation',
    components: {
        menuIcon,userIcon,adminIcon,signOutIcon
    },
    data() {
        return {
            profileMenu:null,
            //모바일 동작시 모바일 요소만 보여지게 하기위해 세팅
            mobile:null,
            mobileNav:null,
            windownWidth:null,
        };
    },
    created() {
        window.addEventListener('resize',this.checkScreen);
        this.checkScreen();
    },
    //아래 methods에서 창 줄이고 늘리는걸 확인하는 함수를 생성
    methods: {
        checkScreen(){
            this.windownWidth=window.innerWidth;
            if(this.windownWidth <= 750){
                this.mobile=true;
                return;
            }
            this.mobile=false;
            this.mobileNav=false;
            return;
        },
        //모바일 네비게이션 토글
        toggleMobileNav() {
            this.mobileNav=!this.mobileNav;
        },
        toggleProfileMenu(e){
            if(e.target===this.$refs.profile){
                this.profileMenu= !this.profileMenu;
            }
        },
        signOut(){
            firebase.auth().signOut();
            window.location.reload();
        }
    },
    computed:{
        user() {
            return this.$store.state.user;
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0 ,0 ,0 ,0.1),0 2px 4px -1px rgba(0, 0,  0, 0.06);
    z-index: 99;

.link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover{
        color:#1eb8b8;
    }
}
nav{
    display: flex;
    padding: 25px 0;

    .branding{
        display: flex;
        align-items: center;
    }
    .header{
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
    }
    .nav-links{
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: flex-end;

        ul{
            margin-right: 32px;

            .link{
                margin-right: 32px;
            }
            // 마지막요소의 마진값만 없애기
            .link:last-child{
                margin-right: 0;
            }
        }
        
        .profile{
         position: relative;
         cursor: pointer;
         display: flex;
         align-items: center;
         justify-content: center;
         width: 40px;
         height: 40px;
         border-radius: 50%;
         color: #fff;
         background-color: #303030;
         
         span{
             pointer-events: none;
         }

         .profile-menu{
             position: absolute;
             top: 60px;
             right: 0;
             width: 250px;
             background-color: #303030;
             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.06),0 2px 4px -1px rgba(0, 0, 0, 0.06);
             
             .info{
                 display: flex;
                 align-items: center;
                 padding: 15px;
                 border-bottom: 1px solid #fff;
             }
             .options{
                 padding: 15px;
                 .option{
                     text-decoration: none;
                     color: #fff;
                     display: flex;
                     align-items: center;
                     margin-bottom: 12px;

                     .icon {
                         width: 18px;
                         height: auto;
                     }

                     p{
                         font-size: 14px;
                         margin-left: 12px;
                     }

                     &:last-child{
                         margin-bottom: 0px;
                     }
                 }
             }

             .initials{
                 position: initial;
                 width: 40px;
                 height: 40px;
                 background-color: #fff;
                 color: #303030;
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 border-radius: 50%;
             }
             
             .right{
                 flex: 1;
                 margin-left: 24px;
                 p:nth-child(1){
                     font-size: 14px;
                 }
                 p:nth-child(2),
                 p:nth-child(3){
                     font-size: 12px;
                 }
             }
         }
        }
    }
}

.menu-icon{
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
}
.mobile-nav{
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
    .link{
        padding: 15px 0;
        color: #fff;
    }
}
//트렌지션으로 네비게이션 버튼 누르면 1초동안 느리게 나오게
//아래 있는 모든 클래스는 네비게이션 바에 적용됨
.mobile-nav-enter-active,
.mobile-nav-leave-active{
    
    transition: all 1s ease;
}

.mobile-nav-enter{
    //네비게이션 바를 클릭시 -250px값을 줘서 네비게이션 바를 들여보냄
    transform: translateX(-250px);
}
.mobile-nav-enter-to{
    //화면이 작아지면 0=> 즉 네비게이션 바가 나옴
    transform: translateX(0);
}
.mobile-nav-leave-to{
    //leave (화면이 화면 고정값보다(750px)커지거나) 네비게이션 바를 누르면 들여보냄
    transform: translateX(-250px);
}
}
</style>