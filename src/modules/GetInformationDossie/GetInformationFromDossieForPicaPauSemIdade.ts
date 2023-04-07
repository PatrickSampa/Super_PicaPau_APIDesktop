import { requerimentos } from "./InformatioReque";
import { dataPrevidencias } from "./InformationPro";

import { litispendencia } from "./GetInformationLitispendencia";
import { seguradoEspecial } from "./GetInformationSeguradoEspecial";
import { requerimentosAtivos } from "./InformatioReque";

export class GetInformationDossieForPicaPauSemIdade{
    async impedimentos(paginaDosprevFormatada: any, parginaDosPrev: any): Promise<Array<string>>{
        const ArrayImpedimentos: Array<string> = [];

        try{
            const DatasAtualEMenosDezesseis: Array<Date> = await requerimentos.dataRequerimento(paginaDosprevFormatada);
        const verificarDataFinal: boolean = await dataPrevidencias.Previdenciarias(DatasAtualEMenosDezesseis[0], DatasAtualEMenosDezesseis[1], paginaDosprevFormatada);
        if(verificarDataFinal){
            ArrayImpedimentos.push("EMPREGO")
        }
        }catch{
            ArrayImpedimentos.push("ERRO DOSPREV EMPREGO")
        }
        


        const verificarLitispedencia = await litispendencia.funcLitis(paginaDosprevFormatada);
        if(!verificarLitispedencia){   
            ArrayImpedimentos.push("LITISPÊNDENCIA")
                                             
         }

         

         const segurado =  await seguradoEspecial.handle(parginaDosPrev);
        const requerimentoAtivo: boolean = await requerimentosAtivos.handle(paginaDosprevFormatada)
         
        if(segurado !== -1 || requerimentoAtivo == true){
            ArrayImpedimentos.push("CONCESSÃO ANTERIOR")
        }

        return ArrayImpedimentos;
    }


}