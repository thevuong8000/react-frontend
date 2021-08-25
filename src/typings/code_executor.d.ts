declare module 'code_executor' {
	interface IInput {
		readonly id: string;
		readonly input: string;
	}

	type ISubmissionMode = 'Regular' | 'Competitive Programming';

	interface ICodeExecutorBodyBase {
		readonly typedCode: string;
		readonly language: import('@common/CodeEditor/CodeEditor').Language;
	}

	interface ICodeExecutorBodyRegular extends ICodeExecutorBodyBase {
		readonly mode: 'Regular';
	}

	interface ICodeExecutorBodyCompetitiveProgramming extends ICodeExecutorBodyBase {
		readonly mode: 'Competitive Programming';
		readonly inputs: IInput[];
	}

	type ISubmissionBody = {
		readonly // eslint-disable-next-line no-unused-vars
		[_ in ISubmissionMode]: any;
	};

	interface SubmissionBody extends ISubmissionBody {
		Regular: ICodeExecutorBodyRegular;
		'Competitive Programming': ICodeExecutorBodyCompetitiveProgramming;
	}

	export type ICodeExecutorBody<Mode extends ISubmissionMode> = SubmissionBody[Mode];
}
