// ==UserScript==
// @name        Muquirana Dilmificator
// @namespace   Dirk-BR
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @match       https://muquiranas.com/*/
// @version     beta 0.3
// @author      Dirk
// @description 
// Troca o conteúdo de comentários de uma base de usuários por frases aleatórias da Dilma. 
// Sabe aquele usuário que te irrita? 
// Agora você pode se divertir enquanto (não) lê as mensagens dele!
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

// inicialização
const DILMES = ["Se hoje é o dia das crianças... Ontem eu disse: o dia da criança é o dia da mãe, dos pais, das professoras, mas também é o dia dos animais, sempre que você olha uma criança, há sempre uma figura oculta, que é um cachorro atrás. O que é algo muito importante!",
                "A população ela precisa da Zona Franca de Manaus, porque na Zona franca de Manaus, não é uma zona de exportação, é uma zona para o Brasil. Portanto ela tem um objetivo, ela evita o desmatamento, que é altamente lucravito. Derrubar arvores da natureza é muito lucrativo!",
                "Primeiro eu queria cumprimentar os internautas. -Oi Internautas! Depois dizer que o meio ambiente é sem dúvida nenhuma uma ameaça ao desenvolvimento sustentável. E isso significa que é uma ameaça pro futuro do nosso planeta e dos nossos países. O desemprego beira 20%, ou seja, 1 em cada 4 portugueses.",
                "Eu dou dinheiro pra minha filha. Eu dou dinheiro pra ela viajar, então é... é... Já vivi muito sem dinheiro, já vivi muito com dinheiro. -Jornalista: Coloca esse dinheiro na poupança que a senhora ganha R$10 mil por mês. -Dilma: O que que é R$10 mil?",
                "A única área que eu acho, que vai exigir muita atenção nossa, e aí eu já aventei a hipótese de até criar um ministério. É na área de... Na área... Eu diria assim, como uma espécie de analogia com o que acontece na área agrícola.",
                "Quero dizer para vocês que, de fato, Roraima é a capital mais distante de Brasília, mas eu garanto para vocês que essa distância, para nós do Governo Federal, só existe no mapa. E aí eu me considero hoje uma roraimada, roraimada, no que prova que eu estou bem perto de vocês.",
                "Eu acredito que nós teremos uns Jogos Olímpicos que vai ter uma qualidade totalmente diferente e que vai ser capaz de deixar um legado tanto… porque geralmente as pessoas pensam: 'Ah, o legado é só depois'. Não, vai deixar um legado antes, durante e depois.",
                "Foi muito, houve uma procura imensa, tinham seis empresas que apresentaram suas propostas, houve um deságio de quase… Foi um pouco mais de 38%, mas eu fico em 38% para ninguém dizer: 'Ah, ela disse que era 38′, mas não é não. É 39, 38 e qualquer coisa ou é 36. 38, eu acho que é 39, mas vou dizer 38.",
                "Não, querido, eu acho que o meu mandato é, eu diria assim, mais firme do que essa rede. Agora, a rede, eu acho que ela tem um lado lúdico, sabe? Porque isso que as crianças gostam tanto no pavilhão. Porque, quando você está lá em cima… Eu não posso ficar aqui brincando, não é? Então… Mas você percebe direitinho como é que dá para brincar, porque se você inclinar para um lado e, imediatamente, virar para o outro, você fica balançando mesmo, você consegue equilibrar.",
                "A tocha olímpica, sem dúvida, é muito bonita, ela é verdadeiramente fantástica. Aquelas cores, o Nuzman estava me explicando, porque isso é um protótipo, elas mudam. As cores internas mudam. E também que a tocha se move. Então, eu digo, diante da tocha, com uma insistência que o Galileu disse diante da inquisição: 'E pur si muove!'' Ou seja, 'E apesar de tudo se move!''. E eu considero, Nuzman, que você tem toda a razão.",
                "E tem uma, tem uma pintura dela que eu acho genial, é… como é que é? Natureza Morta… Ai, eu tinha de lembrar a palavra. Natureza Morta… é uma contradição em termos: de que que é o quadro? É uma natureza morta? Rodando, você entendeu? É o stand still a Natureza Morta, aí a Remedios Varo vai lá e faz… ela bota uma mesa e os componentes da natureza morta estão girando. O nome é interessantíssimo. O nome tem uma certa, uma certa ironia.",
                "Já que eu falei de transporte eu vou falar, ao mesmo tempo, do aeroporto. O aeroporto que é uma outra forma de transporte. Aliás, outra infraestrutura, me desculpe, outra infraestrutura de transporte, para uma outra forma que é a forma dos aviões que são essenciais nesse país continental.",
                "E aqui nós temos uma, como também os índios e os indígenas americanos têm a dele, nós temos a mandioca. E aqui nós estamos comungando a mandioca com o milho. E, certamente, nós teremos uma série de outros produtos que foram essenciais para o desenvolvimento de toda a civilização humana ao longo dos séculos. Então, aqui, hoje, eu estou saudando a mandioca. Acho uma das maiores conquistas do Brasil.",
                "Acho uma das maiores conquistas do Brasil. (...) Eu acho que a importância da bola é justamente essa, o símbolo da capacidade que nos distingue como... Nós somos do gênero humano, da espécie Sapiens. Então, para mim essa bola é um símbolo da nossa evolução. Quando nós criamos uma bola dessas, nós nos transformamos em Homo sapiens ou 'mulheres sapiens'.",
                "Porque o que que é uma ponte? Uma ponte é, geralmente, e é algo que nós devemos nos inspirar, porque uma ponte é um símbolo muito forte. Pensem comigo, uma ponte, ela une, uma ponte fortalece, uma ponte junta energia, uma ponte permite que você supere obstáculos. O que nós queremos no Brasil, é que, entre nós, se construam pontes.",
                "Não vamos colocar meta. Vamos deixar a meta aberta, mas, quando atingirmos a meta, vamos dobrar a meta."            
               ];

