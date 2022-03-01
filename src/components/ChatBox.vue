<template>
  <div>
    <div>
      <form @submit.prevent="sendMessage()">
        <label>Envoyer un message</label>
        <input v-model="text" type="text" />
        <button type="submit">Envoyer</button>
      </form>

      <div>
        <p :key="message" v-for="message in messages">
          {{ message.userName }} : {{ message.text }}
        </p>
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
