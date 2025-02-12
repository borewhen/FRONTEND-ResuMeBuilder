export interface VideoUploadRequest extends FormData {
}

export interface VideoUploadResponse{
    success: boolean;
    message: string;
    transcript: string | null;
    analysis: string | null;
}