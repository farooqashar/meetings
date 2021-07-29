import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Meetings from "../views/Meetings.vue";
import Register from "../views/Register.vue";
import CheckIn from "../views/CheckIn.vue";
import Attendees from "../views/Attendees.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: "/",
  },
  {
    path: '/checkin/:userID/:meetingID',
    name: 'Check In',
    component: CheckIn
  },
    {
    path: '/attendees/:userID/:meetingID',
    name: 'Attendees',
    component: Attendees
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
