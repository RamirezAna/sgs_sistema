
import { peticiongeneral } from "./PeticionGeneral.jsx";
import {fetchrefresh} from "./peticionrefreshtoken.jsx";

export const peticionAPI = async (endpoint,metodo, bodyoptions,navigate) => {
      
     let result=""
    result = await peticiongeneral(endpoint,metodo,bodyoptions,navigate);
   
   let resuldata={}
   let resultres=0
   
   resultres=result['resp']
          
   if(resultres===401){        
       await fetchrefresh()
       result = await peticiongeneral(endpoint,metodo,bodyoptions,navigate);
       resuldata=result['data'];
       resultres=result['resp']
   } else{       
       resuldata=result['data'];       
   }

   
   const resultfetch={resuldata,resultres}
   

   return resultfetch
  
};
