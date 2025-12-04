import * as ort from 'onnxruntime-node';
import { imageToTensor } from './imageProcessor';
import { CLASS_LABELS, EXPERT_KNOWLEDGE } from '../config/constants';

console.log("⏳ Loading ONNX Model...");
const session = await ort.InferenceSession.create('./model_final.onnx');
console.log("✅ ONNX Model Loaded!");

export async function predictDisease(imageBuffer: ArrayBuffer) {
    // 1. Preprocess
    const imageTensor = await imageToTensor(imageBuffer);
    
    // 2. Inference
    const results = await session.run({ input: imageTensor });
    const outputData = results[session.outputNames[0]].data as Float32Array;

    // 3. Find Max Score (Argmax)
    let maxScore = -Infinity, maxIndex = 0;
    for (let i = 0; i < outputData.length; i++) {
        if (outputData[i] > maxScore) { maxScore = outputData[i]; maxIndex = i; }
    }

    // 4. Map Result
    const rawLabel = CLASS_LABELS[maxIndex];
    const readableLabel = rawLabel.replace(/_/g, " ");
    const confidence = (maxScore * 100).toFixed(1) + "%";
    const expertInfo = EXPERT_KNOWLEDGE[rawLabel] || { bahaya: "?", info: "-" };

    return {
        label: readableLabel,
        confidence,
        expertInfo
    };
}