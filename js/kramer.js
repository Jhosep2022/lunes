var container = document.getElementById("mynetwork");
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var flag=0;

var options = {
  nodes:{
    physics: false,
    color: {
      border: '#113c75',
      background: '#1556aa',
      highlight: {
        border: '#1559b3',
        background: '#113c75'
      },
      hover: {
        border: '#1559b3',
        background: '#113c75'
      }
    },
    font: {
      color: '#ffffff',
    }
  },
  edges:{
        arrows:{
          to:{
             enabled:true
          }
        },
        font: {
          align: 'top'
        }
  },
  physics: {
    stabilization: true,
    barnesHut: {
      springLength: 150,
    },
  },
  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
        Swal.fire({
            html:' Nombre del nodo' +
            '<input style="width:85%;" id="nome" >'+
            ' Seleccione un tipo '+
            '<select style="width:85%;" id="tipo">'+
            '<option value="Origen">Origen</option>'+
            '<option value="Destino">Destino</option></select>'+
            'Disponibilidad / Demanda'+
            '<input style="width:85%;" id="valor">',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const nome = Swal.getPopup().querySelector('#nome').value
              const tipo = Swal.getPopup().querySelector('#tipo').value
              const valor = Swal.getPopup().querySelector('#valor').value
              if (!nome || !tipo || !valor) {
                Swal.showValidationMessage(`Por favor ingrese un nombre y un valor`);
              }
              return { nome: nome, tipo: tipo, valor: valor }
            }
          }).then((result) => {
            var auxid = 0;
            let nombre = result.value.nome;
            let tip = result.value.tipo;
            let val = parseInt(result.value.valor);
            nodeData.posicion="";
            nodeData.label=nombre;
            if(nodes.length!=0){
              nodes.forEach((node)=>{
                auxid=node.id;
              });
              auxid++;
            };
            if(tip=="Destino"){
                nodeData.color={background:'#0e864e',border: '#0e864e'};
                nodeData.title="Demanda: "+val;
            }else{
                nodeData.color={background:'#113c75',border: '#113c75'};
                nodeData.title="Disponibilidad: "+val;
            }
            nodeData.tipo=tip;
            nodeData.valor=val;
            nodeData.id=auxid;
            nodes.add(nodeData);
            callback(nodeData);
          });
    },
    addEdge: function (data, callback) {
        Swal.fire({
            title: "Ingrese un valor",
            input: "text",
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            inputValidator: nombre => {
                if (!nombre) {
                    return "Por favor ingrese un valor";
                } else {
                    return undefined;
                }
            }
        }).then(resultado => {
            if (resultado.value) {
              var val = resultado.value;
              data.label=val;
              data.valor=val;
              edges.add(data);
              callback(data);
            }
        });
    },
    editNode: function (nodeData,callback) {
        Swal.fire({
            html:'<h2> Nombre del nodo </h2>' +
            '<input style="width:85%;" id="nome" class="swal2-input">'+
            '<h3> Seleccione un tipo </h3>'+
            '<select style="width:85%;" id="tipo" class="swal2-input">'+
            '<option value="Origen">Origen</option>'+
            '<option value="Destino">Destino</option></select>'+
            '<h3> Disponibilidad / Demanda </h4>'+
            '<input style="width:85%;" id="valor" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const nome = Swal.getPopup().querySelector('#nome').value
              const tipo = Swal.getPopup().querySelector('#tipo').value
              const valor = Swal.getPopup().querySelector('#valor').value
              if (!nome || !tipo || !valor) {
                Swal.showValidationMessage(`Por favor ingrese un nombre y un valor`);
              }
              return { nome: nome, tipo: tipo, valor: valor }
            }
          }).then((result) => {
            var pid=nodeData.id;
            nodes.forEach((node) => {
              if(pid==node.id){
                var nombre=result.value.nome;
                var tip = result.value.tipo;
                var val = parseInt(result.value.valor);
                node.label=nombre;
                node.tipo=tip;
                node.valor=val;
                if(tip=="Destino"){
                    node.color={background:'#0e864e',border: '#0e864e'};
                    node.title="Demanda: "+val;
                }else{
                    node.color={background:'#113c75',border: '#113c75'};
                    node.title="Disponibilidad: "+val;
                }
                callback(node);
              }
            }) ;
        });
    },
    editEdge: function (data, callback) {
      Swal.fire({
        title: "Ingrese un valor",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: nombre => {
            if (!nombre) {
                return "Por favor ingrese un valor";
            } else {
                return undefined;
            }
        }
    }).then(resultado => {
        if (resultado.value) {
          var eid=data.id;
          var efrom=data.from;
          var eto=data.to;
          edges.forEach((edge) =>{
            if(eid==edge.id){
              edge.from=efrom;
              edge.to=eto;
              var val = resultado.value;
              data.valor=val;
              data.label=val;
              callback(data);
            }
          });
        }
    });
    },
    deleteNode: true,
    deleteEdge: true,     
    },
};

