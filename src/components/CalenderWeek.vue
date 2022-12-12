<template>
  <div id="calender-week">
    <div class="card-group">
      <!-- Anfang: Template für die Calendar-Day-Component -->
      <CalenderDay v-for="day in calenderWeekData" :key="day.id" v-bind:day="day"/>
      <!-- Ende: Template für die Calendar-Day-Component -->
    </div>
  </div>
</template>

<script>
import CalenderDay from "./CalenderDay";
import Store from "../store";

export default {
  name: "CalenderWeek",
  components: {
    CalenderDay
  },
  data() {
    return {
      calenderWeekData: Store.state.calendarWeekData,
    }
  }
}
</script>

<!--mit Scoped alle definierten Style ist nur gültige für diese Component-->
<style scoped>

</style>