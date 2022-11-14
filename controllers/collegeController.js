import College from "../models/College/College.js";
import bigPromise from "../middlewares/bigPromise.js"

export const newcollege = bigPromise(async(req,res,next) =>{
    const {data} =req.body;
    const data1=JSON.parse(data);
    console.log(data1);
    if(!data1.location || !data1.establishedYear ||!data1.name)
    {
        return res.status(400).json({
            success:true,
            message:"All fields are required"
        })
    }
    
    const existingcollege=await College.find({
        name:data1.name
    })
    if(existingcollege)
    {
        return res.status(501).json({
         success:true,
         message:"College already exits"
        });
    }
    else{
        const college = await College({
            name:data1.name,
            location:data1.location,
            establishedYear:data1.establishedYear
        })
        college.save().then((res)=>{
          console.log(res);
        }).catch((err) =>{
            console.log(err);
        })
        return res.status(200).json({
            success:true,
            message:"College added successfully"
        })
    }
})

export const getcollege = bigPromise(async(req,res,next)=>{
   const colleges=await College.find({});
   if(!colleges)
   {
    return res.status(500).json({
        success:false,
        message:"There no colleges added to show"
    })
}
    else{
        return res.status(200).json({
            success:true,
            message:"Following are the list of colleges",
            data:colleges
        })
    }
});

export const updatecollege=bigPromise(async(req,res,next)=>{
     const {update1} = req.body;
     const ans=College.find({name:update1.name});
     if(!ans)
     {
        return res.status(404).json({
            success:false,
            message:"College with this name does not exist"
        });
     }
     else{
     College.findByIdAndUpdate(ans._id,{$set:update1},function(err){
        if(err)
        {
            console.log(err);
            return;
        }
        return res.status(200).json({
        success:true,
        message:"The College has been updated successfully" 
        });
     });
     }
})

export const deletecollege = bigPromise(async(req,res,next)=>{
    const delete1={
    clgname:req.body.name,
    }
  const ans=College.find({name:delete1.clgname})
  if(!ans)
  {
    return res.status(401).json({
        success:false,
        message:"No college exists with the given name"
    })
  }
  else{
    College.deleteOne({name:delete1.clgname},function(err){
        if(err)
        {
            console.log(err);
            return;
        }
        return res.status(200).json({
        success:true,
        message:"Successfully deleted the college"
        });
    })
  }
});