var data = {
    nodes: nodes,
    edges: edges,
};
var network = new vis.Network(container, data, options);
function llenarO(vO){
  var posO=0;
  nodes.forEach((node)=>{
    if(node.tipo=="Origen"){
      nodes.update({id:node.id,posicion:posO});
      posO++;
    }
  });
  nodes.forEach((node)=>{
    if(node.tipo=="Origen"){
      vO.push(node);
    }
  });
}
function llenarD(vD){
  var posD=0;
  nodes.forEach((node)=>{
    if(node.tipo=="Destino"){
      nodes.update({id:node.id,posicion:posD});
      posD++;
    }
  });
  nodes.forEach((node)=>{
    if(node.tipo=="Destino"){
      vD.push(node);
    }
  });
}
function llenarDemanda(vD,vDem){
  vD.forEach((node)=>{
      vDem.push(node.valor);
  });
}
function llenarDisponibilidad(vO,vDisp){
  vO.forEach((node)=>{
      vDisp.push(node.valor);
  });
}
function sumaDemandas(vecDem){
  var sum=0;
  for(var i=0;i<vecDem.length;i++){
    sum=sum+vecDem[i];
  }
  return sum;
}
function sumaDisponibilidades(vecDisp){
  var sum=0;
  for(var i=0;i<vecDisp.length;i++){
    sum=sum+vecDisp[i];
  }
  return sum;
}
function igaualdad(vDem,vDispo){
  var sDem=0;
  var sDisp=0;
  var dif=0;
  for(var i=0;i<vDem.length;i++){
    sDem+=vDem[i];
  }
  for(var i=0;i<vDispo.length;i++){
    sDisp+=vDispo[i];
  }
  if(sDem>sDisp)
  {
    dif=sDem-sDisp;
    vDispo.push(dif);
  }
  if(sDisp>sDem)
  {
    dif=sDisp-sDem;
    vDem.push(dif);
  }
  
}

function llenarMatriz(vecO,vecD,vecDis,vecDem){
  var mat= Array(vecDis.length+1).fill(0).map(() => Array(vecDem.length+1).fill(0));
  edges.forEach((edge) => {
    var ffrom;
    var tto;
    vecO.forEach((a)=>{
      if(edge.from==a.id){
        tto=a.posicion;
      }
    });
    vecD.forEach((a)=>{
      if(edge.to==a.id){
        ffrom=a.posicion;
      }
    });
    mat[parseInt(tto)][parseInt(ffrom)] = parseInt(edge.valor);
  });
  for(var i=0;i<vecDis.length;i++){
    mat[i][vecDem.length]=vecDis[i];
  }
  mat[vecDis.length]=vecDem;
  return mat;
}
function calcularCostos(matOri,matFluj,vecDis,vecDem){
  var tot=0;
  for(var i=0;i<vecDis.length;i++){
    for(var j=0;j<vecDem.length;j++){
      if(matFluj[i][j]>0){
        tot+=(matFluj[i][j]*matOri[i][j]);
      }
    }
  }
  return tot;
}


