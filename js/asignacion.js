var container = document.getElementById("mynetwork");
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var flag=0;

var options = {
  nodes:{
    physics: false,
    color: {
      border: 'white',
      background: 'rgba(255, 226, 132, 0.877)',
      highlight: {
        border: 'white',
        background: '#113c75'
      },
      hover: {
        border: 'white',
        background: 'rgba(255, 280, 132, 0.877);'
      }
    },
    font: {
      color: 'black',
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
    
    barnesHut: {
      springLength: 50,
    },
  },
  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
        Swal.fire({
            html:' Nombre del nodo ' +
            '<input id="nome" style="width:85%;"  >'+
            ' Seleccione un tipo '+
            '<select  id="tipo"  style="width:85%;" >'+
            '<option value="Origen">Origen</option>'+
            '<option value="Destino">Destino</option></select>',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const nome = Swal.getPopup().querySelector('#nome').value
              const tipo = Swal.getPopup().querySelector('#tipo').value
              if (!nome || !tipo) {
                Swal.showValidationMessage(`Por favor ingrese un nombre`);
              }
              return { nome: nome, tipo: tipo }
            }
          }).then((result) => {
            var auxid = 0;
            let nombre = result.value.nome;
            let tip = result.value.tipo;
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
            }else{
                nodeData.color={background:'rgba(255, 226, 132, 0.877)',border: 'white'};
            }
            nodeData.tipo=tip;
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
            '<option value="Destino">Destino</option></select>',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const nome = Swal.getPopup().querySelector('#nome').value
              const tipo = Swal.getPopup().querySelector('#tipo').value
              if (!nome || !tipo) {
                Swal.showValidationMessage(`Por favor ingrese un nombre`);
              }
              return { nome: nome, tipo: tipo }
            }
          }).then((result) => {
            var pid=nodeData.id;
            nodes.forEach((node) => {
              if(pid==node.id){
                var nombre=result.value.nome;
                var tip = result.value.tipo;
                node.label=nombre;
                node.tipo=tip;
                if(tip=="Destino"){
                    node.color={background:'#0e864e',border: '#0e864e'};
                }else{
                    node.color={background:'#113c75',border: '#113c75'};
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

function minimizar(){
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecO=[];
  var vecD=[];
  llenarO(vecO);
  llenarD(vecD);
  var tam=tamanio(vecO,vecD);
  var colores = Array(tam).fill(0).map(() => Array(tam).fill(0));
  var matrix = llenarMatriz(vecO,vecD,tam);
  var m = new Munkres();
  var indices = m.compute(matrix);
  var total = 0;
  for (var i = 0; i < indices.length; ++i) {
      var row = indices[i][0], col = indices[i][1];
      var value = matrix[row][col];
      total += value;
      colores[row][col]=1;
   }
  
  console.log('total cost:', total);
  console.log('colores', colores);
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
   
   tblHead.appendChild(row);

   for (var i =0 ; i<vecO.length;i++){
      var row = document.createElement("tr"); 

      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecO[i].label);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);

      for (var j=0;j<vecD.length;j++){
          if(colores[i][j]==1){
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matrix[i][j]);
            cell.className = 'colores';
            cell.style.background = 'red';
            cell.appendChild(cellText);
            row.appendChild(cell);
          }else{
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matrix[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
      }
      
      tblBody.appendChild(row);            
    } 
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode("Minimo:");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    for(var i=0;i<vecD.length;i++){
      if(i==0){
        var cell = document.createElement("td");
        var cellText = document.createTextNode(total);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }else{
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    }
    tblBody.appendChild(row);   

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    flag=1;
}
function maximizar(){
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecO=[];
  var vecD=[];
  llenarO(vecO);
  llenarD(vecD);
  var tam=tamanio(vecO,vecD);
  var colores = Array(tam).fill(0).map(() => Array(tam).fill(0));
  var matriz = llenarMatriz(vecO,vecD,tam);
  var matrix = mayor(matriz,tam);
  var m = new Munkres();
  var indices = m.compute(matrix);
  var total = 0;
  for (var i = 0; i < indices.length; ++i) {
      var row = indices[i][0], col = indices[i][1];
      var value = matriz[row][col];
      total += value;
      colores[row][col]=1;
   }
  
  console.log('total cost:', total);
  console.log('colores', colores);
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
   
   tblHead.appendChild(row);

   for (var i =0 ; i<vecO.length;i++){
      var row = document.createElement("tr"); 

      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecO[i].label);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);

      for (var j=0;j<vecD.length;j++){
          if(colores[i][j]==1){
            var cell = document.createElement("td");
            var cellText = document.createTextNode(matriz[i][j]);
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
      
      tblBody.appendChild(row);            
    } 
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode("maximo :");
    cell.className = 'columna';
    cell.appendChild(cellText);
    row.appendChild(cell);
    for(var i=0;i<vecD.length;i++){
      if(i==0){
        var cell = document.createElement("td");
        var cellText = document.createTextNode(total);
        
        cell.appendChild(cellText);
        row.appendChild(cell);
      }else{
        var cell = document.createElement("td");

        var cellText = document.createTextNode("");
        
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
    }
    tblBody.appendChild(row);   

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    flag=1;
}
function mayor(mat,tam){
  var res=Array(tam).fill(0).map(() => Array(tam).fill(0));;
  var may=0;
  may=mat[0][0];
  for(var i=0;i<tam;i++)
  {
    for(var j=0;j<tam;j++){
        if(may<mat[i][j]){
          may=mat[i][j];
        }
    }
  }
  for(var i=0;i<tam;i++)
  {
    for(var j=0;j<tam;j++){
      var aux=mat[i][j];
      res[i][j]=may-aux;
    }
  }
  return res;
}

function matMinimizada(vO,vD,tam){
  var mat = llenarMatriz(vO,vD,tam);
  var matF=minFila(mat,tam);
  console.log("MINIMIZADA FILA");
  console.log(matF);
  var matC=minCol(matF,tam);
  console.log("MINIMIZADA COLUMNA");
  console.log(matC);
}
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
function tamanio(vO,vD){
  if(vO.length>=vD.length){
    tam=vO.length;
  }else{
    tam=vD.length;
  }
  return tam;
}

function llenarMatriz(vecO,vecD,tam){
  var mat= Array(tam).fill(0).map(() => Array(tam).fill(0));
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
  console.log("Matriz");
  console.log(mat);
  return mat;
}
function minFila(mat,tam){
  var res=Array(tam).fill(0).map(() => Array(tam).fill(0));;
  var min=0;
  var vmin=[];
  for(var i=0;i<tam;i++)
  {
    min=mat[i][0];
    for(var j=0;j<tam;j++){
        if(min>mat[i][j]){
          min=mat[i][j];
        }
    }
    vmin[i]=min;
  }
  for(var i=0;i<tam;i++)
  {
    for(var j=0;j<tam;j++){
      var aux=mat[i][j];
      res[i][j]=aux-vmin[i];
    }
  }
  return res;
}
function minCol(mat,tam){
  var res=Array(tam).fill(0).map(() => Array(tam).fill(0));;
  var min=0;
  var vmin=[];
  for(var i=0;i<tam;i++)
  {
    min=mat[0][i];
    for(var j=0;j<tam;j++){
        if(min>mat[j][i]){
          min=mat[j][i];
        }
    }
    vmin[i]=min;
  }
  for(var i=0;i<tam;i++)
  {
    for(var j=0;j<tam;j++){
      var aux=mat[j][i];
      res[j][i]=aux-vmin[i];
    }
  }
  return res;
}



function llenarTabla(){
  
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecO=[];
  var vecD=[];
  llenarO(vecO);
  llenarD(vecD);
  var tam=tamanio(vecO,vecD);
  var matriz= llenarMatriz(vecO,vecD,tam);

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
   
   tblHead.appendChild(row);

   for (var i =0 ; i<vecO.length;i++){
      var row = document.createElement("tr"); 

      var cell = document.createElement("td");
      var cellText = document.createTextNode(vecO[i].label);
      cell.className = 'columna';
      cell.appendChild(cellText);
      row.appendChild(cell);

      for (var j=0;j<vecD.length;j++){
          
          var cell = document.createElement("td");
          var cellText = document.createTextNode(matriz[i][j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
      }
      
      tblBody.appendChild(row);            
    } 
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    flag=1;
}