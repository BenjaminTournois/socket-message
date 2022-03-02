<template>
  <!-- <div>
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
        {{ writers.filter((w) => w !== userName).join(",") }} : ...
      </div>
    </div>
  </div> -->

  <div class="container">
    <div class="row clearfix">
      <div class="col-lg-12">
        <div class="card chat-app">
          <div class="chat">
            <div class="chat-header clearfix">
              <div class="row">
                <h2>Cheat</h2>
              </div>
            </div>

            <div class="chat-history">
              <ul class="m-b-0">
                <li :key="message" v-for="message in messages" class="clearfix">
                  <div
                    class="message-data"
                    v-bind:class="
                      message.userName === this.userName
                        ? 'text-right'
                        : 'text-left'
                    "
                  >
                    <span class="message-data-time">{{
                      message.userName === this.userName
                        ? "Me"
                        : message.userName
                    }}</span>
                  </div>
                  <div
                    class="message other-message"
                    v-bind:class="
                      message.userName === this.userName
                        ? 'float-right  blue-light'
                        : 'float-left'
                    "
                  >
                    {{ message.text }}
                  </div>
                </li>

                <li class="clearfix"  v-if="writers.length">
                  <div class="message-data text-left">
                    <span class="message-data-time">{{
                      writers.filter((w) => w !== userName).join(", ")
                    }}</span>
                  </div>
                  <div class="message other-message float-left">
                    {{writers.filter((w) => w !== userName).length > 1 ? 'are' : 'is'  }} typing...
                  </div>
                </li>
              </ul>
            </div>

            <form class="example" @submit.prevent="sendMessage()">
              <div
                class="form-field d-flex align-items-center"
                style="position: fixed; bottom: 10px; width: 95%"
              >
                <input
                  v-model="text"
                  @input="writing()"
                  type="text"
                  class="form-control"
                  placeholder="Enter text here..."
                />
                <button type="submit" style="background: #f4f7f6; border: none">
                  <i class="fa fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
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
      writers: [],
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

    this.$io.on("disconnect", function () {
      this.$io.emit("disconnect", {
        room: this.roomName,
        userName: this.userName,
      });
    });

    this.$io.on("writing", (data) => {
      this.writers = data.writers;
      if (this.writers.length === 1 && this.writers[0] === this.userName) {
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
    writing() {
      console.log(`${this.userName} is writing...`);
      if (this.text !== "") {
        this.$io.emit("writing", {
          userName: this.userName,
          room: this.roomName,
        });
      } else {
        this.$io.emit("stopWriting", {
          userName: this.userName,
          room: this.roomName,
        });
      }
    },
  },
};
</script>

<style>
body {
  background-color: #f4f7f6;
  margin-top: 20px;
}

form.example input[type="text"] {
  padding: 10px;
  font-size: 17px;
  float: left;
  width: 90%;
}

form.example button {
  float: left;
  width: 10%;
  padding: 10px;
  font-size: 17px;
  border-left: none;
  cursor: pointer;
}

form.example button:hover {
  background: #0b7dda;
}

form.example::after {
  content: "";
  clear: both;
  display: table;
}

.form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
}
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7;
}

.chat-app .chat {
  border-left: 1px solid #eaeaea;
}

.people-list {
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.people-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px;
}

.people-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
}

.people-list .chat-list li.active {
  background: #efefef;
}

.people-list .chat-list li .name {
  font-size: 15px;
}

.people-list .chat-list img {
  width: 45px;
  border-radius: 50%;
}

.people-list img {
  float: left;
  border-radius: 50%;
}

.people-list .about {
  float: left;
  padding-left: 8px;
}

.people-list .status {
  color: #999;
  font-size: 13px;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff;
}

.chat .chat-history ul {
  padding: 0;
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px;
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px;
}

.chat .chat-history .message {
  color: #444;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative;
}

.chat .chat-history .message:after {
  bottom: 100%;
  left: 7%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .my-message {
  background: #efefef;
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .other-message {
  background: #e8f1f3;
  text-align: right;
}

.chat .chat-history .other-message:after {
  border-bottom-color: #e8f1f3;
  left: 93%;
}

.chat .chat-message {
  padding: 20px;
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle;
}

.online {
  color: #86c541;
}

.offline {
  color: #e47297;
}

.me {
  color: #1d8ecd;
}

.float-right {
  float: right;
}

.float-left {
  float: left;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.blue-light {
  background: #00b2ff !important;
  color: white !important;
}

@media only screen and (max-width: 767px) {
  .chat-app .people-list {
    height: 465px;
    width: 100%;
    overflow-x: auto;
    background: #fff;
    left: -400px;
    display: none;
  }
  .chat-app .people-list.open {
    left: 0;
  }
  .chat-app .chat {
    margin: 0;
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
  }
  .chat-app .chat-history {
    height: 500px;
    overflow-x: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    overflow-y: scroll;
    height: 500px;
    overflow-x: auto;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
  .chat-app .chat-list {
    height: 480px;
    overflow-x: auto;
  }
  .chat-app .chat-history {
    height: calc(100vh - 350px);
    overflow-x: auto;
  }
}
</style>
