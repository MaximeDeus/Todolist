<template>
  <v-btn
      color="blue"
      @click="dialogAddTodo = true"
  >
    Créer une nouvelle tâche
  </v-btn>
  <v-dialog
      v-model="dialogAddTodo"
      width="300px">
    <v-card>
      <todo-input
          :autofocus="true"
          @validate="addTodo">
      </todo-input>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialogAddTodo = false"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: "create-todo"
}
</script>

<script setup lang="ts">

import TodoInput from "@/components/TodoInput.vue";
import {ref} from "vue";
import {useTodoStore} from "@/stores/todo";
const store = useTodoStore();
const dialogAddTodo = ref(false);

async function addTodo(description: string) {
  await store.addTodo(description);
  dialogAddTodo.value = false;
}
</script>

<style scoped>

</style>
