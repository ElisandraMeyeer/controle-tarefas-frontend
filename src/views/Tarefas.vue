<template>
    <v-card class="mx-auto mt-5" max-width="70%">
        <v-toolbar color="orange-lighten-1">
            <v-btn icon="mdi-menu" variant="text"></v-btn>

            <v-toolbar-title>Tarefas</v-toolbar-title>

            <v-spacer></v-spacer>

        </v-toolbar>

        <v-list lines="two">
            <v-list-subheader inset>Para mim</v-list-subheader>

            <v-list-item v-for="folder in folders" :key="folder.title" style="margin-left: 5rem;" >
                <v-expansion-panels variant="accordion">
                    <v-expansion-panel title="Title"
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima">
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
        files: [
            {
                color: 'blue',
                icon: 'mdi-clipboard-text',
                subtitle: 'Jan 20, 2014',
                title: 'Vacation itinerary',
            },
            {
                color: 'amber',
                icon: 'mdi-gesture-tap-button',
                subtitle: 'Jan 10, 2014',
                title: 'Kitchen remodel',
            },
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
}
</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>