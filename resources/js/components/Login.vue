<template>
    <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
        <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
            <div class="flex items-center justify-center">
                <svg class="w-10 h-10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                        fill="#4C51BF" stroke="#4C51BF" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path
                        d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                        fill="white" />
                </svg>
                <span class="text-2xl font-semibold text-gray-700">Dashboard</span>
            </div>

            <form class="mt-4" @submit.prevent="handleLogin">
                <label class="block text-left">
                    <span class="text-sm text-gray-700">Email</span>
                </label>
                <input v-model="email" type="email"
                    class="block w-full mt-1 border border-gray-300 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 p-2"
                    placeholder="Ingresa tu correo" />

                <label class="block mt-3 text-left">
                    <span class="text-sm text-gray-700">Password</span>
                </label>
                <input v-model="password" type="password"
                    class="block w-full mt-1 border border-gray-300 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500 p-2"
                    placeholder="Ingresa tu  password" />

                <div class="mt-6">
                    <button type="submit"
                        class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Iniciar Sesión
                    </button>
                </div>
                <p class="mt-4">
                    No tengo cuenta,
                    <router-link to="/register" class="text-blue-500 hover:underline">
                        registrarme
                    </router-link>
                </p>

                <!-- Mostrar errores -->
                <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { login } from '../services/auth';
import { useRouter } from 'vue-router';
export default {
    name: 'LoginComponent',
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref('');
        const router = useRouter();

        const handleLogin = async () => {
            try {
                const response = await login({ email: email.value, password: password.value });
                // Guardar el access-token en localStorage
                localStorage.setItem('access-token', response.data.accessToken);
                // Redirigir al dashboard
                router.push('/dashboard');
            } catch (err) {
                error.value = 'Login fallido. Verifica tus credenciales.';
            }
        };

        return { email, password, error, handleLogin };
    },
};
</script>
