<template>
  <div class="card border-start"
       :class="cardClasses"
  >

    <div class="card-header text-center"
         :class="cardHeaderClasses"
         role="button"
         @click="setActiveDay"
    >
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
      <transition name="fade" mode="out-in">
        <div v-if="day.events.length">
          <transition-group name="list">
            <!-- Anfang: Template für die Calendar-Event-Component -->
            <CalenderEvent v-for="event in events" :key="event.title" :event="event" :day="day">

      <!--        <template v-slot:eventPriority="slotProps">-->
              <template #eventPriority="slotProps">
                <h5>
                  {{slotProps.priorityDisplayName}}
                </h5>
              </template>

      <!--    <template v-slot:default>-->
              <template v-slot="{event: entry}">
                <i>{{entry.title}}</i>
              </template>
            </CalenderEvent>
            <!-- Ende: Template für die Calendar-Event-Component -->
          </transition-group>
        </div>
        <div v-else>
          <div class="alert alert-light text-center">
            <i>Keine Termine</i>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import CalenderEvent from "./CalenderEvent";
import Store from "../store";

export default {
  name: 'CalenderDay',
  components: {
    CalenderEvent
  },
  //Array Schreibweise, nicht zu empfehlen
  // props: ["day"],

  //Objekt schreibweise
  props: {
    // Mögliche Typen: String, Number, Boolean, Array, Object oder Function
    // Mehrere Typen mit Array-Schreibweise: [String, Number]

    //Kurzform
    // day: Object

    //Langform
    day: {
      type: Object,
      required: true,

      // Bei Primitiven Datentypen: default: 100
      // Bei nicht primitiven datentypen

      default: function () {
        return {
          id: -1,
          fullName: "Fehelnder Wochentag",
          events: [],
        }
      },
      validator: function (value) {
        if(Object.keys(value).includes("id")) {
          return true;
        }
      }
    }
  },
  computed: {
    cardClasses() {
      return this.day.id === Store.getters.activeDay().id ? ["border-primary"] : null;
    },
    cardHeaderClasses() {
      return this.day.id === Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null;
    },
    events() {
      return Store.getters.events(this.day.id)
    }
  },
  methods: {
    setActiveDay() {
      Store.mutation.setActiveDay(this.day.id)
    }
  }
}
</script>

<style scoped>
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/*.list-enter-to,*/
/*.list-leave-from {*/
/*  opacity: 1;*/
/*  transform: translateY(0);*/
/*}*/

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-move {
  transition: transform 0.8s ease;
}
</style>