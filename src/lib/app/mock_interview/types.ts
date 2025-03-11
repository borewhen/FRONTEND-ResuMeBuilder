interface MockInterviewSubcategory {
    subcategory_id: number;
    status: boolean;
    subcategory_name: string;
}
interface MockInterviewTopic {
    category_id: number;
    category_name: string;
    subcategories: MockInterviewSubcategory[];
}

export type MockInterviewInterviewTopicList=MockInterviewTopic[];

export interface InterviewSessionRequest {
    /* Only for Put Request */
    answer: string;
}

export interface InterviewSessionGetResponse {
    questions: string[];
    answers: string[];
    feedbacks: string[];
    status: "not-attempted" | "in-progress" | "completed";
}

export interface InterviewSummaryResponse {
    summary: string;
}