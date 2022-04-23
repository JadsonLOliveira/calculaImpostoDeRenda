interface DadosUsuario {
    nome: string;
    vl_SalarioBruto: number;
    vl_TotalDeHorasExtra: number;
    vl_salarioLiquido: number;
    aliquotaBase: number,
    vl_BaseFaixa: number,
    vl_Agregado: number,
    faixaDescontoInss: number,
    descontoIr: number,
    faixaDescontoIr: number,
    vl_DescontadoIr: number,
    parcelaDedutivelIr: number
    // (salário bruto - desconto INSS - desconto IR + horas extras)
}

const dadoUsuario = {
    nome: process.argv[2],
    vl_SalarioBruto: parseInt(process.argv[3]),
    vl_TotalDeHorasExtra: parseInt(process.argv[4]),
    vl_salarioLiquido: 0,
    faixaDescontoIr: 0,
    aliquotaBase: 0,
    vl_BaseFaixa: 0,
    parcelaDedutivelIr: 0,
    vl_Agregado: 0,
    faixaDescontoInss: 0 ,
    vl_DescontadoIr: 0,
    descontoIr: 0
} as DadosUsuario

function tabelaInss(salario: number): void{
    if (salario <= 1212.00){
        dadoUsuario.aliquotaBase =  0.075;
        dadoUsuario.vl_BaseFaixa = 0;
        dadoUsuario.vl_Agregado = 0;
    }
    if (salario <= 2427.35 && salario >= 1212.01){
        dadoUsuario.aliquotaBase = 0.9;
        dadoUsuario.vl_BaseFaixa = 1212.01;
        dadoUsuario.vl_Agregado = 90.90;
    }
    if (salario >= 2427.36 && salario <= 3641.03){
        dadoUsuario.aliquotaBase = 0.12;
        dadoUsuario.vl_BaseFaixa = 2427.36;
        dadoUsuario.vl_Agregado = 200.28;
    }
    if (salario >= 3641.04 && salario <= 7087.22){
        dadoUsuario.aliquotaBase = 0.14;
        dadoUsuario.vl_BaseFaixa = 3641.04;
        dadoUsuario.vl_Agregado = 345.92;
    }
}