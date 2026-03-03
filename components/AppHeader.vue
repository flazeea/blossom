<template>
  <div class="w-full p-10 flex flex-col justify-center items-center relative">

    <!-- Mobile: logo left + burger right in one row -->
    <div class="md:hidden w-full flex items-center justify-between" data-mobile-header>
      <img class="h-12" src="/blssm.png" alt="Blossom">
      <button
        class="flex flex-col gap-[6px] items-center justify-center w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 duration-300 z-50"
        @click="menuOpen = !menuOpen"
        aria-label="Меню"
      >
        <span
          class="block w-6 h-[2px] bg-white rounded-full duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-[8px]' : ''"
        />
        <span
          class="block w-6 h-[2px] bg-white rounded-full duration-300"
          :class="menuOpen ? 'opacity-0 scale-0' : ''"
        />
        <span
          class="block w-6 h-[2px] bg-white rounded-full duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-[8px]' : ''"
        />
      </button>
    </div>

    <!-- Desktop: centered logo + nav -->
    <div class="hidden md:flex flex-col items-center justify-center" data-desktop-header>
      <div class="justify-center">
        <div class="absolute w-100 h-[50px] mt-10 rounded-full bg-lime-500 circle duration-700"></div>
        <img class="h-20" src="/blssm.png" alt="Blossom">
      </div>
      <div class="flex justify-center pt-15 gap-6">
        <NuxtLink class="text-2xl p-4 text-white/90 hover:bg-white/10 duration-300 rounded-2xl" to="/">Главная</NuxtLink>
        <NuxtLink class="text-2xl p-4 text-white/90 hover:bg-white/10 duration-300 rounded-2xl" to="/rules">Правила</NuxtLink>
        <NuxtLink class="text-2xl p-4 text-white/90 hover:bg-white/10 duration-300 rounded-2xl" to="/team">Команда проекта</NuxtLink>
        <NuxtLink class="text-2xl p-4 text-white/90 hover:bg-white/10 duration-300 rounded-2xl" to="/shop">Магазин</NuxtLink>
      </div>
    </div>

    <!-- Mobile fullscreen menu overlay -->
    <Transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-4"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-3xl py-4 px-8 text-white/90 hover:bg-white/10 duration-300 rounded-2xl"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const menuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/rules', label: 'Правила' },
  { to: '/team', label: 'Команда проекта' },
  { to: '/shop', label: 'Магазин' },
]

const route = useRoute()
watch(() => route.path, () => {
  menuOpen.value = false
})
</script>

<style>
/* Prevent FOUC: hide mobile header on desktop, hide desktop header on mobile */
@media (min-width: 768px) {
  [data-mobile-header] {
    display: none !important;
  }
}
@media (max-width: 767.98px) {
  [data-desktop-header] {
    display: none !important;
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>