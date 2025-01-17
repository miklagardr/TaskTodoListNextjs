import { getAllData } from "../../../../services/serviceOperations";


const handler = async (req , res) => {
    //(getTodo istekleri buradan karşılanıyor. localhost:3000/api/getTodo) 
    if(req.method == "GET") {
        try{
            
             const data = await getAllData("todo");
            
             if(!data || data.error || data === undefined){
            
                 throw new Error(data.error);
            
             }
           
             return res.status(200).json({status: "success", data: data});
            //return res.status(200).json({status: "success"});
        }
        catch(error){
            return res.status(500).json({status: "error", error: error.message, data: null}); 
        }

    }else{
        return res.status(400).json({status:error, error : "Wrong Method"})
    }
}

export default handler; 