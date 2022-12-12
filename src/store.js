import {calendarWeekData} from "./seed";
import { reactive, readonly } from "vue";

/**
 * fügt calenderWeekData in das reactivity System von vue hinzu.
 * Dadurch ist das möglich Daten zu ändern und diese dann auf andere Component zu übertragen
 */
const state = reactive({
    calendarWeekData,
})

const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active)
}

const mutation = {}

export default {
    /**
     * Kann nur lesen und nicht schreiben
     */
    state: readonly(state),
    getters,
    mutation
}