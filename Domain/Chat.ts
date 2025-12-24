import { Dispatch, SetStateAction } from "react";

export type SettingsProps = {
    setPersonality: Dispatch<SetStateAction<string>>;
};
export type ChatProps = {
    personality: string;
};
export type ChatMessage = {
    id: string;
    text: string;
    sender: 'user' | 'system';
};

export type Personality = string;
