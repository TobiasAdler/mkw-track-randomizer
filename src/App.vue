<template>
    <div class="p-6 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">Mario Kart Strecken-Auswahl</h1>

        <div v-if="!isRunning" class="mb-4">
            <label for="count">Anzahl Strecken (1–32):</label>
            <input
                id="count"
                type="number"
                v-model.number="trackCount"
                min="1"
                max="32"
                class="border p-1 ml-2 w-16"
            />
            <button @click="startRound" class="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
                Start
            </button>
        </div>

        <div v-else>
            <div class="mb-4">
                <p class="text-lg">Strecke {{ currentIndex + 1 }} von {{ trackCount }}</p>
                <p class="font-semibold text-xl my-2">{{ currentTrack }}</p>
            </div>

            <button
                @click="nextTrack"
                class="bg-green-500 text-white px-3 py-1 rounded mr-2"
                :disabled="currentIndex >= trackCount - 1"
            >
                Weiter
            </button>

            <button @click="endRound" class="bg-red-500 text-white px-3 py-1 rounded">
                Beenden
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const allTracks = [
    "Luigi Circuit", "Moo Moo Meadows", "Mushroom Gorge", "Toad's Factory",
    "Mario Circuit", "Coconut Mall", "DK Summit", "Wario's Gold Mine",
    "Daisy Circuit", "Koopa Cape", "Maple Treeway", "Grumble Volcano",
    "Dry Dry Ruins", "Moonview Highway", "Bowser's Castle", "Rainbow Road",
    "GCN Peach Beach", "DS Yoshi Falls", "SNES Ghost Valley 2", "N64 Mario Raceway",
    "N64 Sherbet Land", "GBA Shy Guy Beach", "DS Delfino Square", "GCN Waluigi Stadium",
    "DS Desert Hills", "GBA Bowser Castle 3", "N64 DK's Jungle Parkway", "GCN Mario Circuit",
    "SNES Mario Circuit 3", "DS Peach Gardens", "GCN DK Mountain", "N64 Bowser's Castle"
]

const trackCount = ref(5)
const currentIndex = ref(0)
const selectedTracks = ref([])
const isRunning = ref(false)
const currentTrack = ref('')

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5)
}

function startRound() {
    const count = Math.min(Math.max(trackCount.value, 1), allTracks.length)
    selectedTracks.value = shuffleArray(allTracks).slice(0, count)
    currentIndex.value = 0
    currentTrack.value = selectedTracks.value[0]
    isRunning.value = true
}

function nextTrack() {
    if (currentIndex.value < selectedTracks.value.length - 1) {
        currentIndex.value++
        currentTrack.value = selectedTracks.value[currentIndex.value]
    }
}

function endRound() {
    isRunning.value = false
    selectedTracks.value = []
    currentTrack.value = ''
    currentIndex.value = 0
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
}
</style>
