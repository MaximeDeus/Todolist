<template>
  <div class="container" style="width: 450px">
    <v-list class="elevation-2">
      <v-list-subheader color="blue">TODOLIST</v-list-subheader>
      <transition-group v-if="todos.length > 0" name="list" tag="div" >
      <todo
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
        <v-text-field
            label="Nouvelle tâche"
            v-model="newTodoDescription"
            variant="solo"
            counter="16"
            placeholder="Faire les courses"
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
.container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 100px;
}

/*.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}*/

.list-enter-active, .list-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(0);
}

.list-enter-first, .list-leave-last {
  opacity: 0;
  transform: translateY(-20px);
}

.v-list {
  max-height: 400px;
}

.v-btn {
  width: fit-content;
  align-self: center;
}

</style>