const express = require('express');
const {someQueue, serverAdapter} = require('./src/config')
const appendToFile = require('./src/append-file')

function adicionarMensagem() {
  someQueue.add({
    teste:'ok'
   })
   someQueue.on('completed', (job) => {
    // console.log(`Job ${job.id} completado`);
   });
   
   someQueue.on('failed', (job, erro) => {
     //console.log(`Job ${job.id} falhou: ${erro.message}`);
   });
}

async function consumirMensagem() {

  await someQueue.process(async (job) => {
   // console.log(`Processando job ${job.id} com dados:`, job.data);
   appendToFile(JSON.stringify(job.data))
  })

}

(async function(){
  await consumirMensagem() 
}())

async function obterTrabalhosFalhados() {
  const falhas = await someQueue.getFailed();
  console.log('Trabalhos falhados:');
  falhas.forEach(falha => {
      console.log(`- ID: ${falha.jobId}, Erro: ${falha.failedReason}`);
      console.log('  Detalhes do trabalho:', falha.data);
  });
}

const app = express();

app.use('/admin/queues', serverAdapter.getRouter());

app.get('/',(req,res) => {

  adicionarMensagem()
  
  res.send({
    status:'ok'
  })
})
app.listen(3000, () => {
  console.log('open http://localhost:3000/admin/queues');
});