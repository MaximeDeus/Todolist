<template>
  <div class="d-flex flex-column" style="gap: 50px"> <!-- Todo remove div once v-dialog/v-btn will be moved to App component (when stores will be added) -->
    <v-list class="elevation-2">
      <v-list-subheader color="blue">TODOLIST</v-list-subheader>
      <todo
          v-for="(todo) in todos"
          :key="todo.id"
          :id="todo.id"
      />
    </v-list>
    <v-btn
        color="blue"
        @click="dialogAddTodo = true"
    >
      Créer une nouvelle tâche
    </v-btn>
    <v-dialog
        v-model="dialogAddTodo"
        width="400px">
      <v-card>
        <v-text-field
            label="Task"
            v-model="newTodoDescription"
            variant="solo"
            counter="16"
            placeholder="Type here..."
            maxlength="16"> <!-- todo handle min length validator -->

        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialogAddTodo = false"
          >
            Fermer
          </v-btn>
          <v-btn
              color="blue-darken-1"
              variant="text"
              @click="addTodo"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
export default {

  name: "Todolist"
}
</script>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import Todo from "@/components/Todo.vue";
import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";

const dialogAddTodo = ref(false);
const newTodoDescription = ref('');
const store = useTodoStore();
const {todos} = storeToRefs(store);

onBeforeMount(async () => {
  await store.loadTodos();
})

async function addTodo() {
  await store.addTodo(newTodoDescription.value);
  newTodoDescription.value = '';
  dialogAddTodo.value = false;
}
</script>

<style scoped>

</style>