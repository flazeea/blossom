<template>
  <div>
    <div class="welcome-banner relative h-max">
            <!-- Lime glow effect -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>
            
            <!-- Main card -->
            <div class="rounded-2xl border-3 p-10 border border-white/5 shadow-2xl">
                <div class="flex items-center">
                    <div class="bg-lime-500 rounded-2xl p-4">
                        <Icon name="mingcute:game-2-line" class="p-5 text-white" />
                    </div>
                    <div class="grid ml-5">
                        <span class="text-sm unbounded-light text-white/50">Minecraft Java Edition 1.21.4</span>
                        <span class="text-lg lg:text-xl unbounded-bold text-white uppercase">blossom-rpg.ru</span>
                        <span class="text-sm unbounded-light text-white/50">Сейчас играет <span class="text-white">0 игрок</span></span>
                    </div>
                </div>
                <div class="flex p-3 mt-3.25 bg-white/2 rounded-2xl">
                    <div class="">
                        <Icon name="mingcute:signal-line" class="p-7 text-green-500" />
                    </div>
                    <div class="grid ml-6.5">
                        <span class="text-xl unbounded-bold text-white uppercase">RPG</span>
                        <span class="text-sm unbounded-light text-white/50">Пока никто не играет</span>
                        
                    </div>
                </div>  
            </div>
            </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>