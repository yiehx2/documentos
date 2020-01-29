function search(){
    var cpf = document.getElementById('inputCPF').value;
    console.log(cpf);
    validation(cpf);
}
function validation(cpfvalue){   
    var storage = firebase.storage();
    storage.ref().child(cpfvalue).listAll().then(function(todosArquivos){
        console.log(todosArquivos.items);
        
        if(todosArquivos.items.length >= 1){
            listFiles(cpfvalue);
            next(cpfvalue);

        } else {
            alert('CPF não encontrado');
        }

    }).catch(function(error){
        console.log('ERRO',error);
    });

}

function listFiles(cpfvalue){
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfvalue;
    var storage = firebase.storage();
    var arquivos;
    var nomeArquivos = [];
    var  linksArquivos = [];        
    storage.ref().child(cpfvalue).listAll().then(function(todosArquivos){
        arquivos = todosArquivos.items;
    
    for(let i=0; i<arquivos.length ;i++){
        nomeArquivos.push(arquivos[i].name);

        storage.ref(cpfvalue+'/'+nomeArquivos[i]).getDownloadURL().then(function(url){
            var ul = document.getElementById("list");
            var li = document.createElement("li");
            var listItem = '<a href=" '+linksArquivos[i]+'"  target="_blank">'+nomeArquivos[i]+'...</a>';
            li.innerHTML = listItem;
            ul.appendChild(li);
         
           linksArquivos.push(url);
        
        }).catch(function(error){
            console.log(error);
        })
      }
    });
    
}


function next(cpfvalue){
    document.getElementById('busca').setAttribute("class","ocultar");
    document.getElementById('resultado').removeAttribute("class","ocultar");
    

}

function back(){

    document.getElementById('busca').removeAttribute("class","ocultar");
    document.getElementById('resultado').setAttribute("class","ocultar");
    document.getElementById('inputCPF').value = '';




}
