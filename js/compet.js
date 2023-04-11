var container = document.getElementById("mynetwork");
var auxD=document.getElementById("tablePrint");
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
          },
          from:{
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
            html:'<h2> Nombre del nodo </h2>' +
            '<input style="width:85%;" id="nome" class="swal2-input">'+
            '<h3> Valor de X </h3>'+
            '<input type="number" style="width:100%;" id="vx" class="swal2-input">'+
            '<h3> Valor de Y </h4>'+
            '<input type="number" style="width:100%;" id="vy" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const nome = Swal.getPopup().querySelector('#nome').value
              const vx = Swal.getPopup().querySelector('#vx').value
              const vy = Swal.getPopup().querySelector('#vy').value
              if (!nome || !vx || !vy) {
                Swal.showValidationMessage(`Por favor ingrese un nombre, el valor de X y el valor de Y`);
              }
              return { nome: nome, vx: vx, vy: vy }
            }
          }).then((result) => {
            var auxid = 0;
            let nombre = result.value.nome;
            let valX = parseInt(result.value.vx);
            let valY = parseInt(result.value.vy);
            nodeData.label=nombre;
            if(nodes.length!=0){
              nodes.forEach((node)=>{
                auxid=node.id;
              });
              auxid++;
            };
            nodeData.valX=valX;
            nodeData.valY=valY;
            nodeData.id=auxid;
            nodeData.title="X: "+valX+"\nY: "+valY;
            nodes.add(nodeData);
            callback(nodeData);
          });
    },
    addEdge: true,
    editNode: function (nodeData,callback) {
        Swal.fire({
            html:'<h2> Nombre del nodo </h2>' +
            '<input style="width:85%;" id="nome" class="swal2-input">'+
            '<h3> Valor de X </h3>'+
            '<input type="number" style="width:100%;" id="vx" class="swal2-input">'+
            '<h3> Valor de Y </h4>'+
            '<input type="number" style="width:100%;" id="vy" class="swal2-input">',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
              const nome = Swal.getPopup().querySelector('#nome').value
              const vx = Swal.getPopup().querySelector('#vx').value
              const vy = Swal.getPopup().querySelector('#vy').value
              if (!nome || !vx || !vy) {
                Swal.showValidationMessage(`Por favor ingrese un nombre, el valor de X y el valor de Y`);
              }
              return { nome: nome, vx: vx, vy: vy }
            }
          }).then((result) => {
            var pid=nodeData.id;
            nodes.forEach((node) => {
              if(pid==node.id){
                var nombre=result.value.nome;
                var valX =parseInt(result.value.vx);
                var valY = parseInt(result.value.vy);
                node.label=nombre;
                node.valX=valX;
                node.valY=valY;
                node.title="X: "+valX+"\nY: "+valY;
                callback(node);
              }
            }) ;
        });
    },
    editEdge: true,
    deleteNode: true,
    deleteEdge: true,     
    },
};

var data = {
    nodes: nodes,
    edges: edges,
};
var network = new vis.Network(container, data, options);

function compet(){
  if(flag==1){
    document.getElementsByTagName("table")[0].remove();
    flag=0;
  } 
  var vecX=[];
  var vecY=[];
  var aux=0;
  nodes.forEach((node)=>{
    vecX.push(node.valX);
    vecY.push(node.valY);
  });
  nodes.forEach((node)=>{
    if(aux==0){
      vecX.push(node.valX);
      vecY.push(node.valY);
    }
    aux++;
  });
  var tam=vecX.length;
  console.log("X");
  console.log(vecX);
  console.log("Y");
  console.log(vecY);
  var auxX=[];
  var auxY=[];
  var c=0;
  while(c<100){
    var aX1=0;
    var aY1=0;
    for(var i=0;i<tam-1;i++){
      var x1=vecX[i];
      var x2=vecX[i+1];
      var y1=vecY[i];
      var y2=vecY[i+1];
      var numX=((x1+x2)/2);
      var numY=((y1+y2)/2);
      auxX[i]=parseFloat(numX.toFixed(2));
      auxY[i]=parseFloat(numY.toFixed(2));
      if(i==0){
        aX1=((x1+x2)/2);
        aY1=((y1+y2)/2);
      }
    }
    auxX[tam-1]=parseFloat(aX1.toFixed(2));
    auxY[tam-1]=parseFloat(aY1.toFixed(2));
   for(var i=0;i<tam;i++){
      vecX[i]=auxX[i];
      vecY[i]=auxY[i];
    }
    console.log("X"+c);
    console.log(vecX);
    console.log("Y"+c);
    console.log(vecY);
    c++;
  }
  var body = document.getElementsByTagName("body")[0];

  var tbl = document.createElement("table");
  var tblHead = document.createElement("thead");
  var tblBody = document.createElement ("tbody");

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode("X");
  cell.appendChild(cellText);
  row.appendChild(cell);

  var cell = document.createElement("td");
  var cellText = document.createTextNode("Y");
  cell.appendChild(cellText);
  row.appendChild(cell);
  tblHead.appendChild(row);

  var row = document.createElement("tr");
  var cell = document.createElement("td");
  var cellText = document.createTextNode(vecX[0]);
  cell.appendChild(cellText);
  row.appendChild(cell);
  var cell = document.createElement("td");
  var cellText = document.createTextNode(vecY[0]);
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

function verificar(vecX,vecY){

  var valX=vecX[0];
  var valY=vecY[0]; 
  var contX=0;
  var contY=0; 
  for(var i=0;vecX.length;i++){
    if(valX==vecX[i])
    {
      contX++;
    }

  }
  for(var i=0;vecY.length;i++){
    if(valY==vecY[i])
    {
      contY++;
    }
  }
  if(contX==vecX.length && contY==vecY.length){
    return true;
  }
  else{
    return false;
  }
}