const TAMDILMES = DILMES.length;

console.log("Tá workando!");

var malas;


(async function() {
  let malas = JSON.parse(await GM.getValue("malas", "[]"));


  
function dilmificator() {
$('.comment-body').each(function(i){
  if(malas.indexOf($(this).find('.fn').text())>-1){
    $(this).find('.fn').text($(this).find('.fn').text() + " Rousseff");
    $(this).find('.comment-text').html("<div class='comentarioOculto' style='display: none;'>" + $(this).find('.comment-text').html() + "</div><div class='comentarioDilmistico'><p style='color: #999999'>" + DILMES[Math.floor(Math.random()*TAMDILMES)] + "</p></div>");
  }
})
}


dilmificator();        

setInterval(dilmificator, 5000);


$('#comment-pagination').append('<div style="background-color: #fdffd4; border: 1px solid #dfdfdf;"><div style="margin: -10px 10px 15px 10px; display: grid;"><h4>Muquirana Dilmificator</h4><input type="text" id="usuario" placeholder="Digite aqui o nome do mala a ser Dilmificado"><button id="addNick" type="button">Adicionar Mala</button><br><select id="comboMalas" style="padding: 5px;"></select><button id="delNick" type="button">Remover Mala</button><p id="avisosDilmificator" style="text-align: center; color: #396ab3; margin-top: 10px; background-color: #FFF;"></p></div></div>');
  
function listarMalas() {
  if(malas.length == 0) {
    $('#comboMalas').html('<option value="" disabled selected>-- Nenhum mala adicionado --</option>');
  }
  $.each(malas, function(i, el) 
  { 
    $('#comboMalas').append( new Option(el, el) );
    $('#comboMalas').val(el);
  });
}

listarMalas();

$(document).delegate('.comment-text', 'click', function(event){
  event.stopPropagation();
  event.stopImmediatePropagation();
  $(this).parent().find('.comentarioOculto').toggle();
  $(this).parent().find('.comentarioDilmistico').toggle();
});
  

$("#addNick").click(function() {
  malas.push(usuario.value);
  GM.setValue("malas", JSON.stringify(malas));
  $('#comboMalas').html("");
  $('#avisosDilmificator').html("Mala <strong>" + usuario.value + "</strong> dilmificado! Você pode revelar a mensagem original ao clicar sobre o texto dilmificado.");
  usuario.value="";
  listarMalas();
  dilmificator();
});

$("#delNick").click(function() {
  nomeMala = comboMalas.value;
  i = malas.indexOf(nomeMala);
  if (i > -1) {
    malas.splice(i, 1);
  }
  
  $('.comment-body').each(function(i){
    if((nomeMala + ' Rousseff') == $(this).find('.fn').text()){ 
      $(this).find('.fn').text(nomeMala);
      $(this).find('.comentarioDilmistico').remove();    
      $(this).find('.comentarioOculto').contents().unwrap();
    }
  });
  
  $('#comboMalas').html("");
  GM.setValue("malas", JSON.stringify(malas));
  $('#avisosDilmificator').html("O mala <strong>" + nomeMala + "</strong> não será mais dilmificado! :(<br>As mensagens foram restauradas.");
  listarMalas();
  dilmificator();
});
  
})();
