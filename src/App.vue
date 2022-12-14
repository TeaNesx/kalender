<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <!-- Anfang: Template für die Calendar-Week-Component -->
<!--        <CalenderWeekAsList/>-->
<!--        <CalenderWeek/>-->

<!--        State wird erhalten beim wechseln des component. <keep-alive></keep-alive>-->
<!--          mode damit die animation nicht gleichzeigit läuft sondern erst, wenn das eine fertig ist-->
        <keep-alive>
          <transition name="fade" mode="out-in" appear>
            <component :is="activeView"/>
          </transition>
        </keep-alive>
        <!-- Ende: Template für die Calendar-Week-Component -->
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 offset-4">
        <!-- Anfang: Template für die Calendar-Entry-Component -->
        <CalenderEntry/>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
      <div class="col-2 offset-2">
        <div class="float-end">
          <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
          <button
              class="btn btn-lg mb-2"
              :class="buttonSettingsClasses"
              @click="toggleDisplaySettings()"
          >
            <i class="fas fa-cogs"></i>
          </button>
        </div>
        <!-- Anfang: Template für die Calendar-Settings-Component -->
<!--        <transition name="fade">-->
<!--          <CalenderSettings v-if="displaySettings"/>-->
<!--        </transition>-->
        <transition
            enter-active-class="animate__animated animate__bounceInRight"
            leave-active-class="animate__animated animate__bounceOutRight">
          <CalenderSettings v-if="displaySettings"/>
        </transition>
        <!-- Ende: Template für die Calendar-Day-Component -->
      </div>
    </div>
  </div>
</template>

<script>
// import { defineAsyncComponent } from "vue"

import CalenderWeek from "./components/CalenderWeek";
import CalenderEntry from "./components/CalenderEntry";
import CalenderSettings from "./components/CalenderSettings";
import CalenderWeekAsList from "./components/CalendarWeekAsList"
import Store from "./store"

export default {
  name: "App",
  components: {
    // Langschreibweise
    // 'CalenderWeek': CalenderWeek,

    //Kurzsschreibweise
    CalenderWeek,
    CalenderEntry,
    // CalenderSettings: defineAsyncComponent(() => {
    //   import(/*webpackChunkName: 'CalenderSettingsComponent'*/'./components/CalenderSettings.vue')
    // }),
    CalenderSettings,
    CalenderWeekAsList
  },
  data() {
    return {
      displaySettings: false,
    }
  },
  methods: {
    toggleDisplaySettings() {
      this.displaySettings = !this.displaySettings;
    }
  },
  computed: {
    buttonSettingsClasses() {
      return  this.displaySettings ? ["btn-success"] : ["btn-outline-success"];
    },
    activeView() {
      return Store.getters.activeView();
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~animate.css/animate.min.css";

.square {
  width: 40px;
  height: 40px;
}

/*Transition fade */
/* Hat die Transition kein Name Attribut, ist der Name automatisch "v-" bsp "v-enter-from"*/
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from{
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active{
  transition:  all 0.25s ease-out;
}
</style>
