
import qrCode from "qrcode";

export async function generateQR(qrContent: string, qrFileName: string){
    try {
        await qrCode.toFile(qrFileName, qrContent)
        return qrFileName
    } catch (error) {
        console.log(error);
        
    }
}