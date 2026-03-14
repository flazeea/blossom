<template>
  <div>
    <AppHeader />
    <div class="sm:grid lg:flex justify-center p-8 gap-7 w-full h-full min-h-[calc(100vh-200px)]">
      <div class="w-full max-w-5xl">
        <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-3xl md:text-5xl unbounded-bold text-white mb-2 uppercase tracking-wide">
              Админ-панель
            </h1>
            <p class="text-gray-400 unbounded-light text-sm md:text-base">
              Управление донатами магазина
            </p>
          </div>
          
          <button 
            @click="clearAllDonations" 
            class="admin-danger-btn"
            :disabled="!donations || donations.length === 0 || isLoading"
          >
            <Icon name="mingcute:delete-2-line" class="text-lg" />
            Очистить всю базу
          </button>
        </div>

        <div v-if="!isAuthenticated" class="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
          <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
            <div>
              <label class="block text-gray-400 unbounded-light text-sm mb-2">Логин</label>
              <input v-model="loginData.username" type="text" class="admin-input" placeholder="Введите логин" required>
            </div>
            <div>
              <label class="block text-gray-400 unbounded-light text-sm mb-2">Пароль</label>
              <input v-model="loginData.password" type="password" class="admin-input" placeholder="Введите пароль" required>
            </div>
            <p v-if="loginError" class="text-red-400 text-sm mt-2">{{ loginError }}</p>
            <button type="submit" class="admin-login-btn mt-4" :disabled="isLoggingIn">
              <Icon name="mingcute:key-2-line" class="text-lg" />
              Войти
            </button>
          </form>
        </div>

        <div v-else-if="isLoading" class="flex justify-center py-10">
          <Icon name="mingcute:loading-fill" class="animate-spin text-4xl text-lime-500" />
        </div>

        <div v-else-if="!donations || donations.length === 0" class="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <Icon name="mingcute:ghost-line" class="text-5xl text-gray-500 mb-4 mx-auto" />
          <p class="text-gray-400 unbounded-light">База данных донатов пуста.</p>
        </div>

        <div v-else class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-white/10 bg-white/5">
                  <th class="p-4 text-gray-400 unbounded-light text-sm">ID</th>
                  <th class="p-4 text-gray-400 unbounded-light text-sm">Никнейм</th>
                  <th class="p-4 text-gray-400 unbounded-light text-sm">Сумма (Изумруды)</th>
                  <th class="p-4 text-gray-400 unbounded-light text-sm">Дата</th>
                  <th class="p-4 text-right text-gray-400 unbounded-light text-sm">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="donation in donations" :key="donation.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td class="p-4 text-gray-500 font-mono text-sm">#{{ donation.id }}</td>
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <img
                        :src="`https://minotar.net/helm/${donation.nickname}/24`"
                        alt=""
                        class="w-6 h-6 rounded-sm"
                        style="image-rendering: pixelated;"
                      />
                      <span class="text-white unbounded-medium">{{ donation.nickname }}</span>
                    </div>
                  </td>
                  <td class="p-4 text-lime-400 font-bold">{{ donation.amount }}</td>
                  <td class="p-4 text-gray-400 text-sm">
                    {{ formatDate(donation.created_at) }}
                  </td>
                  <td class="p-4 text-right">
                    <button 
                      @click="deleteDonation(donation.id)"
                      class="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                      title="Удалить запись"
                    >
                      <Icon name="mingcute:delete-2-line" class="text-xl" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Админ-панель - Blossom'
})

interface Donation {
  id: number
  nickname: string
  amount: number
  created_at: string
}

const isAuthenticated = ref(false)
const loginData = reactive({ username: '', password: '' })
const isLoggingIn = ref(false)
const loginError = ref('')

const { data: donations, pending: isLoading, refresh } = useFetch<Donation[]>('/api/admin/donations', {
  immediate: false,
  onResponseError({ response }) {
    if (response.status === 401) isAuthenticated.value = false
  }
})

// Check auth on mount
onMounted(async () => {
  const token = useCookie('admin_token')
  if (token.value) {
    isAuthenticated.value = true
    await refresh()
  }
})

async function handleLogin() {
  try {
    isLoggingIn.value = true
    loginError.value = ''
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: loginData
    })
    isAuthenticated.value = true
    await refresh()
  } catch (e: any) {
    loginError.value = e.data?.statusMessage || 'Ошибка входа'
  } finally {
    isLoggingIn.value = false
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

async function deleteDonation(id: number) {
  if (!confirm(`Вы действительно хотите удалить донат #${id}?`)) return
  
  try {
    await $fetch(`/api/admin/donations/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (e) {
    alert('Ошибка при удалении доната')
  }
}

async function clearAllDonations() {
  if (!confirm('ВНИМАНИЕ! Вы собираетесь удалить ВСЕ донаты из базы данных. Это действие необратимо. Продолжить?')) return
  
  try {
    await $fetch('/api/admin/donations/clear', { method: 'DELETE' })
    await refresh()
  } catch (e) {
    alert('Ошибка при очистке базы данных')
  }
}
</script>

<style scoped>
.admin-input {
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

.admin-input:focus {
  border-color: rgba(132, 204, 22, 0.5);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 0 3px rgba(132, 204, 22, 0.1);
}

.admin-login-btn {
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
}

.admin-login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(132, 204, 22, 0.3);
}

.admin-login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-danger-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  font-family: "Unbounded", sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.admin-danger-btn:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
}

.admin-danger-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
}
</style>
