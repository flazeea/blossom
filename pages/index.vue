<template>
  <div>
    <AppHeader />
    <div class="sm:grid lg:flex justify-center p-8 gap-7 w-full h-full">
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
        

            <!-- Top Donors -->
            <div class="welcome-banner relative max-w-5xl w-full">
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>
              <div class="rounded-2xl border-3 p-8 border border-white/5 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-2xl lg:text-3xl unbounded-bold text-white uppercase tracking-wide">Топ донатеров</h2>
                </div>

                <!-- Empty state -->
                <div v-if="!topDonors || topDonors.length === 0" class="text-center py-10">
                  <div class="text-4xl mb-3">💎</div>
                  <span class="text-gray-500 unbounded-light text-lg">—</span>
                  <p class="text-gray-600 unbounded-light text-sm mt-2">Пока нет донатов</p>
                </div>

                <!-- Top 3 -->
                <div v-else>
                  <div class="grid grid-cols-3 gap-3 mb-4" v-if="topDonors.length > 0">
                    <div
                      v-for="(donor, idx) in topDonors.slice(0, 3)"
                      :key="donor.nickname"
                      class="donor-card donor-card-top"
                      :class="{
                        'donor-gold': idx === 0,
                        'donor-silver': idx === 1,
                        'donor-bronze': idx === 2
                      }"
                    >
                      <div class="donor-place-badge">
                        {{ idx + 1 }}
                      </div>
                      <img
                        :src="`https://minotar.net/helm/${donor.nickname}/48`"
                        :alt="donor.nickname"
                        class="donor-avatar"
                        style="image-rendering: pixelated;"
                      />
                      <span class="text-white unbounded-bold text-sm mt-2 truncate w-full text-center">{{ donor.nickname }}</span>
                      <span class="text-emerald-400 unbounded-light text-xs flex items-center gap-1">
                        {{ donor.total.toLocaleString() }}
                        <img src="/emerald.png" alt="" class="w-3.5 h-3.5" style="image-rendering: pixelated;" />
                      </span>
                    </div>
                  </div>

                  <!-- Rest of the list -->
                  <div v-if="topDonors.length > 3" class="grid gap-2">
                    <div
                      v-for="(donor, idx) in topDonors.slice(3)"
                      :key="donor.nickname"
                      class="donor-card-row"
                    >
                      <span class="text-gray-500 unbounded-bold text-sm w-6 text-center">{{ idx + 4 }}</span>
                      <img
                        :src="`https://minotar.net/helm/${donor.nickname}/24`"
                        :alt="donor.nickname"
                        class="w-7 h-7 rounded-md"
                        style="image-rendering: pixelated;"
                      />
                      <span class="text-white unbounded-light text-sm flex-grow truncate">{{ donor.nickname }}</span>
                      <span class="text-emerald-400 unbounded-light text-xs flex items-center gap-1">
                        {{ donor.total.toLocaleString() }}
                        <img src="/emerald.png" alt="" class="w-3 h-3" style="image-rendering: pixelated;" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>  
        <div class="right-side max-md:pt-10 lg:max-w-[50%] h-full grid gap-7">
            <Online />
            <Social />
        </div>

    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Главная - Blossom'
})

interface Donor {
  nickname: string
  total: number
}

const { data: topDonors } = await useFetch<Donor[]>('/api/donations/top')
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

/* Social cards */
.social-card {
    display: block;
    border-radius: 12px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.social-card-inner {
    display: flex;
    align-items: center;
    gap: 14px;
}

.social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    flex-shrink: 0;
    transition: box-shadow 0.3s ease;
}

.discord-icon {
    background: linear-gradient(135deg, #5865F2, #7289DA);
}

.telegram-icon {
    background: linear-gradient(135deg, #0088cc, #29b6f6);
}

.social-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 2px;
}

.social-arrow {
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.social-card:hover .social-arrow {
    transform: translateX(4px);
}

.discord-card:hover {
    background: linear-gradient(135deg, rgba(88, 101, 242, 0.12), rgba(88, 101, 242, 0.04));
    border-color: rgba(88, 101, 242, 0.25);
}

.discord-card:hover .discord-icon {
    box-shadow: 0 0 16px rgba(88, 101, 242, 0.4);
}

.telegram-card:hover {
    background: linear-gradient(135deg, rgba(0, 136, 204, 0.12), rgba(0, 136, 204, 0.04));
    border-color: rgba(0, 136, 204, 0.25);
}

.telegram-card:hover .telegram-icon {
    box-shadow: 0 0 16px rgba(0, 136, 204, 0.4);
}

.social-card:hover .social-arrow :deep(.iconify) {
    color: rgba(255, 255, 255, 0.7) !important;
}

/* Donor leaderboard */
.donor-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 12px 16px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    position: relative;
    transition: all 0.3s ease;
}

.donor-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.donor-place-badge {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 22px;
    height: 22px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Unbounded', sans-serif;
    font-weight: 700;
    font-size: 0.7rem;
    color: #000;
}

.donor-gold {
    border-color: rgba(234, 179, 8, 0.25);
    background: linear-gradient(180deg, rgba(234, 179, 8, 0.1) 0%, rgba(234, 179, 8, 0.03) 100%);
}
.donor-gold .donor-place-badge {
    background: linear-gradient(135deg, #eab308, #facc15);
}
.donor-gold:hover {
    border-color: rgba(234, 179, 8, 0.4);
    box-shadow: 0 8px 24px rgba(234, 179, 8, 0.15);
}

.donor-silver {
    border-color: rgba(148, 163, 184, 0.2);
    background: linear-gradient(180deg, rgba(148, 163, 184, 0.08) 0%, rgba(148, 163, 184, 0.02) 100%);
}
.donor-silver .donor-place-badge {
    background: linear-gradient(135deg, #94a3b8, #cbd5e1);
}
.donor-silver:hover {
    border-color: rgba(148, 163, 184, 0.35);
    box-shadow: 0 8px 24px rgba(148, 163, 184, 0.1);
}

.donor-bronze {
    border-color: rgba(180, 120, 60, 0.2);
    background: linear-gradient(180deg, rgba(180, 120, 60, 0.08) 0%, rgba(180, 120, 60, 0.02) 100%);
}
.donor-bronze .donor-place-badge {
    background: linear-gradient(135deg, #b4783c, #d4976a);
}
.donor-bronze:hover {
    border-color: rgba(180, 120, 60, 0.35);
    box-shadow: 0 8px 24px rgba(180, 120, 60, 0.1);
}

.donor-avatar {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.1);
}

.donor-card-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.04);
    transition: all 0.2s ease;
}

.donor-card-row:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.08);
}
</style>