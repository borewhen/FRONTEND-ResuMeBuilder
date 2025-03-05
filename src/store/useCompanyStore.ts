import { create } from "zustand";

interface JobState {
    companyLogo: string,
    jobLink: string,
    positionName: string,
    companyName: string,
    setCompanyLogo: (companyLogo: string) => void,
    setJobLink: (jobLink: string) => void,
    setPositionName: (positionName: string) => void,
    setCompanyName: (companyName: string) => void,
}

const initialState = {
    companyLogo: "/pp.jpg",
    jobLink: "",
    positionName: "",
    companyName: "",
}

export const useCompanyStore = create<JobState>()(
    (set) => ({
        ...initialState,
        companyLogo: initialState.companyLogo,
        jobLink: "",
        positionName: "",
        companyName: "",
        setCompanyLogo: (companyLogo: string) => set({ companyLogo }),
        setJobLink: (jobLink: string) => set({ jobLink }),
        setPositionName: (positionName: string) => set({ positionName }),
        setCompanyName: (companyName: string) => set({ companyName }),
    })
);