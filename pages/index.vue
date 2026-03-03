<template>
  <div>
    <AppHeader />
    <div class="sm:grid lg:flex justify-center p-8 gap-7">
        <div class="left-side">
            <div class="welcome-banner relative max-w-5xl w-full mb-10">
            <!-- Lime glow effect -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>
            
            <!-- Main card -->
            <div class="rounded-2xl border-3 p-10 border border-white/5 shadow-2xl">
                <h1 class="lg:text-4xl md:text-3xl unbounded-bold text-white mb-6 uppercase tracking-wide">
                    ДОБРО ПОЖАЛОВАТЬ НА BLOSSOM
                </h1>
                <p class="text-gray-300 text-lg leading-relaxed unbounded-light">
                    Рады приветствовать вас на нашем обновленном сайте! Мы проделали колоссальную работу над разработкой данного ресурса специально для того, чтобы вам было комфортнее им пользоваться. Пожалуйста, в случае возникновения любых трудностей - воспользуйтесь обращением в службу поддержки.
                </p>
            </div>
        </div>
        </div>
        <div class="right-side lg:max-w-[50%] grid gap-7">
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
            <div class="welcome-banner relative h-max">
            <!-- Lime glow effect -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>
            
            <!-- Main card -->
            <div class="rounded-2xl border-3 p-7 border border-white/5 shadow-2xl">
                <h1 class="unbounded-bold text-white text-xl lg:text-2xl">
                    Социальные сети
                </h1>
                <div class="grid gap-5 mt-5">
                    <div class="bg-gradient-to-r from-transparent to-blue-500 rounded-xl p-4">
                        <div class="flex">
                            <div class="grid">
                                <span class="text-xl font-medium text-white">ВКонтакте</span>
                                <span class="text-sm unbounded-light text-white/50">Нажмите, чтобы перейти</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-transparent to-indigo-500 rounded-xl p-4">
                        <div>
                            <div class="grid">
                                <span class="text-xl font-medium text-white">Discord</span>
                                <span class="text-sm unbounded-light text-white/50">Нажмите, чтобы перейти</span>
                            </div>
                            <div class="absolute right-20 top-24 opacity-10">
                            </div>
                        </div>
                    </div>
                    <div class="bg-gradient-to-r from-transparent to-cyan-500 rounded-xl p-4">
                        <div>
                            <div class="grid">
                                <span class="text-xl font-medium text-white">Telegram</span>
                                <span class="text-sm unbounded-light text-white/50">Нажмите, чтобы перейти</span>
                            </div>
                            <div class="absolute right-20 top-24 opacity-10">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.shadow-glow {
    box-shadow: 0 0 40px rgba(132, 204, 22, 0.4), 0 0 80px rgba(132, 204, 22, 0.2);
}

.welcome-banner {
    transition: transform 0.3s ease;
}

.welcome-banner:hover {
    transform: translateY(-2px);
}
</style>