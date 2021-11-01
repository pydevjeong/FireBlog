<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{this.currentBlog[0].blogTitle}}</h2>
      <img :src="blogCoverPhoto" alt=""/>
      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ViewBlog",
  data() {
    return{
      currentBlog:null,
    }
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter(post => {
      return post.blogID === this.$route.params.blogid
    })
  },
}
</script>

<style lang="scss">

</style>