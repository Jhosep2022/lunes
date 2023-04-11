class MatrizCostoFlujo {
    constructor(fila, columna){
        this.filaNormal = fila;
        this.columnaNormal = columna;

        this.filaAdicional = fila + 1;
        this.columnaAdicional = columna + 1;

        this.arrayACacularCostos = [];
        this.arrayCostosForzarGuardarDatos = [];

        this.arrayDemanda = [];
        this.arrayOferta = [];

        this.sumaOferta = 0;
        this.sumaDemanda = 0;

        this.arrayParaFicticio = [];

        this.matrizFlujo = [];

        this.totalVariables = [];
        this.total = 0;

    }

    getTodo(){
        console.log(this.filaNormal, this.columnaNormal);
        console.log(this.filaAdicional, this.columnaAdicional);
    }

    getArrayACalcularCostos(){
        return this.arrayACacularCostos
    }

    getArrayCostosForzarGuardarDatos(){
        return this.arrayCostosForzarGuardarDatos;
    }

    getMatrizFlujo(){
        return this.matrizFlujo;
    }

    copyArrayMultidimensional(arrayContenedorCopia, arrayParaCopiar) {

        for (let elems of arrayParaCopiar) {
            arrayContenedorCopia.push(elems.slice());
        }
    }

    guardarArrayCostosParaCalcular(arrayAGuardar){
        this.copyArrayMultidimensional(this.arrayACacularCostos, arrayAGuardar);
        this.copyArrayMultidimensional(this.arrayCostosForzarGuardarDatos, arrayAGuardar);
    }

    apartarArrayDatosOfertaDemandaAparte() {
        let indexStaticoFilaDemanda = this.filaNormal;
        let indexStaticoColumnaOferta = this.columnaNormal;

        console.log("Resultado");
        console.log(indexStaticoFilaDemanda, indexStaticoColumnaOferta);

        for (let j = 0; j < this.columnaNormal; j++) {
            this.arrayDemanda.push(this.arrayACacularCostos[indexStaticoFilaDemanda][j]);
        }

        for (let i = 0; i < this.filaNormal; i++) {
            this.arrayOferta.push(this.arrayACacularCostos[i][indexStaticoColumnaOferta]);
        }
        console.log(this.arrayACacularCostos);

    }

    esSumaIguaOfertaDemanda(){
        this.apartarArrayDatosOfertaDemandaAparte();

        for (let elemento of this.arrayDemanda) {
            this.sumaDemanda += elemento
        }

        for (let elemento of this.arrayOferta) {
            this.sumaOferta += elemento;
        }

        if (this.sumaDemanda === this.sumaOferta) {
            console.log("Suma Oferta = " + this.sumaOferta);
            console.log("Suma Demanda = " + this.sumaDemanda);

            return true;
        }

        return false;
    }

    mensajeDinamicoDeCualEsElMayorOfertaDemanda(){

        if (this.sumaOferta > this.sumaDemanda) {
            return "LA OFERTA ES MAYOR QUE LA DEMANDA";
        } else {
            return "LA DEMANDA ES MAYOR QUE LA OFERTA";
        }
    }


    creandoArrayConDatosFicticiosDerivados(){

        this.copyArrayMultidimensional(this.arrayParaFicticio, this.arrayCostosForzarGuardarDatos);

        if (this.sumaOferta > this.sumaDemanda) {
            let diferneciaSumaAniadir = this.sumaOferta - this.sumaDemanda;
            this.arrayParaFicticio[this.filaNormal].splice(this.columnaNormal, 0, diferneciaSumaAniadir);

            for (let i = 0; i < this.filaNormal; i++) {
                this.arrayParaFicticio[i].splice(this.columnaNormal, 0, 0);
            }
            this.columnaNormal += 1;
            this.columnaAdicional += 1;
        } else {
            let diferneciaSumaAniadir = this.sumaDemanda - this.sumaOferta;

            let arrayCeroParaFicticio = [];
            for (let i = 0; i < this.columnaNormal; i++) {
                arrayCeroParaFicticio.push(0);
            }
            arrayCeroParaFicticio.push(diferneciaSumaAniadir);
            this.arrayParaFicticio.splice(this.filaNormal, 0, arrayCeroParaFicticio.slice());
            this.filaNormal += 1;
            this.filaAdicional += 1;
        }

        // this.arrayACalcularCostos;
        this.arrayACacularCostos = [];
        this.arrayCostosForzarGuardarDatos = [];


        this.copyArrayMultidimensional(this.arrayACacularCostos, this.arrayParaFicticio);
        this.copyArrayMultidimensional(this.arrayCostosForzarGuardarDatos, this.arrayParaFicticio);

        this.flushOfertaDemandaVariabes();
        this.apartarArrayDatosOfertaDemandaAparte();
    }

    limpiarMatrizCostosParaAlistarMatrizDeFlujos(){
        let matrizAlimpiarCostosParaFlujo = [];
        this.copyArrayMultidimensional(matrizAlimpiarCostosParaFlujo, this.arrayACacularCostos);

        for  (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                matrizAlimpiarCostosParaFlujo[i][j] = 0;
            }
        }

        this.copyArrayMultidimensional(this.matrizFlujo, matrizAlimpiarCostosParaFlujo);
        // this.matrizFlujo = matrizAlimpiarCostosParaFlujo.slice();
    }

    calcularResultadoMatrizFlujo(){

    }

    comenzarDibujarTotalesResultadosVariables(elemento) {
        let cadenaConcat = "";
        for (let variables of this.totalVariables) {
            cadenaConcat += `<tr>
                                <td>${variables}</td>
                            </tr>`;
        }
        cadenaConcat += `<tr><td>Total = ${this.total}</td></tr>`;
        elemento.innerHTML = cadenaConcat;
    }


    flushOfertaDemandaVariabes(){
        this.arrayOferta = [];
        this.arrayDemanda = [];
    }

    crearMatriz(filas, columnas) {
        let array = [];

        for (let i = 0; i < filas; i++) {
            array.push(new Array(columnas).slice());
        }
        return array;
    }

}