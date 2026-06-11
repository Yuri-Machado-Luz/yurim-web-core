import type { SkillCategory, ExperienceItem, EducationItem, LanguageItem, HeroStat, QuickFact } from "../../../types";

import skillsRaw from "../data/skills.json";
import experienceRaw from "../data/experience.json";
import educationRaw from "../data/education.json";
import languagesRaw from "../data/languages.json";
import statsRaw from "../data/stats.json";

export const skills = skillsRaw as SkillCategory[];
export const experience = experienceRaw as ExperienceItem[];
export const education = educationRaw as EducationItem[];
export const languages = languagesRaw as LanguageItem[];
export const stats = statsRaw as { heroStats: HeroStat[]; quickFacts: QuickFact[] };
