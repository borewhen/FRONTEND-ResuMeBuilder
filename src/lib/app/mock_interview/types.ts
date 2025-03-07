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