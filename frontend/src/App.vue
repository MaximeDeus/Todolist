<script setup lang="ts">
import TodolistItem from "@/components/Todolist.vue";
import CreateTodo from "@/components/createTodo.vue";
</script>

<template>
  <v-app>
    <v-main class="container">
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
  flex-direction: column;
  gap: 25px;
  margin-top: 100px;
}
</style>
