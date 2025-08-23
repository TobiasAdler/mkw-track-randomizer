<template>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <div id="app">
        <div class="p-6 max-w-md mx-auto">
            <img :src="`images/mario_kart_world_logo.png`" :alt="`Mario Kart World`"
                 class="rounded shadow-md"
                 style="max-width: 100%; height: auto; width: 500px;"/>
            <div style="height: 30px"></div>
            <div v-if="!isRunning" class="mb-4">
                <div>
                    <label for="count" class="block mb-1">{{ t('amounttracks') }}: {{ trackCount }}</label>
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
                        {{ t('start') }}
                    </button>
                </div>
            </div>

            <div v-else>
                <div class="mb-4">
                    <p class="text-lg">{{ t('track') }} {{ currentIndex + 1 }} {{ t('of') }} {{ trackCount }}:</p>
                    <p class="font-semibold text-xl my-2">{{ currentTrackName }}</p>
                    <img
                        :src="`/images/${currentTrack.id}.png`"
                        :alt="currentTrack.id"
                        class="rounded shadow-md max-w-full h-auto"
                        style="max-width: 100%; height: auto; width: 500px;"
                    />
                </div>

                <button
                    @click="nextTrack"
                    class="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    :disabled="currentIndex >= trackCount - 1"
                >
                    {{ t('continue') }}
                </button>

                <button @click="endRound" class="bg-red-500 text-white px-3 py-1 rounded">
                    {{ t('finish') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import { useTranslation } from 'i18next-vue'
const { i18next, t } = useTranslation()

const tracks = [
    { id: "acorn_heights", de: "Baumwipfelpfad", en: "Acorn Heights" },
    { id: "airship_fortress_ds", de: "Fliegende Festung (DS)", en: "Airship Fortress (DS)" },
    { id: "boo_cinema", de: "Kino Buu Huu", en: "Boo Cinema" },
    { id: "bowsers_castle", de: "Bowsers Festung", en: "Bowser's Castle" },
    { id: "cheep_cheep_falls", de: "Cheep-Cheep-Kaskaden", en: "Cheep Cheep Falls" },
    { id: "choco_mountain_n64", de: "Schoko-Sumpf (N64)", en: "Choco Mountain (N64)" },
    { id: "crown_city", de: "Kronen-Metropole", en: "Crown City" },
    { id: "dandelion_depths", de: "Pusteblumen-Grotte", en: "Dandelion Depths" },
    { id: "desert_hills_ds", de: "Glühheiße Wüste (DS)", en: "Desert Hills (DS)" },
    { id: "dino_dino_jungle_gnc", de: "Dinodino-Dschungel (GNC)", en: "Dino Dino Jungle (GNC)" },
    { id: "dk_pass_ds", de: "DK Alpin (DS)", en: "DK Pass (DS)" },
    { id: "dk_spaceport", de: "DK-Startrampe", en: "DK Spaceport" },
    { id: "dry_bones_burnout", de: "Knochentrocken-Vulkan", en: "Dry Bones Burnout" },
    { id: "faraway_oasis", de: "Wildtierpark", en: "Faraway Oasis" },
    { id: "great_block_ruins", de: "?-Block-Ruinen", en: "Great ? Block Ruins" },
    { id: "koopa_troopa_beach_snes", de: "Koopa-Strand (SNES)", en: "Koopa Troopa Beach (SNES)" },
    { id: "mario_bros_circuit", de: "Mario Bros.-Piste", en: "Mario Bros. Circuit" },
    { id: "mario_circuit_snes", de: "Marios Piste (SNES)", en: "Mario Circuit (SNES)" },
    { id: "moo_moo_meadows_wii", de: "Kuhmuh-Weide (Wii)", en: "Moo Moo Meadows (Wii)" },
    { id: "peach_beach_gnc", de: "Peach Beach (GNC)", en: "Peach Beach (GNC)" },
    { id: "peach_stadium", de: "Peach-Stadion", en: "Peach Stadium" },
    { id: "rainbow_road", de: "Regenbogen Boulevard", en: "Rainbow Road" },
    { id: "salty_salty_speedway", de: "Salzwasser-Serpentinen", en: "Salty Salty Speedway" },
    { id: "shy_guy_bazaar_3ds", de: "Shy Guys Basar (3DS)", en: "Shy Guy Bazaar (3DS)" },
    { id: "sky_high_sundae_tour", de: "Eiscreme-Eskapade (Tour)", en: "Sky-High Sundae (Tour)" },
    { id: "starview_peak", de: "Aurora-Ausblick", en: "Starview Peak" },
    { id: "toads_factory_wii", de: "Toads Fabrik (Wii)", en: "Toad's Factory (Wii)" },
    { id: "wario_stadium_n64", de: "Wario-Arena (N64)", en: "Wario Stadium (N64)" },
    { id: "wario_shipyard_3ds", de: "Warios Galeonenwrack (3DS)", en: "Wario Shipyard (3DS)" },
    { id: "whistlestop_summit", de: "Dampflok-Gipfel", en: "Whistlestop Summit" }
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
    const count = Math.min(Math.max(trackCount.value, 1), tracks.length)
    selectedTracks.value = shuffleArray(tracks).slice(0, count)
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

const currentTrackName = computed(() => {
    const lang = i18next.language.split('-')[0]
    return currentTrack.value[lang] || currentTrack.value.en
})
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
