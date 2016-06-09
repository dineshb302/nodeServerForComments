var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );

var app = express();
var server = http.createServer( app );

var io = socket.listen( server );

io.sockets.on( 'connection', function( client ) {
	console.log( "New client !" );
	
	client.on( 'message', function( data ) {
		console.log( 'Message received ' + data.res );

		io.sockets.emit( 'message', { name: data.name, message: data.message } );
	});
	
	client.on( 'likes', function( data ) {
		console.log( 'like done ' + data.id);
		
	
		io.sockets.emit( 'likes', { id: data.id } );
	});
	
	client.on( 'unlikes', function( data ) {
		console.log( 'unlike done ' + data.id);
		
	
		io.sockets.emit( 'unlikes', { id: data.id } );
	});
	client.on( 'comments', function( data ) {
		console.log( 'comment done ' + data.id);
		
	
		io.sockets.emit( 'comments', { id: data.id,comment:data.comment} );
	});
});

server.listen( 3000 );