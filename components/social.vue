<template>
  <div>
    <div class="welcome-banner relative h-max">
            <!-- Lime glow effect -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>
            
            <!-- Main card -->
            <div class="rounded-2xl border-3 px-7 pt-7 pb-7 border border-white/5 shadow-2xl">
                <h1 class="unbounded-bold text-white text-xl lg:text-2xl mb-3">
                    Социальные сети
                </h1>
                <div class="grid gap-4">
                    <NuxtLink to="https://discord.gg/pDG6JzRC46" target="_blank" class="social-card discord-card">
                        <div class="social-card-inner">
                            <div class="social-icon discord-icon">
                                <Icon name="ic:baseline-discord" class="text-2xl text-white" />
                            </div>
                            <div class="social-info">
                                <span class="text-lg unbounded-bold text-white">Discord</span>
                                <span class="text-xs unbounded-light text-white/50">Наше сообщество</span>
                            </div>
                            <div class="social-arrow">
                                <Icon name="mingcute:arrow-right-line" class="text-xl text-white/30" />
                            </div>
                        </div>
                    </NuxtLink>
                    <NuxtLink to="https://t.me/blossomrpg" target="_blank" class="social-card telegram-card">
                        <div class="social-card-inner">
                            <div class="social-icon telegram-icon">
                                <Icon name="ic:baseline-telegram" class="text-2xl text-white" />
                            </div>
                            <div class="social-info">
                                <span class="text-lg unbounded-bold text-white">Telegram</span>
                                <span class="text-xs unbounded-light text-white/50">Новости и обновления</span>
                            </div>
                            <div class="social-arrow">
                                <Icon name="mingcute:arrow-right-line" class="text-xl text-white/30" />
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>