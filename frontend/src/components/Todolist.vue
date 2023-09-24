<template>
  <div class="container" v-if="isLoaded" style="width: 450px">
    <v-list class="elevation-2">
      <v-list-subheader color="blue">TODOLIST</v-list-subheader>
      <transition-group v-if="todos.length > 0" name="list" tag="div" >
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
  </div>
</template>

<script lang="ts">
export default {

  name: "todolist-item"
}
</script>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import TodoInput from "@/components/TodoInput.vue";
import TodoItem from "@/components/Todo.vue";

const isLoaded = ref(false);
const dialogAddTodo = ref(false);
const store = useTodoStore();
const {todos} = storeToRefs(store);

onBeforeMount(async () => {
  await store.loadTodos();
  isLoaded.value = true;
})

async function addTodo(description: string) {
  await store.addTodo(description);
  dialogAddTodo.value = false;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 100px;
}

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
