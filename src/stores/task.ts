import { defineStore } from 'pinia'
import type { Task } from '@/types/Task'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: JSON.parse(sessionStorage.getItem('tasks') || '[]') as Task[],
    }),
    actions: {
        addTask(task: Task) {
            this.tasks.push(task);
            this.saveTask();
        },
        removeTask(id: string) {
            const task = this.tasks.find((task) => task.id === id);
            
            if (task) {
                const index = this.tasks.indexOf(task);
                this.tasks.splice(index, 1);
                this.saveTask();
            }
        },
        markAsComplete(id: string) {
            const task = this.tasks.find((task) => task.id === id);

            if (task) {
                task.completed = true;
                this.saveTask();
            }
        },
        clearCompleted(id: string) {
            const task = this.tasks.find((task) => task.id === id);

            if (task) {
                task.completed = false;
                this.saveTask();
            }
        },
        generateTaskId() {
            const randomId = Math.floor(Math.random() * 1000000).toString(16);
            return randomId;
        },
        saveTask() {
            sessionStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
})