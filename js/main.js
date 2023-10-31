var listaurl = new Array();
var idlista = new Array();

const reader = new FileReader();
const formData = new FormData();
let file = null;
const API_URL = "https://api.remove.bg/v1.0/removebg";
const API_KEY = "88LfUScnjUePJEYHTpMNby8b";



$("#gerar").on("click", function(){
    $("#imagens").empty();
    listaurl = $('#lista-url').val().split(/\r?\n/);
    var randLetter = "";
    var uniqid = ""
    listaurl.forEach(function(url){
        randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        uniqid = randLetter + Date.now();
        idlista.push(uniqid);
        geraCanvas(uniqid, url);
    });
});
function geraCanvas(id, url){
    var pathArray = url.split( '/' );
    var host = pathArray[2];
    var site = "";
    if(host === "www.elevagecenter.com.br" || host === "elevagecenter.com.br"){
        site = "ELEVAGE";
    }
    else if(host === "www.propetz.com.br" || host === "propetz.com.br"){
        site = "PROPETZ";
    }
    if( site != ""){
        $("#imagens").load("html/imagem.html").prev("li").attr("id", id + "-POST");
        $("#imagens").load("html/imagem.html").prev("li").attr("id", id + "-STORIES");
        //$("#imagens").load("html/imagem.html").prev("li").attr("id", id + "-STORIES");
        //$("#imagens").append('<li id="' + id + '-POST"><div class="loading"><div class="flex"><div class="child"><progress class="progress is-small is-primary" max="100"></progress></div></div></div></li>');
        //$("#imagens").append('<li id="' + id + '-STORIES"><div class="loading"><div class="flex"><div class="child"><progress class="progress is-small is-primary" max="100"></progress></div></div></div></li>');
        /*$.get('https://api.codetabs.com/v1/proxy?quest=' + url, function(data){
            var dataElement = $(data);
            var nomeProduto = $(".nome-produto-completo h1", dataElement).text().split(" ");
            var imagemProduto = $(".vtex-store-components-3-x-productImageTag", dataElement).attr("src").split("?")[0].slice(0,-8) + "1200-auto";
            
            var palavrasTitulo = 2;

            var nomeSubtitulo = "";
            var nomeTitulo = "";
            for(var i = 0; i < nomeProduto.length - palavrasTitulo; i++) {
                nomeSubtitulo += nomeProduto[i] + " ";
            }
            for(var i = nomeProduto.length - palavrasTitulo; i < nomeProduto.length; i++) {
                nomeTitulo += nomeProduto[i] + " ";
            }

            //TIRA O FUNDO DO PRODUTO
            var produto = new Image();
            produto.onload = function(){
                var canvasDois = document.createElement('canvas');
                canvasDois.width = produto.width;
                canvasDois.height = produto.height;
                var ctxDois = canvasDois.getContext('2d');

                ctxDois.drawImage(produto, 0, 0);
                var imgd = ctxDois.getImageData(0, 0, canvasDois.width, canvasDois.height),
                pix = imgd.data,
                newColor = {r:0,g:0,b:0, a:0};

                var nivelBranco = 220;

                var heightMin = canvasDois.height;
                var heightMax = 0;
                var widthMin = canvasDois.width;
                var widthMax = 0;
                for (var j = 0; j < canvasDois.height; j++){
                    for (var i = j * canvasDois.width * 4; i < (j + 1) * canvasDois.width * 4; i += 4) {
                        var r = pix[i],
                            g = pix[i+1],
                            b = pix[i+2];
                        if(r <= nivelBranco && g <= nivelBranco && b <= nivelBranco){
                            if(j < heightMin){
                                heightMin = j;
                            }
                            else if(j > heightMax){
                                heightMax = j;
                            }
                            if((i - (j * canvasDois.width * 4)) / 4 < widthMin){
                                widthMin = (i - (j * canvasDois.width * 4)) / 4;
                            }
                            else if((i - (j * canvasDois.width * 4)) / 4 > widthMax){
                                widthMax = (i - (j * canvasDois.width * 4)) / 4;
                            }
                        }
                    }
                }

                
                for (var i = 0, n = pix.length; i < n; i += 4) {
                    var r = pix[i],
                            g = pix[i+1],
                            b = pix[i+2];

                        if(r >= nivelBranco && g >= nivelBranco && b >= nivelBranco){ 
                            // Change the white to the new color.
                            pix[i] = newColor.r;
                            pix[i+1] = newColor.g;
                            pix[i+2] = newColor.b;
                            pix[i+3] = newColor.a;
                        }
                }

                ctxDois.putImageData(imgd, 0, 0);
                
                //desenhaCanvas(id, nomeSubtitulo, nomeTitulo, canvasDois, widthMin, widthMax, heightMin, heightMax, site, "POST", "ESCURO");
                //desenhaCanvas(id, nomeSubtitulo, nomeTitulo, canvasDois, widthMin, widthMax, heightMin, heightMax, site, "STORIES", "ESCURO");
                //$(".loading").hide();
            }
            produto.src = imagemProduto + '?' + new Date().getTime();
            produto.setAttribute('crossOrigin', '');
        });*/
    }
    else{
        console.log(host + " não reconhecido");
        return false;
    }
}
function desenhaCanvas(id, nomeSubtitulo, nomeTitulo, imagemProduto, widthMin, widthMax, heightMin, heightMax, site, tipo, cor){
    var width = 1080;
    var height = 1080;
    var corBg = "";
    var margem = 108;
    var corClaro = "#fdfffc";
    var corEscuro = "#272635";
    var corPrincipal = "#00b2a9";
    var corSecundaria = "#283F3B";

    var subtituloSize = 35;
    var subtituloMaxSize = 8;
    var tituloSize = 50;
    var entreLinha = 6;
    var margemTitulo = 5;
    var proporcao = 1;

    var raioCirculo = ((width - (2 * margem)) / 2) / 1.75;
    var distanciaAlturaCirculo = height - raioCirculo - (margem * 2);
    var bordaCirculo = 25;


    if(tipo === "STORIES"){
        height = 1920;
        subtituloSize = 50;
        subtituloMaxSize = 5;
        tituloSize = 80;
        entreLinha = 10;
        margemTitulo = 20;
        raioCirculo = (width - (2 * margem)) / 2;
        distanciaAlturaCirculo = ((height / 3) * 2) - margem
    }

    if(site === "ELEVAGE"){
        corClaro = "#ffffff";
        corEscuro = "#1d1d1b";
        corPrincipal = "#ffa124";
        corSecundaria = "#0099a9";
    }

    $("#" + id + '-' + tipo).append('<canvas width="' + width + '" height="' + height + '"></canvas>');
    
    if(cor === "CLARO"){
        corBg = "-CLARO";
    }
    var canvas = $("#" + id + '-' + tipo + " canvas");
    var ctx = canvas.get(0).getContext("2d");
    var background = new Image();
    background.onload = function(){
        ctx.drawImage(background, 0, 0);
        if(site === "ELEVAGE"){
            //DESENHA O CÍRCULO
            ctx.beginPath();
            ctx.arc(width / 2, distanciaAlturaCirculo, raioCirculo, 0, 2 * Math.PI, false);
            ctx.fillStyle = corClaro;
            ctx.fill();
            ctx.lineWidth = bordaCirculo;
            ctx.strokeStyle = corSecundaria;
            ctx.stroke();

            var palavrasSubtitulo = nomeSubtitulo.split(' ');
            var novoSubtitulo = "";
            for( var i = 0; i < palavrasSubtitulo.length; i++ ){
                if( i % subtituloMaxSize == 0){
                    novoSubtitulo += "\n";
                }
                novoSubtitulo += palavrasSubtitulo[i] + " ";
            }

            var linhas = novoSubtitulo.split("\n");

            var squareHeight = (subtituloSize + tituloSize) + (margemTitulo * 2) + ((linhas.length - 1) * (subtituloSize + entreLinha));

            //DESENHA O RETANGULO DO TITULO
            ctx.beginPath();
            ctx.roundRect(-squareHeight / 2, margem, width + (squareHeight / 2) - margem, squareHeight, squareHeight / 2);
            ctx.fillStyle = corSecundaria;
            ctx.fill();
            //DESENHA O SUBTITULO
            ctx.font = subtituloSize + "px Arial";
            ctx.fillStyle = corClaro;
            ctx.textAlign = "left";
            for (var i = 0; i < linhas.length; i++) {
                ctx.fillText(linhas[i], margem, margem + i * (subtituloSize + margemTitulo));
            }
            //DESENHA O TITULO
            ctx.font = "bold " + tituloSize + "px Arial";
            ctx.fillStyle = corClaro;
            ctx.textAlign = "left";
            ctx.fillText(nomeTitulo, margem, margem + tituloSize + entreLinha + (linhas.length - 1) * (subtituloSize + margemTitulo));

            
            proporcao = (raioCirculo * 2) / (widthMax - widthMin);
            if(widthMax - widthMin > heightMax - heightMin || (heightMax - heightMin) * proporcao > (height / 3) * 2){
                proporcao = (height / 3) * 2 / (heightMax - heightMin);
            }

            //CRIA UMA MÁSCARA NO PRODUTO
            var canvasTres = document.createElement('canvas');
            canvasTres.width = (raioCirculo * 2) - (bordaCirculo / 2);
            canvasTres.height = distanciaAlturaCirculo + raioCirculo - (bordaCirculo / 2);
            var ctxTres = canvasTres.getContext('2d');
            ctxTres.drawImage(imagemProduto, (canvasTres.width - imagemProduto.width * proporcao) / 2, (-imagemProduto.height * proporcao / 2) + distanciaAlturaCirculo, imagemProduto.width * proporcao, imagemProduto.height * proporcao );
            ctxTres.globalCompositeOperation = 'destination-in';
            ctxTres.fillStyle = '#000';
            ctxTres.beginPath();
            ctxTres.roundRect(0, 0, canvasTres.width, canvasTres.height, [0, 0, canvasTres.width / 2, canvasTres.width / 2]);
            ctxTres.fill();
            ctxTres.globalCompositeOperation = 'source-over';

            //DESENHA O PRODUTO

            ctx.drawImage(canvasTres, (width - canvasTres.width) / 2, 0);

            $("#" + id + '-' + tipo + " .loading").hide();


            
        }
    }
    background.src = "img/bg/" + site + "-" + tipo + corBg + ".png";
    
}