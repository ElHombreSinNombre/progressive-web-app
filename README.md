# Vue Firebase CRUD

* **[Vue 2](https://vuejs.org/)**
* **[Vue Router](https://router.vuejs.org/)**

## Packages

* **[Google Recaptcha 2](https://developers.google.com/recaptcha/)**
* **[Vue Toasted](https://shakee93.github.io/vue-toasted/)**
* **[Vuetify](https://vuetifyjs.com/en/)**
* **[Firebase Database](https://firebase.google.com)**
* SASS
  -  **[SASS Loader](https://www.npmjs.com/package/sass-loader)**
  -  **[Node SASS](https://www.npmjs.com/package/node-sass)**
  
# How to use

1. In _'src'_ create _'firebase'_ folder. Inside this folder create _'firebase.js'_. Add **[Firebase](https://firebase.google.com)** connection data in this file.

2. In **[Firebase](https://firebase.google.com)**  add email authentication option. Then add email and a password. Use this data to do login.

    * In login we can read the email is _'test@gmail.com'_ and password _'vuecrud'_. Obviously if we had a different data in our database, login will use different email and password.

3. In root folder locate _'user.json'_ file. Import this to **[Firebase](https://firebase.google.com)**  database.

4. Open terminal and move to root folder. Then run:

    * _npm install_
    * _npm run dev_
