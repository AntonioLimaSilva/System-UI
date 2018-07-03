class EstadoCivil {
    label: string;
    value: string;
}

class Estado {
    id: number;
    nome: string;
    sigla: string;
}

class Cidade {
    id: number;
    nome: string;
    estado = new Estado();
}

class Endereco {
    logradouro: string;
    bairro: string;
    cep: string;
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
	idoso: boolean = false;
	portadorDeficiencia: boolean = false;
	atendimentoPreferencial: boolean = false;
	observacao: string;
	dataCriacao: string;
	foto: string;
    contentType: string;
    endereco = new Endereco();
}

export {EstadoCivil, Estado, Cidade, Endereco, Pessoa}