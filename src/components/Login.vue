<template>
  <v-app id="app">
    <v-layout align-end justify-end>
      <v-tooltip bottom align-end justify-end>
        <span slot="activator">
          <v-btn flat icon @click.native="snackbar = true">
            <v-icon>info</v-icon>
          </v-btn>
        </span>
        <span>Info</span>
      </v-tooltip>
    </v-layout>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="mail" v-model="email" name="email" label="Email" type="text"></v-text-field>
                <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" type="password"></v-text-field>
              </v-form>
              <div class="g-recaptcha text-xs-center" data-sitekey="6Lfh-l0UAAAAAJ1AXqea5SR8oqh2ziOjsfPwg_bA"></div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
          <v-snackbar :timeout="timeout" :top="y === 'top'" :bottom="y === 'bottom'" :right="x === 'right'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
            :vertical="mode === 'vertical'" v-model="snackbar">
            {{ text }}
            <v-btn flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import Firebase from 'firebase'
  export default {
    name: 'app',
    data: function () {
      return {
        email: '',
        password: '',
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 0,
        text: 'Email: test@gmail.com - Password: vuecrud'
      }
    },
    methods: {
      login: function () {
        if (grecaptcha.getResponse().length === 0) {
          this.$toasted.show("You are a robot!", {
            type: "error",
            position: "bottom-center",
            icon: 'error',
            duration: 5000
          })
        } else {
          Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              this.$router.push('/users')
            },
            (err) => {
              this.$toasted.show("Wrong user or password!", {
                type: "error",
                position: "bottom-center",
                icon: 'error',
                duration: 5000
              });
            }
          )
        }

      }
    }
  }

</script>
