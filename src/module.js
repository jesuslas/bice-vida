const { ok, fail } = require("./responses");
const {getDatos} = require("./service");

const COSTCHILD={0:{v:0.279,d:0.12},1:{v:0.4396,d:0.1950},2:{v:0.5599,d:0.2480}}


class Policy {

    async getPolicy(req, res) {
        try {
            let {policy:{workers,company_percentage} } = await ((await getDatos()).json());
            const costs = workers.map(({age,childs})=>{
               if(age>65){
                  return  {lifeInsurance:0,dentalInsurance:0,insurance:0}
               }
               let costV = (COSTCHILD[childs]||{}).v;
               let costD = (COSTCHILD[childs]||{}).d;
              if(!(COSTCHILD[childs]||{}).v){
                 if(childs=== 3 ){
                      costV = (COSTCHILD[2]||{}).v + (COSTCHILD[1]||{}).v;
                      costD = (COSTCHILD[2]||{}).d + (COSTCHILD[1]||{}).d;
                 }
                 if(childs=== 4 ){
                      costV = (COSTCHILD[2]||{}).v + (COSTCHILD[2]||{}).v;
                      costD = (COSTCHILD[2]||{}).d + (COSTCHILD[2]||{}).d;
         
                  }
              }
         
               let insurance = costV + costD
               const lifeInsurance  = `${costV.toFixed(4)} UF` 
               const dentalInsurance  = `${costD.toFixed(4)} UF` 
               let costoBusiness = (company_percentage / 100) * insurance;
               let costoWorker =  insurance - costoBusiness;
               costoBusiness = `${costoBusiness.toFixed(4)} UF`
               costoWorker = `${costoWorker.toFixed(4)} UF`
               insurance = `${insurance.toFixed(4)} UF`
               return {age,childs,lifeInsurance,dentalInsurance,insurance,costoBusiness,costoWorker}
            })
            ok(res)({costs});
         } catch (error) {
            console.log('error',error);
            fail(500)(error);
         }
    }
}



module.exports = new Policy();
