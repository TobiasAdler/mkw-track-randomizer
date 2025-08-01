<template>
    <div id="app">
        <div class="p-6 max-w-md mx-auto">
            <img :src="`images/Mario_Kart_World_Logo.png`" :alt="`Mario Kart World`"
                 class="rounded shadow-md"
                 style="max-width: 100%; height: auto; width: 500px;"/>
            <div style="height: 30px"></div>
            <div v-if="!isRunning" class="mb-4">
                <div>
                    <label for="count" class="block mb-1">Anzahl Strecken: {{ trackCount }}</label>
                </div>
                <input
                    id="count"
                    type="range"
                    v-model.number="trackCount"
                    min="1"
                    max="30"
                    class="w-full"
                    style="max-width: 80%; height: auto; width: 300px;"
                />
                <div style="height: 50px"></div>
                <div>
                    <button @click="startRound" class="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
                        Start
                    </button>
                </div>
            </div>

            <div v-else>
                <div class="mb-4">
                    <p class="text-lg">Strecke {{ currentIndex + 1 }} von {{ trackCount }}:</p>
                    <p class="font-semibold text-xl my-2">{{ currentTrack }}</p>
                    <img :src="getImagePath(currentTrack)" :alt="currentTrack"
                         class="rounded shadow-md max-w-full h-auto"
                         style="max-width: 100%; height: auto; width: 500px;"/>
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
    </div>
</template>

<script setup>
import {ref} from 'vue'

const allTracks = [
    "Baumwipfelpfad", "Fliegende Festung (DS)", "Kino Buu Huu", "Bowsers Festung",
    "Cheep-Cheep-Kaskaden", "Schoko-Sumpf (N64)", "Kronen-Metropole", "Pusteblumen-Grotte",
    "Glühheiße Wüste (DS)", "Dinodino-Dschungel (GNC)", "DK Alpin (DS)", "DK-Startrampe",
    "Knochentrocken-Vulkan", "Wildtierpark", "?-Block-Ruinen", "Koopa-Strand (SNES)",
    "Mario Bros.-Piste", "Marios Piste (SNES)", "Kuhmuh-Weide (Wii)", "Peach Beach (GNC)",
    "Peach-Stadion", "Regenbogen Boulevard", "Salzwasser-Serpentinen", "Shy Guys Basar (3DS)",
    "Eiscreme-Eskapade (Tour)", "Aurora-Ausblick", "Toads Fabrik (Wii)", "Wario-Arena (N64)",
    "Warios Galeonenwrack (3DS)", "Dampflok-Gipfel"
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

function getImagePath(trackName) {
    const fileName = trackName
        .replace(/[ä]/g, 'ae')
        .replace(/[ö]/g, 'oe')
        .replace(/[ü]/g, 'ue')
        .replace(/[ß]/g, 'ss')
        .replace(/[^\w_()\- .]/g, '_')
    return `images/${fileName}.png`
}

function endRound() {
    isRunning.value = false
    selectedTracks.value = []
    currentTrack.value = ''
    currentIndex.value = 0
}
</script>

<style>
body {
    background-color: var(--bg-color);
}

#app {
    font-family: Arial, sans-serif;
    color: var(--text-color);
    text-align: center;
    margin: 20px;
}

button {
    background-color: var(--element-bg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 10px 18px;
    margin: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
    background-color: var(--element-hover-bg-color);
    border-color: var(--element-hover-border-color);
}

button:active {
    transform: scale(0.97);
}

button:disabled {
    background-color: #ddd;
    color: #888;
    border-color: #ccc;
    cursor: default;
    box-shadow: none;
    opacity: 0.6;
}

button:disabled:hover {
    background-color: #ddd;
    border-color: #ccc;
}

input[type=range] {
    background: var(--element-bg-color);
    margin: 1rem;
}

:root {
    --bg-color: #1c1c1c;
    --border-color: #555;
    --element-bg-color: #121212;
    --text-color: #f5f5f5;
    --element-hover-border-color: #f5f5f5;
    --element-hover-bg-color: #2a2a2a;
    --checkbox-check: #dce4ea;
}
</style>
