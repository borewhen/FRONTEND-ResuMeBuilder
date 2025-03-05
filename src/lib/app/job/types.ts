export interface Job {
    job_position: string;
    job_link: string;
    job_id: string;
    company_name: string;
    company_profile: string;
    job_location: string;
    job_posting_date: string;
    company_logo_url: string;
}

export interface JobScraperField {
    field: string;
    page: number | null;
}

export type JobScraperResponse = Job[];

interface similarJob {
    job_position: string;
    job_company: string;
    job_location: string;
    job_posting_time: string;
    job_link: string;   
}
export interface JobDetailResponse {
    job_position: string;
    jobs_status: string;
    job_location: string;
    company_name: string;
    company_linkedin_id: string;
    job_posting_time: string;
    base_pay: string;
    job_description: string;
    seniority_level: string;
    employment_type: string;
    Job_function: string;
    Industries: string;
    recruiter_details: any;
    similar_jobs: similarJob[];
}