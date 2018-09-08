<template>
  <v-app id="user">
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
      <v-toolbar-title>Users</v-toolbar-title>
    </v-toolbar>
    <div v-if="users == null">
      <v-content>
        <v-container grid-list-md text-xs-center>
          <v-layout justify-center align-center>
            <v-flex xs12 sm8 md4>
              <v-icon class="max">person</v-icon>
              <p>Users not found</p>
              <a href="#/create">
                <b>Want to create users?</b>
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
    <div v-if="users!=null">
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex xs12 sm8 md4>
              <v-toolbar dark color="primary">
                <v-container grid-list-md text-xs-center>
                  <v-layout justify-center align-center>
                    <v-icon>people</v-icon>
                  </v-layout>
                </v-container>
              </v-toolbar>
              <v-card class="elevation-12 ">
                <v-list-tile-content v-for="(user,id) in users" :key="user.name" class="text-xs-center">
                  <v-subheader>
                    <v-icon>person</v-icon>
                    Name</v-subheader>
                  <v-list-tile-sub-title>{{ user.name }}</v-list-tile-sub-title>
                  <v-subheader>
                    <v-icon>email</v-icon>Email</v-subheader>
                  <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
                  <v-container grid-list-md text-xs-center>
                    <v-layout justify-center align-center>
                      <v-card-actions>
                        <v-tooltip bottom>
                          <span slot="activator">
                            <v-btn flat dark small class="edit" @click="edit(id)">
                              <v-icon>create</v-icon>
                            </v-btn>
                          </span>
                          <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <span slot="activator">
                            <v-btn flat dark small color="error" @click="remove(user.name,id)">
                              <v-icon>delete</v-icon>
                            </v-btn>
                          </span>
                          <span>Delete</span>
                        </v-tooltip>
                      </v-card-actions>
                    </v-layout>
                  </v-container>
                  <v-divider></v-divider>
                </v-list-tile-content>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import {
    ref
  } from '../firebase/firebase'
  import Firebase from 'firebase'
  export default {
    name: 'users',
    data() {
      return {
        users: [],
        drawer: null,
      }
    },
    methods: {
      read() {
        ref.on('value', snapshot => this.users = snapshot.val())
      },
      home: function () {
        this.$router.push('/users')
      },
      create: function () {
        this.$router.push('/create')
      },
      logout: function () {
        Firebase.auth().signOut()
        this.$router.push('/')
      },
      edit: function (id) {
        this.$router.push({
          name: 'edit',
          params: {
            id: id
          }
        });
      },
      remove: function (name, id) {
        this.$toasted.show("Are you sure to delete '" + name + "'?", {
          type: 'error',
          position: "bottom-center",
          duration: 10000,
          icon: 'error',
          action: [{
              text: 'Delete',
              onClick: (e, toastObject) => {
                ref.child(id).remove();
                toastObject.goAway(0);
                this.$toasted.show("The user has been deleted", {
                  type: "success",
                  position: "bottom-center",
                  icon: 'check',
                  duration: 5000
                });
              },
            },
            {
              text: 'Cancel',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          ]
        });

      },
    },
    mounted() {
      this.read()
    }
  }

</script>
