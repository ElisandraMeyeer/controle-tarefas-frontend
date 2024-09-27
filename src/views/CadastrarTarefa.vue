<template>
    <v-toolbar density="compact" color="orange-lighten-1">
        <v-toolbar-title>
            <span style="color: white;">Controle de tarefas</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon>
            <svg-icon type="mdi" :path="pathLogout" color="white" @click="logout"></svg-icon>
        </v-btn>
    </v-toolbar>
    <v-sheet class="mx-auto" width="50%" style="margin-top: 10%;">
        <v-form ref="form">
            <v-text-field v-model="nome" :rules="nameRules" label="Nome da tarefa" variant="solo"
                required></v-text-field>

            <v-textarea v-model="descricao" label="Descrição" variant="solo"></v-textarea>

            <v-select v-model="atribuicao" :items="atribuicoes" item-title="usuario" item-value="id"
                label="Atribuir para:" return-object required variant="solo" @click="buscarAtribuicoes"></v-select>

            <div class="d-flex flex-column">
                <v-btn class="mt-4" color="success" block @click="cadastrar" to="/tarefas">
                    Cadastrar
                </v-btn>

                <v-btn class="mt-4" color="error" block @click="limpar">
                    Limpar
                </v-btn>

                <v-btn class="mt-4" color="warning" block @click="resetValidation" to="/tarefas">
                    Voltar
                </v-btn>
            </div>
        </v-form>
    </v-sheet>
</template>


<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogout } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data: () => ({
        atribuicoes: [
            {
                id: 0,
                usuario: "Todos"
            }
        ],
        nome: null,
        descricao: null,
        atribuicao: { id: null, usuario: null },
        pathLogout: mdiLogout,
    }),
    methods: {
        cadastrar() {
            let _data = {
                nome: this.nome,
                descricao: this.descricao,
                atribuicao: this.atribuicao.id
            }
            const token = localStorage.getItem('userToken');


            fetch(import.meta.env.VITE_API_URL + '/cadastrar-tarefa', {
                method: "POST",
                body: JSON.stringify(_data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err));
        },
        buscarAtribuicoes() {
            const token = localStorage.getItem('userToken');

            fetch(import.meta.env.VITE_API_URL + '/buscar-usuarios', {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(json => {
                    this.atribuicoes = json;
                    this.atribuicoes.push(
                        {
                            id: 0,
                            usuario: "Todos"
                        }
                    )
                })
                .catch(err => console.log(err));
        },
        limpar() {
            this.nome = null;
            this.descricao = null;
            this.atribuicao = { id: null, usuario: null };
        },
        logout() {
            const token = localStorage.getItem('userToken');

            fetch(import.meta.env.VITE_API_URL + 'logout', {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(this.$router.push('/'))
                .catch(err => console.log(err));
        },
    },
    mounted() {
        this.buscarAtribuicoes();
    },
}
</script>

<style scoped></style>