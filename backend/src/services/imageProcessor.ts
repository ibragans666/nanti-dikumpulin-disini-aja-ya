import sharp from 'sharp';
import * as ort from 'onnxruntime-node';

export async function imageToTensor(buffer: ArrayBuffer): Promise<ort.Tensor> {
    const imgBuffer = await sharp(buffer)
        .resize(224, 224) 
        .removeAlpha()
        .raw()
        .toBuffer();

    const float32Data = new Float32Array(224 * 224 * 3);
    // Normalisasi 0-255 ke 0-1
    for (let i = 0; i < float32Data.length; i++) {
        float32Data[i] = imgBuffer[i] / 255.0;
    }
    
    // Format [1, 224, 224, 3]
    return new ort.Tensor('float32', float32Data, [1, 224, 224, 3]);
}