<script setup lang="ts">
import TodolistItem from "@/components/Todolist.vue";
import CreateTodo from "@/components/createTodo.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
</script>

<template>
  <v-app>
    <v-main class="container">
      <error-alert/>
      <todolist-item/>
      <create-todo/>
    </v-main>
  </v-app>
</template>

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
