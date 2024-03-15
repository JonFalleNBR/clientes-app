export class Cliente {
    id: number; 
    nome: string;
    cpf: string; 
    dataCadastro: string;

    constructor(){
        this.id = 0;
        this.nome = '';
        this.cpf = ''; 
        this.dataCadastro = '';
    }
}

//O Cliente esta sendo instanciado no clientes-form.component em um construtor