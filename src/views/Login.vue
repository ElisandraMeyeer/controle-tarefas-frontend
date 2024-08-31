<template>
    <v-card title="Login" class="mx-auto" max-width="500">

        <v-text-field label="Usuário"></v-text-field>

        <v-text-field label="Senha" persistent-hint type="input"></v-text-field>


        <RouterLink to="/tarefas">

            <v-btn>
                Acessar
            </v-btn>

        </RouterLink>
    </v-card>

</template>


<script>
</script>