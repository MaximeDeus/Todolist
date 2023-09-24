<template>
  <v-expand-transition>
    <v-alert v-if="errorMessage"
             type="error"
             title="Erreur"
             :closable="true"
             :text="errorMessage"
             @click:close="resetErrorMessage"
    ></v-alert>
  </v-expand-transition>
</template>

<script lang="ts">
export default {

  name: "error-alert"
}
</script>

<script setup lang="ts">


import {useTodoStore} from "@/stores/todo";
import {storeToRefs} from "pinia";
import {ErrorMessages} from "@/types/errorMessages";

const store = useTodoStore();
const {errorMessage} = storeToRefs(store);

function resetErrorMessage() {
  errorMessage.value = ErrorMessages.EMPTY;
}

</script>


<style scoped>
.v-alert {
  flex: none;
  height: fit-content;
}
</style>
