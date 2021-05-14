const clients = require('./clientManager').ClientManager;

class Sockets{

    static io;

    static setIO(io){
        this.io = io;
        this.registerEvents();
    }

    static registerEvents(){
        this.io.on('connection', socket => {
    
            socket.on('init', (data) => {
                if(data == undefined || !data.dni){
                    socket.emit('error', {message: 'user not valid'})
                    
                }
                else{
                    clients.addClient(data.dni, socket.id)
                    socket.emit('success', {message: 'user connected'})
                }
                console.log('Client ', socket.id,' connected');
            })
        
            socket.on('disconnect', () => {
                clients.deleteClient(socket.id)
                console.log('Client disconnected');
            })
            console.log('socket.io connection made');
        });
    }

    static emit(dni, event, data){
        let client = clients.getClient(dni);
        console.log(client, 'emiting to:', client.socket)
        this.io.to(client.socket).emit(event, data);
    }

    
    
    

}

module.exports = {Sockets};