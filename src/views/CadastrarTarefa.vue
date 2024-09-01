<template>
    <v-sheet class="mx-auto" width="50%">

        <v-form ref="form">
            <v-text-field v-model="nome" :rules="nameRules" label="Nome da tarefa" variant="solo"
                required></v-text-field>

            <v-textarea v-model="descricao" label="Descrição" variant="solo"></v-textarea>

            <v-select 
                v-model="atribuicao" 
                :items="atribuicoes" 
                item-title="nome" 
                item-value="id" 
                label="Atribuir para:" 
                return-object
                required variant="solo"
                single-line
                persistent-hint

            ></v-select>


            <div class="d-flex flex-column">
                <v-btn class="mt-4" color="success" block @click="cadastrar" to="/tarefas">
                    Cadastrar
                </v-btn>

                <v-btn class="mt-4" color="error" block @click="reset">
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
        atribuicoes: [
        ],
        nome: null,
        descricao: null,
        atribuicao: {id: null, nome: null}
    }),
    methods: {
        cadastrar() {
            // dados a serem enviados pela solicitação POST
            let _data = {
                nome: this.nome,
                descricao: this.descricao,
                atribuicao: this.atribuicao.id
            }

            fetch('http://127.0.0.1:8000/cadastrar-tarefa', {
                method: "POST",
                body: JSON.stringify(_data),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err));
            alert()
    }
}
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