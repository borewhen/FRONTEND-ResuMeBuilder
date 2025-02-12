
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    username: string,
    first_name: string,
    last_name: string,
    role: string,
    profile_picture_url: string | null,
    user_id: number | null,
    setUsername: (username: string) => void,
    setFirstName: (first_name: string) => void,
    setLastName: (last_name: string) => void,
    setRole: (role: string) => void,
    setProfilePictureUrl: (profile_picture_url: string) => void,
    setUserId: (user_id: number) => void,
    setUserData: (username: string, first_name: string, last_name: string, role: string, profile_picture_url: string) => void,
}

const initialState = {
    username: "",
    first_name: "",
    last_name: "",
    role: "",
    profile_picture_url: "",
    summary: "",
    user_id: null,
    created_at: "",
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            ...initialState,
            setUsername: (username: string) => set({ username }),
            setFirstName: (first_name: string) => set({ first_name }),
            setLastName: (last_name: string) => set({ last_name }),
            setRole: (role: string) => set({ role }),
            setProfilePictureUrl: (profile_picture_url: string) => set({ profile_picture_url }),
            setUserId: (user_id: number) => set({ user_id }),
            setUserData: (username: string, first_name: string, last_name: string, role: string, profile_picture_url: string) => set({ username, first_name, last_name, role, profile_picture_url }),
        }),
        {
            name: "user-storage",
        }
    )
);