declare module 'code_executor' {
	export interface ICodeExecutorBody {
		typedCode: string;
		language: string;
		inputs: string[];
	}
}
