import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts:[],
    postLoaded:null,
    blogHTML:"Write your blog title here...",
    blogTitle:"",
    blogPhotoName:"",
    blogPhotoFileURL:null,
    blogPhotoPreview:null,
    editPost: null,
    user:null,
    profileEmail:null,
    profileFirstName:null,
    profileLastName:null,
    profileUsername:null,
    profileId:null,
    profileInitials:null
  },
  getters:{
    blogPostsFeed(state){
      return state.blogPosts.slice(0,2);
    },
    blogPostsCards(state){
      return state.blogPosts.slice(2,6);
    },
  },
  mutations: {
    // 변이 -> 이벤트와 매우 유사 https://vuex.vuejs.org/kr/guide/mutations.html 참고
    newBlogPost(state,payload){
      state.blogHTML=payload;
      console.log(state.blogHTML);
    },
    updateBlogTitle(state,payload){
      state.blogTitle=payload;
    },
    fileNameChange(state,payload){
      state.blogPhotoName=payload;
    },
    createFileURL(state,payload){
      state.blogPhotoFileURL=payload;
    },
    openPhotoPreview(state){
      state.blogPhotoPreview=!state.blogPhotoPreview;
    },
    toggleEditPost(state,payload){
      state.editPost=payload;
      console.log(state.editPost);
    },
    setBlogState(state,payload){
      state.blogTitle=payload.blogTitle;
      state.blogHTML=payload.blogHTML;
      state.blogPhotoFileURL=payload.blogCoverPhoto;
      state.blogPhotoName=payload.blogCoverPhotoName;
    },
    filterBlogPost(state,payload){
      state.blogPosts=state.blogPosts.filter(post => post.blogID !== payload);
    },
    updateUser(state,payload){
      state.user= payload
    },
    setProfileInfo(state,doc){
      state.profileId = doc.id;
      state.profileEmail=doc.data().email;
      state.profileFirstName=doc.data().firstName;
      state.profileLastName=doc.data().lastName;
      state.profileUsername=doc.data().username;
    },
    setProfileInitials(state){
      state.profileInitials =
      state.profileFirstName.match(/(\b\S)?/g).join("")+
      state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state,payload){
      state.profileFirstName = payload;
    },
    changeLastName(state,payload){
      state.profileLastName = payload;
    },
    changeUsername(state,payload){
      state.profileUsername = payload;
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase= await db.collection("users").doc(firebase.auth().currentUser.uid);
      //지금 있는 사용자의 uid
      const dbResults = await dataBase.get();
      //현재의 사용자를 가져오기
      commit("setProfileInfo",dbResults);
      //setProfileInfo로 변이(mutations)하기
      commit("setProfileInitials");
    },
    async getPost({state}) {
      const dataBase= await db.collection('blogPosts').orderBy('date','desc')
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if(!state.blogPosts.some((post) => post.blogID === doc.id )) {
          const data= {
            blogID: doc.data().blogId,
            blogHTML:doc.data().blogHTML,
            blogCoverPhoto:doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate:doc.data().date,
            blogCoverPhotoName:doc.data().blogCoverPhotoName
          };
          state.blogPosts.push(data)
        }
      });
      state.postLoaded=true;
    },
    async updatePost({commit,dispatch},payload){
      commit('filterBlogPost',payload);
      await dispatch("getPost");
    },
    async deletePost({commit},payload) {
      const getPost= await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit('filterBlogPost',payload);
    },
    async updateUserSettings({commit,state}) {
      const dataBase=await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName:state.profileFirstName,
        lastName:state.profileLastName,
        username:state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },
  modules: {},
});
