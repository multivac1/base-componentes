import React from 'react';
import { render } from '@vtex/test-tools/react';
import ProductSize from './productSize.test';

test('should render a string', () => {
    const { tableNameAtribute } = render(<ProductSize />);

    const text = tableNameAtribute('boys');

    expect(text).toBeDefined()
})