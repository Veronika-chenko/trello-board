<script setup lang="ts">
// ref automatically injected by Nuxt
import type { Column, Task } from '../types';
import draggable from 'vuedraggable';
import { nanoid } from "nanoid";
// can use useLocalStorageinstead of ref
const columns = useLocalStorage<Column[]>("trelloBoard", [
    {
        id: nanoid(),
        title: "Backlog",
        tasks: [
            {
                id: nanoid(),
                title: "Create marketing landing page",
                createdAt: new Date()
            },
            {
                id: nanoid(),
                title: "Develop cool new feature",
                createdAt: new Date()
            },
            {
                id: nanoid(),
                title: "Fix page nav Dev",
                createdAt: new Date()
            },
        ],
    },
    {
        id: nanoid(),
        title: "Selected for Dev",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "In Progress",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "QA",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "Completed",
        tasks: [],
    }
],
{
    serializer: {
        read: value => {
            return JSON.parse(value).map((column: Column) => {
                column.tasks = column.tasks.map((task: Task) => {
                    task.createdAt = new Date(task.createdAt);
                    return task;
                })
                return column;
            })
        },
        write: value => JSON.stringify(value)
    }
});
// key we want to listen to
const alt = useKeyModifier("Alt")

function createColumn() {
    const column: Column = {
        id: nanoid(),
        title: "",
        tasks: []
    }
    columns.value.push(column);
    // ensure Vue updated the DOM, before we try to manualy query it 
    nextTick(() => {
        (
            document.querySelector(
                ".column:last-of-type .title-input"
            ) as HTMLInputElement
        ).focus()
    })

}
// for services
// watch(columns, () => {}, {
//     deep: true
// })
</script>

<template>
    <div class="flex items-start overflow-x-auto gap-4">
        <draggable
            v-model="columns"
            group="columns"
            :animation="150"
            handle=".drag-handle"
            item-key="id"
            class="flex gap-4 items-start"
        >
        <template #item="{element: column}: {element: Column}">
            <div  class="column bg-gray-200 p-5 rounded min-w-[250px]">
            <header class="font-bold mb-4">
                <DragHandle/>
                <input 
                    class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
                    @keyup.enter="($event.target as HTMLImageElement).blur()"
                    @keydown.backspace="
                        column.title === ''
                            ? (columns = columns.filter(c => c.id !== column.id))
                            : null
                    "
                    type="text"
                    v-model="column.title"
                >
            </header>
            <draggable
                v-model="column.tasks"
                :group="{name: 'tasks', pull: alt ? 'clone' : true}"
                handle=".drag-handle"
                :animation="150"
                item-key="id"
            >
                <template #item="{element: task}: {element: Task}">
                   <div>
                        <TrelloBoardTask 
                            :task="task" 
                            @delete="column.tasks = column.tasks.filter(t => t.id !== $event)"/>
                   </div> 
                </template>  
            </draggable>
            
            <footer>
                <NewTask @add="column.tasks.push($event)"/>
            </footer>
            </div>
        </template>
        </draggable>
        <button
            @click="createColumn"
            class="bg-gray-300 whitespace-nowrap p-2 rounded opacity-50"    
        >
            + Add Another Column
        </button>
    </div>
    <!-- <pre>{{ columns }}</pre> -->
</template>
<!-- group allows to drag and drop items between different list -->
 <!-- item-key:  how to identify -->

<!-- group prop: group="tasks" means: -->
<!-- can drag tasks only between the task array of the current column 
 and that of the other column -->
<!-- if also name column: anable to drag task into the column array -->