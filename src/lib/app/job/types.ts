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

// array of jobs
export type JobScraperResponse = Job[];