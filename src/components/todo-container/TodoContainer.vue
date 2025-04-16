<template>
   <div class="container">
        <div class="row my-2 d-flex flex-row align-items-center justify-content-start gap-2">
            <input class="form-control form-control-sm w-auto" type="text" placeholder="Add new task" v-model="newTask.taskName" @keydown.enter="addTask"/>
            <button class="btn btn-sm btn-primary w-auto" @click="addTask" >Submit</button>
        </div>
        <div class="row gap-1 flex-nowrap">
            <div class="col-6 text-center bg-warning">
                <h6 class="m-0 py-2 text-uppercase">
                    To do
                </h6>
            </div>
            <div class="col-6 text-center bg-success">
                <h6 class="m-0 py-2 text-uppercase text-white">
                    Completed
                </h6>
            </div>
        </div>
        <div class="row gap-1 flex-nowrap">
            <div class="col-6 p-0">
                <ul class="list-group list-group-flush list-unstyled">
                    <li class="text-center border border-warning-subtle py-2" v-for="(task, index) in tasks.filter(task => !task.completed)" :key="index || task.id">
                        <span class="d-flex align-items-center justify-content-between px-2">
                            {{ task.taskName }} 
                            <div>
                                <font-awesome-icon class="rounded p-1" id="mark-icon" icon="check" @click="markAsComplete(task.id)" />
                                <font-awesome-icon class="rounded p-1" id="delete-icon" icon="trash" @click="removeTask(task.id)" />
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="col-6 p-0">
                <ul class="list-group list-group-flush list-unstyled">
                    <li class="text-center border border-success-subtle py-2" v-for="(task, index) in tasks.filter(task => task.completed)" :key="index || task.id">
                        <span class="d-flex align-items-center justify-content-between px-2">
                            {{ task.taskName }} 
                            <div>
                                <font-awesome-icon class="rounded p-1" id="mark-icon" icon="xmark" @click="markAsIncomplete(task.id)" />
                                <font-awesome-icon class="rounded p-1" id="delete-icon" icon="trash" @click="removeTask(task.id)" />
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
   </div>
</template>

<script setup lang="ts">
    import { useTaskStore } from '@/stores/task';
    import { reactive, computed } from 'vue';
    import type { Task } from '@/types/Task';

    // default task object
    const newTask: Task = reactive({
        id: "0",
        taskName: '',
        completed: false,
    })

    // initiate task store
    const taskStore = useTaskStore();
    const tasks = computed(() => taskStore.tasks);
    // reactive object to hold the new task
    const addTask = () => {
        if (newTask.taskName.trim()) {
            newTask.id = taskStore.generateTaskId();
            taskStore.addTask({ ...newTask });
            // reset values
            newTask.taskName = '';
            newTask.id = "0";
        }
    }

    const removeTask = (id: string) => {
        taskStore.removeTask(id);
    }

    const markAsComplete = (id: string) => {
        taskStore.markAsComplete(id);
    }

    const markAsIncomplete = (id: string) => {
        taskStore.clearCompleted(id);
    }
</script>

<style scoped lang="scss">
#mark-icon {
    &:hover {
        cursor: pointer;
        background-color: #ececec;
    }
}

#delete-icon {
    &:hover {
        cursor: pointer;
        background-color: #ff6e6e;
    }
}
</style>