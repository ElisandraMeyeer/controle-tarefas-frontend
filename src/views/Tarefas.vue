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

    <v-card class="mx-auto mt-5" max-width="70%" max-height="50%">
        <v-toolbar color="orange-lighten-3">
            <svg-icon type="mdi" :path="pathList" class="ml-2"></svg-icon>
            <v-toolbar-title>Tarefas</v-toolbar-title>
        </v-toolbar>

        <v-list lines="two" max-height="50vw" style="overflow: auto;">
            <v-list-subheader inset style="font-size: large;">Para mim</v-list-subheader>

            <v-list-item v-for="tarefa in minhasTarefas" :key="tarefa.nome" style="margin-left: 5rem;">
                <v-expansion-panels class="my-1" variant="inset">
                    <v-expansion-panel :title="tarefa.nome" :text="tarefa.descricao">
                    </v-expansion-panel>
                </v-expansion-panels>

                <template v-slot:append>
                    <v-btn color="orange-darken-1" variant="text" @click="concluir(tarefa)">Concluir</v-btn>
                </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-subheader inset style="font-size: large;">Todos</v-list-subheader>

            <v-list-item v-for="tarefa in tarefasTodos" :key="tarefa.nome" style="margin-left: 5rem;">
                <v-expansion-panels class="my-1" variant="inset">
                    <v-expansion-panel :title="tarefa.nome" :text="tarefa.descricao">
                    </v-expansion-panel>
                </v-expansion-panels>

                <template v-slot:append>
                    <v-btn color="orange-darken-1" variant="text" @click="concluir(tarefa, 'todos')">Concluir</v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>

    <div style="display: flex; justify-content: center;">
        <v-col cols="12" md="4" sm="6">
            <v-btn rounded="xl" size="x-large" block to="/cadastrar-tarefa" color="orange-darken-1">CADASTRAR
                TAREFA</v-btn>
        </v-col>
    </div>


</template>


<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogout, mdiFormatListBulleted } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data: () => ({
        minhasTarefas: [],
        tarefasTodos: [],
        folders: [
            {
                subtitle: 'Jan 9, 2014',
                title: 'Photos',
            },
            {
                subtitle: 'Jan 17, 2014',
                title: 'Recipes',
            },
            {
                subtitle: 'Jan 28, 2014',
                title: 'Work',
            },
        ],
        pathLogout: mdiLogout,
        pathList: mdiFormatListBulleted,

    }),
    methods: {
        buscarTarefasUsuario() {
            const token = localStorage.getItem('userToken');


            fetch(import.meta.env.VITE_API_URL + 'buscar-tarefas-usuario', {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.statusText === 'Unauthorized') {
                        this.$router.push('/');
                    }
                    response.json().then(json => this.minhasTarefas = json);
                })
                .catch(err => console.log(err));
        },
        buscarTarefasTodos() {
            const token = localStorage.getItem('userToken');

            fetch(import.meta.env.VITE_API_URL + 'buscar-tarefas-todos', {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.statusText === 'Unauthorized') {
                        this.$router.push('/');
                    }
                    response.json().then(json => this.tarefasTodos = json);
                })
                .catch(err => console.log(err));
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
        concluir(tarefa, tipo) {
            const token = localStorage.getItem('userToken');

            const data = {
                id: tarefa.id,
                tipo: tipo === "todos" ? tipo : "individual"
            }

            fetch(import.meta.env.VITE_API_URL + 'concluir-tarefa', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.statusText === 'Unauthorized') {
                        this.$router.push('/');
                    }
                    response.json().then(json => {
                        this.buscarTarefasUsuario()
                        this.buscarTarefasTodos()
                    });
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        this.buscarTarefasUsuario();
        this.buscarTarefasTodos();
    },
}
</script>

<style scoped></style>