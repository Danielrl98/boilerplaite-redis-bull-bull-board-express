const fs = require('fs')

module.exports = async function appendToFile(content) {
        let filename = 'files/messages.txt'

        try {
            await fs.readFile(filename, 'utf8' , async (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
               
                await fs.appendFileSync(filename, content + '\n');
                
              })
        } catch (err) {
          console.error('Erro ao adicionar conteúdo:', err);
        }
      }