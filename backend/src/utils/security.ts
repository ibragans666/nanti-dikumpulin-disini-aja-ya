export async function validateImageHeader(buffer: ArrayBuffer): Promise<boolean> {
    const arr = new Uint8Array(buffer).subarray(0, 4);
    let header = "";
    for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
    }
    // ffd8 (JPG), 89504e47 (PNG), 52494646 (WEBP)
    return header.startsWith('ffd8') || header.startsWith('89504e47') || header.startsWith('52494646');
}