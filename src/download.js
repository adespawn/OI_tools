const axios =require('axios');
const fs_p = require('fs').promises;
async function download_file(url,save_dir){
    try{
        const response = await axios.get(url)
        let data=response.data+'';
    if(data[0]!=0&&data[0]!=1&&data[0]!=2&&data[0]!=3&&data[0]!=4&&data[0]!=5&&data[0]!=6&&data[0]!=7&&data[0]!=8&&data[0]!=9){
        console.log(`DATA`,data)
    }
    await fs_p.writeFile(save_dir,data,await function (err){
        if(err) console.log(`Cannot save to ${save_dir}`)
        
    })  
    }catch(e){
        console.log(`Downloading err (${url})${e}`)
    }
}
module.exports={
name:"download",
download_group:async function(url,i,test_prefix,in_ext,out_ext,dir){
    await download_file(`${url}/in/${test_prefix}${i}${in_ext}`,`${dir}/in/${test_prefix}${i}${in_ext}`)
    await download_file(`${url}/out/${test_prefix}${i}${out_ext}`,`${dir}/out/${test_prefix}${i}${out_ext}`)
}    
}