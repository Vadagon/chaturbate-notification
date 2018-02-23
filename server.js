var mustacheExpress = require('mustache-express');
var express = require('express')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/s/public', express.static('public'))

app.engine('html', mustacheExpress())
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/templates');

console.log('Served')
server.listen(80);

var d = {
	none: function(e){
		e.end('No data to display =(')
	}
}
var data = {"janecheerful":{"status":"hijjj [100 tokens remaining]","users":"1","goal":"\n\nTip Received / Goal :\n\n12 / 100\n\n\nHighest Tip:\n\n-- (0)\n\n\nLatest Tip Received:\n\n-- (0)\n","progress":0.12,"chat":["connection established","Broadcaster Rules: Tokens are the only form of payment allowed. You may promote your personal website as long as it does not offer video chat. Do not provide your Skype or Yahoo Messenger to anyone, and do not ask users to chat with you elsewhere.","Your cam is visible to men, women, trans, couples. Edit this in settings & privacy.","room subject changed to \"hijjj [100 tokens remaining]\"","Broadcaster janecheerful  has joined the room.","room subject changed to \"hijjj [100 tokens remaining]\"","Notice: Tip Goal app has started."]}}
app.get('/', function(req, res) {
    res.send('Для тоо чтобы перейти на нужный канал напиши в адресной строке название канала после названия сайта. Пример: http://18.221.71.184/big_ass')
});
app.get('/:id', function(req, res) {
    res.end(`
  	<!DOCTYPE html>
	<html>
	<head>
	    <title>${req.params.id}</title>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js" type="text/javascript"></script>
	    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.2.0/css/iziToast.min.css">
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.2.0/js/iziToast.min.js" type="text/javascript"></script>
	    <script type="text/javascript">
	    function ohSnap(n,t){var o={color:null,icon:null,duration:"5000","container-id":"ohsnap","fade-duration":"fast"};t="object"==typeof t?$.extend(o,t):o;var a=$("#"+t["container-id"]),e="",i="",h="";t.icon&&(e="<span class='"+t.icon+"'></span> "),t.color&&(i="alert-"+t.color),h=$('<div class="alert '+i+'">'+e+n+"</div>").fadeIn(t["fade-duration"]),a.append(h),h.on("click",function(){ohSnapX($(this))}),setTimeout(function(){ohSnapX(h)},t.duration)}function ohSnapX(n,t){defaultOptions={duration:"fast"},t="object"==typeof t?$.extend(defaultOptions,t):defaultOptions,"undefined"!=typeof n?n.fadeOut(t.duration,function(){$(this).remove()}):$(".alert").fadeOut(t.duration,function(){$(this).remove()})}
	    </script>
	    <style>
	    /* ALERTS */
	    #ohsnap{
	    	position: absolute;
		    right: 0;
		    bottom: 0;
	    }
	    .alert {
		  padding: 15px;
		  margin-bottom: 20px;
		  border: 1px solid #eed3d7;
		  border-radius: 4px;
		  position: relative;
		  bottom: 0px;
		  right: 21px;
		  /* Each alert has its own width */
		  float: right;
		  clear: right;
		  background-color: white;
		}

		.alert-red {
		  color: white;
		  background-color: #DA4453;
		}
		.alert-green {
		  color: white;
		  background-color: #37BC9B;
		}
		.alert-blue {
		  color: white;
		  background-color: #4A89DC;
		}
		.alert-yellow {
		  color: white;
		  background-color: #F6BB42;
		}
		.alert-orange {
		  color:white;
		  background-color: #E9573F;
		}
	    </style>
    </head>
	    <body>
	    	<p>You are on a '${req.params.id}' channel!</p>
	    	<p>Waiting on messages...</p>

	    	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
			<script>
			  var socket = io.connect('http://18.221.71.184');
			  socket.on('index${req.params.id}', function (data) {
			  	console.log(data.text)
			    if(data.channel==window.location.pathname.split('/')[1]){
			    	if(data.text.indexOf('joined') != -1)
				    	iziToast.warning({
						    title: 'Welcome!',
						    message: data.text+' Welcome!',
						    position: 'topLeft'
						});
					if(data.text.indexOf('tipped') != -1)
						ohSnap(data.text+' <b>Thanks!</b>', {'duration':'2000'});
			    }
			  });
			  setTimeout(function() {$('p').remove()}, 5000);
			  socket.on('exxx', function (data) {
			  	console.log(data)
			  });
			</script>
			<div id="ohsnap"></div>
	    </body>
	
	</html>`);
});
app.get('/:id/stat', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.end(data[req.params.id].status)
});
app.get('/:id/coun', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.end(data[req.params.id].users)
});
app.get('/:id/goal', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.end(data[req.params.id].goal)
});
app.get('/:id/gbar', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.end(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>${req.params.id}</title>
			<style>
				body{
					visibility: hidden;
				}
				#container{
					height: 900px;
					width: 900px;
					margin: auto;
					position: relative;
				}
				#perc{
				    position: absolute;
				    left: calc( 50% - 50px );
				    top: calc( 50% - 30px );
				    font-size: 60px;
				}
			</style>
		</head>
		<body>
			<div id="container">
			<span id="perc">${data[req.params.id].progress*100}%</span>
			  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
                  <path fill-opacity="0" stroke-width="1" stroke="#bbb" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
                  <path id="heart-path" fill-opacity="0" stroke-width="3" stroke="#ED6A5A" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
              </svg>
			</div>
			<script src="https://rawgit.com/kimmobrunfeldt/progressbar.js/1.0.0/dist/progressbar.js"></script>
			<script>
			(function() {
				document.body.style.visibility = 'visible'
				var bar = new ProgressBar.Path('#heart-path', {
  easing: 'easeInOut',
  duration: 1400
});

bar.set(0);
bar.animate(${data[req.params.id].progress});  // Number from 0.0 to 1.0
})()
</script>
		</body>
		</html>
	`)
});
app.get('/:id/tipa', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.end(`
  	<!DOCTYPE html>
	<html>
	<head>
	    <title>${req.params.id}</title>
	    <script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    	<style>

    		body, html{
    			margin: 0;
    			min-height: 100%;
    			height: 100%;
    		}
    		.container{
    			height: 100%;
    			text-align: center;
    		}
    		.container img{
    			height: calc(100% - 80px);
    		}
    		.container p{
    			margin: 0;
    			text-align: center;
    			font-size: 60px;
    		}
    	</style>
    </head>
	    <body>
	    	<div class="container">
	    		
	    	</div>
			<script>
			  var socket = io.connect('http://18.221.71.184');
			  socket.on('tipa${req.params.id}', function (data) {
			  	var num = parseInt(data.split('tipped')[1].split('tokens')[0])
			  	console.log(num)
			  	if(num < 10){
			  		$('.container').html('<img src="http://18.221.71.184/s/public/giphy1.gif"><p>'+data+'</p>')
			  	}
			  	if(num > 99){
			  		$('.container').html('<img src="http://18.221.71.184/s/public/giphy3.gif"><p>'+data+'</p>')
			  		return;
			  	}
			  	if(num >= 10 ){
			  		$('.container').html('<img src="http://18.221.71.184/s/public/giphy2.gif"><p>'+data+'</p>')
			  	}
			  });
			</script>
	    </body>
	
	</html>`);
});
app.get('/:id/chat', function(req, res) {
	var str = ''
	if(data.hasOwnProperty(req.params.id))
		data[req.params.id].chat.forEach((el)=>{
			str = str + `<div class="message-box left-img">
                                <div class="picture">
                                    <img src="https://orig00.deviantart.net/e5bc/f/2013/264/7/f/kawaii_bunny_png_by_snsdmiho22-d6n5vse.png" title="user name" />
                                    <!-- <span class="time">10 mins</span> -->
                                </div>
                                <div class="message">
                                    <!-- <span>Bobby Giangeruso</span> -->
                                    <p>${el}</p>
                                </div>
                            </div>`
		})
	!data.hasOwnProperty(req.params.id)?d.none(res):res.render('chat', {channel: req.params.id, chat: str});
});
app.get('/:id/data', function(req, res) {
	res.end(JSON.stringify(data))
});

io.on('connection', function(socket) {

    socket.on('ext', function(msg) {
        if (msg.text){
        	data[msg.channel].chat.push(msg.text)
            io.emit('chat'+msg.channel, msg.text);
            if(msg.text.indexOf('tipped') != -1 || msg.text.indexOf('joined') != -1){
                io.emit('index'+msg.channel, msg.text);
            }
            if(msg.text.indexOf('tipped') != -1){
            	io.emit('tipa'+msg.channel, msg.text);
            }
        }
        if(msg.data)
        	data[msg.channel] = msg.data
    });
});


// sudo docker stop megapersonals.apnot.com
// sudo docker rm megapersonals.apnot.com


// sudo docker run --detach \
// --hostname megapersonals.apnot.com \
// --publish 127.0.0.1:80:80 \
// --name megapersonals.apnot.com \
// --restart always \
// --volume /home/chrx/Documents/megaPersonals:/app/mpangular \
// --env-file /home/chrx/Documents/megaPersonals/megapersonals_dev_jenkins.env \
// git.apnot.com:4567/troy/megapersonals:dev 