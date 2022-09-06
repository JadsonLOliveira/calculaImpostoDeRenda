"use strict";
class Usuario {
    constructor(nome, vl_SalarioBruto, vl_TotalDeHorasExtra) {
        this.dadosUsuario = {};
        this.setNome(nome);
        this.setVl_SalarioBruto(vl_SalarioBruto);
        this.setVl_TotalDeHorasExtra(vl_TotalDeHorasExtra);
        this.setFaixaDescontoInss();
        this.setVl_DescontoInss();
        this.setFaixaDescontoIr();
        this.setVl_DescontadoIr();
        this.setVl_salarioLiquido();
    }
    //void não retorna vazio
    setNome(novoNome) {
        this.dadosUsuario.nome = novoNome;
    }
    setVl_SalarioBruto(vl_SalarioBruto) {
        this.dadosUsuario.vl_SalarioBruto = vl_SalarioBruto;
    }
    setVl_TotalDeHorasExtra(vl_TotalDeHorasExtra) {
        let vl_HorasExtra = vl_TotalDeHorasExtra ? vl_TotalDeHorasExtra : 0;
        this.dadosUsuario.vl_TotalDeHorasExtra = ((this.dadosUsuario.vl_SalarioBruto / 200) * 1.5) * vl_HorasExtra;
    }
    setFaixaDescontoInss() {
        let salario = this.dadosUsuario.vl_SalarioBruto + this.dadosUsuario.vl_TotalDeHorasExtra;
        if (salario <= 1212.00) {
            this.dadosUsuario.faixaDescontoInss = 0.075;
        }
        if (salario <= 2427.35 && salario >= 1212.01) {
            this.dadosUsuario.faixaDescontoInss = 0.9;
        }
        if (salario >= 2427.36 && salario <= 3641.03) {
            this.dadosUsuario.faixaDescontoInss = 0.12;
        }
        if (salario >= 3641.04 && salario <= 7087.22) {
            this.dadosUsuario.faixaDescontoInss = 0.14;
        }
    }
    setVl_DescontoInss() {
        let salario = this.dadosUsuario.vl_SalarioBruto, vl_BaseFaixa = 0, vl_Agregado = 0;
        if (salario <= 1212.00) {
            vl_Agregado = 0;
            vl_BaseFaixa = 0;
        }
        if (salario <= 2427.35 && salario >= 1212.01) {
            vl_Agregado = 90.90;
            vl_BaseFaixa = 1212.01;
        }
        if (salario >= 2427.36 && salario <= 3641.03) {
            vl_Agregado = 200.28;
            vl_BaseFaixa = 2427.36;
        }
        if (salario >= 3641.04 && salario <= 7087.22) {
            vl_Agregado = 345.92;
            vl_BaseFaixa = 3641.04;
        }
        this.dadosUsuario.vl_DescontoInss = parseInt(((this.dadosUsuario.vl_SalarioBruto - vl_BaseFaixa) * this.dadosUsuario.faixaDescontoInss + vl_Agregado).toFixed(2));
    }
    setFaixaDescontoIr() {
        let salarioComDescontoINSS = (this.dadosUsuario.vl_SalarioBruto + this.dadosUsuario.vl_TotalDeHorasExtra) - this.dadosUsuario.vl_DescontoInss;
        if (salarioComDescontoINSS <= 1903.98) {
            this.dadosUsuario.faixaDescontoIr = 0;
        }
        if (salarioComDescontoINSS >= 1903.99 && salarioComDescontoINSS <= 2826.65) {
            this.dadosUsuario.faixaDescontoIr = 0.075;
        }
        if (salarioComDescontoINSS >= 2826.66 && salarioComDescontoINSS <= 3751.05) {
            this.dadosUsuario.faixaDescontoIr = 0.15;
        }
        if (salarioComDescontoINSS >= 3751.06 && salarioComDescontoINSS <= 4664.68) {
            this.dadosUsuario.faixaDescontoIr = 0.225;
        }
        if (salarioComDescontoINSS > 4664.68) {
            this.dadosUsuario.faixaDescontoIr = 0.275;
        }
    }
    setVl_DescontadoIr() {
        let salarioComDescontoINSS = this.dadosUsuario.vl_SalarioBruto - this.dadosUsuario.vl_DescontoInss, parcelaDedutivelIr = 0;
        if (salarioComDescontoINSS <= 1903.98) {
            parcelaDedutivelIr = 0;
        }
        if (salarioComDescontoINSS >= 1903.99 && salarioComDescontoINSS <= 2826.65) {
            parcelaDedutivelIr = 142.80;
        }
        if (salarioComDescontoINSS >= 2826.66 && salarioComDescontoINSS <= 3751.05) {
            parcelaDedutivelIr = 354.80;
        }
        if (salarioComDescontoINSS >= 3751.06 && salarioComDescontoINSS <= 4664.68) {
            parcelaDedutivelIr = 636.13;
        }
        if (salarioComDescontoINSS > 4664.68) {
            parcelaDedutivelIr = 869.36;
        }
        this.dadosUsuario.vl_DescontadoIr = (salarioComDescontoINSS * this.dadosUsuario.faixaDescontoIr) - parcelaDedutivelIr;
    }
    setVl_salarioLiquido() {
        let salarioBruto = this.dadosUsuario.vl_SalarioBruto, descontoIr = this.dadosUsuario.vl_DescontadoIr, vl_DescontoInss = this.dadosUsuario.vl_DescontoInss, vl_HorasExtras = this.dadosUsuario.vl_TotalDeHorasExtra;
        this.dadosUsuario.vl_salarioLiquido = (salarioBruto - descontoIr - vl_DescontoInss) + vl_HorasExtras;
    }
    getDadoUsuario() {
        return this.dadosUsuario;
    }
}
function processo(nome, vl_SalarioBruto, vl_TotalDeHorasExtra) {
    const usuario = new Usuario(nome, vl_SalarioBruto, vl_TotalDeHorasExtra);
    const dadosUsuario = usuario.getDadoUsuario();
    console.log('---------- IMPOSTO DE RENDA ----------');
    console.log('');
    console.log('Nome: ' + dadosUsuario.nome
        + '\nSalario bruto: ' + dadosUsuario.vl_SalarioBruto
        + '\nQuantidade de horas: ' + dadosUsuario.vl_TotalDeHorasExtra
        + '\nFaixa desconto INSS: ' + dadosUsuario.faixaDescontoInss
        + '\nValor descontado para o INSS: ' + dadosUsuario.vl_DescontoInss
        + '\nFaixa de desconto do IR: ' + dadosUsuario.faixaDescontoIr.toFixed(2)
        + '\nValor descontado para o IR: ' + dadosUsuario.vl_DescontadoIr.toFixed(2)
        + '\nValor salário líquido: ' + dadosUsuario.vl_salarioLiquido.toFixed(2));
    console.log('');
    console.log('--------------------------------------');
    console.log(' By FIlipe Querino e Jadson Oliveria ');
    console.log('');
}
processo(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]));
