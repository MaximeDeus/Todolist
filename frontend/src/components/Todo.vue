<template>
  <v-list-item :ripple=false :active="false">
    <template v-slot:prepend>
      <v-icon
          icon="mdi-check-circle"
          :color="todo!.isDone ?
          'green' : 'red'"
          @click.stop="updateTodoStatus"
      />
    </template>
    <template v-slot:default>
      <todo-input
          :latest-description="todo!.description"
          :onSuccess="isUpdateSucceed"
          @validate="updateTodoDescription">
      </todo-input>
    </template>

    <template v-slot:append>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-icon icon="mdi-trash-can-outline"
                  v-bind="props"
                  :color="isHovering ? 'red-accent-4' : undefined"
                  @click.stop="deleteTodo"/>
        </template>
      </v-hover>
    </template>
  </v-list-item>

</template>

<script lang="ts">
export default {
  name: "Todo"
}

</script>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import type {TodoProperties} from "@/types/TodoProperties";
import {useTodoStore} from "@/stores/todo";
import TodoInput from "@/components/TodoInput.vue";

const store = useTodoStore();
const todo = ref<TodoProperties | null>(null);
const isUpdateSucceed = ref<boolean>(false);
const props = defineProps({
  id: Number
});

onBeforeMount(async () => {
  todo.value = store.getTodo(props.id!);
})

async function updateTodoStatus() {
  if (todo.value){
    todo.value.isDone = !(todo.value.isDone)
    await store.updateTodo(todo.value);
  }
}


async function updateTodoDescription(description: string) {
  if (todo.value){
    todo.value.description = description;
    isUpdateSucceed.value = false;
    await store.updateTodo(todo.value);
    isUpdateSucceed.value = true;
  }
}

async function deleteTodo() {
  if (todo.value){
    await store.removeTodo(todo.value.id);
  }
}
</script>

<style scoped>

</style>