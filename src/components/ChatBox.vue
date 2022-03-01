<template>
  <div>
    <div>
      <form @submit.prevent="sendMessage()">
        <label>Envoyer un message</label>
        <input @input="writing()" v-model="text" type="text" />
        <button type="submit">Envoyer</button>
      </form>

      <div>
        <p :key="message" v-for="message in messages">
          {{ message.userName }} : {{ message.text }}
        </p>
      </div>
      <div v-if="writers.length">
        {{ writers.filter(w => w !== userName).join(',') }} : ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
  props: ["userName"],
  data() {
    return {
      count: 0,
      messages: [],
      users: [],
      roomName: "saloon",
      writers:[],
      text: "",
    };
  },
  created() {},
  mounted() {
    this.$io.emit("joinRoom", { room: this.roomName, userName: this.userName });

    this.$io.on("message", (data) => {
      this.messages.push({
        userName: data.userName,
        text: data.text,
      });
    });

    this.$io.on("disconnect", function(){
      this.$io.emit("disconnect", { room: this.roomName, userName: this.userName });
    });

    this.$io.on("writing", (data) => {
      this.writers = data.writers;
      if(this.writers.length === 1 && this.writers[0] === this.userName) {
        this.writers = [];
      }
    });

    this.$io.on("users", (users) => {
      this.users = users;
    });
  },
  methods: {
    sendMessage() {
      this.$io.emit("message", { text: this.text, room: this.roomName });
      this.text = "";
    },

    leave() {
      this.$io.emit("leaveRoom", this.roomName);
    },
    writing(){
      console.log(`${this.userName} is writing...`);
      if(this.text !== ""){
        this.$io.emit("writing", { userName: this.userName, room: this.roomName });
      }else{
        this.$io.emit("stopWriting", { userName: this.userName, room: this.roomName });
      }
    }
  },
};
</script>

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
