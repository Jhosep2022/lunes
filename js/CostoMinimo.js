class CostoMinimo extends MatrizCostoFlujo{

    constructor(fila, columna){
        super(fila, columna);
        this.arrayTablaVirtual = [];

        this.simboloEquis = 'x';
        this.simboloGuion = '-';
        this.simboloQueSeaO = 'o';
    }


    resolverCostoMinimo(){
        this.crearTablaVirtual();

        this.limpiarMatrizCostosParaAlistarMatrizDeFlujos();

        console.log("====Antes============");
        console.log(this.matrizFlujo);
        console.log(this.arrayOferta);
        console.log(this.arrayDemanda);

        while (this.noSeTerminoSimboloGuion()) {
            let arrayEncontradoFull = this.encontrarNumeroMenorConTablaVirtual();
            let filaEncontrada = arrayEncontradoFull[0];
            let columnaEncontrada = arrayEncontradoFull[1];

            if (this.arrayOferta[filaEncontrada] > this.arrayDemanda[columnaEncontrada]) {

                this.arrayTablaVirtual[filaEncontrada][columnaEncontrada] = this.simboloEquis;
                this.matrizFlujo[filaEncontrada][columnaEncontrada] = this.arrayDemanda[columnaEncontrada];
                let resta = this.arrayOferta[filaEncontrada] - this.arrayDemanda[columnaEncontrada];
                this.arrayOferta[filaEncontrada] = resta;
                this.ponerEnQueseaOColumna(columnaEncontrada);

            } else if (this.arrayDemanda[columnaEncontrada] > this.arrayOferta[filaEncontrada]) {

                this.arrayTablaVirtual[filaEncontrada][columnaEncontrada] = this.simboloEquis;
                this.matrizFlujo[filaEncontrada][columnaEncontrada] = this.arrayOferta[filaEncontrada];
                let resta = this.arrayDemanda[columnaEncontrada] - this.arrayOferta[filaEncontrada];
                this.arrayDemanda[columnaEncontrada] = resta;
                this.ponerEnQueseaOFila(filaEncontrada);

            } else {
                this.arrayTablaVirtual[filaEncontrada][columnaEncontrada] = this.simboloEquis;
                this.matrizFlujo[filaEncontrada][columnaEncontrada] = this.arrayDemanda[columnaEncontrada];
                let resta = this.arrayDemanda[columnaEncontrada] - this.arrayOferta[filaEncontrada];
                this.arrayDemanda[columnaEncontrada] = resta;
                this.arrayOferta[filaEncontrada] = resta;
                this.ponerEnQueseaOFila(filaEncontrada);
                this.ponerEnQueseaOColumna(columnaEncontrada);

            }

            let resultadoMulti = this.matrizFlujo[filaEncontrada][columnaEncontrada] * this.arrayCostosForzarGuardarDatos[filaEncontrada][columnaEncontrada];
            this.total += resultadoMulti;

            let cadenaCostosIndex = this.arrayCostosForzarGuardarDatos[filaEncontrada][columnaEncontrada];
            let concatVariablesTotal = `[ X(${filaEncontrada + 1},${columnaEncontrada + 1}) = ${this.matrizFlujo[filaEncontrada][columnaEncontrada]} ]  [Costos: ${cadenaCostosIndex}]`;
            this.totalVariables.push(concatVariablesTotal);

        }

        console.log("====Despues============");
        console.log(this.arrayOferta);
        console.log(this.arrayDemanda);
        console.log(this.matrizFlujo);
        console.log(this.arrayTablaVirtual);
    }

    ponerEnQueseaOFila(indiceFilaStatica){
        for (let j = 0; j < this.columnaNormal; j++) {
            if (this.arrayTablaVirtual[indiceFilaStatica][j] !== this.simboloEquis) {
                this.arrayTablaVirtual[indiceFilaStatica][j] = this.simboloQueSeaO;
            }
        }
    }

    ponerEnQueseaOColumna(indiceColumnaEstatica){
        for (let i = 0; i < this.filaNormal; i++) {
            if (this.arrayTablaVirtual[i][indiceColumnaEstatica] !== this.simboloEquis) {
                this.arrayTablaVirtual[i][indiceColumnaEstatica] = this.simboloQueSeaO;
            }
        }

    }

    encontrarNumeroMenorConTablaVirtual() {
        let arrayIndiceFilaColumna = [];

        let indiceFilaEncontrada = 0;
        let indiceColumnaEncontrada = 0;

        let entroAdentro = false;
        // let variableAEcontrarMenor = this.arrayACacularCostos[0][0];
        let variableAEcontrarMenorDerivados = this.obtenerElMenorEnLosGuiones();
        let variableAEcontrarMenor = variableAEcontrarMenorDerivados[2];


        for (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {

                if (this.arrayACacularCostos[i][j] < variableAEcontrarMenor &&
                    this.arrayTablaVirtual[i][j] !== this.simboloQueSeaO &&
                    this.arrayTablaVirtual[i][j] !== this.simboloEquis
                )
                {
                    indiceFilaEncontrada = i;
                    indiceColumnaEncontrada = j;
                    variableAEcontrarMenor = this.arrayACacularCostos[i][j];
                    entroAdentro = true;
                }

            }
        }

        if (entroAdentro) {
            arrayIndiceFilaColumna.push(indiceFilaEncontrada);
            arrayIndiceFilaColumna.push(indiceColumnaEncontrada);

        } else {
            arrayIndiceFilaColumna.push(variableAEcontrarMenorDerivados[0]);
            arrayIndiceFilaColumna.push(variableAEcontrarMenorDerivados[1]);
        }

        // arrayIndiceFilaColumna.push(variableAEcontrarMenor);

        return arrayIndiceFilaColumna;
    }

    obtenerElMenorEnLosGuiones(){
        let valoresDeGuion = [];
        let haEntrado = false;

        for (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                if (this.arrayTablaVirtual[i][j] === '-' && haEntrado === false) {
                    valoresDeGuion.push(i);
                    valoresDeGuion.push(j);
                    valoresDeGuion.push(this.arrayACacularCostos[i][j]);
                    haEntrado = true;
                }
            }
        }

        return valoresDeGuion;
    }

    encontrarNumeroMenorIndiceTablaVirtual(){

    }

    noSeTerminoSimboloGuion(){
        let existeSimboloGuion = false;

        for (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                if (this.arrayTablaVirtual[i][j] === this.simboloGuion) {
                    existeSimboloGuion = true;
                }
            }
        }
        return existeSimboloGuion;
    }


    crearTablaVirtual() {
        this.arrayTablaVirtual = this.crearMatriz(this.filaNormal, this.columnaNormal);

        for (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                this.arrayTablaVirtual[i][j] = this.simboloGuion;
            }
        }
    }

}