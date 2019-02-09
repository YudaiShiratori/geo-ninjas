<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center purple-text">signup</h2>
      <div class="field">
        <label for="email" name="email">Email:</label>
        <input type="text" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password" name="password">Password:</label>
        <input type="text" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="alias" name="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias">
      </div>
      <div class="field center">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn purple">
          Signup
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        })
        let ref = db.collection('users').doc('this.slug')
        ref.get().then(doc => {
          if(doc.exists) {
            this.feedback = "this alias always exists"
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              ref.set({
                alias: this.alias,
                user_id: user.uid
              })
            }).then(() => {
              this.$router.push({ name: 'GMap' })
            })
            .cacth(err => {
              console.log(err)
              this.feedback = err.message
            })
          }
        })
      } else {
          this.feedback = "you must enter"
      }
    }
  }
}
</script>

<style lang="stylus">
.signup
  max-width 400px
  margin-top 60px
.signup h2
  font-size 2.4em
.signup .field
  margin-bottom 1.6px
</style>
