import { AppDataSource } from "../data-source";

AppDataSource.initialize().then(async () => {
    console.log("Dados sincronizados com sucesso.");
}).catch(error => console.log(error))