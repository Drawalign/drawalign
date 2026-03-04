import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlockRenderer } from "@/components/BlockRenderer";

describe("BlockRenderer", () => {
	it("renders nothing for empty blocks array", () => {
		const { container } = render(<BlockRenderer blocks={[]} />);
		expect(container).toBeEmptyDOMElement();
	});
});
