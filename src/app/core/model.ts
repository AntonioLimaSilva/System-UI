class EstadoCivil {
    label: string;
    value: string;
}

class Estado {
    id: number;
    nome: string;
}

class Cidade {
    id: number;
    nome: string;
}

class Endereco {
    id: number;
    logradouro: string;
    bairro: string;
    cep: string;
    estado = new Estado();
    cidade = new Cidade();
}

class Pessoa {
    id: number;
    nome: string;
	pseudonimo: string;
	email: string;
	foneResidencial: string;
	foneCelular: string;
	sexo: string;
	rg: string;
	cpf: string;
    dataNascimento: Date;
	naturalidade: string;
	nacionalidade: string;
	profissao: string;
	estadoCivil: string;
	idoso: boolean;
	portadorDeficiencia: boolean;
	atendimentoPreferencial: boolean;
	observacao: string;
	dataCriacao: string;
	foto: string;
    contentType: string;
    endereco = new Endereco();
}

class Documento {
    id: number;
    descricao: string;
    nome: string;
    contentType: string;
    tamanho: number;
    isPrincipal: boolean;
}

class Assistido {
    id: number;
    pessoa: {
        id: number;
        nome: string;
    };
}

class Funcionario {
    id: number;
    funcao: string;
    pessoa: {
        id: number;
        nome: string;
    };
}

class Processo {
    id: number;
    doFato: string;
    doDireito: string;
    doPedido: string;
    documentosQueFaltam: string;
    localizacao: string;
    estaComAluno: string;
    extinto: string;
}

export { EstadoCivil, Estado, Cidade, Endereco, Pessoa, Documento, Assistido, Funcionario, Processo }