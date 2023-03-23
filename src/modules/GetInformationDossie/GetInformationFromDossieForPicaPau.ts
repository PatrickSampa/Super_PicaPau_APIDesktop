import { requerimentos } from "./InformatioReque";
import { dataPrevidencias } from "./InformationPro";
import { calcularIdade } from "./GetInformationIdade";
import { litispendencia } from "./GetInformationLitispendencia";
import { seguradoEspecial } from "./GetInformationSeguradoEspecial";


export class GetInformationDossieForPicaPau{
    async impedimentos(paginaDosprevFormatada: any, parginaDosPrev: any): Promise<Array<string>>{
        const ArrayImpedimentos: Array<string> = [];


        const DatasAtualEMenosDezesseis: Array<Date> = await requerimentos.dataRequerimento(paginaDosprevFormatada);
        const verificarDataFinal: boolean = await dataPrevidencias.Previdenciarias(DatasAtualEMenosDezesseis[0], DatasAtualEMenosDezesseis[1], paginaDosprevFormatada);
        if(verificarDataFinal){
            ArrayImpedimentos.push("EMPREGO")
        }

        const verificarIdade = await calcularIdade.calcIdade(paginaDosprevFormatada);
        if(!verificarIdade){
            ArrayImpedimentos.push("IDADE")
        } 


        const verificarLitispedencia = await litispendencia.funcLitis(paginaDosprevFormatada);
        if(!verificarLitispedencia){   
            ArrayImpedimentos.push("LITISPÊNDENCIA")
                                             
         }


         const segurado =  await seguradoEspecial.handle(parginaDosPrev);
         if(segurado !== -1){
            ArrayImpedimentos.push("CONCESSÃO ANTERIOR")
        }




        return ArrayImpedimentos;
    }


}