<template>
  <v-app id="edit">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile @click="home">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="create">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New user</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Edit</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-container grid-list-md text-xs-center>
                  <v-layout justify-center align-center>
                    <v-icon>edit</v-icon>
                  </v-layout>
                </v-container>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="user" name="user" label="User" type="text" required></v-text-field>
                  <v-text-field prepend-icon="mail" v-model="email" name="email" label="Email" type="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  import {
    ref
  } from '../firebase/firebase'
  import Firebase from 'firebase'
  export default {
    name: 'edit',
    data: function () {
      return {
        user: '',
        email: '',
        drawer: null
      }
    },
    methods: {
      read() {
        var edit = ref.child(this.$route.params.id)
        edit.on('value', snapshot => this.user = snapshot.val().name)
        edit.on('value', snapshot => this.email = snapshot.val().email)
      },
      submit: function () {
        if (!this.user) {
          this.$toasted.show("The name is required", {
            type: "info",
            position: "bottom-center",
            icon: 'info',
            duration: 5000
          });
        } else {
          ref.child(this.$route.params.id).update({
            email: this.email,
            name: this.user
          })
          this.$toasted.show("The user has been modified", {
            type: "success",
            position: "bottom-center",
            icon: 'check',
            duration: 5000
          });
        }
      },
      home: function () {
        this.$router.push('/users')
      },
      create: function () {
        this.$router.push('/Create')
      },
      logout: function () {
        Firebase.auth().signOut()
        this.$router.push('/')
      },
    },
    mounted() {
      this.read()
    }
  }

</script>
