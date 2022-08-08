import fs from 'fs';

class Mensajes {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(msj) {
    try {
      if (fs.existsSync(this.fileName)) {
        const mensajes = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
        mensajes.push(msj);
        fs.writeFileSync(this.fileName, JSON.stringify(mensajes));
      } else {
        const mensajes = [];
        mensajes.push(msj);
        fs.writeFileSync(this.fileName, JSON.stringify(mensajes));
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  getAll() {
    try {
      const contenido = fs.readFileSync(this.fileName, 'utf-8');
      return JSON.parse(contenido);
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default Mensajes;