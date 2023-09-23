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
          :hint="hintMessage"
          @update:focused="setHintMessage"
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

enum Hint {
  HIDDEN = "",
  INFO = "Appuyez sur \"Entrée\" pour valider",
  UPDATE_SUCCESS = "La tâche a été mise à jour"
}
</script>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import type {TodoProperties} from "@/types/TodoProperties";
import {useTodoStore} from "@/stores/todo";

const store = useTodoStore();
const todo = ref<TodoProperties | null>(null);
const latestDescriptionValue = ref<string | null> (null);
const hintMessage = ref<Hint> (Hint.HIDDEN);
const props = defineProps({
  id: Number
});

onBeforeMount(async () => {
  todo.value = store.getTodo(props.id!);
  updateLatestDescriptionValue();
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

function setHintMessage(isFocused: boolean) {
  hintMessage.value = isFocused ? Hint.INFO : Hint.HIDDEN;
}

function updateLatestDescriptionValue(){
  if (todo.value){
    latestDescriptionValue.value = todo.value.description;
  }
}
async function updateTodoDescription() {
  if (todo.value &&
      todo.value.description !== "" &&
      todo.value.description !== latestDescriptionValue.value){
    await store.updateTodo(todo.value);
    hintMessage.value = Hint.UPDATE_SUCCESS;
    updateLatestDescriptionValue();
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