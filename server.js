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
// <meta http-equiv="refresh" content="5">

var data = {"janecheerful":{"status":"hijjj [100 tokens remaining]","users":"1","goal":"<table class=\"goal_display_table\">\n<tbody><tr class=\"dark_blue\">\n<th>\n<div class=\"counter_label_green\">Tip Received / Goal :</div>\n</th>\n<td class=\"data\">0 / 100</td>\n</tr>\n<tr class=\"dark_light_blue\">\n<th>\n<div class=\"counter_label\">Highest Tip:</div>\n</th>\n<td class=\"data\">-- (0)</td>\n</tr>\n<tr class=\"dark_blue\">\n<th>\n<div class=\"counter_label\">Latest Tip Received:</div>\n</th>\n<td class=\"data\">-- (0)</td>\n</tr>\n</tbody></table>","progress":61,"chat":["connection established","Broadcaster Rules: Tokens are the only form of payment allowed. You may promote your personal website as long as it does not offer video chat. Do not provide your Skype or Yahoo Messenger to anyone, and do not ask users to chat with you elsewhere.","Your cam is visible to men, women, trans, couples. Edit this in settings & privacy.","You are running these apps: Tip Goal","room subject changed to \"hijjj [100 tokens remaining]\"","Broadcaster janecheerful  has joined the room."]}}
app.get('/', function(req, res) {
    res.send('Для тоо чтобы перейти на нужный канал напиши в адресной строке название канала после названия сайта. Пример: http://18.221.71.184/big_ass/stat')
});
app.get('/:id', function(req, res) {
    res.render('gbar', {data: req.params.id});
});
app.get('/:id/stat', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.render('stat', {data: data[req.params.id].status, channel: req.params.id});
});
app.get('/:id/coun', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.render('coun', {data: data[req.params.id].users, channel: req.params.id});
});
app.get('/:id/goal', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.render('goal', {data: data[req.params.id].goal.trim(), channel: req.params.id});
});
app.get('/:id/gbar', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.render('gbar', {data: data[req.params.id].progress, channel: req.params.id});
});
app.get('/:id/tipa', function(req, res) {
	!data.hasOwnProperty(req.params.id)?d.none(res):res.render('tipa', {data: req.params.id});
});
app.get('/:id/chat', function(req, res) {
	var str = ''
	if(data.hasOwnProperty(req.params.id))
		data[req.params.id].chat.forEach((el)=>{
			str = str + `<div class="message-box left-img">
                                
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
        if(msg.data){
        	data[msg.channel] = msg.data
            io.emit('data'+msg.channel, msg.data);
        }
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