import {ref} from "vue";
import {defineStore} from "pinia";
import customAxios from "@/axios";
import type {TodoProperties} from "@/types/TodoProperties";
export const useTodoStore = defineStore('todo', () => {
    const todos = ref<TodoProperties[]>([]);
    async function loadTodos() {
        const {data} : {data: TodoProperties[]} = await customAxios.get("api/todos");
        if (data){
            data.forEach((todo: TodoProperties) => todos.value.push(todo));
        }
    }

    function getTodo(id: number): TodoProperties | null {
        const todo = todos.value.find(todo => todo.id === id);
        return todo || null;
    }

    async function addTodo(description: string) {
        const {data: todo} : {data: TodoProperties} = await customAxios.post("api/todos", {
            description,
        });
        if (todo){
            todos.value.push(todo);
        }
    }

    async function removeTodo(id: number) {
        await customAxios.delete(`api/todos/${id}`);
        todos.value = todos.value.filter(todo => todo.id !== id);
    }

    async function updateTodo(todo : TodoProperties) {
        const {id, ...rest} = todo;
        await customAxios.patch(`api/todos/${todo.id}`, rest);
        const todoIndex = todos.value.findIndex(t => t.id === todo.id);
        todos.value[todoIndex] = todo;
    }

    return { todos, loadTodos, getTodo,  addTodo, removeTodo, updateTodo }
})