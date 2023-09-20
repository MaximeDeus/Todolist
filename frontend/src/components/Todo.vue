<template>
  <v-list-item :ripple=false :active="false">
    <template v-slot:prepend>
      <v-icon
          icon="mdi-check-circle"
          :color="isDone ?
          'green' : 'red'"
          @click.stop="$emit('updateTodoStatus', id)"
      />
    </template>
    <template v-slot:default>
      <v-text-field
          style="width: 400px"
          v-model="description"
          variant="solo"
          counter="16"
          placeholder="Faire les courses"
          maxlength="16"> <!-- todo handle min length validator -->

      </v-text-field>
    </template>

    <template v-slot:append>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-icon icon="mdi-trash-can-outline"
                  v-bind="props"
                  :color="isHovering ? 'red-accent-4' : undefined"
                  @click.stop="$emit('deleteTodo', id)"/>
        </template>
      </v-hover>
    </template>
  </v-list-item>

</template>

<script lang="ts">
export default {
  name: "Todo"
}

/**
 * Interface must be declared outside script setup, otherwise Volar warning appears
 * (https://github.com/vuejs/language-tools/issues/1232)
 */
interface TodoProps {
  id: number,
  description: string,
  isDone: boolean
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const description = ref('');
defineProps<TodoProps>();
defineEmits<{
  (e: 'deleteTodo', id: number): void
  (e: 'updateTodoStatus', id: number): void
}>()
</script>

<style scoped>

</style>