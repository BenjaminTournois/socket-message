<template>
  <div>
    <input v-model="text" type="text" />
    <button @click="sendMessage">Envoyer</button>
  </div>
  <div>
    <ul>
      <li :key="message" v-for="message in messages">
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
  props: {
    // userName: String,
  },
  data() {
    return {
      count: 0,
      messages: [],
      text:""
    };
  },
  created() {},
  mounted() {
    this.$io.on("message", (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    sendMessage(){
      console.log(this.text);
      this.$io.emit("message", this.text);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
