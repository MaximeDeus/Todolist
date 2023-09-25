<template>
  <v-app>
    <v-main class="container">
      <error-alert/>
      <v-progress-circular v-if="!isLoaded" indeterminate color="blue"/>
      <template v-else-if="isLoaded && errorMessage !== ErrorMessages.LOAD_TODOLIST"> <!-- fatal error -->
        <todolist-item/>
        <create-todo/>
      </template>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TodolistItem from "@/components/Todolist.vue";
import CreateTodo from "@/components/createTodo.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import {ErrorMessages} from "@/types/errorMessages";
import {onBeforeMount, ref} from "vue";

const store = useTodoStore();
const {errorMessage} = storeToRefs(store);
const isLoaded = ref(false);

onBeforeMount(async () => {
  await store.loadTodos();
  isLoaded.value = true;
})
</script>

<style scoped>
.container {
  width: 450px;
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  margin-top: 100px;
}
</style>
