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
function descontoInss(salario: number) {
    return ((dadoUsuario.vl_SalarioBruto - dadoUsuario.vl_BaseFaixa) * dadoUsuario.aliquotaBase ) + dadoUsuario.vl_Agregado;
}

function descontoIr() {
    
    if(vl_ComDescontoInss <= 1903.98 ) {
        dadoUsuario.descontoIr = 0;
        dadoUsuario.parcelaDedutivelIr = 0;
    }
    if(vl_ComDescontoInss >= 1903.99 && vl_ComDescontoInss <= 2826.65 ) {
        dadoUsuario.descontoIr = 0.075;
        dadoUsuario.parcelaDedutivelIr = 142.80;
    }
    if(vl_ComDescontoInss >= 2826.66 && vl_ComDescontoInss <= 3751.05 ) {
        dadoUsuario.descontoIr = 0.15;
        dadoUsuario.parcelaDedutivelIr = 354.80;
    }
    if(vl_ComDescontoInss >= 3751.06 && vl_ComDescontoInss <= 4664.68 ) {
        dadoUsuario.descontoIr = 0.225;
        dadoUsuario.parcelaDedutivelIr = 636.13;
    } 
    if(vl_ComDescontoInss > 4664.68) {
        dadoUsuario.descontoIr = 0.275;
        dadoUsuario.parcelaDedutivelIr = 869.36;
    }
}

tabelaInss(dadoUsuario.vl_SalarioBruto);

//Calculo para saber o Desconto do Inss
var vl_DescontoInss = descontoInss(dadoUsuario.vl_SalarioBruto);

dadoUsuario.faixaDescontoInss = ((vl_DescontoInss * 100)/dadoUsuario.vl_SalarioBruto);

let vl_ComDescontoInss = dadoUsuario.vl_SalarioBruto - vl_DescontoInss

descontoIr();

//Calculo pra saber a faixa de desconto Ir
dadoUsuario.faixaDescontoIr = ((dadoUsuario.vl_DescontadoIr * 100)/dadoUsuario.vl_SalarioBruto);

var vl_PorHoraTrabalhada = dadoUsuario.vl_SalarioBruto / 200 

var vl_HorasExtras = vl_PorHoraTrabalhada * dadoUsuario.vl_TotalDeHorasExtra

//Calculo Salario Liquido
dadoUsuario.vl_salarioLiquido = dadoUsuario.vl_SalarioBruto - dadoUsuario.descontoIr - vl_DescontoInss + vl_HorasExtras


//Calculo para saber o desconto do Ir
dadoUsuario.vl_DescontadoIr = ((vl_ComDescontoInss * dadoUsuario.descontoIr ) - dadoUsuario.parcelaDedutivelIr )

console.log('---------- IMPOSTO DE RENDA ----------');
console.log('');
console.log(' Nome: ' + dadoUsuario.nome + ' \n Salario bruto: ' + dadoUsuario.vl_SalarioBruto + ' \n Faixa do INSS: ' + dadoUsuario.faixaDescontoInss.toFixed(1) + '% \n Valor descontado para o INSS: ' + vl_DescontoInss.toFixed(2) + '\n Valor do Desconto Ir: ' + dadoUsuario.vl_DescontadoIr.toFixed(2) + '\n Valor salario liquido: ' + dadoUsuario.vl_salarioLiquido.toFixed(2));
console.log('');
console.log('--------------------------------------');
console.log(' By FIlipe Querino e Jadson Oliveria ');
console.log('');