function minimizar(){
  
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecO=[];
  var vecD=[];
  var vecDis=[];
  var vecDem=[];
  llenarO(vecO);
  llenarD(vecD);
  llenarDisponibilidad(vecO,vecDis);
  llenarDemanda(vecD,vecDem);
  igaualdad(vecDem,vecDis);
  console.log("disponibilidades");
  console.log(vecDis);
  console.log("demandas");
  console.log(vecDem);
  var matriz= llenarMatriz(vecO,vecD,vecDis,vecDem);
  console.log("matriz");
  console.log(matriz);
  var totDem=sumaDemandas(vecDem);
  var totDisp=sumaDisponibilidades(vecDis);
  var tOr=vecO.length;
  let objetoCostoMinimo = new CostoMinimo(vecDis.length,vecDem.length);
  objetoCostoMinimo.guardarArrayCostosParaCalcular(matriz);
  let esIgualSumaOfertaDemanda = objetoCostoMinimo.esSumaIguaOfertaDemanda();

  if (esIgualSumaOfertaDemanda) {
    console.log("Estan balanceados");
  }else{
    console.log("No estan balanceados");
  }
  objetoCostoMinimo.resolverCostoMinimo();
  
  let matrizFlujo = objetoCostoMinimo.getMatrizFlujo();
  console.log("Fluj0s");
  console.log(matrizFlujo);
  let total = calcularCostos(matriz,matrizFlujo,vecDis,vecDem);
  console.log("total");
  console.log(total);
 

  var body = document.getElementById("gggg");

  var tbl = document.createElement("table");
  var tblHead = document.createElement("thead");
  var tblBody = document.createElement ("tbody");

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("");
  cell.appendChild(cellText);
  row.appendChild(cell);

  vecD.forEach((node) => {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(node.label);
      cell.appendChild(cellText);
      row.appendChild(cell);
   }) ;
   if(vecD.length<vecDem.length){
    var cell = document.createElement("td");
    var cellText = document.createTextNode("AUX");
    cell.appendChild(cellText);
    row.appendChild(cell);
   }
   var cell = document.createElement("td");
   var cellText = document.createTextNode("Disp");
   cell.appendChild(cellText);
   row.appendChild(cell);
   tblHead.appendChild(row);

  for (var i =0 ; i<vecDis.length;i++){
    var row = document.createElement("tr");   
    if(i<tOr){
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecO[i].label);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }else{
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Aux");
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

      for (var j=0;j<vecDem.length;j++){
          if(matrizFlujo[i][j]>0){
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matriz[i][j]+" ("+matrizFlujo[i][j]+")");
            cell.className = 'colores';
            cell.style.background = 'red';
            cell.appendChild(cellText);
            row.appendChild(cell);
          }else{
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matriz[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
      }
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecDis[i]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      tblBody.appendChild(row);            
    }
    var row = document.createElement("tr"); 
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Demanda");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    for (var j=0;j<vecDem.length;j++){
          
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecDem[j]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    var cell = document.createElement("td");
    var cellText = document.createTextNode(totDem+"/"+totDisp);
    cell.className = 'suma';
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);
    
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Minimo :");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode(total);
    cell.appendChild(cellText);
    row.appendChild(cell);
    for(var i=0;i<vecDem.length;i++){
      
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      
    }
    tblBody.appendChild(row);   

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    flag=1;
}
function calcularMayor(matriz,vecDem,vecDis){
  var nueva= Array(vecDis.length+1).fill(0).map(() => Array(vecDem.length+1).fill(0));
  var may=matriz[0][0];
  for(var i=0;i<vecDis.length;i++){
    for(var j=0;j<vecDem.length;j++){
        if(may<matriz[i][j]){
          may=matriz[i][j];
        }
    }
  }
  for(var i=0;i<vecDis.length;i++){
    for(var j=0;j<vecDem.length;j++){
      let valu =matriz[i][j];
       nueva[i][j]=may-valu;
    }
  }
  for(var i=0;i<vecDis.length;i++){
    nueva[i][vecDem.length]=vecDis[i];
  }
  nueva[vecDis.length]=vecDem;
  return nueva;
}
function calcularCostos(matOri,matFluj,vecDis,vecDem){
  var tot=0;
  for(var i=0;i<vecDis.length;i++){
    for(var j=0;j<vecDem.length;j++){
      if(matFluj[i][j]>0){
        let vla=matFluj[i][j]*matOri[i][j];
        tot+=vla;
      }
    }
  }
  return tot;
}
function maximizar(){
  
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecO=[];
  var vecD=[];
  var vecDis=[];
  var vecDem=[];
  llenarO(vecO);
  llenarD(vecD);
  llenarDisponibilidad(vecO,vecDis);
  llenarDemanda(vecD,vecDem);
  igaualdad(vecDem,vecDis);
  console.log("disponibilidades");
  console.log(vecDis);
  console.log("demandas");
  console.log(vecDem);
  var matriz= llenarMatriz(vecO,vecD,vecDis,vecDem);
  console.log("matriz");
  console.log(matriz);
  var mayor = calcularMayor(matriz,vecDem,vecDis);
  console.log("Sin Mayor");
  console.log(mayor);
  var totDem=sumaDemandas(vecDem);
  var totDisp=sumaDisponibilidades(vecDis);
  var tOr=vecO.length;
  let objetoCostoMinimo = new CostoMinimo(vecDis.length,vecDem.length);
  objetoCostoMinimo.guardarArrayCostosParaCalcular(mayor);
  let esIgualSumaOfertaDemanda = objetoCostoMinimo.esSumaIguaOfertaDemanda();

  if (esIgualSumaOfertaDemanda) {
    console.log("Estan balanceados");
  }else{
    console.log("No estan balanceados");
  }
  objetoCostoMinimo.resolverCostoMinimo();
  
  let matrizFlujo = objetoCostoMinimo.getMatrizFlujo();
  console.log("Fluj0s");
  console.log(matrizFlujo);
  let total = calcularCostos(matriz,matrizFlujo,vecDis,vecDem);
  console.log("total");
  console.log(total);
 

  var body = document.getElementById("ggg");

  var tbl = document.createElement("table");
  var tblHead = document.createElement("thead");
  var tblBody = document.createElement ("tbody");

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("");
  cell.appendChild(cellText);
  row.appendChild(cell);

  vecD.forEach((node) => {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(node.label);
      cell.appendChild(cellText);
      row.appendChild(cell);
   }) ;
   if(vecD.length<vecDem.length){
    var cell = document.createElement("td");
    var cellText = document.createTextNode("AUX");
    cell.appendChild(cellText);
    row.appendChild(cell);
   }
   var cell = document.createElement("td");
   var cellText = document.createTextNode("Disp");
   cell.appendChild(cellText);
   row.appendChild(cell);
   tblHead.appendChild(row);

  for (var i =0 ; i<vecDis.length;i++){
    var row = document.createElement("tr");   
    if(i<tOr){
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecO[i].label);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }else{
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Aux");
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

      for (var j=0;j<vecDem.length;j++){
          if(matrizFlujo[i][j]>0){
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matriz[i][j]+" ("+matrizFlujo[i][j]+")");
            cell.className = 'colores';
            cell.style.background = 'red';
            cell.appendChild(cellText);
            row.appendChild(cell);
          }else{
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matriz[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
      }
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecDis[i]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      tblBody.appendChild(row);            
    }
    var row = document.createElement("tr"); 
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Demanda");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    for (var j=0;j<vecDem.length;j++){
          
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecDem[j]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    var cell = document.createElement("td");
    var cellText = document.createTextNode(totDem+"/"+totDisp);
    cell.className = 'suma';
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);
    
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Maximo :");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    var cell = document.createElement("td");
    var cellText = document.createTextNode(total);
    cell.appendChild(cellText);
    row.appendChild(cell);
    for(var i=0;i<vecDem.length;i++){
      
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      
    }
    tblBody.appendChild(row);   

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    flag=1;
}
function llenarTabla(){
  
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecO=[];
  var vecD=[];
  var vecDis=[];
  var vecDem=[];
  llenarO(vecO);
  llenarD(vecD);
  llenarDisponibilidad(vecO,vecDis);
  llenarDemanda(vecD,vecDem);
  igaualdad(vecDem,vecDis);
 
  var matriz= llenarMatriz(vecO,vecD,vecDis,vecDem);

  var tOr=vecO.length;
  var totDem=sumaDemandas(vecDem);
  var totDisp=sumaDisponibilidades(vecDis);

  var body = document.getElementsByTagName("body")[0];

  var tbl = document.createElement("table");
  var tblHead = document.createElement("thead");
  var tblBody = document.createElement ("tbody");

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("");
  cell.appendChild(cellText);
  row.appendChild(cell);

  vecD.forEach((node) => {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(node.label);
      cell.appendChild(cellText);
      row.appendChild(cell);
   }) ;
   if(vecD.length<vecDem.length){
    var cell = document.createElement("td");
    var cellText = document.createTextNode("AUX");
    cell.appendChild(cellText);
    row.appendChild(cell);
   }
  var cell = document.createElement("td");
  var cellText = document.createTextNode("Disp");
  cell.appendChild(cellText);
  row.appendChild(cell);
  tblHead.appendChild(row);


   for (var i =0 ; i<vecDis.length;i++){
    var row = document.createElement("tr");   
    if(i<tOr){
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecO[i].label);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }else{
      var cell = document.createElement("td");
      var cellText = document.createTextNode("AUX");
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
      for (var j=0;j<vecDem.length;j++){
          
          var cell = document.createElement("td");
          var cellText = document.createTextNode(matriz[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
      }
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecDis[i]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      tblBody.appendChild(row);            
    } 
    var row = document.createElement("tr"); 
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Demanda");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    for (var j=0;j<vecDem.length;j++){
          
      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecDem[j]);
      cell.className = 'suma';
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    var cell = document.createElement("td");
    var cellText = document.createTextNode(totDem+"/"+totDisp);
    cell.className = 'suma';
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    flag=1;
}