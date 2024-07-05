const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

(async () => {
    await client.connect();
})();

async function buscarDoCacheRedis(chave, callback) {
   const valor = await client.get(chave, (err, reply) => {
        if (err) {
            console.error('Erro ao buscar dados do cache Redis:', err);
            return callback(err, null);
        }
        return callback(null, reply ? JSON.parse(reply) : null);
    });
    console.log(valor)
}

async function apagarChave(chave) {
    await client.del(chave, (err, reply) => {
        if (err) {
            console.error('Erro ao apagar chave do cache:', err);
        } else {
            console.log(`Chave ${chave} apagada do cache.`);
        }
    });
}

async function adicionarAoCacheRedis(chave, valor) {
    await client.set(chave, JSON.stringify(valor));
}
(async function(){
   await adicionarAoCacheRedis('usuario_2', { id: 1, nome: 'Alice2' });
   await buscarDoCacheRedis('usuario_11')
   //await apagarChave('usuario_2') 
}())

 

/*
buscarDoCacheRedis('usuario_1', (err, usuario) => {
    if (err) {
        console.error('Erro ao buscar usuário do cache:', err);
    } else {
        console.log('Usuário encontrado no cache:', usuario);
    }
});
*/
