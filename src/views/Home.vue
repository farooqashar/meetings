<template>
  <div class="mt-3">
    <div class="text-secondary text-center">
      <div
        v-if="user"
        class="text-center"
      >
        Welcome back
        <span class="font-weight-bold text-info">{{user.displayName}}!</span> <a
          href="#"
          role="button"
          class="text-primary"
          @click="$emit('logout')"
        >Logout</a>
      </div>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 main">Meeting Log</h4>
          <p class="lead">
            This simple app creates meetings and allows people to check in.
          </p>

          <div class="frontbuttons">
          <div class = "eachbutton">
          <router-link
            class="btn btn-outline-primary mr-2"
            to="/register"
            v-if="!user"
          >Register</router-link>
          </div>
          <div class = "eachbutton">
          <router-link
            class="btn btn-outline-primary mr-2"
            to="/login"
            v-if="!user"
          >Log In</router-link>
          </div>
          </div>

          <router-link
            class="btn btn-primary"
            to="/meetings"
            v-if="user"
          >Meetings</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: ["user"]
};
</script>

<style>

@keyframes mainTitle {
  from {color: red;}
  to {color: white;}
  to {color: blue;}
}

.main {
  animation-name: mainTitle;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.frontbuttons  {
  display: flex;
  justify-content: center;
}

.eachbutton  {
  padding-right: 19px;
}
</style>

