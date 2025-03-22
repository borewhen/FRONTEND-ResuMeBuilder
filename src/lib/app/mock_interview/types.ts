// getInterviewTopics
interface MockInterviewSubcategory {
    subcategory_id: number;
    status: boolean;
    subcategory_name: string;
}
interface MockInterviewTopic {
    category_id: number;
    category_name: string;
    mock_interview_id: number;
    subcategories: MockInterviewSubcategory[];
}

export type MockInterviewInterviewTopicList=MockInterviewTopic[];

// session
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
// summary
export interface SubcategorySummaryResponse {
    summary: string;
}

export interface MockInterviewSummaryResponse{
    summary: string;
    failed_topics: string[];
}