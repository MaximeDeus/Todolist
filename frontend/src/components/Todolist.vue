<template>
  <div class="d-flex flex-column" style="gap: 50px"> <!-- Todo remove div once v-dialog/v-btn will be moved to App component (when store will be added) -->
    <v-list class="elevation-2">
      <v-list-subheader color="blue">TODOLIST</v-list-subheader>
      <todo
          v-for="(todo, i) in todos"
          :key="i"
          :id="todo.id"
          :value="todo"
          :description="todo.description"
          :isDone="todo.isDone"
          @deleteTodo="deleteTodo"
          @updateTodoStatus="updateTodoStatus"/>
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
            v-model="description"
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
import {onMounted, ref} from "vue";
import Todo from "@/components/Todo.vue";
import customAxios from "@/axios";

const dialogAddTodo = ref(false);
const description = ref('');
const todos = ref([]);

onMounted(async () => {
  // TODO make API call and if success, load todo
  const data = await customAxios.get("api/todos");
  console.log(data);
})
function addTodo() {
  // TODO make API call and if success, add todo
  const todo = {
    id: 9, // TODO replace by id from DB
    description: description.value,
    isDone: false
  };
  todos.value.push(todo);
  description.value = '';
  dialogAddTodo.value = false;
}

function deleteTodo(id: number) {
  // TODO make API call before and if success, remove todo
  todos.value = todos.value.filter(todo => todo.id !== id);
}

function updateTodoStatus(id: number) {
  const todo = todos.value.find(todo => todo.id === id);
  if (todo) {
    // TODO make API call before and if success, update value
    todo.isDone = !todo.isDone;
  }
}
</script>

<style scoped>

</style>