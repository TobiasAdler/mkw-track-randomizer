<template>
    <div class="p-6 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">Mario Kart Strecken-Auswahl</h1>

        <div v-if="!isRunning" class="mb-4">
            <label for="count" class="block mb-1">Anzahl Strecken: {{ trackCount }}</label>
            <input
                id="count"
                type="range"
                v-model.number="trackCount"
                min="1"
                max="30"
                class="w-full"
            />
            <button @click="startRound" class="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
                Start
            </button>
        </div>

        <div v-else>
            <div class="mb-4">
                <p class="text-lg">Strecke {{ currentIndex + 1 }} von {{ trackCount }}</p>
                <p class="font-semibold text-xl my-2">{{ currentTrack }}</p>
                <img :src="getImagePath(currentTrack)" :alt="currentTrack" class="rounded shadow-md max-w-full h-auto"/>
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
    // Beispiel Umwandlung: alles klein, Leerzeichen + Sonderzeichen zu Unterstrich
    const fileName = trackName
        // .toLowerCase()
        // .replace(/\s+/g, '_')            // Leerzeichen zu _
        .replace(/[ä]/g, 'ae')           // Umlaute anpassen
        .replace(/[ö]/g, 'oe')
        .replace(/[ü]/g, 'ue')
        .replace(/[ß]/g, 'ss')
        .replace(/[^\w_()\- .]/g, '_')       // Sonderzeichen entfernen, außer _ ( ) -
        // .replace(/[()]/g, '')            // Klammern entfernen
    return `images/${fileName}.png`
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
