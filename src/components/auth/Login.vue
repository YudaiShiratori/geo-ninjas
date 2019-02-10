<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn btn-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.passward)
        .then(user => {
          this.$router.push({ name: 'GMap'})
          console.log(user)
        }).catch(err) {
          this.feedback = err.message
        }
        this.feedback = null
      } else {
        this.feedback = 'You must enter'
      }
    }
  }
}
</script>

<style lang="stylus">
.login
  max-width 400px
  margin-top 60px
.login h2
  font-size 2.4em
</style>
