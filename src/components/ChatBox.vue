<template>
  <div>
    <div v-if="!entered">
      <div v-if="rooms.length">
        <div :key="room" v-for="room in rooms">
          <button @click="join(room)">Room : {{ room }}</button>
        </div>
      </div>
      <div v-if="!rooms.length">
        <label>Nom de la room : </label>
        <input v-model="roomName" type="text" />
        <button @click="join(roomName)">Créer une room</button>
      </div>
    </div>

    <div v-if="entered">
      <label>Le salon {{ roomName }} a été rejoint</label>
      <div>
        <label>Envoyer un message</label>
        <input v-model="text" type="text" />
        <button @click="sendMessage()">Envoyer</button>
        <div>
          <button @click="leave()">Quitter le salon</button>
        </div>
        <div>
            <p :key="message" v-for="message in messages">
              {{ message }}
            </p>
        </div>
      </div>
    </div>
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
      text: "",
      entered: false,
      rooms: [],
      roomName: undefined,
    };
  },
  created() {},
  mounted() {
    this.$io.on("message", (msg) => {
      this.messages.push(msg);
    });

    this.$io.on("rooms", (room) => {
      // eslint-disable-next-line no-debugger
      debugger;
      this.rooms.push(room);
    });
  },
  methods: {
    sendMessage() {
      console.log(this.text);
      this.$io.emit("message", { text: this.text, room: this.roomName });
    },
    join(room) {
      this.roomName = room;
      this.entered = true;
      this.$io.emit("joinRoom", room);
    },
    leave() {
      this.roomName = undefined;
      this.$io.emit("leaveRoom");
      this.entered = false;
    },
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
