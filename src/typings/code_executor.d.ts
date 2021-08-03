declare module 'code_executor' {
	interface IInput {
		id: string;
		input: string;
	}
	export interface ICodeExecutorBody {
		typedCode: string;
		language: string;
		inputs: IInput[];
	}
}
