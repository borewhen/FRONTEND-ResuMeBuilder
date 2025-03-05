import { create } from "zustand";

interface JobState {
    companyLogo: string,
    jobLink: string,
    setCompanyLogo: (companyLogo: string) => void,
    setJobLink: (jobLink: string) => void,
}

const initialState = {
    companyLogo: "/pp.jpg"
}

export const useCompanyStore = create<JobState>()(
    (set) => ({
        ...initialState,
        companyLogo: initialState.companyLogo,
        jobLink: "",
        setCompanyLogo: (companyLogo: string) => set({ companyLogo }),
        setJobLink: (jobLink: string) => set({ jobLink }),
    })
);