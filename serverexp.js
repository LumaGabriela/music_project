const fs = require('fs')
const Users = require('./config')
const cors = require('cors')
const express = require('express')
const appexp = express()
const alert = require('alert')
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  
let genre = []
let temp = {}

let randomGenre 
let randomSong =''
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  /
let page = (g, s) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Music Research</title>
  <link rel="stylesheet" type="text/css" href="styles.css"/>
  <script  src="app.js" defer ></script>
  <script src="https://kit.fontawesome.com/407028fd30.js" crossorigin="anonymous"></script>
  
</head>
<body>
  
  <div class="container">
    
      <audio id="player" controls src="/music/folklore/11 - invisible string (Dolby Atmos).mp3">
      </audio>
   
    <div id="colordisplay"> 
      <button onclick="document.getElementById('player').play()"><i class="fa-solid fa-play"></i></button> 
      <button onclick="document.getElementById('player').pause()"><i class="fa-solid fa-pause"></i></button> 
      <button onclick="document.getElementById('player').volume += 0.1"><i class="fa-solid fa-volume-high"></i></button> 
      <button onclick="document.getElementById('player').volume -= 0.1"><i class="fa-solid fa-volume-low"></i></button> 
    </div>
        

  <form class="form" method="post" action="/register">

    <h3>Escolha uma cor que remete a esta música:</h3>

    <section class="wrap">

      <label><input type="radio" name="color" value="FF206E" onclick="changeBackgroundColor(this.value)">Vermelho Pink</input></label>
      <label><input type="radio" name="color" value="F54100" onclick="changeBackgroundColor(this.value)">Laranja</input></label>
      <label><input type="radio" name="color" value="0B6623" onclick="changeBackgroundColor(this.value)">Verde</input></label>
      <label><input type="radio" name="color" value="61051B" onclick="changeBackgroundColor(this.value)">Vermelho Preto</input></label>
      <label><input type="radio" name="color" value="27020C" onclick="changeBackgroundColor(this.value)">Preto vermelho</input></label>
      <label><input type="radio" name="color" value="661A89" onclick="changeBackgroundColor(this.value)">Violeta escuro</input></label>
      <label><input type="radio" name="color" value="333333" onclick="changeBackgroundColor(this.value)">Cinza preto</input></label>
    </section>

    <h3>Qual emoção do trecho musical você identifica?</h3>
    <section class="wrap">
      <label><input type="radio" name="emotion" value="love">Amor</input></label>
      <label><input type="radio" name="emotion" value="happy">Felicidade</input><label>
      <label><input type="radio" name="emotion" value="wear">Calmaria</input></label>    
      <label><input type="radio" name="emotion" value="fear">Medo</input></label>
      <label><input type="radio" name="emotion" value="sad">Tristeza</input></label> 
    </section>

    <h3>Como é seu humor no dia-a-dia?</h3>
    <section class="wrap">
      <label><input type="radio" name="daily_emotion" value="happy">Felicidade</input></label>
      <label><input type="radio" name="daily_emotion" value="sad">Tristeza</input></label>
      <label><input type="radio" name="daily_emotion" value="fear">Medo</input></label>
      <label><input type="radio" name="daily_emotion" value="depressive">Depressivo</input></label>
    </section>

    <h3>Você possui conhecimentos em teoria musical ou toca algum instrumento?</h3>
    <section class="wrap">
      <label><input type="radio" name="musical_knowledge" value="yes">Sim</input></label>
      <label><input type="radio" name="musical_knowledge" value="no">Não</input></label>
    </section>

    <h3>Você se identifica com qual gênero?</h3>
    <section class="wrap">
      <label><input type="radio" name="gender" value="female">Feminino</input></label>
      <label><input type="radio" name="gender" value="male">Masculino</input></label>
      <label><input type="radio" name="gender" value="other">Outro</input></label>
    </section>

    <h3>Em que faixa etária você se encontra?</h3>
    <section class="wrap">
      <label><input type="radio" name="age" value="below_18">Abaixo de 18 anos</input></label>
      <label><input type="radio" name="age" value="18-25">Entre 18 e 25 anos</input></label>
      <label><input type="radio" name="age" value="26-32">entre 26 e 32 anos</input></label>
      <label><input type="radio" name="age" value="more_40">Acima de 40 anos</input></label>
      
    </section>

    <h3>Você é de qual região do país?</h3>
    <section class="wrap">
      <label><input type="radio" name="region" value="north">Norte</input></label>
      <label><input type="radio" name="region" value="northeast">Nordeste</input></label>
      <label><input type="radio" name="region" value="south">Sul</input></label>
      <label><input type="radio" name="region" value="southeast">Sudeste</input></label>
      <label><input type="radio" name="region" value="midwest">Centro-oeste</input></label>
      <label><input type="radio" name="region" value="out_of_brazil">Fora do Brasil</input></label>

      
    </section>

    
   

    <button class="btn" type="submit"" >Cadastrar</button>
  </form>

 
</body>
</html>`


//      //      //      //      ///     //    ///   ///   //    //

fs.readdir('public/music', (err, files) => {
    if (err) console.log(err)
    else {
        
        files.forEach(file => {
            
            temp = {}
            genre.push({title: file, songs: []})
            temp = genre.find( item => item.title === file)

            temp.songs = fs.readdirSync('public/music/' + file)
        })
    }
})
//  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  /


appexp.use(express.urlencoded({extended: true}))
appexp.use(express.json())
appexp.use(cors())

appexp.use(express.static('public'))

appexp.get('/form', (req, res) => {
  randomGenre = genre[Math.floor(Math.random() * genre.length)]
  randomSong = randomGenre.songs[Math.floor(Math.random() * randomGenre.songs.length)]

  console.log(randomSong)

  res.status(200).send(page(randomGenre.title, randomSong))
    
})

appexp.post('/register', async (req, res) => {
  try { 
    if (
    randomSong !== undefined &&
    randomGenre.title !== undefined &&
    req.body.gender !== undefined &&
    req.body.color !== undefined &&
    req.body.emotion !== undefined &&
    req.body.daily_emotion !== undefined &&
    req.body.musical_knowledge !== undefined &&
    req.body.region !== undefined &&
    req.body.age !== undefined 
    ) {
      await Users.add({
        "song": randomSong,
        "genre" :randomGenre.title,
        "gender": req.body.gender ,
        "color": req.body.color ,
        "emotion": req.body.emotion ,
        "daily_emotion": req.body.daily_emotion,
        "musical_knowledge": req.body.musical_knowledge,
        "region": req.body.region,
        "age": req.body.age 
        })
    } else alert('Por favor, preencha todos os campos!')

    
  } catch(e) {res.end(e.message)}
  

  
  console.log(req.body)
  res.status(200).redirect('back')
})


appexp.listen(3000, '0.0.0.0', () => console.log('listening for requests on port 3000'))