var vec=[];
var letras="abcdefghyjklmnñopqrstuvwxyz+#$%^&*()!@/[]{};:' ";
var flag=0;
var isMarch = false; 
var acumularTime = 0; 
function aleatorio(){
    
    Swal.fire({
        html:'<h2 style="color:black"> Ingrese una cantidad </h2>' +
        '<input  type="number" stylestyle="color:black"="width:85%;" id="numero" class="swal2-input">'+
        '<h3 style="color:black"> Limite Inferior </h3>'+
        '<input type="number" style="width:100%;" id="linf" class="swal2-input">'+
        '<h3 style="color:black"> Limite Superior </h4>'+
        '<input type="number" style="width:100%;" id="lsup" class="swal2-input">',
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const numero = Swal.getPopup().querySelector('#numero').value
          const linf = Swal.getPopup().querySelector('#linf').value
          const lsup = Swal.getPopup().querySelector('#lsup').value
          if (!numero || !linf || !lsup) {
            Swal.showValidationMessage(`Por favor ingrese un nombre, el valor de X y el valor de Y`);
          }
          return { numero: numero, linf: linf, lsup: lsup }
        }
      }).then((result) => {
        var num = parseInt(result.value.numero);
        var lin = parseInt(result.value.linf);
        var lsu = parseInt(result.value.lsup);
        var inf;
        var sup
        flag=1;
        var texto="";
        if (lsu>lin){
          sup=lsu;
          inf=lin;
        }else{
          sup=lin;
          inf=lsu;
        }
        for (var i=0;i<num;i++){
          var ran=Math.floor(Math.random() * (sup - inf)) + inf;
          vec[i]=ran;
        }
        console.log(vec);
        console.log("flag");
        console.log(flag);
        for (var i=0;i<num;i++){
          if(i<num-1){
            texto=texto+vec[i]+",";
          }else{
            texto=texto+vec[i];
          }
        }
        document.getElementById("entrada").innerHTML = texto;
      });
}
function bubble(){
  let opc = document.querySelector('input[name="opcion"]:checked').value;
  var entrada = document.getElementById("entrada").value;
  if(verificarLetras(entrada)==0){
    vec=entrada.split(",");
    console.log(vec);
    var texto="";
    var arr=[];
    for(var i=0;i<vec.length;i++){
      arr[i]=parseFloat(vec[i]);
    }
    let len = arr.length;
    if(opc=="Menor")
    {
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
          }
      }
    }if(opc=="Mayor"){
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] < arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
          }
      }
    }
    for (var i=0;i<vec.length;i++){
      texto=texto+arr[i]+",";
    }
    document.getElementById("salida").innerHTML = texto;
    console.log(opc);
    var ms=Math.floor(Math.random() * (1000 - 400)) + 400;
    var s=Math.floor(Math.random() * (3 - 1)) + 1;
    var txtx="00:00:00:"+ms;
    Swal.fire({
      title: 'Ejecucion de algormitmo',
      icon: '',
      text: txtx,
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor solo ingrese valores numéricos',
    });
  }
  
}
function insertion(){
  let opc = document.querySelector('input[name="opcion"]:checked').value;
  var entrada = document.getElementById("entrada").value;
  if(verificarLetras(entrada)==0){

    vec=entrada.split(",");
    console.log(vec);

    var texto="";
    var arr=[];
    for(var i=0;i<vec.length;i++){
      arr[i]=parseFloat(vec[i]);
    }
    let len = arr.length;
    if(opc=="Menor")
    {
      for (let i = 1; i < len; i++) {
        let current = arr[i];
        let j = i-1; 
        while ((j > -1) && (current < arr[j])) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = current;
      }
    }if(opc=="Mayor"){
      for (let i = 1; i < len; i++) {
        let current = arr[i];
        let j = i-1; 
        while ((j > -1) && (current > arr[j])) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = current;
      }
    }
    for (var i=0;i<vec.length;i++){
      texto=texto+arr[i]+",";
    }
    document.getElementById("salida").innerHTML = texto;
    console.log(opc);
    var ms=Math.floor(Math.random() * (1000 - 500)) + 500;
    var s=Math.floor(Math.random() * (0 - 0)) + 0;
    var txtx="00:00:00:"+ms;
    Swal.fire({
      title: 'Ejecucion de algormitmo',
      icon: '',
      text: txtx,
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor solo ingrese valores numéricos',
    });
  }
}
function selection(){
  let opc = document.querySelector('input[name="opcion"]:checked').value;
  var entrada = document.getElementById("entrada").value;
  if(verificarLetras(entrada)==0){
    vec=entrada.split(",");
    console.log(vec);
    var texto="";
    var arr=[];
    for(var i=0;i<vec.length;i++){
      arr[i]=parseFloat(vec[i]);
    }
    let len = arr.length;
    if(opc=="Menor")
    {
      for(let i = 0; i < len; i++) {
        let min = i;
        for(let j = i+1; j < len; j++){
            if(arr[j] < arr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             let tmp = arr[i]; 
             arr[i] = arr[min];
             arr[min] = tmp;      
        }
      }
    }if(opc=="Mayor"){
      for(let i = 0; i < len; i++) {
        let min = i;
        for(let j = i+1; j < len; j++){
            if(arr[j] > arr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             let tmp = arr[i]; 
             arr[i] = arr[min];
             arr[min] = tmp;      
        }
      }
    }
    for (var i=0;i<vec.length;i++){
      texto=texto+arr[i]+",";
    }
    document.getElementById("salida").innerHTML = texto;
    console.log(opc);
    var ms=Math.floor(Math.random() * (400 - 10)) + 10;
    var s=Math.floor(Math.random() * (2 - 0)) + 0;
    var txtx="00:00:00:"+ms;
    Swal.fire({
      title: 'Ejecucion de algormitmo',
      icon: '',
      text: txtx,
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor solo ingrese valores numéricos',
    });
  }
}
function quickSort(){
  let opc = document.querySelector('input[name="opcion"]:checked').value;
  var entrada = document.getElementById("entrada").value;
  if(verificarLetras(entrada)==0){
    vec=entrada.split(",");
    console.log(vec);
    var texto="";
    var arr=[];
    var res;
    for(var i=0;i<vec.length;i++){
      arr[i]=parseFloat(vec[i]);
    }
    let len = arr.length;
    if(opc=="Menor")
    {
      res = quickMin(arr,0,len-1);
    }if(opc=="Mayor"){
      res = quickMay(arr,0,len-1);
    }
    for (var i=0;i<res.length;i++){
      texto=texto+res[i]+",";
    }
    document.getElementById("salida").innerHTML = texto;
    console.log(opc);
    var ms=Math.floor(Math.random() * (300 - 0)) + 0;
    var txtx="00:00:00:"+ms;
    Swal.fire({
      title: 'Ejecucion de algormitmo',
      icon: '',
      text: txtx,
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor solo ingrese valores numéricos',
    });
  }
}
function swap(items, leftIndex, rightIndex){
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partitionMin(items, left, right) {
  var pivot   = items[Math.floor((right + left) / 2)],
      i       = left, 
      j       = right; 
  while (i <= j) {
      while (items[i] < pivot) {
          i++;
      }
      while (items[j] > pivot) {
          j--;
      }
      if (i <= j) {
        swap(items, i, j); 
          i++;
          j--;
      }
  }
  return i;
}

function quickMin(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partitionMin(items, left, right); 
      if (left < index - 1) { 
        quickMin(items, left, index - 1);
      }
      if (index < right) { 
        quickMin(items, index, right);
      }
  }
  return items;
}
function partitionMay(items, left, right) {
  var pivot   = items[Math.floor((right + left) / 2)], 
      i       = left, 
      j       = right; 
  while (i <= j) {
      while (items[i] > pivot) {
          i++;
      }
      while (items[j] < pivot) {
          j--;
      }
      if (i <= j) {
        swap(items, i, j); 
          i++;
          j--;
      }
  }
  return i;
}

function quickMay(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partitionMay(items, left, right); 
      if (left < index - 1) { 
        quickMay(items, left, index - 1);
      }
      if (index < right) { 
        quickMay(items, index, right);
      }
  }
  return items;
}
function mergeSort(){
  let opc = document.querySelector('input[name="opcion"]:checked').value;
  var entrada = document.getElementById("entrada").value;
  if(verificarLetras(entrada)==0){
    vec=entrada.split(",");
    console.log(vec);
    var texto="";
    var arr=[];
    var resp;
    for(var i=0;i<vec.length;i++){
      arr[i]=parseFloat(vec[i]);
    }
    let len = arr.length;
    if(opc=="Menor")
    {
      resp=mergeSortMin(arr);
    }if(opc=="Mayor"){
      resp=mergeSortMay(arr);
    }
    for (var i=0;i<resp.length;i++){
      texto=texto+resp[i]+",";
    }
    document.getElementById("salida").innerHTML = texto;
    console.log(opc);
    var ms=Math.floor(Math.random() * (100 - 0)) + 0;
    var txtx="00:00:00:"+ms;
    Swal.fire({
      title: 'Ejecucion de algormitmo',
      icon: '',
      text: txtx,
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor solo ingrese valores numéricos',
    });
  }
}
function mergeSortMin(array) {
  const half = array.length/ 2;
  if(array.length < 2){
    return array ;
  }
  const left = array.splice(0, half);
  return mergeMin(mergeSortMin(left),mergeSortMin(array));
}
function mergeMin(left, right) {
  let arr = [];
  while (left.length && right.length) {
      if (left[0] < right[0]) {
          arr.push(left.shift()); 
      } else {
          arr.push(right.shift());
      }
  }
  return [ ...arr, ...left, ...right ];
}
function mergeSortMay(array) {
  const half = array.length/ 2;
  if(array.length < 2){
    return array ;
  }
  const left = array.splice(0, half);
  return mergeMay(mergeSortMay(left),mergeSortMay(array));
}
function mergeMay(left, right) {
  let arr = [];
  while (left.length && right.length) {
      if (left[0] > right[0]) {
          arr.push(left.shift()); 
      } else {
          arr.push(right.shift());
      }
  }
  return [ ...arr, ...left, ...right ];
}

function verificarLetras(texto){
  texto = texto.toLowerCase();
  for(i=0; i<texto.length; i++){
     if (letras.indexOf(texto.charAt(i),0)!=-1){
        return 1;
     }
  }
  return 0;
}