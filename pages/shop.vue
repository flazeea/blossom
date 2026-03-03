<template>
  <div>
    <AppHeader />
    <div class="container mx-auto p-8">
      <div class="max-w-3xl mx-auto">

        <!-- Shop Card -->
        <div class="welcome-banner relative">
          <!-- Lime glow effect -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-glow"></div>

          <div class="rounded-2xl border-3 p-8 md:p-10 border border-white/5 shadow-2xl">
            <h1 class="text-3xl md:text-5xl unbounded-bold text-white mb-3 uppercase tracking-wide text-center">
              Магазин
            </h1>
            <p class="text-gray-400 unbounded-light text-sm md:text-base text-center mb-10">
              Пополните свой баланс изумрудов на сервере
            </p>

            <!-- Emerald icon -->

            <!-- Nickname input -->
            <div class="mb-5">
              <label class="block text-gray-400 unbounded-light text-sm mb-2">Ваш никнейм на сервере</label>
              <div class="relative">
                <input
                  v-model="nickname"
                  type="text"
                  placeholder="Введите никнейм..."
                  class="shop-input"
                />
                <div v-if="nickname" class="absolute right-3 top-1/2 -translate-y-1/2">
                  <img
                    :src="`https://minotar.net/helm/${nickname}/24`"
                    alt=""
                    class="w-6 h-6 rounded-sm"
                    style="image-rendering: pixelated;"
                  />
                </div>
              </div>
            </div>

            <!-- Amount input -->
            <div class="mb-6">
              <label class="block text-gray-400 unbounded-light text-sm mb-2">Количество изумрудов</label>
              <input
                v-model.number="amount"
                type="number"
                min="1"
                placeholder="Введите сумму..."
                class="shop-input"
              />
            </div>

            <!-- Quick amount buttons -->
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                v-for="preset in presets"
                :key="preset"
                class="shop-preset"
                :class="{ 'shop-preset-active': amount === preset }"
                @click="amount = preset"
              >
                {{ preset }} <img src="/emerald.png" alt="" class="inline w-4 h-4 ml-1" style="image-rendering: pixelated;" />
              </button>
            </div>

            <!-- Price summary -->
            <div class="bg-white/5 rounded-xl p-4 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-gray-400 unbounded-light text-sm">К оплате:</span>
                <span class="text-white unbounded-bold text-xl">
                  {{ calculatedPrice }} ₽
                </span>
              </div>
              <div class="flex justify-between items-center mt-1">
                <span class="text-gray-500 unbounded-light text-xs">Курс: 1 изумруд = {{ pricePerEmerald }} ₽</span>
                <span class="text-emerald-400 unbounded-light text-sm">
                  {{ amount || 0 }} изумрудов
                </span>
              </div>
            </div>

            <!-- Buy button -->
            <button
              class="shop-buy-btn"
              :disabled="!nickname || !amount || amount < 1"
              @click="handlePurchase"
            >
              <Icon name="mingcute:shopping-bag-2-line" class="text-lg" />
              <span>Пополнить баланс</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const nickname = ref('')
const amount = ref<number | null>(null)
const pricePerEmerald = 1

const presets = [50, 100, 250, 500, 1000]

const calculatedPrice = computed(() => {
  return (amount.value || 0) * pricePerEmerald
})

function handlePurchase() {
  if (!nickname.value || !amount.value || amount.value < 1) return
  alert(`Пополнение ${amount.value} изумрудов для ${nickname.value} на сумму ${calculatedPrice.value} ₽`)
}
</script>

<style scoped>
.emerald-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.shop-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: "Unbounded", sans-serif;
  font-weight: 200;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
}

.shop-input:focus {
  border-color: rgba(132, 204, 22, 0.5);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(132, 204, 22, 0.1);
}

.shop-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

/* Hide number input arrows */
.shop-input[type="number"]::-webkit-inner-spin-button,
.shop-input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.shop-input[type="number"] {
  -moz-appearance: textfield;
}

.shop-preset {
  padding: 6px 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-family: "Unbounded", sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shop-preset:hover {
  background: rgba(132, 204, 22, 0.1);
  border-color: rgba(132, 204, 22, 0.3);
  color: #fff;
}

.shop-preset-active {
  background: rgba(132, 204, 22, 0.15);
  border-color: rgba(132, 204, 22, 0.5);
  color: #84cc16;
}

.shop-buy-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, #84cc16, #65a30d);
  color: #000;
  font-family: "Unbounded", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.shop-buy-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(132, 204, 22, 0.3);
}

.shop-buy-btn:active:not(:disabled) {
  transform: translateY(0);
}

.shop-buy-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>