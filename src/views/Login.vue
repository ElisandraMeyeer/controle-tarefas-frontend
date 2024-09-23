<template>
    <div>
        <v-img class="mx-auto my-6" max-width="228" src="\logo-imobiliaria.png"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>

            <v-text-field v-model="usuario" density="compact" placeholder="Digite seu usuário"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Senha
            </div>

            <v-text-field v-model="senha" type="password" variant="outlined" density="compact"
                placeholder="Digite seu usuário" v-on:keyup.enter="login"></v-text-field>


            <v-btn class="mb-8" color="orange" size="large" variant="tonal" block @click="login">
                Acessar
            </v-btn>
        </v-card>
    </div>

    <v-snackbar v-model="snackbar.show" :timeout="5000" :color="snackbar.color" top multi-line>
        {{ snackbar.message }}
    </v-snackbar>
</template>



<script>

export default {
    data: () => ({
        usuario: null,
        senha: null,
        alert: null,
        snackbar: {
            show: false,
            message: 'Nome de usuário ou a senha incorretos',
            color: 'error',
        },
    }),
    methods: {
        login() {
            fetch('https://controle-tarefas-backend-production.up.railway.app/api-token-auth/', {
                method: "POST",
                body: JSON.stringify({
                    username: this.usuario,
                    password: this.senha
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then(response => response.json())
                .then(json => {
                    if (json.token) {
                        localStorage.setItem('userToken', json.token);
                        this.$router.push('/tarefas');
                    } else {
                        this.alert = true
                        this.snackbar.show = true;
                    }
                })
                .catch(err => this.alert = true);
        }

    },
    mounted() {
    },
}
</script>