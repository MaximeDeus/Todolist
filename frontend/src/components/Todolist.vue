<template>
  <v-list class="elevation-2">
    <v-list-subheader color="blue">TODOLIST</v-list-subheader>
    <transition-group v-if="todos.length > 0" name="list" tag="div">
      <todo-item
          v-for="(todo) in todos"
          :key="todo.id"
          :id="todo.id"
      />
    </transition-group>
    <v-list-item v-else>
      <template v-slot:title>
        Aucune tâche à réaliser
      </template>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
export default {

  name: "todolist-item"
}
</script>

<script setup lang="ts">
import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import TodoItem from "@/components/Todo.vue";

const store = useTodoStore();
const {todos} = storeToRefs(store);

</script>

<style scoped>

.list-enter-active,
.list-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.v-list {
  max-height: 400px;
}

.v-btn {
  width: fit-content;
  align-self: center;
}

</style>
