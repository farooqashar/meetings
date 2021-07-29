<template>
  <div id="app">
    <Navigation
      :user="user"
      @logout="logout"
    />
    <router-view
      class="container"
      :user="user"
      :meetings="meetings"
      :error="error"
      @logout="logout"
      @addMeeting="addMeeting"
      @deleteMeeting="deleteMeeting"
      @checkIn="checkIn"
    />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Firebase from "firebase";
import db from "./db.js";
export default {
  name: "App",
  data() {
    return {
      user: null,
      meetings: [],
      error: null
    };
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        });
    },
    addMeeting(payload) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .add({
          name: payload,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    deleteMeeting(payload) {
      db.collection("users").doc(this.user.uid).collection("meetings").doc(payload).delete();
    },
    checkIn(payload) {
      db.collection("users").doc(payload.userID).collection("meetings").doc(payload.meetingID).get().then(doc => {
       if (doc.exists) {
         db.collection("users").doc(payload.userID).collection("meetings").doc(payload.meetingID).collection("attendees").add({
           displayName: payload.displayName,
           email: payload.email,
           createdAt: Firebase.firestore.FieldValue.serverTimestamp()
         }).then(() => this.$router.push("'/attendees/ + payload.userID + '/' + payload.meetingID"))
       } else {
         this.error = "No such meeting exists in record. Please try again."
       }}
      )
    }
  },
  mounted() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        db.collection("users")
          .doc(this.user.uid)
          .collection("meetings")
          .onSnapshot(snapshot => {
            const snapData = [];
            snapshot.forEach(doc => {
              snapData.push({
                id: doc.id,
                name: doc.data().name
              });
            });
            this.meetings = snapData;
          });
      }
    });
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
$primary: red;
@import "node_modules/bootstrap/scss/bootstrap";
</style>