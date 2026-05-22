class EditAssetManager {
    constructor() {
        this.utf8Decoder = new TextDecoder();
        if (typeof pako === 'undefined') {
            console.error('Pako est requis pour la décompression gzip');
        }
}
    decompress(compressed) {
        if (!compressed || compressed.length === 0) return '';
        try {
            const binaryString = atob(compressed);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const decompressed = pako.inflate(bytes);
            return this.utf8Decoder.decode(decompressed);
        } catch (error) {
            console.error('Erreur lors de la décompression:', error);
            throw error;
        }
    }
    injecterScriptDansHead(assetName, compressedCode) {
        try {
            const script = document.createElement("script");
            const template = String.raw`${this.decompress(compressedCode)}`;
            script.textContent = template;
            script.type = "text/javascript";
            script.setAttribute('data-asset', assetName);
            document.head.appendChild(script);
        } catch (error) {
            console.error(`Erreur lors du chargement de ${assetName}:`, error);
        }  
    }
    injecterCssDansHead(assetName, compressedCode) {
        try {
            const style = document.createElement('style');
            style.textContent =  this.decompress(compressedCode);
            style.setAttribute('data-asset', assetName);
            document.head.appendChild(style);
        } catch (error) {
            console.error(`Erreur lors du chargement de ${assetName}:`, error);
        }
    }
}
