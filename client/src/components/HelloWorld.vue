<template>
  <div class="content">
    <div class="insertpost">
      <h2>New Post</h2>
      <!-- <input type="text" class="inputbox" v-model="text" placeholder="Say Something" /> -->
      <textarea v-model="text" cols="30" rows="3" placeholder="Say Something..."></textarea>
      <br />
      <a-button @click="postBlog">Post!</a-button>
    </div>
    <hr />
    <h2>Blogs</h2>
    <div class="blog" v-for="(post,index) in posts" :item="post" :index="index" :key="post._id">
      <div class="box">
        <p class="post">{{post.text}}</p>
      </div>

      <a-button>detail</a-button>
      <!-- 在detail中， 利用key来取出database中的数据 然后进行对这个id的数据的请求 在加载到这个post的单独页面 -->
      <button @click="deleteBlog(post._id)">Delete</button>
      <p
        class="date"
      >{{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</p>
    </div>
    <!-- <a-pagination  :total="50" show-less-items /> -->
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPost();
    } catch (err) {
      this.error = err.message;
    }
  },

  methods: {
    async postBlog() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPost();
      this.text = "";
      alert("Posted");
    },
    async deleteBlog(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPost();
      // alert("Post Deleted");
      this.$message.info('This is a normal message');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
textarea {
  resize: none;
}

// .insertblog{

// }

// .content {
//   background-image: url("../assets/Background.jpg");

//     background-repeat: no-repeat;
//   background-size: auto;
// }

.blog :hover ::before{
  background-color:red;
}
.blog {
  width: 60%;
  margin: auto;
  margin-bottom: 2em;
  padding: 1em 2em 0em 1em;

  height: 300px;
  clear: both;
  // display: block;
  border-style: solid;
  border-radius: 10%;
  border-color: blue;
}
.box p {
  // float: left;
  white-space: wrap;
  overflow: hidden;
  overflow-y: hidden;
  height: 170px;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  clear: both;
  display: block;
  white-space: pre;
  // width:50%;
}
.post {
  font-size: 130%;
}
.date {
  color: red;
  text-align: right;
  font-size: 100%;
}
p {
  word-break: break-all;
}
</style>
