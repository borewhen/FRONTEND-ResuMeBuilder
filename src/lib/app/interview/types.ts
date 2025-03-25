// const pc = new RTCPeerConnection();
// const offer = await pc.createOffer();
// await pc.setLocalDescription(offer);
// body= JSON.stringify({ sdp: pc.localDescription })

export interface PCOfferRequest {
    sdp: RTCSessionDescriptionInit | null;
}

export interface PCOfferResponse {
    message: string;
}

export interface StartStreamResponse {
    message: string;
}