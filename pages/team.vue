<template>
  <div>
    <AppHeader />
    <div class="container mx-auto p-8 w-full h-full">
      <div class="max-w-3xl mx-auto">
      
<h1 class="text-2xl md:text-5xl unbounded-bold text-white mb-3 uppercase tracking-wide text-center">
          Администрация проекта
        </h1>
        <p class="text-gray-400 unbounded-light text-sm md:text-base text-center mb-10">
          Познакомьтесь с теми, кто не покладая рук работает над Blossom!
        </p>

        <!-- Team Card -->
        <div class="welcome-banner relative">
          <!-- Lime glow effect -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>

          <div class="rounded-2xl border-3 p-8 md:p-10 border border-white/5 shadow-2xl">
              
            <!-- Name + Role Badge -->
            <div class="flex items-center gap-3 mb-4 flex-wrap">
              <span class="text-lime-400 text-xl md:text-2xl unbounded-bold">
                {{ currentMember.name }}
              </span>
              <span
                class="text-xs md:text-sm unbounded-bold uppercase px-3 py-1 rounded-md text-white"
                :style="{ backgroundColor: currentMember.roleBadgeColor }"
              >
                {{ currentMember.role }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-gray-300 unbounded-light text-sm md:text-base leading-relaxed mb-8">
              {{ currentMember.description }}
            </p>

            <!-- Heads Navigation -->
            <div class="flex items-center gap-3">
              <!-- Prev Arrow -->
              <button
                class="team-arrow"
                @click="prev"
                aria-label="Предыдущий"
              >
                <Icon name="mingcute:left-line" class="text-xl text-white" />
              </button>

              <!-- Heads Row -->
              <div class="flex items-center gap-2 overflow-x-auto py-1 flex-1 justify-center">
                <button
                  v-for="(member, idx) in teamMembers"
                  :key="member.username"
                  class="team-head-btn"
                  :class="{ 'team-head-active': idx === currentIndex }"
                  @click="currentIndex = idx"
                >
                  <img
                    :src="`https://minotar.net/helm/${member.username}/48`"
                    :alt="member.name"
                    class="team-head-img"
                    loading="lazy"
                  />
                </button>
              </div>

              <!-- Next Arrow -->
              <button
                class="team-arrow"
                @click="next"
                aria-label="Следующий"
              >
                <Icon name="mingcute:right-line" class="text-xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const teamMembers = [
  {
    username: 'reinquisitor',
    name: 'reinquisitor',
    role: 'Владелец',
    roleBadgeColor: '#912921',
    description:
      'Привет. Я Матвей, владелец и главный разработчик проекта Blossom. Моя задача - сделать так, чтобы вы замечали только интересный геймплей, а не технические шероховатости. Слежу за порядком, решаю вопросы и слегка контролирую этот уютный хаос. Увидимся на сервере!',
  },
  {
    username: 'Dekartk',
    name: 'Dekartk',
    role: 'Со-Владелец',
    roleBadgeColor: '#912921',
    description:
      'Я тот самый «Сафонов - оплати», то есть отвечаю за финансирование проекта. Мы строим Blossom так, чтобы вам было комфортно и приятно в него играть. Увидимся на сервере!',
  },
  {
    username: 'zhzwww',
    name: 'zhzwww',
    role: 'Тестер',
    roleBadgeColor: '#3D9EA1',
    description:
      'Привет, я Кирюша. Работаю тестером на Blossom больше двух лет. Работа утомительная, поэтому в свободное время я люблю залетать на сервер и устраивать там суету вместе с игроками проекта.',
  },
  {
    username: 'Syzcte',
    name: 'jstfeelhappines',
    role: 'Тестер',
    roleBadgeColor: '#3D9EA1',
    description:
      'Здарова, Я Артём, лучший тестер на Blossom. Люблю искать баги, тем самым создавая приятный для игры геймплей. Мы с ребятами проделали огромную работу, чтобы вы смогли поиграть на лучшем rpg-проекте. Удачной игры!',
  },
  {
    username: 'iRinglGoodnes',
    name: 'iRinglGoodnes',
    role: 'Гейм-Дизайнер',
    roleBadgeColor: '#D48E46',
    description:
      'Сап, я Гриша, ГД проекта Blossom. Пока тестеры ищут баги, а разработчики их чинят, я придумываю, ради чего вы вообще сюда заходите. Кручу механики так, чтобы они приносили удовольствие, а не боль. Мы строим для вас лучший rpg-опыт. Еще увидимся!',
  }
]

const currentIndex = ref(0)

const currentMember = computed(() => teamMembers[currentIndex.value])

function prev() {
  currentIndex.value =
    currentIndex.value === 0 ? teamMembers.length - 1 : currentIndex.value - 1
}

function next() {
  currentIndex.value =
    currentIndex.value === teamMembers.length - 1 ? 0 : currentIndex.value + 1
}
</script>

<style scoped>
.team-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.team-arrow:hover {
  background: rgba(132, 204, 22, 0.15);
  border-color: rgba(132, 204, 22, 0.4);
}

.team-head-btn {
  flex-shrink: 0;
  border-radius: 6px;
  padding: 2px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  opacity: 0.5;
}

.team-head-btn:hover {
  opacity: 0.8;
}

.team-head-active {
  opacity: 1;
  border-color: rgba(132, 204, 22, 0.6);
  transform: scale(1.15);
}

.team-head-img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  image-rendering: pixelated;
  display: block;
}
</style>