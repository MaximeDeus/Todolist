import {ref} from "vue";
import {defineStore} from "pinia";
import customAxios from "@/axios";
import type {TodoProperties} from "@/types/TodoProperties";
import {ErrorMessages} from "@/types/errorMessages";

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<TodoProperties[]>([]);
    const errorMessage = ref("");

    async function loadTodos() {
        try {
            const {data}: { data: TodoProperties[] } = await customAxios.get("api/todos");
            if (data) {
                data.forEach((todo: TodoProperties) => todos.value.push(todo));
            }
        } catch (error) {
            errorMessage.value = ErrorMessages.LOAD_TODOLIST;
        }
    }

    function getTodo(id: number): TodoProperties | null {
        const todo = todos.value.find(todo => todo.id === id);
        return todo || null;
    }

    async function addTodo(description: string) {
        try {
            const {data: todo}: { data: TodoProperties } = await customAxios.post("api/todos", {
                description,
            });
            if (todo) {
                todos.value.push(todo);
            }
        } catch (error) {
            errorMessage.value = ErrorMessages.ADD_TODO;
        }
    }

    async function removeTodo(id: number) {
        try {
            await customAxios.delete(`api/todos/${id}`);
            todos.value = todos.value.filter(todo => todo.id !== id);
        } catch (error) {
            errorMessage.value = ErrorMessages.REMOVE_TODO;
        }
    }

    async function updateTodo(todo: TodoProperties) {
        try {
            const {id, ...rest} = todo;
            await customAxios.patch(`api/todos/${todo.id}`, rest);
            const todoIndex = todos.value.findIndex(t => t.id === todo.id);
            todos.value[todoIndex] = todo;
        } catch
            (error) {
            errorMessage.value = ErrorMessages.UPDATE_TODO;
        }
    }

    return {todos, errorMessage, loadTodos, getTodo, addTodo, removeTodo, updateTodo}
})
