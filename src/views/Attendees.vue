<template>
  <div class="container mt-4">
      <div class="row justify-content-center">
      <div class="col-md-8"
      v-if="user != null && user.uid == userID">
        <h1 class="font-weight-light text-center">Attendees</h1>

        <div class="card bg-light mb-4">
          <div class="card-body text-center">
            <div class="input-group input-group-lg">
              <input
                type="text"
                placeholder="Search Attendees"
                class="form-control"
                v-model="searchQuery"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div
        class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
        v-for="item in filteredAttendees"
        :key="item.id"
      >
        <div class="card">
          <div class="card-body px-3 py-2 d-flex align-items-center justify-content-center">
                      <div
              class="btn-group pr-2"
              v-if="user !== null && user.uid == userID"
            >
              <button
                class="btn btn-sm"
                :class="[item.star ? 'text-danger' : '', 'btn-outline-secondary']"
                title="Give user a Star"
                @click="toggleStar(item.id)"
              ><i class="material-icons">star</i>
              </button>
               <a
                class="btn btn-sm btn-outline-secondary"
                title="Send user an email"
                :href="'mailto:' + item.email + '?body=' + 'Hi ' + item.displayName + '&subject=Meeting Information'">
                <i class="material-icons">email</i>
              </a>

              <button
                class="btn btn-sm btn-outline-secondary"
                title="Delete Attendee"
                @click="deleteAttendee(item.id)"
              ><i class="material-icons">delete</i>
              </button>
              </div>
                <div
                class="hidden"
                >123
                </div>
            <div>{{item.displayName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../db.js"

export default {
  name: "Attendees",
  data() {
      return {
          attendees: [],
          displayAttendees: [],
          userID: this.$route.params.userID,
          meetingID: this.$route.params.meetingID,
          searchQuery: ""
      }
  },
  computed: {
      filteredAttendees(){
          const dataFilter = (item) => 
                item.displayName.toLowerCase().match(this.searchQuery.toLowerCase()) && true;
          return this.displayAttendees.filter(dataFilter);
      } 
  },
  props: ["user"],
  methods: {
      deleteAttendee(payload) {
          if (this.user && this.user.uid == this.userID) {
        db.collection("users").doc(this.user.uid).collection("meetings").doc(this.meetingID).collection("attendees").doc(payload).delete();
      }
      },
      toggleStar(payload) {
          if (this.user && this.user.uid == this.userID) {
              const ref = db.collection("users").doc(this.userID).collection("meetings").doc(this.meetingID).collection("attendees").doc(payload);

              ref.get().then(doc => {
                  const star = doc.data().star;
                  if (star) {
                      ref.update({
                          star: !star
                      })
                  } else {
                      ref.update({
                          star: true
                      })
                  };
              })
          }

      }
  },
  mounted() {
      db.collection("users").doc(this.userID).collection("meetings").doc(this.meetingID).collection("attendees").onSnapshot(
          snapshot => {
              const snapData = [];
              snapshot.forEach(doc => {
                snapData.push({
                    id: doc.id,
                    email: doc.data().email,
                    displayName: doc.data().displayName,
                    star: doc.data().star
                })
              })
            this.attendees = snapData;
            this.displayAttendees = this.attendees;
          }
      )
  }
};

</script>

<style>

.hidden {
  opacity: 0.0;
}

</style>