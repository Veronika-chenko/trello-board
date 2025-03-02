<script setup lang="ts">
// ref automatically injected by Nuxt
import type { Column } from '../types';
import draggable from 'vuedraggable';
import { nanoid } from "nanoid";
const columns = ref<Column[]>([
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
]);
</script>

<template>
    <div>
        <draggable
            v-model="columns"
            group="columns"
            :animation="150"
            handle=".drag-handle"
            item-key="id"
            class="flex gap-4 overflow-x-auto items-start"
        >
        <template #item="{element: column}: {element: Column}">
            <div  class="column bg-gray-200 p-5 rounded min-w-[250px]">
            <header class="font-bold mb-4">
                <DragHandle/>
                {{ column.title }}
            </header>
            <TrelloBoardTask 
                v-for="task in column.tasks" 
                :key="task.id"
                :task="task" 
            />
            <footer>
                <button class="text-gray-500">+ Add a Card</button>
            </footer>
            </div>
        </template>
        </draggable>
    </div>
    <!-- <pre>{{ columns }}</pre> -->
</template>
<!-- group allows to drag and drop items between different list -->
 <!-- item-key:  how to identify -->