<template>
  <div>
    <label for="">Login : </label>
    <input v-model="userName" type="text" />
    <button @click="loginIn()"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    loginIn() {
      this.$io.emit("loginIn", this.userName);
      this.$router.push({ name: "chat" });
    },
  },
};
</script>

<style>
.login__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login__form__label {
  position: relative;
}
.login__form__avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.login__form__avatar__overlay {
  position: absolute;
  background-color: #000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.login__form__label:hover .login__form__avatar__overlay {
  opacity: 0.2;
}
.login__form__username {
  margin-top: 2rem;
}
.login__form__username__label {
  display: block;
  text-align: center;
  font-weight: 700;
  color: #292929;
}
.login__form__username__input {
  width: 8rem;
  margin-top: 2rem;
  padding: 0.4rem;
  border: none;
  border-bottom: 1.5px solid #afb4b8;
  text-align: center;
  font-size: 18px;
}
.login__form__username__input:focus {
  outline: none;
}
</style>