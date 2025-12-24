export interface DomainProfile {
    name: string;
    description: string;
    allowedTopics: string[];
    forbiddenTopics: string[];
    examples?: string[];
}