
const { createTestChainSync, setChainProps } = require('../../dist/test-scenarii.esm.js')


describe.only(`Synchronous Chains`, () =>
{
	describe(`Nested Chain Tests`, () =>
	{
		test(`Running a nested chain with 1 test step inside a primary chain`, () =>
		{
			// Create the primary/parent chain
			const primaryChain = createTestChainSync({ contextStuff : "value" }, { propStuff : "value", count : 0 })
			
			// Create the secondary/nested chain. It will inherit the context and the props when the time comes
			const nestedChain = createTestChainSync.nested(
				(ctx, props) =>
				{
					return { count : props.count + 1 }
				}
			)

			// Run the primary chain, which will execute the nested chain in between regular test steps
			primaryChain(
				(ctx, props) =>
				{
					return { count : props.count + 1 }
				},

				nestedChain,

				(ctx, props) =>
				{
					return { count : props.count + 1 }
				},

				(ctx, props) =>
				{
					expect(props.count).toBe(3) // eslint-disable-line no-magic-numbers
					expect(ctx.contextStuff).toBe("value")
				}
			)
		})

		test(`Running a nested chain with multiple test steps inside a primary chain`, () =>
		{
			// Create the primary/parent chain
			const primaryChain = createTestChainSync({ contextStuff : "value" }, { propStuff : "value", count : 0 })
			
			// Create the secondary/nested chain. It will inherit the context and the props when the time comes
			const nestedChain = createTestChainSync.nested(
				(ctx, props) =>
				{
					return { count : props.count + 1 }
				},

				(ctx, props) =>
				{
					return { count : props.count + 1 }
				},

				(ctx, props) =>
				{
					return { count : props.count + 1 }
				}
			)

			// Run the primary chain, which will execute the nested chain in between regular test steps
			primaryChain(
				(ctx, props) =>
				{
					return { count : props.count + 1 }
				},

				nestedChain,

				(ctx, props) =>
				{
					return { count : props.count + 1 }
				},

				(ctx, props) =>
				{
					expect(props.count).toBe(5) // eslint-disable-line no-magic-numbers
					expect(ctx.contextStuff).toBe("value")
				}
			)
		})
	})
})