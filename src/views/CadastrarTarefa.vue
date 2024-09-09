<template>
    <v-sheet class="mx-auto" width="50%" style="margin-top: 15%;">
        <v-form ref="form">
            <v-text-field v-model="nome" :rules="nameRules" label="Nome da tarefa" variant="solo"
                required></v-text-field>

            <v-textarea v-model="descricao" label="Descrição" variant="solo"></v-textarea>

            <v-select 
                v-model="atribuicao" 
                :items="atribuicoes" 
                item-title="usuario" 
                item-value="id" 
                label="Atribuir para:"
                return-object 
                required variant="solo" 
            ></v-select>

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
export default {
    data: () => ({
        atribuicoes: [
        ],
        nome: null,
        descricao: null,
        atribuicao: { id: null, usuario: null }
    }),
    methods: {
        cadastrar() {
            // dados a serem enviados pela solicitação POST
            let _data = {
                nome: this.nome,
                descricao: this.descricao,
                atribuicao: this.atribuicao.id
            }
            const token = localStorage.getItem('userToken');


            fetch('http://127.0.0.1:8000/cadastrar-tarefa', {
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

            fetch('http://127.0.0.1:8000/buscar-usuarios', {
                method: "GET",
                headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
            })
                .then(response => response.json())
                .then(json => this.atribuicoes = json)
                .catch(err => console.log(err));
        },
        limpar(){
            this.nome = null;
            this.descricao = null;
            this.atribuicao = { id: null, usuario: null };
        }
    },
    mounted() {
        this.buscarAtribuicoes();
    },
}
</script>

<style scoped>
</style>