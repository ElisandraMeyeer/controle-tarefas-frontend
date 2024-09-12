<template>
    <v-card title="Login" class="mx-auto" max-width="500">

        <v-text-field label="Usuário" v-model="usuario"></v-text-field>

        <v-text-field label="Senha" v-model="senha" persistent-hint type="input"></v-text-field>


        <v-btn @click="login">
            Acessar
        </v-btn>
    </v-card>

    <v-snackbar
        v-model="snackbar.show"
        :timeout="5000"
        :color="snackbar.color"
        top
        multi-line
    >
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
            fetch('http://127.0.0.1:8000/api-token-auth/', {
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
                        this.alert= true
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