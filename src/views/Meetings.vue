<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <h1 class="font-weight-light text-center">Add a Meeting</h1>

        <div class="card bg-light">
          <div class="card-body text-center">
            <form class="formgroup">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  name="meetingName"
                  placeholder="Meeting Name"
                  aria-describedby="buttonAdd"
                  v-model="meetingName"
                  ref="meetingName"
                />
                <div class="input-group-append">
                  <button
                    type="submit"
                    class="btn btn-sm btn-info"
                    id="buttonAdd"
                    @click.prevent="handleAdd"
                  >
                  <i class="material-icons">add</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-11 col-md-8 col-lg-6">
        <div class="card border-top-0 rounded-0">
          <div class="card-body py-2">
            <h4 class="card-title m-0 text-center">Your Meetings</h4>
          </div>
          <div class="list-group list-group-flush">
            <div
              class="list-group-item d-flex"
              v-for="each_meeting in meetings"
              :key="each_meeting.id"
            >
              <section
                class="btn-group align-self-center"
                role="group"
                aria-label="Meeting Options"
              >
                <button
                  data-toggle="tooltip" 
                  data-placement="top" 
                  title="Delete Meeting"
                  class="btn btn-sm btn-outline-secondary"
                  @click="$emit('deleteMeeting', each_meeting.id)"
                ><i class="material-icons">delete</i>
                </button>

                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Check In"
                  :to="'/checkin/' + user.uid + '/' + each_meeting.id"
                ><i class="material-icons">link</i>
                </router-link>

                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Attendees"
                  :to="'/attendees/' + user.uid + '/' + each_meeting.id"
                ><i class="material-icons">list</i>
                </router-link>
                <div
                class="hidden"
                >PLACEHOLDER
                </div>

              </section>
              <section class="pl-3 text-left align-self-center">
                {{each_meeting.name}}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Meetings",
  data() {
    return {
      meetingName: null
    };
  },
  methods: {
    handleAdd() {
      this.$emit("addMeeting", this.meetingName);
      this.meetingName = null;
      this.$refs.meetingName.focus();
    }
  },
  props: ["user", "meetings"]
};
</script>

<style>

.meetingName {
  justify-content: center;
}

.hidden {
  opacity: 0.0;
}
</style>