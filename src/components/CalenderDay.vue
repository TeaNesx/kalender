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
      <!-- Anfang: Template für die Calendar-Event-Component -->
      <CalenderEvent v-for="event in day.events" :key="event.title" :event="event" :day="day">

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

</style>