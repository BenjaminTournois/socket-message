<template>
  <div>
    <chat-box v-bind:userName="userName"></chat-box>
  </div>
</template>

<script>
import ChatBox from "@/components/ChatBox";
export default {
  components: {
    ChatBox: ChatBox,
  },
  props: ['userName'],
  created() {
    if (!this.userName) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<style></style>