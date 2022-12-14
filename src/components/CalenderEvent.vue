<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <transition name="fade" mode="out-in">
  <!--      Template für den Fall, dass das Event nicht bearbeitet wird-->
        <div v-if="!event.edit">
          <div>
    <!--        <strong>{{ priorityDisplayName }}</strong>-->
            <slot name="eventPriority"
                  :priorityDisplayName="priorityDisplayName" >
              <strong> {{ priorityDisplayName }} </strong>
            </slot>
          </div>

    <!--      <div>{{event.title}}</div>-->
          <slot :event="event">
            <div>{{event.title}}</div>
          </slot>

          <div>
            <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
            <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
          </div>
        </div>
  <!--   Muss dirkt unter v-if sein-->
  <!--      <template v-else-if="event.edit">-->
  <!--        -->
  <!--      </template>-->
        <div v-else>
          <input
              type="text"
              class="form-control"
              :placeholder="event.title"
              @input="setNewEventTitle($event)"
              ref="newEventTitleInput"/>
          <hr>
          <div> {{newEventTitle}} </div>
          <i class="fas fa-check" role="button" @click="updateEvent()"></i>
          <select class="form-select mt-2" v-model="newEventPriority">
            <option value="-1"> Hoch</option>
            <option value="0"> Mittel</option>
            <option value="1"> Tief</option>
          </select>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: 'CalenderEvent',
  props: {
    event: Object,
    day: Object
  },
  data() {
    return {
      newEventTitle:"",
      newEventPriority: this.event.priority,
    }
  },
  computed: {
    priorityDisplayName() {
      switch (this.event.priority) {
        case 1:
          return "Tief"
        case 0:
          return "Mittel"
        case -1:
            return "Hoch"
      }
      return "Unbekannte Priorität"
    },
    alertColor() {
      return "alert-" + this.event.color;
    }
  },
  methods: {
    deleteEvent() {
      Store.mutation.deleteEvent(this.day.id, this.event.title);
    },
    editEvent() {
      Store.mutation.editEvent(this.day.id, this.event.title);
      // Template wird geladen bedeutet, 1 tick
      // Funktion wird erst dann ausfgeführt, beim nächsten Tick
      this.$nextTick(() => {
        // Auf die template refs zugreifen
        this.$refs.newEventTitleInput.focus();
      })
    },
    setNewEventTitle(event) {
      this.newEventTitle = event.target.value;
    },
    updateEvent() {
      Store.mutation.updateEvent(this.day.id, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority
      });
    }
  }
}
</script>

<style scoped>

</style>