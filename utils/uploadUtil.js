import { Config } from "./config.js";
class uploadUtil{
    constructor(){

    }
    uploadImg(files, scall, ecall, process) {
        let uploadTask = "";
        console.log(Config.baseUrl);
        
        let allUploadTask = files.map((file, index) => {
            return new Promise((resolve, reject) => {
                uploadTask = wx.uploadFile({
                    url: Config.baseUrl + '/api/upload',
                    filePath: file,
                    name: 'file',
                    success(res) {
                        resolve(res);
                    },
                    fail(err) {
                        reject(err);
                    }
                })
                uploadTask.onProgressUpdate((res) => {
                    res.file = file;
                    process(res);
                })
            });
        });
        Promise.all(allUploadTask).then((res) => {
            scall && scall(res);
        }).catch((err) => {
            ecall && ecall(err);
        });
    }
}
export { uploadUtil }
