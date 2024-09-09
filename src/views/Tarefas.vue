<template>
    <v-card class="mx-auto mt-5" max-width="70%">
        <v-toolbar color="orange-lighten-1">
            <v-btn icon="mdi-menu" variant="text"></v-btn>

            <v-toolbar-title>Tarefas</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>

        <v-list lines="two">
            <v-list-subheader inset>Para mim</v-list-subheader>

            <v-list-item v-for="tarefa in minhasTarefas" :key="tarefa.nome" style="margin-left: 5rem;" >
                <v-expansion-panels variant="accordion">
                    <v-expansion-panel :title="tarefa.nome"
                        :text="tarefa.descricao">
                    </v-expansion-panel>
                </v-expansion-panels>

                <template v-slot:append>
                    <v-btn color="orange-darken-1" variant="text">Concluir</v-btn>
                </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-subheader inset>Todos</v-list-subheader>

            <v-list-item v-for="file in files" :key="file.title"  style="margin-left: 5rem;" >
                <v-expansion-panels variant="accordion">
                    <v-expansion-panel title="Title"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima">
                    </v-expansion-panel>
                </v-expansion-panels>

                <template v-slot:append>
                    <v-btn color="orange-darken-1" variant="text">Concluir</v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>

    <div style="display: flex; justify-content: center;">
        <v-col cols="12" md="4" sm="6">
            <v-btn rounded="xl" size="x-large" block to="/cadastrar-tarefa" color="orange-darken-1" >CADASTRAR TAREFA</v-btn>
        </v-col>
    </div>


</template>


<script>

export default {
    data: () => ({
        minhasTarefas: [
            
        ],
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
    }),
    methods: {
        buscarTarefasUsuario(){
            const token = localStorage.getItem('userToken');

            fetch('http://127.0.0.1:8000/buscar-tarefas-usuario', {
                method: "GET",
                headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            })
                .then(response => response.json())
                .then(json => this.minhasTarefas = json)
                .catch(err => console.log(err));
        }
    },
    mounted() {
        alert()

        this.buscarTarefasUsuario();
    },
}
</script>

<style scoped>

</style>