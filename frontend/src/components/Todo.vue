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
      <v-text-field
          style="width: 300px"
          v-model="todo!.description"
          :rules="[rules.required]"
          variant="solo"
          counter="16"
          placeholder="Faire les courses"
          maxlength="16"
          :hint="hintSuccessMessage"
          @update:focused="removeHintMessageOnBlur"
          @keyup.enter="updateTodoDescription">
      </v-text-field>
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

const store = useTodoStore();
const todo = ref<TodoProperties | null>(null);
const hintSuccessMessage = ref<string | undefined> ();
const props = defineProps({
  id: Number
});

onBeforeMount(async () => {
  todo.value = store.getTodo(props.id!);
})

const rules = ref({
  required: (value: string) => !!value || 'Veuillez renseigner la tâche',
})
async function updateTodoStatus() {
  if (todo.value){
    todo.value.isDone = !(todo.value.isDone)
    await store.updateTodo(todo.value);
  }
}

function removeHintMessageOnBlur(isFocused: boolean) {
  if (!isFocused && hintSuccessMessage.value){
    hintSuccessMessage.value = undefined
  }
}
async function updateTodoDescription() {
  if (todo.value && todo.value.description !== ""){
    await store.updateTodo(todo.value);
    hintSuccessMessage.value = "La tâche a été mise à jour";
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