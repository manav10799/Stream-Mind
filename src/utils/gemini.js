import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_AI_KEY } from "../env/env";

export const ai = new GoogleGenerativeAI(GEMINI_AI_KEY);
