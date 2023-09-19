<template>
  <v-list-item :active="false"> <!--Otherwise v-list-item--active class is applied on click-->
    <template v-slot:prepend>
      <v-icon
          icon="mdi-check-circle"
          :color="isDone ?
          'green' : 'red'"
          @click.stop="$emit('updateTodoStatus', id)"
      />
    </template>
    <v-list-item-title v-text="description"></v-list-item-title>
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
defineProps<TodoProps>();
defineEmits<{
  (e: 'deleteTodo', id: number): void
  (e: 'updateTodoStatus', id: number): void
}>()
</script>

<style scoped>

</style>