export const convertStringToLanguageObject = (content: string, lang: string): Record<string, string> => {
	return { [lang]: content };
};
