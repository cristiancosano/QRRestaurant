class ClientManager{

    static clients = [];

    static addClient(dni, socket){
        this.clients.push({socket, dni});
    }

    static getClient(dni){
        return this.clients.find((client) => client.dni == dni);
    }

    static async deleteClient(socket){
        this.clients = this.clients.filter((findSocket) => {
            return findSocket.socket != socket
        });

    }

}

module.exports.ClientManager = ClientManager;